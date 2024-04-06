/**
 * src/components/Languages.jsx
 */


import React, { useContext } from 'react'
import { L10NContext } from '../contexts'

const REGEX = /lang-([^\s]+)/


export const Languages = (props) => {
  const {
    languages,
    language,
    changeLanguage
  } = useContext(L10NContext)

  // console.log("languages:", languages)
  // {
  //   "en": {
  //     "name": "English",
  //     "flag": "/flags/en-GB.png"
  //   },
  //   "fr": {
  //     "name": "Français",
  //     "flag": "/flags/fr.png"
  //   }
  // }

  const chooseLanguage = ({ target }) => {
    target = target.closest(`[class|=lang]`)
    const className = target.className
    const match = REGEX.exec(className)
    if (match) {
      const language = match[1]
    
      if (languages[language]) {        
        changeLanguage(language)
      }
    }
  }

  const list = Object.entries(languages).map(([ code, data ]) => {
    const { name, flag } = data    
    const className = code === language ? "current" : ""
    return (
      <li
        key={code}
        className={`lang-${code}`}
      >
        <img
          src={flag}
          alt={name}
          title={name}
          className={className}
        />
      </li>
    )
  })
  
  return (
    <ul
      onClick={chooseLanguage}
    >
      {list}
    </ul>
  )
}