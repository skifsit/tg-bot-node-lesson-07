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
  bot_token: string,
}

export type ConfigT = {
  bot_section: BotConfigT,
  db_section: DBConfigT,
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

export function getConfig(name: string): ConfigT {
  const config = rc(name);
  if (!config) {
    throw new Error(`Config by name ${name} not found!`)
  }
  const dbConfig = parseDBconfig(config.db_section)
  return {
    bot_section: config.bot_section,
    db_section: dbConfig,
  }
}