import React, { useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'

const ApartmentCameraController = ({ onZoomComplete }) => {
  const { camera, gl } = useThree()
  const [controlsEnabled, setControlsEnabled] = useState(false)

  useEffect(() => {
    camera.position.set(0, 0, 10)
    camera.updateProjectionMatrix()

    const targetPosition = new THREE.Vector3(0, 180, 0)
    const tween = new TWEEN.Tween(camera.position)
      .to(targetPosition, 1500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        camera.lookAt(new THREE.Vector3(0, 0, 0))
      })
      .onComplete(() => {
        onZoomComplete()
        setControlsEnabled(true)
      })
      .start()

    return () => {
      tween.stop()
    }
  }, [])

  useFrame(() => {
    TWEEN.update()
  })

  return controlsEnabled
    ? (
      <OrbitControls
        args={[camera, gl.domElement]}
        minDistance={170}
        maxDistance={200}
        maxPolarAngle={Math.PI / 2.5}
      />
      )
    : null
}

export default ApartmentCameraController
