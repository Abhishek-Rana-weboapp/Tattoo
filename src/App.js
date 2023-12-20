import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import UserContextProvider from './context/UserContextProvider';
import RoutesComponent from './routes/RoutesComponent';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require('./locales/en.json') },
      es: { translation: require('./locales/es.json') },
    },
    lng: 'en', // Default language
    interpolation: { escapeValue: false },
  });




function App() {
  const [userLanguage, setUserLanguage] = useState('en'); // Replace with logic to get user language
  const { t } = useTranslation();
  



  useEffect(() => {


    i18n.changeLanguage('es');
  }, []);



  return (
    <UserContextProvider>
    <Router>
      <div className="App bg-[#000000] w-screen  flex flex-col items-center overflow-auto p-2 gap-2" style={{height : "100dvh"}}>
         <RoutesComponent/>
      </div>
    </Router>
    </UserContextProvider>
  );
}

export default App;








































