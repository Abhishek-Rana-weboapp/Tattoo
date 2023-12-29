import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import UserContextProvider from './context/UserContextProvider';
import RoutesComponent from './routes/RoutesComponent';
import AlertModal from './component/modal/AlertModal';


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




  return (
    <UserContextProvider>
    <Router>
      <div className="App bg-[#000000] w-screen  flex flex-col items-center overflow-auto px-2 md:py-4 py-2 gap-2 scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-400 scrollbar-rounded" style={{height : "100dvh"}}>
         <RoutesComponent/>
      </div>
    </Router>
    </UserContextProvider>
  );
}

export default App;








































