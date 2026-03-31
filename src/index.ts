interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * Poetry MCP — PoetryDB API (free, no auth)
 *
 * Tools:
 * - search_poems: search poems by title
 * - poems_by_author: all poems by a specific author
 * - random_poems: one or more random poems
 */


const BASE_URL = 'https://poetrydb.org';

const tools: McpToolExport['tools'] = [
  {
    name: 'search_poems',
    description: 'Search for poems by title. Returns matching poems with their full text.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Title or partial title to search for (e.g., "The Road Not Taken")' },
      },
      required: ['query'],
    },
  },
  {
    name: 'poems_by_author',
    description: 'Get all poems by a specific author. Returns poem titles and full text.',
    inputSchema: {
      type: 'object',
      properties: {
        author: { type: 'string', description: 'Author name (e.g., "Emily Dickinson", "Robert Frost")' },
      },
      required: ['author'],
    },
  },
  {
    name: 'random_poems',
    description: 'Get one or more random poems from the collection.',
    inputSchema: {
      type: 'object',
      properties: {
        count: { type: 'number', description: 'Number of random poems to return (default 1, max 10)' },
      },
    },
  },
];

interface RawPoem {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
}

function formatPoem(raw: RawPoem) {
  return {
    title: raw.title,
    author: raw.author,
    line_count: parseInt(raw.linecount, 10) || raw.lines.length,
    text: raw.lines.join('\n'),
  };
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'search_poems': {
      const query = args.query as string;
      const res = await fetch(`${BASE_URL}/title/${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`PoetryDB error: ${res.status}`);
      const data = (await res.json()) as RawPoem[] | { status: number; reason: string };
      // PoetryDB returns a 404-like object when no results are found
      if (!Array.isArray(data)) {
        return { query, count: 0, poems: [] };
      }
      return {
        query,
        count: data.length,
        poems: data.map(formatPoem),
      };
    }

    case 'poems_by_author': {
      const author = args.author as string;
      const res = await fetch(`${BASE_URL}/author/${encodeURIComponent(author)}`);
      if (!res.ok) throw new Error(`PoetryDB error: ${res.status}`);
      const data = (await res.json()) as RawPoem[] | { status: number; reason: string };
      if (!Array.isArray(data)) {
        throw new Error(`Author not found: ${author}`);
      }
      return {
        author,
        count: data.length,
        poems: data.map(formatPoem),
      };
    }

    case 'random_poems': {
      const count = Math.min(10, Math.max(1, (args.count as number) ?? 1));
      const res = await fetch(`${BASE_URL}/random/${count}`);
      if (!res.ok) throw new Error(`PoetryDB error: ${res.status}`);
      const data = (await res.json()) as RawPoem[];
      return {
        count: data.length,
        poems: data.map(formatPoem),
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool } satisfies McpToolExport;
