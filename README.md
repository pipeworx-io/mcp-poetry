# mcp-poetry

Poetry MCP — PoetryDB API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `search_poems` | Search poems by title or keyword. Returns matching poems with full text and author information. Use when looking for a specific poem or exploring a theme. |
| `poems_by_author` | Get all poems by a specific author (e.g., "Shakespeare", "Emily Dickinson"). Returns titles and full text. Use to explore an author\'s complete body of work. |
| `random_poems` | Get random poems from the collection—specify count for multiple. Returns full text, title, and author. Use for discovery or creative inspiration. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "poetry": {
      "url": "https://gateway.pipeworx.io/poetry/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Poetry data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
