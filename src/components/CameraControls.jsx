import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MapControls } from '@react-three/drei'
import { Vector3 } from 'three'

const CameraControls = ({ view, transitioning, onTransitionEnd }) => {
  const { camera, gl } = useThree()
  const targetPosition = useRef(new Vector3(0, 125, 0))
  const currentPosition = useRef(new Vector3().copy(camera.position))
  const [controlsType, setControlsType] = useState(view === 'top' ? MapControls : OrbitControls)
  const [minZoom, setMinZoom] = useState(70)
  const [maxZoom, setMaxZoom] = useState(125)
  const Controls = controlsType

  useEffect(() => {
    if (view === 'top') {
      targetPosition.current.set(0, 125, 0)
      setMinZoom(70)
      setMaxZoom(125)
      setControlsType(MapControls)
    } else {
      targetPosition.current.set(0, 20, 40)
      setMinZoom(20)
      setMaxZoom(40)
      setControlsType(OrbitControls)
    }
  }, [view])

  useFrame(() => {
    if (transitioning) {
      currentPosition.current.lerp(targetPosition.current, 0.1)
      camera.position.copy(currentPosition.current)
      camera.lookAt(0, 0, 0)
      if (currentPosition.current.distanceTo(targetPosition.current) < 0.1) {
        onTransitionEnd()
      }
    }
  })

  return <Controls args={[camera, gl.domElement]} minDistance={minZoom} maxDistance={maxZoom} target={[0, 0, 0]} />
}

export default CameraControls
