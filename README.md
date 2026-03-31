# @pipeworx/mcp-poetry

MCP server for poetry — search poems by title, author, or lines via PoetryDB.

## Tools

| Tool | Description |
|------|-------------|
| `search_poems` | Search for poems by title |
| `poems_by_author` | Get all poems by a specific author |
| `random_poems` | Get one or more random poems from the collection |

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

## CLI Usage

```bash
npx pipeworx use poetry
```

## License

MIT
