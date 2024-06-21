import React, { useRef } from 'react'
import info from '../data/info.json'
import Apartment from './Apartment'

const Floor = ({ position, id, language, setApartmentNumber, setRoomQuantity, setFloorNumber }) => {
  const meshRef = useRef()

  const apartmentPositions = [
    [-4.85, 0, 0.05],
    [4.9, 0, 0.05]
  ]

  const handleWindowClick = (apartmentId) => {
    const floorNumber = id
    const apartmentNumber = (id * 100) + apartmentId
    if (floorNumber === 0) {
      console.log('No existen departamentos en el piso 0')
    } else {
      const floorName = info[language].building.floor[floorNumber].name
      const apartmentInfo = info[language].building.floor[floorNumber].apartments[apartmentNumber].name
      const apartmentType = info[language].building.floor[floorNumber].apartments[apartmentNumber].type
      floorNumber !== 0 ? (setFloorNumber(floorName)) : (setFloorNumber('Planta Baja'))
      setApartmentNumber(apartmentInfo)
      setRoomQuantity(apartmentType)
    }
  }

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
      >
        <boxGeometry args={[18, 3, 15]} />
        <meshBasicMaterial color='white' transparent opacity={0} />
      </mesh>
      {apartmentPositions.map((windowPos, index) => (
        id === 0
          ? null
          : (
            <Apartment
              key={index}
              position={windowPos.map((value, i) => value + position[i])}
              onClick={() => handleWindowClick(index + 1)}
            />
            )
      ))}
    </group>
  )
}

export default Floor
