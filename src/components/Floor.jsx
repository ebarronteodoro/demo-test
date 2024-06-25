import React, { useRef } from 'react'
import info from '../data/info.json'
import Apartment from './Apartment'

const Floor = ({ position, id, language, setApartmentNumber, setRoomQuantity, setFloorNumber, setModel, isTransitioning, setIsTransitioning }) => {
  const meshRef = useRef()

  const apartmentPositions = [
    [-4.85, 0, 0.05],
    [4.9, 0, 0.05]
  ]

  const oscurecerPantalla = () => {
    return new Promise((resolve) => {
      setIsTransitioning(true)
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  const aclararPantalla = () => {
    return new Promise((resolve) => {
      setIsTransitioning(false)
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  const handleWindowClick = async (apartmentId) => {
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
      await oscurecerPantalla()
      setTimeout(async () => {
        setModel('apartment')
        await aclararPantalla()
      }, 1000)
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
              setModel={setModel}
            />
            )
      ))}

    </group>
  )
}

export default Floor
