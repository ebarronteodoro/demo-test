import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MapControls } from '@react-three/drei'
import { Vector3, MOUSE } from 'three' // Importa MOUSE desde three

const CameraControls = ({ view, transitioning, onTransitionEnd }) => {
  const { camera, gl } = useThree()
  const targetPosition = useRef(new Vector3(0, 125, 0))
  const currentPosition = useRef(new Vector3().copy(camera.position))
  const [controlsType, setControlsType] = useState(
    view === 'side' ? OrbitControls : MapControls
  )

  function detectDeviceType (width) {
    const mobileBreakpoint = 768

    if (width <= mobileBreakpoint) {
      return 'mobile'
    } else {
      return 'desktop'
    }
  }

  const width = window.innerWidth
  const height = window.innerHeight
  const sumDimensions = width + height
  console.log(`El width es: ${width} y el height es: ${height} y mi ratio es de: ${width + height}`)
  const [minZoom, setMinZoom] = useState(sumDimensions / 13)
  const [maxZoom, setMaxZoom] = useState(sumDimensions / 10)
  const deviceType = detectDeviceType(width, height)
  const Controls = controlsType

  const updateZoomLevels = () => {
    if (controlsType === MapControls) {
      if (deviceType === 'desktop') {
        console.log('a')
        setMinZoom(sumDimensions / 25)
        setMaxZoom(sumDimensions / 17)
      } else {
        console.log('b')
        setMinZoom(sumDimensions / 15)
        setMaxZoom(sumDimensions / 12)
      }
    } else {
      setMinZoom(sumDimensions / 35)
      setMaxZoom(sumDimensions / 27)
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
    target: [0, 0, 0],
    screenSpacePanning: false,
    mouseButtons: {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: null
    }
  }

  if (controlsType === OrbitControls) {
    controlProps.minPolarAngle = Math.PI / 4
    controlProps.maxPolarAngle = Math.PI / 2
  }

  return <Controls {...controlProps} />
}

export default CameraControls
