import { getConfig } from './config';
import { createApp, initializeApp } from './app'

async function run() {
  const config = getConfig('eat_test_');
  const app = createApp(config);
  return initializeApp(app);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
})