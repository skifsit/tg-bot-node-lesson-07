import { IMain, IDatabase, IOptions, TConfig } from 'pg-promise';
const pgPromise = require('pg-promise');

import { IExtensions, UsersRepository } from './repos';

export type DBT = IDatabase<IExtensions> & IExtensions;
export type PgDBT = {
  db: DBT,
  pgp: IMain,
}

export function createPgDB(config: TConfig): PgDBT {
  const initOptions: IOptions<IExtensions> = {
    extend(obj: IExtensions, dc: any) {
      obj.users = new UsersRepository(obj, pgp);
    }
  };

  const pgp: IMain = pgPromise(initOptions);

  const db = <IDatabase<IExtensions> & IExtensions>pgp(config);

  return {
    db,
    pgp,
  }
}

export async function initializePgDB(dbApp: PgDBT) {
  await dbApp.db.users.create();
}