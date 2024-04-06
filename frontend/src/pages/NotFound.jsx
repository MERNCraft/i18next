/**
 * src/pages/NotFound.jsx
 */


import React from 'react';
import { useTranslation } from 'react-i18next';


export const NotFound = ({ current }) => {
  const { t } = useTranslation()
  return (
    <>
      <h1>{t(["error.404", "error."])}</h1>
      <p>{current}</p>
    </>
  );
};
