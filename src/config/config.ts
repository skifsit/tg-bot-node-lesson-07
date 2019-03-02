import rc from 'rc';

export type InitialDBConfigT = {
  host: string,
  port: string,
  database: string,
  user: string,
  password: string,
}

export type DBConfigT = Pick<InitialDBConfigT, Exclude<keyof InitialDBConfigT, "port">> & {
  port: number,
}

export type BotConfigT = {
  first_name: string,
  username: string,
  token: string,
}

export type InitialUserConfigT = {
  api_id: string,
  api_hash: string,
  phone_number: string,
}

export type UserConfigT = Pick<InitialUserConfigT, Exclude<keyof InitialUserConfigT, "api_id">> & {
  api_id: number,
}

export type ConfigT = {
  bot_section: BotConfigT,
  db_section: DBConfigT,
  user_section: UserConfigT,
}

function toNumber(futureNumber: string): number {
  let _number;
  try {
    _number = Number.parseInt(futureNumber)
  } catch (err) {
    throw err
  } finally {
    if (_number !== undefined && Number.isNaN(_number)) {
      throw new Error(`Can not convert ${futureNumber} to Integer/Number. Result is ${_number}`)
    }
  }
  return _number
}

function parseDBconfig(dbConfig: InitialDBConfigT): DBConfigT {
  const port = toNumber(dbConfig.port);
  return {
    ...dbConfig,
    port,
  }
}

function parseUserconfig(userConfig: InitialUserConfigT): UserConfigT {
  const api_id = toNumber(userConfig.api_id);
  return {
    ...userConfig,
    api_id,
  }
}

export function getConfig(name: string): ConfigT {
  const config = rc(name);
  if (!config) {
    throw new Error(`Config by name ${name} not found!`)
  }
  const dbConfig = parseDBconfig(config.db_section);
  const userConfig = parseUserconfig(config.user_section);
  return {
    bot_section: config.bot_section,
    db_section: dbConfig,
    user_section: userConfig,
  }
}

export function createTestConfig(): ConfigT {
  const config = getConfig('eat_test_');
  return config
}