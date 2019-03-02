import { createPgDB, initializePgDB, PgDBT } from './db'
import { createTlgfBot, initializeTlgfBot, TelegrafBotT } from './bot'
import { ConfigT } from './config';

export type BotAppT = {
  pgDb: PgDBT,
  tlgfBot: TelegrafBotT,
  config: ConfigT,
}

export function createBotApp(config: ConfigT): BotAppT {
  const pgDb = createPgDB(config.db_section);
  const tlgfBot = createTlgfBot(config.bot_section);
  return {
    pgDb,
    tlgfBot,
    config,
  }
}

export async function initializeBotApp(app: BotAppT): Promise<BotAppT> {
  await initializePgDB(app.pgDb);
  await initializeTlgfBot(app.tlgfBot, app.pgDb.db, app.config)
  return app
}