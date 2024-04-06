/**
 * src/pages/Home.jsx
 */


import React, { useContext } from 'react'
import { L10NContext } from '../contexts'
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { language } = useContext(L10NContext)
  const { t } = useTranslation()  

  return (
    <h1>{language}: {t("home")}</h1>
  )
}