import { sql } from './sql'

export const users = {
  usrCreate: sql('users/usrCreate.pgsql'),
  usrAdd: sql('users/usrAdd.pgsql'),
  usrFindById: sql('users/usrFindById.pgsql'),
  usrUpdate: sql('users/usrUpdate.pgsql'),
  usrDeleteAll: sql('users/usrDeleteAll.pgsql'),
}

export const mtp = {
  mtpCreate: sql('mtp_authorizations/mtpCreate.pgsql'),
  mtpAdd: sql('mtp_authorizations/mtpAdd.pgsql'),
  mtpFindById: sql('mtp_authorizations/mtpFindById.pgsql'),
  mtpUpdate: sql('mtp_authorizations/mtpUpdate.pgsql'),
}