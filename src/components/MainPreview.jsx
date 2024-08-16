import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useThree, extend } from '@react-three/fiber'
import { Sky, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import RotateDotIcon from '../icons/RotateDotIcon'
import CircleArrowLeftIcon from '../icons/CircleArrowLeftIcon'
import info from '../data/info.json'
import PhoneIcon from '../icons/PhoneIcon'
import CameraControls from './CameraControls'
import ApartmentCameraController from './ApartmentCameraController'
import Floor from './Floor'
import { useModel } from './ModelContext'

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
      <><primitive object={scene} ref={meshRef} position={[0, -8, 0]} scale={[3, 3, 3]} metalness={0.5} roughness={0.1} /><directionalLight position={[-20, 30, 45]} castShadow color='white' intensity={2.5} /></>
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
      <primitive object={scene} ref={meshRef} scale={[1, 1, 1]} />
    )
  )
}

const HighlightedEdges = ({ object }) => {
  const material = new THREE.MeshBasicMaterial({
    color: object.id === 106 ? 0x6AFF5B : 0x011F4B,
    transparent: true,
    opacity: 0.3
  })

  const highlightedObject = new THREE.Mesh(object.geometry.clone(), material)

  useEffect(() => {
    object.id !== 932 && object.add(highlightedObject)
    return () => {
      object.remove(highlightedObject)
    }
  }, [object])

  return null
}

const MainPreview = ({ language, mainHidden, switchToPanorama, model, setModel }) => {
  const modelPath = '/models/edificioterminado.glb'
  // const { typo, setTypo } = useModel()
  // const typoPath = {
  //   apartment_1: '/src/models/apartments/model_apartment_1.glb',
  //   apartment_2: '/src/models/apartments/model_apartment_2.glb',
  //   building: '/src/models/building/model_building.glb'
  // }[typo]
  const [apartmentPath, setApartmentPath] = useState('/models/apartments/PRUEBA 208 .glb')
  const [view, setView] = useState('side')
  const [transitioning, setTransitioning] = useState(false)
  const [floorNumber, setFloorNumber] = useState('')
  const [apartmentNumber, setApartmentNumber] = useState('')
  const [roomQuantity, setRoomQuantity] = useState('')
  const [selectedObject, setSelectedObject] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

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
      setModel('building')
      setTransitioning(true)
      setView('top')
    }, 1000)
    setTimeout(async () => {
      await aclararPantalla()
    }, 1500)
  }

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
    [0, 43.5, -0.25],
    [0, 46.5, -0.25],
    [0, 49.5, -0.25],
    [0, 52.5, -0.25],
    [0, 55.5, -0.25]
  ]

  const handleTransitionEnd = () => {
    setTransitioning(false)
  }

  const handleZoomComplete = () => {
    setIsTransitioning(false)
  }

  const handleModelClick = (object) => {
    // object.name === 'Foliage001_16_-_Matte_Plastic_0' ? console.log('Árbol clickeado:', object) : console.log('Objeto clickeado:', object)

    // let parentGroup = object

    // // Traverse up to find the top-most parent group
    // while (parentGroup.parent && parentGroup.parent.type !== 'Scene') {
    //   parentGroup = parentGroup.parent
    // }

    // console.log('Grupo clickeado:', parentGroup.children[0].children[0])

    // setSelectedObject(object)
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
          <Sky sunPosition={[0, 5, -50]} turbidity={10} rayleigh={1} />
          <ambientLight intensity={0.1} />
          <hemisphereLight intensity={0.2} />
          <Model path={modelPath} onModelClick={handleModelClick} model={model} />
          <DepaModel path={apartmentPath} onModelClick={handleModelClick} model={model} />
          {model === 'building' && (
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -9, 0]}>
              <planeGeometry attach='geometry' args={[10000, 10000]} />
              <meshStandardMaterial attach='material' color='#464646' metalness={0.1} roughness={0.01} />
            </mesh>
          )}
          {/* {model === 'building' &&
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
                oscurecerPantalla={oscurecerPantalla}
                aclararPantalla={aclararPantalla}
                setApartmentPath={setApartmentPath}
              />
            ))} */}
          {model === 'building' ? <CameraControls view={view} transitioning={transitioning} onTransitionEnd={handleTransitionEnd} /> : <ApartmentCameraController view={view} transitioning={transitioning} onTransitionEnd={handleTransitionEnd} onZoomComplete={handleZoomComplete} />}
          {/* {selectedObject && <HighlightedEdges object={selectedObject} />} */}
        </Canvas>
      </div>

      <aside className='demo-aside'>
        <button
          type='button'
          className='backPanoramaButton'
          onClick={() => {
            model === 'apartment' ? switchToBuilding() : switchToPanorama()
          }}
        >
          <CircleArrowLeftIcon width='45' height='45' />
        </button>
        {model === 'building' && (
          <button type='button' className='switchViewButton' onClick={switchView}>
            <RotateDotIcon
              width='45'
              height='45'
              className={view === 'side' ? 'active' : ''}
            />
            {info[language].switchViewText}
          </button>
        )}
      </aside>
      <div id='overlay' className={isTransitioning ? 'active' : null} />
    </section>
  )
}

export default MainPreview
