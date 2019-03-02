import { createTestConfig } from './config';
import { createBotApp, initializeBotApp } from './app.bot'

async function run() {
  const config = createTestConfig();
  const app = createBotApp(config);
  return initializeBotApp(app);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
})