import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MapControls } from '@react-three/drei'
import { Vector3 } from 'three'

const CameraControls = ({ view, transitioning, onTransitionEnd }) => {
  const controlsRef = useRef()
  const { camera } = useThree()
  const [targetPosition, setTargetPosition] = useState(new Vector3(0, 20, 0))
  const [currentPosition] = useState(new Vector3())

  useEffect(() => {
    if (view === 'top') {
      setTargetPosition(new Vector3(0, 125, 0))
    } else {
      setTargetPosition(new Vector3(10, 10, 30))
    }
  }, [view])

  useFrame(() => {
    if (transitioning) {
      currentPosition.lerp(targetPosition, 0.1)
      camera.position.copy(currentPosition)
      camera.lookAt(0, 0, 0)
      if (controlsRef.current) {
        controlsRef.current.update()
      }
      if (currentPosition.distanceTo(targetPosition) < 0.1) {
        onTransitionEnd()
      }
    }
  })

  return view === 'top'
    ? (
      <MapControls ref={controlsRef} target={[0, 0, 0]} />
      )
    : (
      <OrbitControls ref={controlsRef} target={[0, 0, 0]} />
      )
}

export default CameraControls
