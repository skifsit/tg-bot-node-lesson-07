import { createUserApp, initializeUserApp } from "./app.user";
import { createTestConfig } from "./config";

async function run() {
  const config = createTestConfig();
  const app = createUserApp(config);
  return initializeUserApp(app);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
})