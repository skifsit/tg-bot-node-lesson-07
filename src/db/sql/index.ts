import { sql } from './sql'

export const users = {
  usrCreate: sql('users/usrCreate.pgsql'),
  usrAdd: sql('users/usrAdd.pgsql'),
  usrFindById: sql('users/usrFindById.pgsql'),
}