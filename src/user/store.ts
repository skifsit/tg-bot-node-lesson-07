import { injectable, inject } from 'inversify'
import { ag } from 'airgram'

import { DBT } from '../db';
import { MTPData } from '../db/models';

export enum InjectTypes {
  DB = 'DB',
  MTPData = 'MTPData',
  ID = 'ID',
}

@injectable()
export default class PGStore<DocT> implements ag.Store<DocT> {
  constructor(
    @inject(InjectTypes.ID) public id: string,
    @inject(InjectTypes.DB) public db: DBT,
    @inject(InjectTypes.MTPData) public state: MTPData,
  ) { }

  private save(): Promise<any> {
    return this.db.mtp.save({
      id: this.id,
      mtp_data: this.state,
    })
  }

  public async delete(id: string): Promise<void> {
    const { state } = this;
    delete state[id];
    return this.save()
  }

  public async get(key: string, field?: string): Promise<any> {
    const { state } = this;
    if (field) {
      return Promise.resolve(state[key] && state[key][field])
    }
    return Promise.resolve(state[key])
  }

  public async set(id: string, doc: Partial<DocT>): Promise<Partial<DocT>> {
    const { state } = this;
    const nextDoc = state[id] ? Object.assign({}, state[id], doc) : doc;
    Object.assign(state, {
      [id]: nextDoc
    });
    return this.save()
  }
}