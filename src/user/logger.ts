import { injectable } from 'inversify'
import { ag } from 'airgram';
import Logger from 'airgram/base/Logger'

@injectable()
export class ErrorLogger extends Logger implements ag.Logger {
  protected formatMessage(message) {
    return message
  }

  protected log({ name }, message) {
    if (name === 'verbose') {
      console.log(message)
    } else if (name === 'error') {
      console.error(message)
    }
  }
}