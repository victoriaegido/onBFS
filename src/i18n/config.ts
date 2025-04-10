import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { LANGUAGES } from "../app/enums/global.enum";
import { I18nType } from "../app/types/translation.type";
import en from './translations/enEN-backup.json';
import es from './translations/esES-backup.json';

const resources = {
    "es-ES": {
        translation: es
    },
    "en-US": {
        translation: en,
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: LANGUAGES.ES_ES,
    fallbackLng: LANGUAGES.ES_ES,
});

export const filterTranslations = (
    translations: I18nType[],
    language: string
) => {
    return translations.find((lang) => lang.language === language)?.values;
};

export const setTranslations = (jsonTranslations: I18nType[]) => {
    if (!jsonTranslations) return;

    const esES = filterTranslations(jsonTranslations, LANGUAGES.ES_ES) ?? es;

    const enUS = filterTranslations(jsonTranslations, LANGUAGES.EN_US) ?? en;

    esES && i18next.addResourceBundle("es-ES", "translation", esES);
    enUS && i18next.addResourceBundle("en-US", "translation", enUS);
}

export default i18next;