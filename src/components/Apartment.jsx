import React, { useRef, useState } from 'react'

const Apartment = ({ position, onClick }) => {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef()

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    setHovered(false)
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <mesh
      position={position}
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry args={[7.4, 3, 38]} />
      <meshBasicMaterial color={hovered ? 'red' : 'transparent'} transparent opacity={hovered ? 0.5 : 0} />
    </mesh>
  )
}

export default Apartment
