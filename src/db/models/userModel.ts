import { LanguageCodeEnum } from "../../i18n";

export const DEFAULT_USER_LANGUAGE_CODE = LanguageCodeEnum.English;

export type UserModel = {
  id: string,
  status: string,
  first_name: string,
  username?: string,
  language_code?: LanguageCodeEnum,
}

export type UserDBModel = Pick<UserModel, Exclude<keyof UserModel, "username" | "language_code">> & {
  username: string | null,
  language_code: LanguageCodeEnum,
}

export enum UserStatusEnum {
  registered = 'registered',
  unknown = 'unknown',
}

function assignUserDefault(inUsr: UserModel): UserModel {
  let { language_code } = inUsr;
  if (!language_code) {
    language_code = DEFAULT_USER_LANGUAGE_CODE;
  }
  return {
    ...inUsr,
    language_code,
  }
}

export function createUser(inUsr: UserModel): UserModel {
  return assignUserDefault(inUsr)
}