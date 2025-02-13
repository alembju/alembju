import React from 'react'
import { createContext } from 'react'

export const userContext = createContext()

const ContextProvider = ({Children}) =>{
    const role = 'Admin';
    const authenticated =true;
  return (
    <userContext.Provider value={{role, authenticated}}>
        {Children}
        </userContext.Provider>
  )
}

export default ContextProvider