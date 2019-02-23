import { createTestConfig } from '../../config';

import { createTlgfBot, initializeTlgfBot, TelegrafBotT, destroyTlgfBot } from '../bot';
import { DBT } from '../../db';

describe('Check create, initialize and destroy bot', () => {
  let config;
  let tlgfBot: TelegrafBotT;

  beforeAll(async () => {
    config = createTestConfig();
    tlgfBot = createTlgfBot(config.bot_section);
    await initializeTlgfBot(tlgfBot, <DBT>{}, config);
  })

  test('Create db test', () => {

    expect(tlgfBot).toBeDefined();

    expect(tlgfBot).toHaveProperty('launch', expect.any(Function));
  })

  afterAll(async () => {
    await destroyTlgfBot(tlgfBot)
  })
})