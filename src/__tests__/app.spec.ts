import { createApp } from '../app'
import { getConfig } from '../config';

test('Simple test', () => {
  const config = getConfig('eat_test_');
  const app = createApp(config);
  expect(true).toBe(true)
})