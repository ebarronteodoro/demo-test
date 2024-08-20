import React, { createContext, useContext, useState } from 'react'

const ModelContext = createContext()

export const ModelProvider = ({ children }) => {
  const [typo, setTypo] = useState('f_4')

  return (
    <ModelContext.Provider value={{ typo, setTypo }}>
      {children}
    </ModelContext.Provider>
  )
}

export const useModel = () => useContext(ModelContext)
