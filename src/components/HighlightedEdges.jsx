import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import * as THREE from 'three'

const HighlightedEdges = forwardRef(({ object, setNextFloor, isTypoClicked, setIsTypoClicked, shouldHighlight }, ref) => {
  const highlightedChildrenRef = useRef([])

  useImperativeHandle(ref, () => ({
    clearSelection () {
      highlightedChildrenRef.current.forEach((highlightedChild) => {
        if (object && object.parent) {
          object.parent.remove(highlightedChild)
        }
      })
      highlightedChildrenRef.current = []
    }
  }))

  useEffect(() => {
    if (!shouldHighlight) return // No hace nada si shouldHighlight es false

    // Elimina los elementos resaltados anteriores
    highlightedChildrenRef.current.forEach((highlightedChild) => {
      if (object && object.parent) {
        object.parent.remove(highlightedChild)
      }
    })

    highlightedChildrenRef.current = []

    console.log(object)

    // Mapeo de acciones para cada departamento
    const depaActions = {
      'depa-1': () => {
        highlightChildren(0x006CFF, 0.3)
        setIsTypoClicked(true)
        setNextFloor('t_a')
      },
      'depa-21': () => {
        highlightChildren(0x006CFF, 0.3)
        setIsTypoClicked(true)
        setNextFloor('t_b')
      },
      'depa-3': () => {
        highlightChildren(0x006CFF, 0.3)
        setIsTypoClicked(true)
        setNextFloor('t_c')
      },
      'depa-44': () => {
        highlightChildren(0x006CFF, 0.3)
        setIsTypoClicked(true)
        setNextFloor('t_d')
      },
      'depa-53': () => {
        highlightChildren(0x006CFF, 0.3)
        setIsTypoClicked(true)
        setNextFloor('t_e')
      },
      'depa-6': () => {
        highlightChildren(0x006CFF, 0.3)
        setIsTypoClicked(true)
        setNextFloor('t_f')
      },
      'depa-7': () => {
        highlightChildren(0x006CFF, 0.3)
        setIsTypoClicked(true)
        setNextFloor('t_f')
      },
      'depa-8': () => {
        highlightChildren(0x006CFF, 0.3)
        setNextFloor('t_f')
        setIsTypoClicked(true)
      }
    }

    const depaNames = Object.keys(depaActions)

    // Solo ejecuta las acciones si shouldHighlight es true y no se ha hecho clic antes
    if (object && object.parent && depaNames.includes(object.parent.name) && !isTypoClicked) {
      depaActions[object.parent.name]()
    }

    return () => {
      highlightedChildrenRef.current.forEach((highlightedChild) => {
        if (object && object.parent) {
          object.parent.remove(highlightedChild)
        }
      })
    }
  }, [object, shouldHighlight])

  const highlightChildren = (color, opacity) => {
    object.parent.children.forEach((child) => {
      if (child.geometry) {
        const material = new THREE.MeshBasicMaterial({
          color: isTypoClicked !== 'true' ? color : null,
          transparent: true,
          opacity
        })

        const highlightedChild = new THREE.Mesh(child.geometry.clone(), material)
        highlightedChild.position.copy(child.position)
        highlightedChild.rotation.copy(child.rotation)
        highlightedChild.scale.copy(child.scale)
        highlightedChild.visible = true
        highlightedChild.frustumCulled = false

        highlightedChildrenRef.current.push(highlightedChild)
        object.parent.add(highlightedChild)
      }
    })
  }

  return null
})

export default HighlightedEdges
