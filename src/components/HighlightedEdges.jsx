import { useEffect } from 'react'
import * as THREE from 'three'

const HighlightedEdges = ({ object, setNextFloor, setIsTypoClicked, model }) => {
  useEffect(() => {
    if (model !== 'apartment') {
      return
    }

    const highlightedChildren = []

    const depaActions = {
      'depa-1': () => {
        setIsTypoClicked(true)
        setNextFloor('t_a')
      },
      'depa-2': () => {
        setIsTypoClicked(true)
        setNextFloor('t_b')
      },
      'depa-3': () => {
        setIsTypoClicked(true)
        setNextFloor('t_c')
      },
      'depa-4': () => {
        setIsTypoClicked(true)
        setNextFloor('t_d')
      },
      'depa-5': () => {
        setIsTypoClicked(true)
        setNextFloor('t_e')
      },
      'depa-6': () => {
        setIsTypoClicked(true)
        setNextFloor('t_f')
      },
      'depa-7': () => {
        setIsTypoClicked(true)
        setNextFloor('t_f')
      },
      'depa-8': () => {
        setIsTypoClicked(true)
        setNextFloor('t_f')
      }
    }

    const highlightableNames = Object.keys(depaActions)

    const findParentWithNameRecursively = (obj) => {
      if (!obj) return null

      if (highlightableNames.includes(obj.name)) {
        depaActions[obj.name]?.()
        return obj
      }

      return findParentWithNameRecursively(obj.parent)
    }

    const highlightDescendantsRecursively = (obj, material) => {
      if (!obj) return

      if (obj.geometry) {
        const highlightedChild = new THREE.Mesh(obj.geometry.clone(), material)
        highlightedChild.position.copy(obj.position)
        highlightedChild.rotation.copy(obj.rotation)
        highlightedChild.scale.copy(obj.scale)

        highlightedChild.visible = true
        highlightedChild.frustumCulled = false

        highlightedChildren.push(highlightedChild)
        obj.parent.add(highlightedChild)
      }

      obj.children.forEach(child => highlightDescendantsRecursively(child, material))
    }

    if (object) {
      const highlightableMaterial = new THREE.MeshBasicMaterial({
        color: 0x6AFF5B,
        transparent: true,
        opacity: 0.3
      })

      const foundParent = findParentWithNameRecursively(object.parent)
      if (foundParent) {
        highlightDescendantsRecursively(foundParent, highlightableMaterial)
      }
    }

    // Cleanup function to remove highlighted children
    return () => {
      highlightedChildren.forEach((highlightedChild) => {
        if (highlightedChild.parent) {
          highlightedChild.parent.remove(highlightedChild)
        }
      })
    }
  }, [object, setNextFloor, setIsTypoClicked, model])

  return null
}

export default HighlightedEdges
