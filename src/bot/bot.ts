import Telegraf, { ContextMessageUpdate } from 'telegraf';

import { BotConfigT, ConfigT } from '../config';
import { DBT } from '../db';

import { startHandler, settingsHandler, helpHandler } from './commands';
import { BotCommandEnum, getCmdStr } from './commands/commands';

export type TelegrafBotT = Telegraf<ContextMessageUpdate>;
export type TlgfCtxT = ContextMessageUpdate & {
  db: DBT,
}

export function createTlgfBot(config: BotConfigT): TelegrafBotT {
  const bot = new Telegraf(config.bot_token);
  return bot
}

export async function initializeTlgfBot(tlgfBot: TelegrafBotT, db: DBT, config: ConfigT) {
  tlgfBot.use((ctx: ContextMessageUpdate, next) => {
    const newCtx = <TlgfCtxT>ctx;
    newCtx.db = db;
    return next && next()
  });
  tlgfBot.command(getCmdStr(BotCommandEnum.start), <any>startHandler);
  tlgfBot.command(getCmdStr(BotCommandEnum.settings), <any>settingsHandler);
  tlgfBot.command(getCmdStr(BotCommandEnum.help), <any>helpHandler);
  return (<any>tlgfBot).launch()
}