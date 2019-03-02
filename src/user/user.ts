import 'reflect-metadata';
import promiseFinally from 'promise.prototype.finally';
promiseFinally.shim();
import { Airgram, AuthDialog, TYPES } from 'airgram';
import { prompt } from 'airgram/helpers';

import { UserConfigT, ConfigT } from '../config';
import { DBT } from '../db';
import { MTPData } from '../db/models';

import PGStore, { InjectTypes } from './store';
import { ErrorLogger } from './logger';

export type AirgramUserT = Airgram;

export function createAirgramUser(config: UserConfigT): AirgramUserT {
  const airgram = new Airgram({ id: config.api_id, hash: config.api_hash });

  airgram.bind(TYPES.AuthStore).to(PGStore);
  airgram.bind(TYPES.MtpStateStore).to(PGStore);
  airgram.bind(TYPES.Logger).to(ErrorLogger);
  return airgram
}

export async function initializeAirgramUser(airgram: AirgramUserT, db: DBT, config: ConfigT): Promise<number | undefined> {
  const { user_section } = config;
  const { api_id, api_hash, phone_number } = user_section;
  const ID = String(api_id) + api_hash + phone_number;

  airgram.container.bind<string>(InjectTypes.ID).toConstantValue(ID);
  airgram.container.bind<DBT>(InjectTypes.DB).toConstantValue(db);

  const dbMTP = await db.mtp.findById(ID);

  airgram.container.bind<MTPData>(InjectTypes.MTPData).toConstantValue(dbMTP && dbMTP.mtp_data || {});

  const { auth } = airgram;
  airgram.use(auth);

  auth.use(new AuthDialog({
    firstName: '',
    lastName: '',
    code: () => prompt(`Please enter the secret code:\n`),
    continue: () => false,
    phoneNumber: () => config.user_section.phone_number || prompt(`Please enter your phone number:\n`),
    samePhoneNumber: ({ phoneNumber }) => prompt(`Do you want to sign in with the "${phoneNumber}" phone number? Y/n\n`)
      .then((answer) => !['N', 'n'].includes(answer.charAt(0)))
  }));

  const state = await airgram.auth.getState();
  if (!state.userId) {
    await auth.login();
  }

  return state.userId
}