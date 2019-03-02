import { IDatabase, IMain } from 'pg-promise';

import { mtp as sql } from '../sql'
import { MTPModel, MTPDBModel } from '../models'

export class MTPRepository {

  constructor(db: any, pgp: IMain) {
    this.db = db;
    this.pgp = pgp;
  }

  private db: IDatabase<any>;

  private pgp: IMain;

  create(): Promise<null> {
    return this.db.none(sql.mtpCreate);
  }

  add({ id, mtp_data }: MTPModel): Promise<MTPDBModel> {
    return this.db.one(sql.mtpAdd, [
      id,
      mtp_data,
    ]);
  }

  findById(id: string): Promise<MTPDBModel | null> {
    return this.db.oneOrNone(sql.mtpFindById, [
      id
    ]);
  }

  update({ id, mtp_data }: MTPModel): Promise<MTPDBModel | null> {
    return this.db.oneOrNone(sql.mtpUpdate, [
      id,
      mtp_data,
    ]);
  }

  save(inMTP: MTPModel): Promise<MTPDBModel | null> {
    return this.findById(inMTP.id).then((mtp) => {
      if (!mtp) {
        return this.add(inMTP)
      }
      return this.update(inMTP)
    })
  }
}