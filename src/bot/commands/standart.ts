import { UserStatusEnum } from '../../db/models';

import { TlgfCtxT } from '../bot';

import { getCmdStr, BotCommandEnum } from './commands';

export async function startHandler(ctx: TlgfCtxT) {
  const { db, from } = ctx;
  if (from) {
    const { id, first_name, username } = from;
    const idStr = String(id);

    const dbUser = await db.users.findById(idStr);
    if (dbUser) {
      return ctx.reply(`You are already registered! ${dbUser.first_name}`)
    }
    const createdDBUser = await db.users.add({ id: idStr, status: UserStatusEnum.registered, first_name, username });

    ctx.reply(`You are registered ! ${createdDBUser.first_name}`)
  }
}

export async function settingsHandler(ctx: TlgfCtxT) {
  const { from, chat } = ctx;
  if (from && chat) {
    ctx.reply(`
chat id: ${chat.id}
user id: ${from.id}
`)
  }
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