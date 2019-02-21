export type UserModel = {
  id: string,
  status: string,
  first_name: string,
  username?: string,
}

export type UserDBModel = Pick<UserModel, Exclude<keyof UserModel, "username">> & {
  username: string | null,
}

export enum UserStatusEnum {
  registered = 'registered',
  unknown = 'unknown',
}