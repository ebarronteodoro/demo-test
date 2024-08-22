import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

const DepaModel = ({ path, onModelClick, model, typo, setIsTypoClicked }) => {
  const { scene } = useGLTF(path)
  const meshRef = useRef()
  const { gl, camera } = useThree()
  const raycaster = new THREE.Raycaster()
  const highlightedObjects = useRef([])

  const clearHighlights = () => {
    if (model !== 'apartment') return

    highlightedObjects.current.forEach((obj) => {
      if (obj.material) {
        obj.material.opacity = 1
      }
    })
    highlightedObjects.current = []
  }

  const handleClick = (event) => {
    if (model !== 'apartment') return // Solo maneja clics si model es 'apartment'

    const mouse = new THREE.Vector2()
    mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1
    mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(scene, true)

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object

      if (clickedObject.parent && clickedObject.parent.name.startsWith('depa-')) {
        clearHighlights()
        onModelClick(clickedObject)
        highlightedObjects.current.push(clickedObject)

        clickedObject.material.opacity = 0.3 // Aplica el color de resaltado
        setIsTypoClicked(true)
      } else {
        clearHighlights()
        setIsTypoClicked(false)
      }
    } else {
      clearHighlights()
      setIsTypoClicked(false)
    }
  }

  useEffect(() => {
    if (model === 'apartment') {
      gl.domElement.addEventListener('click', handleClick)
    }

    return () => {
      if (model === 'apartment') {
        gl.domElement.removeEventListener('click', handleClick)
        clearHighlights() // Limpia los highlights al desmontar el componente
      }
    }
  }, [gl, camera, scene, model])

  return (
    model !== 'building' && (
      <primitive
        object={scene}
        ref={meshRef}
        scale={typo === 'f_4' ? [7, 7, 7] : [1, 1, 1]} // Cambia la escala a [1, 1, 1] para debuggear
      />
    )
  )
}

export default DepaModel
