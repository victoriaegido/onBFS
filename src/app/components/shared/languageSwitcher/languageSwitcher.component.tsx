import { LANGUAGES } from "../../../enums/global.enum";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language

    const toggleLanguage = () => {
        const nextLang = currentLanguage === LANGUAGES.ES_ES ? LANGUAGES.EN_US : LANGUAGES.ES_ES;
        i18n.changeLanguage(nextLang);
      };
    
      return (
        <button onClick={toggleLanguage} className="lang-toggle-btn">
          {currentLanguage}
        </button>
      );
    };

export default LanguageSwitcher;