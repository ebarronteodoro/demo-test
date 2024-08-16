import React, { createContext, useContext, useState } from 'react'

const ModelContext = createContext()

export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState('building')

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  )
}

export const useModel = () => useContext(ModelContext)
