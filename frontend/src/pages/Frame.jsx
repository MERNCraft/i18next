/**
 * src/pages/Home.jsx
 */


import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { L10NContext } from '../contexts'
import {
  Throbber,
  LoadFailed,
  NavBar
} from '../components'

export const Frame = () => {
  const { languages } = useContext(L10NContext)

  if (!languages) {
    return <Throbber />

  } else if (languages instanceof Error) {
    return <LoadFailed />
  }

  return (
    <>
      <NavBar />
      <Outlet />      
    </>
  )
}