import React, { useRef } from 'react'

const Apartment = ({ position, onClick, isActive }) => {
  const color = isActive ? 'blue' : null
  const meshRef = useRef()

  const handleClick = (e) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <mesh
      position={position}
      ref={meshRef}
      onClick={handleClick}
    >
      {/* CONTROLA LA FORMA DEL CUBO */}
      <boxGeometry args={[31.6, 2.4, 15.5]} />
      <meshBasicMaterial color={color} transparent opacity={isActive ? 0.5 : 0} />
    </mesh>
  )
}

export default Apartment
