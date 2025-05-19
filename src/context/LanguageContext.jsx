import { createContext, useEffect, useState } from 'react';
export const LanguageContext = createContext();
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
  };
  useEffect(() => {
    document.documentElement.dir=language === 'ar' ? 'rtl' : 'ltr' ;
    document.documentElement.lang = language ;
  
   
  }, [language])
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
