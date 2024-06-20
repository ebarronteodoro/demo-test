import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, MapControls, Sky, useGLTF } from '@react-three/drei'
import { Vector3, Raycaster, Vector2, Box3 } from 'three'
import RotateDotIcon from '../icons/RotateDotIcon'
import CircleArrowLeftIcon from '../icons/CircleArrowLeftIcon'
import info from '../data/info.json'
import PhoneIcon from '../icons/PhoneIcon'

const Model = ({
  path,
  onModelClick,
  areas,
  language,
  setFloorNumber,
  setApartmentNumber,
  setRoomQuantity
}) => {
  const { scene } = useGLTF(path)
  const meshRef = useRef()
  const { camera, gl } = useThree()

  const handleMouseClick = event => {
    event.preventDefault()

    const raycaster = new Raycaster()
    const mouse = new Vector2()

    const rect = gl.domElement.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObject(meshRef.current, true)

    if (intersects.length > 0) {
      const intersect = intersects[0]
      const point = intersect.point

      let apartmentFound = false

      Object.keys(areas).forEach((areaKey, areaIndex) => {
        const area = areas[areaKey]
        area.subareas.forEach((subarea, subIndex) => {
          if (subarea.box.containsPoint(point)) {
            setApartmentNumber(
              info[language].building.floor[areaIndex + 1].apartments[
                info[language].building.floor[areaIndex + 1].id +
                  '0' +
                  (subIndex + 1)
              ].name
            )
            setFloorNumber(info[language].building.floor[areaIndex + 1].name)
            setRoomQuantity(
              info[language].building.floor[areaIndex + 1].apartments[
                info[language].building.floor[areaIndex + 1].id +
                  '0' +
                  (subIndex + 1)
              ].type
            )
            apartmentFound = true
          }
        })
      })

      if (apartmentFound) {
        onModelClick()
      }
    }
  }

  useEffect(() => {
    const canvas = gl.domElement
    canvas.addEventListener('click', handleMouseClick)

    return () => {
      canvas.removeEventListener('click', handleMouseClick)
    }
  }, [gl, handleMouseClick])

  return (
    <>
      <primitive object={scene} ref={meshRef} />
      {Object.keys(areas).map(areaKey => (
        <group key={areaKey}>
          <mesh position={areas[areaKey].main.getCenter(new Vector3())}>
            <boxGeometry
              args={areas[areaKey].main.getSize(new Vector3()).toArray()}
            />
            <meshBasicMaterial
              color={areaKey === 'area1' ? 'red' : 'blue'}
              transparent
              opacity={0}
              wireframe
            />
          </mesh>
          {areas[areaKey].subareas.map((subarea, index) => (
            <mesh key={index} position={subarea.box.getCenter(new Vector3())}>
              <boxGeometry
                args={subarea.box.getSize(new Vector3()).toArray()}
              />
              <meshBasicMaterial
                color={areaKey === 'area1' ? 'pink' : 'lightblue'}
                transparent
                opacity={0}
                wireframe
              />
            </mesh>
          ))}
        </group>
      ))}
    </>
  )
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
  const [floorNumber, setFloorNumber] = useState('')
  const [apartmentNumber, setApartmentNumber] = useState('')
  const [roomQuantity, setRoomQuantity] = useState('')

  const areas = {
    area1: {
      main: new Box3(new Vector3(-1, 1.3, -2.7), new Vector3(1, 1.9, -0.6)),
      subareas: [
        {
          box: new Box3(
            new Vector3(-0.98, 1.41, -2.5),
            new Vector3(-0.86, 1.53, -0.6)
          ),
          name: 'Department 101'
        },
        {
          box: new Box3(
            new Vector3(-0.76, 1.41, -2.5),
            new Vector3(-0.64, 1.53, -0.6)
          ),
          name: 'Department 102'
        },
        {
          box: new Box3(
            new Vector3(-0.54, 1.41, -2.5),
            new Vector3(-0.42, 1.53, -0.6)
          ),
          name: 'Department 103'
        },
        {
          box: new Box3(
            new Vector3(-0.32, 1.41, -2.5),
            new Vector3(-0.2, 1.53, -0.6)
          ),
          name: 'Department 104'
        },
        {
          box: new Box3(
            new Vector3(-0.1, 1.41, -2.5),
            new Vector3(0.02, 1.53, -0.6)
          ),
          name: 'Department 105'
        },
        {
          box: new Box3(
            new Vector3(0.12, 1.41, -2.5),
            new Vector3(0.24, 1.53, -0.6)
          ),
          name: 'Department 106'
        },
        {
          box: new Box3(
            new Vector3(0.34, 1.41, -2.5),
            new Vector3(0.46, 1.53, -0.6)
          ),
          name: 'Department 107'
        },
        {
          box: new Box3(
            new Vector3(0.56, 1.41, -2.5),
            new Vector3(0.68, 1.53, -0.6)
          ),
          name: 'Department 108'
        },
        {
          box: new Box3(
            new Vector3(0.78, 1.41, -2.5),
            new Vector3(0.9, 1.53, -0.6)
          ),
          name: 'Department 109'
        }
      ]
    },
    area2: {
      main: new Box3(new Vector3(-1, 1.9, -2.7), new Vector3(1, 2.6, -0.6)),
      subareas: [
        {
          box: new Box3(
            new Vector3(-0.98, 2.14, -2.5),
            new Vector3(-0.86, 2.26, -0.6)
          ),
          name: 'Department 201'
        },
        {
          box: new Box3(
            new Vector3(-0.76, 2.14, -2.5),
            new Vector3(-0.64, 2.26, -0.6)
          ),
          name: 'Department 202'
        },
        {
          box: new Box3(
            new Vector3(-0.54, 2.14, -2.5),
            new Vector3(-0.42, 2.26, -0.6)
          ),
          name: 'Department 203'
        },
        {
          box: new Box3(
            new Vector3(-0.32, 2.14, -2.5),
            new Vector3(-0.2, 2.26, -0.6)
          ),
          name: 'Department 204'
        },
        {
          box: new Box3(
            new Vector3(-0.1, 2.14, -2.5),
            new Vector3(0.02, 2.26, -0.6)
          ),
          name: 'Department 205'
        },
        {
          box: new Box3(
            new Vector3(0.12, 2.14, -2.5),
            new Vector3(0.24, 2.26, -0.6)
          ),
          name: 'Department 206'
        },
        {
          box: new Box3(
            new Vector3(0.34, 2.14, -2.5),
            new Vector3(0.46, 2.26, -0.6)
          ),
          name: 'Department 207'
        },
        {
          box: new Box3(
            new Vector3(0.56, 2.14, -2.5),
            new Vector3(0.68, 2.26, -0.6)
          ),
          name: 'Department 208'
        },
        {
          box: new Box3(
            new Vector3(0.78, 2.14, -2.5),
            new Vector3(0.9, 2.26, -0.6)
          ),
          name: 'Department 209'
        }
      ]
    }
  }

  const handleTransitionEnd = () => {
    setTransitioning(false)
  }

  const handleModelClick = () => {
    // Este callback se llama cada vez que se hace clic en el modelo, puedes agregar lógica adicional aquí si es necesario
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
          <Sky />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <Model
            path={modelPath}
            onModelClick={handleModelClick}
            areas={areas}
            language={language}
            setRoomQuantity={setRoomQuantity}
            setFloorNumber={setFloorNumber}
            setApartmentNumber={setApartmentNumber}
          />
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
