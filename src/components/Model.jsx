import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Model = ({ path, model }) => {
  const { scene } = useGLTF(path)
  const meshRef = useRef()

  return (
    model === 'building' && (
      <>
        <primitive object={scene} ref={meshRef} position={[0, -8, 0]} scale={[3, 3, 3]} metalness={0.5} roughness={0.1} />
        <directionalLight position={[-20, 30, 45]} castShadow color='white' intensity={2.5} />
      </>
    )
  )
}

export default Model
