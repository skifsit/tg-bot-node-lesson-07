import { createPgDB, initializePgDB, PgDBT } from './db'
import { createTlgfBot, initializeTlgfBot, TelegrafBotT } from './bot'
import { ConfigT } from './config';

export type AppT = {
  pgDb: PgDBT,
  tlgfBot: TelegrafBotT,
  config: ConfigT,
}

export function createApp(config: ConfigT): AppT {
  const pgDb = createPgDB(config.db_section);
  const tlgfBot = createTlgfBot(config.bot_section);
  return {
    pgDb,
    tlgfBot,
    config,
  }
}

export async function initializeApp(app: AppT): Promise<AppT> {
  await initializePgDB(app.pgDb);
  await initializeTlgfBot(app.tlgfBot, app.pgDb.db, app.config)
  return app
}