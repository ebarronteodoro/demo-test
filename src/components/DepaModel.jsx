import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useThree, extend } from '@react-three/fiber'

extend({ Raycaster: THREE.Raycaster })

const DepaModel = ({ path, onModelClick, model, typo, playAnimation, reverseAnimation, setIsWire }) => {
  const { scene, animations } = useGLTF(path)
  const meshRef = useRef()
  const { gl, camera } = useThree()
  const raycaster = useRef(new THREE.Raycaster()).current
  const mixer = useRef(null)
  const actions = useRef([]) // Para guardar las acciones de animación

  // Función para buscar el ancestro con nombre "Scene"
  const findSceneAncestor = (obj) => {
    if (!obj) return null

    if (obj.name === 'Scene') {
      return obj
    }

    return findSceneAncestor(obj.parent)
  }

  // Manejo del clic en el modelo
  const handleClick = (event) => {
    const mouse = new THREE.Vector2()
    mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1
    mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(scene, true)

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object

      onModelClick(clickedObject)
    }
  }

  useEffect(() => {
    const handleMouseClick = (event) => handleClick(event)
    gl.domElement.addEventListener('click', handleMouseClick)

    return () => {
      gl.domElement.removeEventListener('click', handleMouseClick)
    }
  }, [gl, camera, scene])

  useEffect(() => {
    if (model === 'apartment' || model === 'typologie') {
      const sceneAncestor = findSceneAncestor(scene)

      if (sceneAncestor) {
        sceneAncestor.visible = true
      }
    }
  }, [model, scene])

  useEffect(() => {
    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene)
      actions.current = animations.map((clip) => mixer.current.clipAction(clip))
    }
  }, [animations, scene])

  useEffect(() => {
    if (mixer.current) {
      actions.current.forEach((action) => {
        if (playAnimation) {
          action.reset().play()
          action.timeScale = 1
          action.clampWhenFinished = true
          action.loop = THREE.LoopOnce
          setIsWire(false)
        } else if (reverseAnimation) {
          action.reset()
          action.timeScale = -1
          action.setEffectiveTimeScale(-1)
          action.setLoop(THREE.LoopOnce)
          action.clampWhenFinished = true

          action.time = action.getClip().duration
          action.play()
          setIsWire(true)
        } else {
          action.stop()
        }
      })
    }
  }, [playAnimation, reverseAnimation, animations, setIsWire])

  useEffect(() => {
    const update = () => {
      if (mixer.current) {
        mixer.current.update(0.01)
      }
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(update)
      }
    }

    update()
  }, [])

  return (
    (model === 'apartment' || model === 'typologie') && (
      <primitive
        object={scene}
        ref={meshRef}
        scale={typo === 'f_4' ? [7, 7, 7] : [1, 1, 1]}
      />
    )
  )
}

export default DepaModel
