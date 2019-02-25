import { UserStatusEnum, createUser } from '../../db/models';

import { TlgfCtxT } from '../bot';

import { getCmdStr, BotCommandEnum } from './commands';
import { ToTranslate, TrKeys } from '../../i18n';

export async function startHandler(ctx: TlgfCtxT) {
  const { db, fromFirstName, fromUserName, fromUserIdStr, dbUser, dbUserLanguageCode } = ctx;
  if (dbUser) {
    return new ToTranslate(TrKeys.ALREADY_REGISTERED,
      dbUserLanguageCode,
      { first_name: fromFirstName }
    )
  }
  const user = createUser({
    id: fromUserIdStr,
    status: UserStatusEnum.registered,
    first_name: fromFirstName,
    username: fromUserName,
  })
  const createdDBUser = await db.users.add(user);

  return new ToTranslate(TrKeys.REGISTERED,
    dbUserLanguageCode,
    { first_name: createdDBUser.first_name }
  )
}

export async function helpHandler(ctx: TlgfCtxT) {
  const { from, chat } = ctx;
  if (from && chat) {
    ctx.reply(`
${getCmdStr(BotCommandEnum.start)}
${getCmdStr(BotCommandEnum.settings)}
${getCmdStr(BotCommandEnum.help)}
`)
  }
}