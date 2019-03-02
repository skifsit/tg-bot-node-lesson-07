import { createBotApp } from '../app.bot'
import { getConfig } from '../config';

test('Simple test', () => {
  const config = getConfig('eat_test_');
  const app = createBotApp(config);
  expect(true).toBe(true)
})