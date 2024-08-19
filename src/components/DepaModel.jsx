import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

const DepaModel = ({ path, model }) => {
  const { scene } = useGLTF(path)
  const meshRef = useRef()

  useEffect(() => {
    if (scene) {
      const box = new Box3().setFromObject(scene)
      const center = new Vector3()
      box.getCenter(center)

      // Ajustar la posición del modelo
      scene.position.set(-center.x, 0, -center.z)

      // Si deseas centrar el modelo en el plano Y también
      // scene.position.set(-center.x, -center.y, -center.z);
    }
  }, [scene])

  return (
    model === 'apartment' && (
      <primitive object={scene} ref={meshRef} scale={[1, 1, 1]} />
    // <directionalLight position={[-20, 70, 75]} castShadow color='white' intensidad={1.5} />
    )
  )
}

export default DepaModel
