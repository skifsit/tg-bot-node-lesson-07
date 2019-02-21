import { IMain, IDatabase, IOptions, TConfig } from 'pg-promise';
const pgPromise = require('pg-promise');

import { IExtensions, UsersRepository } from './repos';

export type DataBaseT = IDatabase<IExtensions> & IExtensions;

export function createDBApp(config?: TConfig) {
  const initOptions: IOptions<IExtensions> = {
    extend(obj: IExtensions, dc: any) {
      obj.users = new UsersRepository(obj, pgp);
    }
  };

  config = {
    host: 'localhost',
    port: 5432,
    database: 'tg-bot-test',
    user: 'lex',
    password: '46l27'
  };

  const pgp: IMain = pgPromise(initOptions);

  const db = <IDatabase<IExtensions> & IExtensions>pgp(config);

  return db
}

export async function initializeDBApp(db: DataBaseT) {
  await db.users.create();
}