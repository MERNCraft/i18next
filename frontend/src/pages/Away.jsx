/**
 * src/pages/Away.jsx
 */


import React, { useContext } from 'react'
import { L10NContext } from '../contexts'
import { useTranslation } from 'react-i18next';

export const Away = () => {
  const { t } = useTranslation()

  const { language } = useContext(L10NContext)

  return (
    <h1>{language}: {t('away')}</h1>
  )
}