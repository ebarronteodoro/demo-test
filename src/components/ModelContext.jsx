import React, { createContext, useContext, useState } from 'react'

const ModelContext = createContext()

export const ModelProvider = ({ children }) => {
  const [typo, setTypo] = useState('t_a')

  return (
    <ModelContext.Provider value={{ typo, setTypo }}>
      {children}
    </ModelContext.Provider>
  )
}

export const useModel = () => useContext(ModelContext)
