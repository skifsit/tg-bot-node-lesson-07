import { UserStatusEnum, createUser } from '../../db/models';

import { TlgfCtxT } from '../bot';

import { getCmdStr, BotCommandEnum } from './commands';
import { ToTranslate, TrKeys, parseLanguageCode } from '../../i18n';

export async function setLanguageCode(ctx: TlgfCtxT) {
  const { db, dbUser, dbUserLanguageCode, message } = ctx;
  if (dbUser && message && message.text) {
    const msgParts = message.text.split(/\s/);
    if (msgParts.length === 2) {
      const languageCode = parseLanguageCode(msgParts[1]);
      const updatedUser = createUser(dbUser);
      updatedUser.language_code = languageCode;
      const updatedDBUser = await db.users.update(updatedUser);
      if (updatedDBUser) {
        return new ToTranslate(TrKeys.UPDATED_LANGUAGE,
          updatedDBUser.language_code,
          {
            old_language_code: dbUser.language_code,
            new_language_code: updatedDBUser.language_code,
          }
        )
      }
    }
  }
}

export async function settingsHandler(ctx: TlgfCtxT) {
  const { from, chat, dbUserLanguageCode } = ctx;
  if (from && chat) {
    ctx.reply(`
current language: ${dbUserLanguageCode}
chat id: ${chat.id}
user id: ${from.id}
`)
  }
}