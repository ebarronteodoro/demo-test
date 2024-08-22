import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import Model from './Model'
import DepaModel from './DepaModel'
import Floor from './Floor'
import CameraControls from './CameraControls'
import ApartmentCameraController from './ApartmentCameraController'
import RotateDotIcon from '../icons/RotateDotIcon'
import CircleArrowLeftIcon from '../icons/CircleArrowLeftIcon'
import info from '../data/info.json'
import PhoneIcon from '../icons/PhoneIcon'
import EyeIcon from '../icons/EyeIcon'
import DoorIcon from '../icons/DoorIcon'
import { useModel } from '../hooks/ModelContext'
import EyeUpIcon from '../icons/EyeUpIcon'
import HighlightedEdges from './HighlightedEdges'
import * as THREE from 'three'

const CanvasWrapper = ({ setActiveMesh }) => {
  const raycasterRef = useRef(new THREE.Raycaster())
  const { scene, camera, gl } = useThree()

  useEffect(() => {
    const handleCanvasClick = (event) => {
      const raycaster = raycasterRef.current
      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)

      const intersects = raycaster.intersectObjects(scene.children)

      if (intersects.length === 1) {
        setActiveMesh(null)
      }
    }

    gl.domElement.addEventListener('pointerdown', handleCanvasClick)

    return () => {
      gl.domElement.removeEventListener('pointerdown', handleCanvasClick)
    }
  }, [camera, gl, scene, setActiveMesh])

  return null
}

const MainPreview = ({ language, mainHidden, switchToPanorama, model, setModel }) => {
  const modelPath = '/models/Edificio optimizado.glb'
  const { typo, setTypo } = useModel()
  const modeloPath = {
    t_a: '/models/typologies/TIPO-A.glb',
    t_b: '/models/typologies/TIPO-B.glb',
    t_c: '/models/typologies/TIPO-C.glb',
    t_d: '/models/typologies/TIPO-D.glb',
    t_f: '/models/typologies/TIPO-F.glb',
    f_4: '/models/floors/modelo_piso_4.glb',
    f_5: '/'
  }[typo]
  const [activeMesh, setActiveMesh] = useState(null)
  const [view, setView] = useState('side')
  const [isWire, setIsWire] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const [isFloorClicked, setIsFloorClicked] = useState(false)
  const [isTypoClicked, setIsTypoClicked] = useState(false)
  const [floorNumber, setFloorNumber] = useState('')
  const [currentFloor, setCurrentFloor] = useState(null)
  const [nextFloor, setNextFloor] = useState(null)
  const [apartmentNumber, setApartmentNumber] = useState('')
  const [roomQuantity, setRoomQuantity] = useState('')
  const [selectedObject, setSelectedObject] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [shouldHighlight, setShouldHighlight] = useState(true)
  const [playAnimation, setPlayAnimation] = useState(false)
  const [reverseAnimation, setReverseAnimation] = useState(false)

  const handlePlayAnimation = () => {
    setReverseAnimation(false)
    setPlayAnimation(true)
  }

  const handleReverseAnimation = () => {
    setPlayAnimation(false)
    setReverseAnimation(true)
  }

  const oscurecerPantalla = () => {
    return new Promise((resolve) => {
      setIsTransitioning(true)
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  const aclararPantalla = () => {
    return new Promise((resolve) => {
      setIsTransitioning(false)
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  const switchToBuilding = async () => {
    await oscurecerPantalla()
    setTimeout(async () => {
      setApartmentNumber('')
      setRoomQuantity('')
      setFloorNumber('')
      setCurrentFloor(null)
      setModel('building')
      setTransitioning(true)
      setView('top')
    }, 1000)
    setTimeout(async () => {
      await aclararPantalla()
      setIsFloorClicked(false)
    }, 1500)
  }

  const floorPositions = [
    [6.5, 5, 6.25],
    [6.5, 7.45, 6.25],
    [6.5, 9.9, 6.25],
    [6.5, 12.35, 6.25],
    [6.5, 14.8, 6.25],
    [6.5, 17.25, 6.25],
    [6.5, 19.7, 6.25],
    [6.5, 22.15, 6.25],
    [6.5, 24.6, 6.25],
    [6.5, 27.05, 6.25],
    [6.5, 29.5, 6.25],
    [6.5, 31.95, 6.25],
    [6.5, 34.4, 6.25],
    [6.5, 36.85, 6.25],
    [6.5, 39.3, 6.25],
    [6.5, 41.75, 6.25],
    [6.5, 44.2, 6.25],
    [6.5, 46.65, 6.25]
  ]

  const handleTransitionEnd = () => {
    setTransitioning(false)
  }

  const handleZoomComplete = () => {
    setIsTransitioning(false)
  }

  const handleModelClick = (object) => {
    console.log(object)
    setSelectedObject(object)
  }

  useEffect(() => {
    switchView()
  }, [])

  const switchView = () => {
    setTransitioning(true)
    setView(view === 'top' ? 'side' : 'top')
  }

  useEffect(() => {
    console.log(nextFloor)
    console.log(isTypoClicked)
    console.log(typo)
  }, [typo])

  const viewFloor = () => {
    oscurecerPantalla()
    setNextFloor('f_4')
    setTimeout(async () => {
      setModel('apartment')
      setShouldHighlight(true)
      setTypo(nextFloor)
    }, 1000)
    setTimeout(async () => {
      aclararPantalla()
      setActiveMesh(null)
    }, 1500)
  }

  const viewTypo = () => {
    oscurecerPantalla()
    setTimeout(async () => {
      setSelectedObject(null)
      setModel('typologie')
      setShouldHighlight(false)
      setTypo(nextFloor)
    }, 1000)
    setTimeout(async () => {
      aclararPantalla()
      setNextFloor('f_4')
      isTypoClicked(false)
    }, 1500)
  }

  const handleMeshClick = (index) => {
    setActiveMesh(index)
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
          <Sky sunPosition={[0, 5, -50]} turbidity={10} rayleigh={1} />
          <ambientLight intensity={0.1} />
          <hemisphereLight intensity={0.2} />
          <Model path={modelPath} model={model} />
          <DepaModel
            path={modeloPath}
            onModelClick={handleModelClick}
            model={model}
            playAnimation={playAnimation}
            reverseAnimation={reverseAnimation}
            setIsWire={setIsWire}
            typo={typo}
            setIsTypoClicked={setIsTypoClicked}
          />
          {model === 'building' && (
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -9, 0]}>
              <planeGeometry attach='geometry' args={[10000, 10000]} />
              <meshStandardMaterial attach='material' color='#464646' metalness={0.1} roughness={0.01} />
            </mesh>
          )}
          <CanvasWrapper setActiveMesh={setActiveMesh} />
          {model === 'building' &&
            floorPositions.map((position, index) => (
              <Floor
                key={index + 3}
                position={position}
                id={index + 3}
                language={language}
                setApartmentNumber={setApartmentNumber}
                setRoomQuantity={setRoomQuantity}
                setFloorNumber={setFloorNumber}
                setModel={setModel}
                setIsFloorClicked={setIsFloorClicked}
                setCurrentFloor={setCurrentFloor}
                currentFloor={currentFloor}
                setNextFloor={setNextFloor}
                isActive={index === activeMesh}
                onClick={() => handleMeshClick(index)}
              />
            ))}
          {model === 'building'
            ? (
              <CameraControls view={view} transitioning={transitioning} onTransitionEnd={handleTransitionEnd} />
              )
            : (
              <ApartmentCameraController
                view={view}
                transitioning={transitioning}
                onTransitionEnd={handleTransitionEnd}
                onZoomComplete={handleZoomComplete}
              />
              )}
          {selectedObject && model === 'apartment' && <HighlightedEdges object={selectedObject} setNextFloor={setNextFloor} setIsTypoClicked={setIsTypoClicked} shouldHighlight={shouldHighlight} />}
        </Canvas>
      </div>

      <aside className='demo-aside'>
        <button
          type='button'
          className='backPanoramaButton'
          onClick={() => {
            if (model === 'building') {
              switchToPanorama()
            } else if (model === 'apartment') {
              switchToBuilding()
            } else if (model === 'typologie') {
              if (isWire === false) {
                handleReverseAnimation()
              } else {
                viewFloor()
              }
            }
          }}
        >
          <CircleArrowLeftIcon width='45' height='45' />
        </button>
        {model === 'building' && (
          <button type='button' className='switchViewButton' onClick={switchView}>
            <RotateDotIcon width='45' height='45' className={view === 'side' ? 'active' : ''} />
            {info[language].switchViewText}
          </button>
        )}
        {model === 'building' && (
          <button type='button' className='viewFloorButton' onClick={viewFloor} disabled={isFloorClicked !== true}>
            <EyeIcon width='45' height='45' />
            Ver piso
          </button>
        )}
        {model === 'apartment' && (
          <button type='button' className='viewTypoButton' onClick={viewTypo} disabled={isTypoClicked !== true}>
            <DoorIcon width='45' height='45' />
            Ver Tipología
          </button>
        )}
        {model === 'typologie' && (
          <button type='button' className='switchTypoView' onClick={handlePlayAnimation} disabled={isWire === false}>
            <EyeUpIcon width='45' height='45' />
          </button>
        )}
      </aside>
      <div id='overlay' className={isTransitioning ? 'active' : null} />
    </section>
  )
}

export default MainPreview
