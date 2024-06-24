import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useThree, extend } from '@react-three/fiber'
import { Sky, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import RotateDotIcon from '../icons/RotateDotIcon'
import CircleArrowLeftIcon from '../icons/CircleArrowLeftIcon'
import info from '../data/info.json'
import PhoneIcon from '../icons/PhoneIcon'
import CameraControls from './CameraControls'
import Floor from './Floor'

extend({ Raycaster: THREE.Raycaster })

const Model = ({ path, onModelClick, model }) => {
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
    model === 'building' && (
      <primitive object={scene} ref={meshRef} />
    )
  )
}

const DepaModel = ({ path, onModelClick, model }) => {
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
      <primitive object={scene} ref={meshRef} />
    )
  )
}

const HighlightedEdges = ({ object }) => {
  const edgesGeometry = new THREE.EdgesGeometry(object.geometry)
  const material = new THREE.LineBasicMaterial(object.name === 'Foliage001_16_-_Matte_Plastic_0' ? { color: 0x6AFF5B } : { color: 0xff0000 })
  const lineSegments = new THREE.LineSegments(edgesGeometry, material)

  useEffect(() => {
    object.add(lineSegments)

    return () => {
      object.remove(lineSegments)
    }
  }, [object])

  return null
}

const MainPreview = ({ language, mainHidden, switchToPanorama, model, setModel }) => {
  const modelPath = '/models/modelo_bueno.glb'
  const apartmentPath = '/models/apartments/modelo_depa6.glb'
  const [view, setView] = useState('side')
  const [transitioning, setTransitioning] = useState(false)
  const [floorNumber, setFloorNumber] = useState('')
  const [apartmentNumber, setApartmentNumber] = useState('')
  const [roomQuantity, setRoomQuantity] = useState('')
  const [selectedObject, setSelectedObject] = useState(null)

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

  const handleModelClick = (object) => {
    object.name === 'Foliage001_16_-_Matte_Plastic_0' ? (console.log('Árbol clickeado:', object)) : (console.log('Objeto clickeado:', object))

    setSelectedObject(object)
  }

  useEffect(() => {
    switchView()
  }, [])

  useEffect(() => {
    console.log(model)
  }, [model])

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
          <Model path={modelPath} onModelClick={handleModelClick} model={model} />
          <DepaModel path={apartmentPath} onModelClick={handleModelClick} model={model} />
          {model === 'building' && (
            floorPositions.map((position, index) => (
              <Floor
                key={index}
                position={position}
                id={index}
                language={language}
                setApartmentNumber={setApartmentNumber}
                setRoomQuantity={setRoomQuantity}
                setFloorNumber={setFloorNumber}
                setModel={setModel}
              />
            )),
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -9, 0]}>
                <planeGeometry attach='geometry' args={[500, 500]} />
                <meshStandardMaterial attach='material' color='green' />
              </mesh>
          )}
          <CameraControls view={view} transitioning={transitioning} onTransitionEnd={handleTransitionEnd} />
          {selectedObject && <HighlightedEdges object={selectedObject} />}
        </Canvas>
      </div>
      <button
        type='button'
        className='backPanoramaButton'
        onClick={() => {
          setModel('building')
          switchToPanorama()
        }}
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
