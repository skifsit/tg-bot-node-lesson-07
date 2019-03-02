
import { createTestConfig, ConfigT } from '../../../config';
import { createBotApp, BotAppT, initializeBotApp } from '../../../app.bot';
import { UserAppT, createUserApp, initializeUserApp } from '../../../app.user';
import { UserStatusEnum, createUser } from '../../../db/models';
import { LanguageCodeEnum } from '../../../i18n';

import { BotCommandEnum, getCmdStr } from '../commands';

describe('Check start command handler', () => {
  let config: ConfigT;
  let botApp: BotAppT;
  let userApp: UserAppT;
  let botResponsePromise;

  beforeAll(async () => {
    config = createTestConfig();
    botApp = createBotApp(config);
    userApp = createUserApp(config);
    botResponsePromise = new Promise(resolve => {
      botApp.tlgfBot.on('text', (ctx, next) => {
        const promise = next && next();
        if (promise) {
          promise.then(resolve)
        }
      })
    });
    await initializeBotApp(botApp);
    userApp = await initializeUserApp(userApp);
    if (!userApp.userId) {
      throw new Error('You are not authorized as user (MTProto)!')
    }
    await botApp.pgDb.db.users.deleteAll();
    const user = createUser({
      id: String(userApp.userId),
      status: UserStatusEnum.registered,
      first_name: config.bot_section.first_name,
      language_code: LanguageCodeEnum.Russian,
    })
    await botApp.pgDb.db.users.add(user);
  })

  test('Create db test', async () => {
    expect.assertions(1);
    const botId = (<any>botApp.tlgfBot.context).botInfo.id;
    const { users } = await userApp.argUser.client.contacts.search({
      limit: 1,
      q: `${config.bot_section.username}`,
    });

    if (users.length) {
      for (const user of users) {
        if (user._ === 'user' && user.id === botId) {
          await userApp.argUser.client.messages.sendMessage({
            message: getCmdStr(BotCommandEnum.start),
            peer: {
              _: 'inputPeerUser',
              user_id: user.id,
              access_hash: String(user.access_hash),
            },
            random_id: String(Date.now()),
          });

          await botResponsePromise;

          const { messages } = await userApp.argUser.client.messages.getHistory({
            limit: 1,
            peer: {
              _: 'inputPeerUser',
              user_id: user.id,
              access_hash: String(user.access_hash),
            },
            add_offset: 0,
            max_id: 0,
            min_id: 0,
            offset_date: 0,
            offset_id: 0,
          });

          if (messages.length === 1) {
            const message = messages[0];
            if (message._ === 'message') {
              const text = message.message;
              expect(text).toBe(`Вы уже зарегистрированы! ${config.bot_section.first_name}`);
            }
          }
        }
      }
    }
  })
})
