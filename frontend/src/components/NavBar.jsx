/**
 * src/components/NavBar.jsx
 */


import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { Languages } from './Languages'


export const NavBar = () => {
  const { t } = useTranslation()

  return (
    <nav>
      <ul>
        <li id="flags"><Languages /></li>
        <li ><Link to="/">{t('home')}</Link></li>
        <li ><Link to="/away">{t('away')}</Link></li>
      </ul>
    </nav>
  );
};
