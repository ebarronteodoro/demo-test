import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MapControls } from '@react-three/drei'
import { Vector3, TOUCH, MOUSE } from 'three'

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
  const [minZoom, setMinZoom] = useState(sumDimensions / 13)
  const [maxZoom, setMaxZoom] = useState(sumDimensions / 10)
  const deviceType = detectDeviceType(width, height)
  const Controls = controlsType

  const updateZoomLevels = () => {
    if (controlsType === MapControls) {
      if (deviceType === 'desktop') {
        setMinZoom(sumDimensions / 25)
        setMaxZoom(sumDimensions / 17)
      } else {
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
      // COMENTÉ ESTA LÍNEA Y COPIÉ LA DE ABAJO PARA QUE FUNCIONE @@CAMBIO
      // targetPosition.current.set(-0.9, sumDimensions / 29, 0)
      // setControlsType(MapControls)
      targetPosition.current.set(-60, sumDimensions / 30, sumDimensions / 32)
      setControlsType(OrbitControls)
    } else {
      targetPosition.current.set(-60, sumDimensions / 30, sumDimensions / 32)
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
    enablePan: false,
    mouseButtons: {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: null
    },
    touches: {
      ONE: TOUCH.ROTATE,
      TWO: TOUCH.DOLLY
    }
  }

  if (controlsType === OrbitControls) {
    controlProps.minPolarAngle = Math.PI / 4
    controlProps.maxPolarAngle = Math.PI / 2.5
  }

  return <Controls {...controlProps} />
}

export default CameraControls
