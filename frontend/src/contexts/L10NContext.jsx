/**
 * src/contexts/L10NContext.jsx
 *
 * Preloads images for supported languages
 * Manages i18n and change of language
 * 
 * - `languages` is a map of ISO 639 language codes, giving the
 *   native name for each language and a representative flag
 *   {
 *     "en": {
 *       "name": "English",
 *       "flag": "/flags/en-GB.png"
 *     },
 *     "fr": {
 *       "name": "Français",
 *       "flag": "/flags/fr.png"
 *     }
 *   }
 *   It is used by src/components/Languages.jsx to display a
 *   language chooser
 * 
 * - `language` is the ISO 639 code for the current language.
 *    It is used by src/components/Languages.jsx to dim the
 *    flags of the other languages.
*/

import React, { createContext, useState, useEffect } from 'react'
import i18n from './i18n'

const URL = "/locales/languages.json"



export const L10NContext = createContext()



export const L10NProvider = ({ children }) => {
  const [ languages, setLanguages ] = useState()
  const [ language, setLanguage ] = useState(
    navigator.language
  )  


  const changeLanguage = language => {    
    i18n.changeLanguage(language)
    setLanguage(language)
  }


  useEffect(() => {
    const callback = (error, languages) => {
      if (error) {
        return setLanguages(error)
      }

      setLanguages(languages)

      if (!languages[language]) {
        // language may be "co-DE". Try "co"
        const lang = language.replace(/-.+/, "")
        if (languages[lang]) {
          changeLanguage(lang)
        } else {
          // "co" wasn't found either. Use defaulte
          changeLanguage(Object.keys(languages)[0])
        }
      }
    }
    fetchLanguages(callback)
  }, [])


  return (
    <L10NContext.Provider
      value ={{
        languages,
        language,
        changeLanguage
      }}
    >
      {children}
    </L10NContext.Provider>
  )
}


function fetchLanguages(callback) {
  fetch(URL)
  .then(response => response.json())
  .then(json => callback(null, json) )
  .catch(callback)
}