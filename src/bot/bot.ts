import Telegraf, { ContextMessageUpdate } from 'telegraf';

import { BotConfigT, ConfigT } from '../config';
import { DBT } from '../db';
import { LanguageCodeEnum, translateResult, initializeI18Next, i18nTrT, ToTranslate } from '../i18n';
import { DEFAULT_USER_LANGUAGE_CODE, UserDBModel } from '../db/models';

import { startHandler, settingsHandler, helpHandler, setLanguageCode } from './commands';
import { BotCommandEnum, getCmdStr } from './commands/commands';

export type TelegrafBotT = Telegraf<ContextMessageUpdate>;
export type TlgfCtxT = ContextMessageUpdate & {
  db: DBT,
  fromUserId: number,
  fromUserIdStr: string,
  fromFirstName: string,
  fromUserName: string,
  dbUser: UserDBModel | null,
  dbUserLanguageCode: LanguageCodeEnum,
}

export function createTlgfBot(config: BotConfigT): TelegrafBotT {
  const bot = new Telegraf(config.token);
  return bot
}

function AugmentCtx(db: DBT) {
  return async (ctx: ContextMessageUpdate, next?: Function) => {
    const newCtx = <TlgfCtxT>ctx;
    newCtx.db = db;
    const { from } = newCtx;
    if (from) {
      const { id, first_name, username } = from;
      const idStr = String(id);
      newCtx.fromUserId = id;
      newCtx.fromUserIdStr = idStr;
      newCtx.fromFirstName = first_name;
      newCtx.fromUserName = username || '';
      const dbUser = await db.users.findById(idStr);
      if (dbUser) {
        newCtx.dbUserLanguageCode = dbUser.language_code;
      } else {
        newCtx.dbUserLanguageCode = DEFAULT_USER_LANGUAGE_CODE;
      }
      newCtx.dbUser = dbUser;
      return next && next()
    }
  }
}

function I18nTranslate(t: i18nTrT) {
  return (ctx: TlgfCtxT, next?: Function) => {
    const promise = next && next();
    if (promise) {
      return promise.then((result: any) => {
        if (result && result instanceof ToTranslate) {
          const text = translateResult(t, result);
          return ctx.reply(text)
        }
      }).catch((err: any) => {
        console.error(err)
      })
    }
  }
}

export async function initializeTlgfBot(tlgfBot: TelegrafBotT, db: DBT, config: ConfigT) {
  const t = await initializeI18Next();
  tlgfBot.use(AugmentCtx(db));
  tlgfBot.use(<any>I18nTranslate(t));
  tlgfBot.command(getCmdStr(BotCommandEnum.start), <any>startHandler);
  tlgfBot.command(getCmdStr(BotCommandEnum.settings), <any>settingsHandler);
  tlgfBot.command(getCmdStr(BotCommandEnum.help), <any>helpHandler);
  tlgfBot.command(getCmdStr(BotCommandEnum.setlang), <any>setLanguageCode);
  return (<any>tlgfBot).launch()
}

export function destroyTlgfBot(tlgfBot: TelegrafBotT) {
  return tlgfBot.stop()
}