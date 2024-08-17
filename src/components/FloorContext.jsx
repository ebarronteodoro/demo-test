import React, { createContext, useContext, useState } from 'react'

const FloorContext = createContext()

export const ModelProvider = ({ children }) => {
  const [floor, setFloor] = useState('f_4')

  return (
    <FloorContext.Provider value={{ floor, setFloor }}>
      {children}
    </FloorContext.Provider>
  )
}

export const useFloor = () => useContext(FloorContext)
