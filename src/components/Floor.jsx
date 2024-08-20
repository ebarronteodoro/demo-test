import React, { useRef } from 'react'
import info from '../data/info.json'
import Apartment from './Apartment'

const Floor = ({ position, id, language, setApartmentNumber, setRoomQuantity, setFloorNumber, setModel, setIsFloorClicked, setCurrentFloor, currentFloor, setNextFloor }) => {
  const meshRef = useRef()

  const apartmentPositions = [
    [-4, -4.6, -2.2]
    // [4.1, -4.6, -2.2]
  ]

  const handleWindowClick = async (apartmentId) => {
    const floorNumber = id
    const apartmentNumber = (id * 100) + apartmentId
    const floorName = info[language].building.floor[floorNumber].name
    const apartmentInfo = info[language].building.floor[floorNumber].apartments[apartmentNumber].name
    const apartmentType = info[language].building.floor[floorNumber].apartments[apartmentNumber].type
    floorNumber !== 0 ? (setFloorNumber(floorName)) : (setFloorNumber('Planta Baja'))
    setApartmentNumber(apartmentInfo)
    setRoomQuantity(apartmentType)
    setCurrentFloor(floorNumber)
    // if (floorNumber === 6) {
    //   setNextFloor('t_b')
    // } else if (floorNumber === 7) {
    //   setNextFloor('t_c')
    // } else {
    //   setNextFloor('t_a')
    // }
    setNextFloor('f_4')
    setIsFloorClicked(true)
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
      // LÍNEAS COMENTADAS, AVISAR A ESTEBAN
      // id === 0
      //   ? null
      //   : (
        <Apartment
          key={index}
          position={windowPos.map((value, i) => value + position[i])}
          onClick={() => handleWindowClick(index + 1)}
          setModel={setModel}
        />
        // )
      ))}

    </group>
  )
}

export default Floor
