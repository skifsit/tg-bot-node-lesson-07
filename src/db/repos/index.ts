import { UsersRepository } from './usersRepo';
import { MTPRepository } from './mtpRepo';

interface IExtensions {
  users: UsersRepository,
  mtp: MTPRepository,
}

export {
  IExtensions,
  UsersRepository,
  MTPRepository,
}