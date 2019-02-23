import { createTestConfig } from './config';
import { createApp, initializeApp } from './app'

async function run() {
  const config = createTestConfig();
  const app = createApp(config);
  return initializeApp(app);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
})