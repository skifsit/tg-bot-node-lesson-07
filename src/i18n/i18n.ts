import i18next from 'i18next';

export type i18nTrT = i18next.TFunction;

export enum LanguageCodeEnum {
  English = 'en',
  Russian = 'ru',
}

export function parseLanguageCode(toParseLng?: string): LanguageCodeEnum {
  if (typeof toParseLng === 'string') {
    switch (toParseLng) {
      case LanguageCodeEnum.English:
        return LanguageCodeEnum.English
      case LanguageCodeEnum.Russian:
        return LanguageCodeEnum.Russian
    }
  }
  throw new Error(`Could not parse language ${toParseLng}`)
}

export enum TrKeys {
  REGISTERED = 'REGISTERED',
  ALREADY_REGISTERED = 'ALREADY_REGISTERED',
  UPDATED_LANGUAGE = 'UPDATED_LANGUAGE',
}

export function initializeI18Next(): Promise<i18nTrT> {
  return new Promise((resolve, reject) => {
    i18next.init({
      lng: LanguageCodeEnum.English,
      // debug: true,
      resources: {
        [LanguageCodeEnum.English]: {
          translation: {
            [TrKeys.REGISTERED]: `You are registered! {{first_name}}`,
            [TrKeys.ALREADY_REGISTERED]: `You are already registered! {{first_name}}`,
            [TrKeys.UPDATED_LANGUAGE]: `Language {{old_language_code}} updated to {{new_language_code}}`,
          }
        },
        [LanguageCodeEnum.Russian]: {
          translation: {
            [TrKeys.REGISTERED]: `Вы зарегистрированы! {{first_name}}`,
            [TrKeys.ALREADY_REGISTERED]: `Вы уже зарегистрированы! {{first_name}}`,
            [TrKeys.UPDATED_LANGUAGE]: `Язык {{old_language_code}} обновлен на {{new_language_code}}`,
          }
        },
      }
    }, (err, t: i18nTrT) => {
      if (err) {
        reject(err)
      } else {
        resolve(t)
      }
    });
  })
}

export function translateResult(t: i18nTrT, toTranslate: ToTranslate) {
  const data = toTranslate.data ? toTranslate.data : {};
  data.lng = toTranslate.language_code;
  return t(toTranslate.key, data)
}

export class ToTranslate {
  constructor(
    public key: TrKeys,
    public language_code?: LanguageCodeEnum,
    public data?: { [index: string]: any },
  ) { }
}