/**
 * data/l10n.js
 * 
 * Run node data/createTranslationJSONFiles.js to convert the translation strings in
 * allTranslations.json to separate JSON files stored at...
 * 
 *   frontend/public/locales/<code>/translation.json
 * 
 * ... where <code> is the ISO 639 language code for each language
 */


const fs = require('fs')
const { join } = require('path')
const __cwd = process.cwd()

// Define where the files will be saved, and what they will be
// called
const HARD_CODED = {
  folder: join(__cwd, "frontend", "public", "locales"),
  fileName: "translation.json",
  languages: "languages.json"
}

const { translation, flags } = require('./allTranslations.json')

// Assume all entries in translation and flags contain the
// same code keys
const entries = Object.entries(translation)
// console.log("entries:", entries);
// [
//   [ '__endonym__', { en: 'English', fr: 'Français' } ],
//   [ 'home', { 'en': 'Home', fr: 'Accueil' } ],
//   ...
// ]
const codes = Object.keys(entries[0][1])
// console.log("codes:", codes);
// [ 'en-gb', 'fr' ]

// Create an empty dictionary object for each of the codes
const dictionaries = codes.reduce(( dictionaries, code ) => {
  dictionaries[code] = {}
  return dictionaries
}, {})
// console.log("dictionaries:", dictionaries);
// { 'en': {}, fr: {} }

// Fill each dictionary with the key-value pairs for each entry
entries.forEach(([ key, versions ]) => {
  const translations = Object.entries(versions)
  translations.forEach(([ code, translation ]) => {
    dictionaries[code][key] = translation
  })
})
// console.log("dictionaries:", dictionaries);
// dictionaries: {
//   "en": {
//     "__endonym__": "English",
//     "home": "Home",
//     "away": "Away",
//     "error": {
//       "404": "404 Not Found",
//       "": "Something went wrong"
//     }
//   }, ...
// }

const jsonData = Object.entries(dictionaries)
// console.log("jsonData:", JSON.stringify(jsonData, null, "  "));
// [
//   [
//     "en",
//     {
//       "__endonym__": "English",
//       "home": "Home",
//       ...
//     }
//   ],...
// ]

// For each dictionary entry, create a JSON file at the chosen
// location. At the same time, create a map of endonyms and 
// flag urls in a languages object.
const languages = {}

jsonData.forEach(([ code, data ]) => {
  // Ensure that the parent folder for the file already exists
  const folder = join(HARD_CODED.folder, code)
  // console.log("folder:", folder);
  // /.../i18n/frontend/public/locales/en
  
  if (!fs.existsSync(folder)){
    fs.mkdirSync(folder, { recursive: true })
  }

  const filePath = join(folder, HARD_CODED.fileName)
  // console.log("filePath:", filePath);
  // /.../i18n/frontend/public/locales/en/translation.json
  
  const json = JSON.stringify(data, null, "  ")
  fs.writeFileSync(filePath, json)

  // Gather endonym and flag data
  languages[code] = {
    name: data.__endonym__,
    flag: flags[code]
  }
})

// Create a JSON file that maps ISO 639 codes to endonyms and
// flag images
const filePath = join(HARD_CODED.folder, HARD_CODED.languages)
const json = JSON.stringify(languages, null, "  ")
fs.writeFileSync(filePath, json)