import React, { useRef } from 'react'
import info from '../data/info.json'
import Apartment from './Apartment'

const Floor = ({ position, id, language, setApartmentNumber, setRoomQuantity, setFloorNumber, setModel, oscurecerPantalla, aclararPantalla, setApartmentPath }) => {
  const meshRef = useRef()

  const apartmentPositions = [
    [-4, -4.6, -2.2],
    [4.1, -4.6, -2.2]
  ]

  const handleWindowClick = async (apartmentId) => {
    const floorNumber = id
    const apartmentNumber = (id * 100) + apartmentId
    if (floorNumber === 0) {
      console.log('No existen departamentos en el piso 0')
    } else {
      const floorName = info[language].building.floor[floorNumber].name
      const apartmentInfo = info[language].building.floor[floorNumber].apartments[apartmentNumber].name
      const apartmentType = info[language].building.floor[floorNumber].apartments[apartmentNumber].type
      const modelPath = info[language].building.floor[floorNumber].apartments[apartmentNumber].apartment_path
      floorNumber !== 0 ? (setFloorNumber(floorName)) : (setFloorNumber('Planta Baja'))
      setApartmentNumber(apartmentInfo)
      setRoomQuantity(apartmentType)
      await oscurecerPantalla()
      setTimeout(async () => {
        // setApartmentPath(modelPath)
        setModel('apartment')
      }, 1000)
      setTimeout(async () => {
        await aclararPantalla()
      }, 1500)
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
