import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MapControls, Sky, useGLTF } from '@react-three/drei'
import info from '../data/info.json'
import { Vector3 } from 'three'
import RotateDotIcon from '../icons/RotateDotIcon'
import CircleArrowLeftIcon from '../icons/CircleArrowLeftIcon'

const Model = ({ path }) => {
  const { scene } = useGLTF(path)
  return <primitive object={scene} />
}

const CameraControls = ({ view, transitioning, onTransitionEnd }) => {
  const controlsRef = useRef()
  const { camera } = useThree()
  const [targetPosition, setTargetPosition] = useState(new Vector3(0, 20, 0))
  const [currentPosition] = useState(new Vector3())

  useEffect(() => {
    if (view === 'top') {
      setTargetPosition(new Vector3(0, 20, 0))
    } else {
      setTargetPosition(new Vector3(10, 10, 10))
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

const MainPreview = ({ language, mainHidden, switchToPanorama }) => {
  const modelPath = '/models/building_model.glb'
  const [view, setView] = useState('side')
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    switchView()
  }, [])

  const switchView = () => {
    setTransitioning(true)
    setView(view === 'top' ? 'side' : 'top')
  }

  const handleTransitionEnd = () => {
    setTransitioning(false)
  }

  return (
    <section className={`demo-loaded ${mainHidden ? 'hidden' : ''}`}>
      <header>
        <span>{info[language].greeting}</span>
      </header>
      <div role='presentation' className='presentation-container'>
        <Canvas>
          <Sky />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <Model path={modelPath} />
          <CameraControls view={view} transitioning={transitioning} onTransitionEnd={handleTransitionEnd} />
        </Canvas>
      </div>
      <button type='button' className='backPanoramaButton' onClick={switchToPanorama}>
        <CircleArrowLeftIcon width='45' height='45' />
      </button>
      <aside className='demo-aside'>
        <button type='button' className='switchViewButton' onClick={switchView}>
          <RotateDotIcon width='45' height='45' className={view === 'side' ? 'active' : ''} />
          {info[language].switchViewText}
        </button>
      </aside>
    </section>
  )
}

export default MainPreview
