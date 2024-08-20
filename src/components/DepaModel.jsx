import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useThree, extend } from '@react-three/fiber'

extend({ Raycaster: THREE.Raycaster })

const DepaModel = ({ path, onModelClick, model, typo }) => {
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
    model === 'apartment' && (
      <primitive
        object={scene}
        ref={meshRef}
        scale={typo === 'f_4' ? [7, 7, 7] : [1, 1, 1]}
      />
    // <directionalLight position={[-20, 70, 75]} castShadow color='white' intensidad={1.5} />
    )
  )
}

export default DepaModel
