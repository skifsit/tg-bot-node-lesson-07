import rc from 'rc';

export type ConfigT = {
  bot_section: {
    bot_token: string
  }
}

export function getConfig(name: string): ConfigT {
  const config = rc(name);
  if (!config) {
    throw new Error(`Config by name ${name} not found!`)
  }
  return <ConfigT>config
}