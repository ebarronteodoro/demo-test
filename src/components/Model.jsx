import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree, extend } from '@react-three/fiber'
import * as THREE from 'three'

extend({ Raycaster: THREE.Raycaster })

const Model = ({ path, onModelClick, model }) => {
  const { scene } = useGLTF(path)
  const meshRef = useRef()
  const { gl, camera } = useThree()
  const raycaster = new THREE.Raycaster()

  const handleClick = (event) => {
    const mouse = new THREE.Vector2()
    mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1
    mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(scene, true)

    if (intersects.length > 0) {
      onModelClick(intersects[0].object)
    }
  }

  useEffect(() => {
    gl.domElement.addEventListener('click', handleClick)

    return () => {
      gl.domElement.removeEventListener('click', handleClick)
    }
  }, [gl, camera, scene])

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
