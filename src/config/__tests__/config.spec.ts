import { createTestConfig } from '../config';

test('Create config test', () => {
  const config = createTestConfig();

  expect(config).toBeDefined();

  expect(config).toHaveProperty('bot_section', expect.any(Object));
  expect(config).toHaveProperty('db_section', expect.any(Object));

  const { bot_section, db_section } = config;
  expect(bot_section).toHaveProperty('bot_token', expect.any(String));

  expect(db_section).toHaveProperty('host', expect.any(String));
  expect(db_section).toHaveProperty('port', expect.any(Number));
  expect(db_section).toHaveProperty('database', expect.any(String));
  expect(db_section).toHaveProperty('user', expect.any(String));
  expect(db_section).toHaveProperty('password', expect.any(String));
})