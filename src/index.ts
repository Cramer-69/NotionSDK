import { Client } from "@notionhq/client";
import dotenv from "dotenv";

export interface NotionEnvironment {
  NOTION_TOKEN?: string;
  NOTION_DATABASE_ID?: string;
}

export function resolveNotionToken(env?: NotionEnvironment): string {
  const token =
    env?.NOTION_TOKEN ??
    (typeof process !== "undefined" ? process.env.NOTION_TOKEN : undefined);

  if (!token) {
    throw new Error(
      "Missing Notion token. Set NOTION_TOKEN in your runtime environment."
    );
  }

  return token;
}

export function resolveDatabaseId(env?: NotionEnvironment): string {
  const databaseId =
    env?.NOTION_DATABASE_ID ??
    (typeof process !== "undefined"
      ? process.env.NOTION_DATABASE_ID
      : undefined);

  if (!databaseId) {
    throw new Error(
      "Missing Notion database ID. Set NOTION_DATABASE_ID in your runtime environment."
    );
  }

  return databaseId;
}

export function createNotionClient(env?: NotionEnvironment): Client {
  return new Client({
    auth: resolveNotionToken(env),
  });
}

export async function queryDatabase(env?: NotionEnvironment) {
  const notion = createNotionClient(env);

  return notion.databases.query({
    database_id: resolveDatabaseId(env),
  });
}

async function main() {
  dotenv.config();

  const response = await queryDatabase();
  console.log("Got response:", response);
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
