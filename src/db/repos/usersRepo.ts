import { IDatabase, IMain } from 'pg-promise';

import { users as sql } from '../sql'
import { UserModel, UserDBModel } from '../models'

export class UsersRepository {

  constructor(db: any, pgp: IMain) {
    this.db = db;
    this.pgp = pgp;
  }

  private db: IDatabase<any>;

  private pgp: IMain;

  create(): Promise<null> {
    return this.db.none(sql.usrCreate);
  }

  add({ id, status, first_name, username, language_code }: UserModel): Promise<UserDBModel> {
    return this.db.one(sql.usrAdd, [
      id, 
      status, 
      first_name, 
      username,
      language_code,
    ]);
  }

  findById(id: string): Promise<UserDBModel | null> {
    return this.db.oneOrNone(sql.usrFindById, [
      id
    ]);
  }

  update({ id, status, first_name, username, language_code }: UserModel): Promise<UserDBModel | null> {
    return this.db.oneOrNone(sql.usrUpdate, [
      id, 
      status, 
      first_name, 
      username,
      language_code,
    ]);
  }

  deleteAll(): Promise<UserDBModel[]> {
    return this.db.any(sql.usrDeleteAll)
  }
}