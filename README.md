# mcp-poetry

Poetry MCP — PoetryDB API (free, no auth)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `search_poems` | Search for poems by title. Returns matching poems with their full text. |
| `poems_by_author` | Get all poems by a specific author. Returns poem titles and full text. |
| `random_poems` | Get one or more random poems from the collection. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "poetry": {
      "url": "https://gateway.pipeworx.io/poetry/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use poetry
```

## License

MIT
