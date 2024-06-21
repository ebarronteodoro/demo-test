import React, { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky, useGLTF } from '@react-three/drei'
import RotateDotIcon from '../icons/RotateDotIcon'
import CircleArrowLeftIcon from '../icons/CircleArrowLeftIcon'
import info from '../data/info.json'
import PhoneIcon from '../icons/PhoneIcon'
import CameraControls from './CameraControls'
import Floor from './Floor'

const Model = ({ path }) => {
  const { scene } = useGLTF(path)
  const meshRef = useRef()

  return (
    <>
      <primitive object={scene} ref={meshRef} />
    </>
  )
}

const MainPreview = ({ language, mainHidden, switchToPanorama }) => {
  const modelPath = '/models/modelo_bueno.glb'
  const [view, setView] = useState('side')
  const [transitioning, setTransitioning] = useState(false)
  const [floorNumber, setFloorNumber] = useState('')
  const [apartmentNumber, setApartmentNumber] = useState('')
  const [roomQuantity, setRoomQuantity] = useState('')

  const floorPositions = [
    [0, -4.5, -0.25],
    [0, -1.5, -0.25],
    [0, 1.5, -0.25],
    [0, 4.5, -0.25],
    [0, 7.5, -0.25],
    [0, 10.5, -0.25],
    [0, 13.5, -0.25],
    [0, 16.5, -0.25],
    [0, 19.5, -0.25],
    [0, 22.5, -0.25],
    [0, 25.5, -0.25],
    [0, 28.5, -0.25],
    [0, 31.5, -0.25],
    [0, 34.5, -0.25],
    [0, 37.5, -0.25],
    [0, 40.5, -0.25],
    [0, 43.5, -0.25]
  ]

  const handleTransitionEnd = () => {
    setTransitioning(false)
  }

  useEffect(() => {
    switchView()
  }, [])

  const switchView = () => {
    setTransitioning(true)
    setView(view === 'top' ? 'side' : 'top')
  }

  return (
    <section className={`demo-loaded ${mainHidden ? 'hidden' : ''}`}>
      <header>
        <PhoneIcon width='50' height='50' className='phoneIcon' />
        <div className='info-container'>
          <span>{apartmentNumber}</span>
          <div>
            <span>{floorNumber}</span>
            <span>{roomQuantity}</span>
          </div>
        </div>
      </header>
      <div role='presentation' className='presentation-container'>
        <Canvas>
          <Sky sunPosition={[0, 5, 50]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Model
            path={modelPath}
          />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -9, 0]}>
            <planeGeometry attach='geometry' args={[500, 500]} />
            <meshStandardMaterial attach='material' color='green' />
          </mesh>
          {floorPositions.map((position, index) => (
            <Floor
              key={index}
              position={position}
              id={index}
              language={language}
              setApartmentNumber={setApartmentNumber}
              setRoomQuantity={setRoomQuantity}
              setFloorNumber={setFloorNumber}
            />
          ))}
          <CameraControls
            view={view}
            transitioning={transitioning}
            onTransitionEnd={handleTransitionEnd}
          />
        </Canvas>
      </div>
      <button
        type='button'
        className='backPanoramaButton'
        onClick={switchToPanorama}
      >
        <CircleArrowLeftIcon width='45' height='45' />
      </button>
      <aside className='demo-aside'>
        <button type='button' className='switchViewButton' onClick={switchView}>
          <RotateDotIcon
            width='45'
            height='45'
            className={view === 'side' ? 'active' : ''}
          />
          {info[language].switchViewText}
        </button>
      </aside>
    </section>
  )
}

export default MainPreview
