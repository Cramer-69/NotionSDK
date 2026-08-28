# notion-sdk-typescript-starter

This repository now exposes a small shared Notion client helper that can be used from
Node.js applications and Cloudflare Workers, making it a common integration point for
multiple apps.

## Features

- TypeScript for type checking.
- [Prettier](https://prettier.io/) for code formatting.
- A minimal GitHub Actions workflow that typechecks your code.
- [Dotenv](https://www.npmjs.com/package/dotenv) for configuring your Notion API token in Node.js.
- [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates)
  for ensuring your (and this template's!) dependencies are up to date.
- Our lovely Notion SDK!
- Shared helpers that accept either `process.env` values or explicit runtime bindings.

## Environment variables

Set these values in whichever runtime is consuming the SDK:

- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`

For local Node.js usage, you can still load them from `.env`:

```bash
echo "NOTION_TOKEN=[your token here]" > .env
echo "NOTION_DATABASE_ID=[your database id here]" >> .env
```

## Node.js usage

1. Make sure you've [created a Notion integration](https://developers.notion.com/docs/getting-started) and have a secret Notion token.
2. Run `npm install`.
3. Set `NOTION_TOKEN` and `NOTION_DATABASE_ID`.
4. Run `npm start` to execute the sample query.

## Cloudflare Workers usage

You can pass Cloudflare bindings directly instead of relying on `process.env`:

```ts
import { queryDatabase } from "notion-sdk-project";

export interface Env {
  NOTION_TOKEN: string;
  NOTION_DATABASE_ID: string;
}

export default {
  async fetch(_request: Request, env: Env): Promise<Response> {
    const response = await queryDatabase(env);
    return Response.json(response);
  },
};
```

Now you can head over to our [developer documentation](https://developers.notion.com/) for more information on using the Notion API!

## NPM Scripts

This template has a few built-in NPM scripts:

| Script              | Action                                                                                                                                                                          |
| - | - |
| `npm start`         | Run `index.ts`.                                                                                                                                                                 |
| `npm run typecheck` | Type check using the TypeScript compiler.                                                                                                                                       |
| `npm run format`    | Format using Prettier (also recommended: the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) if you're using VS code.) |
| `npm run build`     | Build JavaScript into the `dist/` directory. You normally shouldn't need this if you're using `npm start`.                                                                      |
