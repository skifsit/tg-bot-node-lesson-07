export type MTPData = { [index: string]: any };

export type MTPModel = {
  id: string,
  mtp_data: null | MTPData,
}

export type MTPDBModel = MTPModel;