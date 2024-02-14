import React from 'react'
import NavigationButton from '../buttons/NavigationButton'
import { GrFormNextLink } from "react-icons/gr";
import { useTranslation } from 'react-i18next';

export default function Navigation({next , prev}) {

  const {t} = useTranslation()

  return (
    <div className=" w-full md:w-3/6 flex justify-between">
    <NavigationButton onClick={prev}>{t("Back")}</NavigationButton>
    <NavigationButton onClick={next}>{t("Next")}</NavigationButton>
   </div>
  )
}
