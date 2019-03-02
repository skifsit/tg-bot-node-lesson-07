import { createPgDB, initializePgDB, PgDBT } from './db'
import { createAirgramUser, initializeAirgramUser, AirgramUserT } from './user'
import { ConfigT } from './config';

export type UserAppT = {
  pgDb: PgDBT,
  argUser: AirgramUserT,
  config: ConfigT,
  userId?: number,
}

export function createUserApp(config: ConfigT): UserAppT {
  const pgDb = createPgDB(config.db_section);
  const argUser = createAirgramUser(config.user_section);
  return {
    pgDb,
    argUser,
    config,
  }
}

export async function initializeUserApp(app: UserAppT): Promise<UserAppT> {
  await initializePgDB(app.pgDb);
  const userId = await initializeAirgramUser(app.argUser, app.pgDb.db, app.config)
  app.userId = userId;
  return app
}