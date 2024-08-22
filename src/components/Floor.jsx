import React, { useRef } from 'react'
import info from '../data/info.json'
import FloorMesh from './FloorMesh'

const Floor = ({ position, id, language, setApartmentNumber, setRoomQuantity, setFloorNumber, setModel, setIsFloorClicked, setCurrentFloor, setNextFloor, isActive, onClick }) => {
  const meshRef = useRef()

  const apartmentPositions = [
    [-4, -4.6, -2.2]
  ]

  const handleWindowClick = async (apartmentId) => {
    onClick()
    const floorNumber = id
    const apartmentNumber = (id * 100) + apartmentId
    const floorName = info[language].building.floor[floorNumber].name
    const apartmentInfo = info[language].building.floor[floorNumber].apartments[apartmentNumber].name
    const apartmentType = info[language].building.floor[floorNumber].apartments[apartmentNumber].type
    floorNumber !== 0 ? (setFloorNumber(floorName)) : (setFloorNumber('Planta Baja'))
    setApartmentNumber(apartmentInfo)
    setRoomQuantity(apartmentType)
    setCurrentFloor(floorNumber)
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
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {apartmentPositions.map((windowPos, index) => (
        <FloorMesh
          key={index}
          position={windowPos.map((value, i) => value + position[i])}
          onClick={() => handleWindowClick(index + 1)}
          setModel={setModel}
          isActive={isActive}
        />
      ))}

    </group>
  )
}

export default Floor
