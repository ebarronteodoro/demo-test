import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MapControls } from '@react-three/drei'
import { Vector3 } from 'three'

const CameraControls = ({ view, transitioning, onTransitionEnd }) => {
  const { camera, gl } = useThree()
  const targetPosition = useRef(new Vector3(0, 125, 0))
  const currentPosition = useRef(new Vector3().copy(camera.position))
  const [controlsType, setControlsType] = useState(
    view === 'top' ? MapControls : OrbitControls
  )
  const [minZoom, setMinZoom] = useState(70)
  const [maxZoom, setMaxZoom] = useState(110)
  const Controls = controlsType

  const updateZoomLevels = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    if (view === 'top') {
      setMinZoom(width / 15)
      setMaxZoom(width / 10)
    } else {
      setMinZoom(height / 20)
      setMaxZoom(height / 8)
    }
  }

  useEffect(() => {
    updateZoomLevels()
    window.addEventListener('resize', updateZoomLevels)
    return () => window.removeEventListener('resize', updateZoomLevels)
  }, [view])

  useEffect(() => {
    if (view === 'top') {
      targetPosition.current.set(0, 110, 0)
      setControlsType(MapControls)
    } else {
      targetPosition.current.set(0, 20, 40)
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

  const controlProps = {
    args: [camera, gl.domElement],
    minDistance: minZoom,
    maxDistance: maxZoom,
    target: [0, 0, 0]
  }

  if (controlsType === OrbitControls) {
    controlProps.minPolarAngle = Math.PI / 4
    controlProps.maxPolarAngle = Math.PI / 2
  }

  return <Controls {...controlProps} />
}

export default CameraControls
