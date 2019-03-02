import { createTestConfig } from '../config';

test('Create config test', () => {
  const config = createTestConfig();

  expect(config).toBeDefined();

  expect(config).toHaveProperty('bot_section', expect.any(Object));
  expect(config).toHaveProperty('db_section', expect.any(Object));
  expect(config).toHaveProperty('user_section', expect.any(Object));

  const { bot_section, db_section, user_section } = config;
  expect(bot_section).toHaveProperty('bot_first_name', expect.any(String));
  expect(bot_section).toHaveProperty('bot_username', expect.any(String));
  expect(bot_section).toHaveProperty('bot_token', expect.any(String));

  expect(db_section).toHaveProperty('host', expect.any(String));
  expect(db_section).toHaveProperty('port', expect.any(Number));
  expect(db_section).toHaveProperty('database', expect.any(String));
  expect(db_section).toHaveProperty('user', expect.any(String));
  expect(db_section).toHaveProperty('password', expect.any(String));

  expect(user_section).toHaveProperty('api_id', expect.any(Number));
  expect(user_section).toHaveProperty('api_hash', expect.any(String));
  expect(user_section).toHaveProperty('phone_number', expect.any(String));
})