import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext.jsx";
const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);


return (
    <span className="btn btn-outline-info me-2" onClick={toggleLanguage}>
      {language === 'en' ? 'AR' : 'EN'}
    </span>
  );
};

export default LanguageSwitcher;