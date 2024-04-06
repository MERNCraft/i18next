/**
 * src/contexts/index.jsx
 */


import React, { createContext } from 'react'
import {
  L10NContext,
  L10NProvider
} from './L10NContext'


const Context = createContext()


const Provider = ({ children }) => {
  return (
    <Context.Provider
      value={{ }}
    >
      <L10NProvider>
        {children}
      </L10NProvider>
    </Context.Provider>
  )
}


export {
  Provider,
  Context,
  L10NContext
}