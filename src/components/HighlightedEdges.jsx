import { useEffect } from 'react'
import * as THREE from 'three'

const HighlightedEdges = ({ object, setNextFloor, setIsTypoClicked, model }) => {
  useEffect(() => {
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

      // Print the ancestor with name "Scene" if applicable
      if (model === 'apartment' || model === 'typologie') {
        if (obj.name === 'Scene') {
          console.log(`Ancestro con nombre "Scene" encontrado: ${obj.name}`)
          return obj
        }
      }

      // Check if the current object is a highlightable name
      if (highlightableNames.includes(obj.name)) {
        console.log(`Padre encontrado con nombre: ${obj.name}`)
        if (depaActions[obj.name]) {
          depaActions[obj.name]()
        }
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
      // Print Scene ancestor if model is 'apartment' or 'typologie'
      if (model === 'apartment' || model === 'typologie') {
        const foundScene = findParentWithNameRecursively(object.parent)
        if (foundScene) {
          console.log(`Se encontró y se procesó el ancestro: ${foundScene.name}`)
        } else {
          console.log('No se encontró ningún ancestro con un nombre coincidente.')
        }
      }

      // Resaltar los hijos
      const highlightableMaterial = new THREE.MeshBasicMaterial({
        color: 0x6AFF5B,
        transparent: true,
        opacity: 0.3
      })

      const foundParent = findParentWithNameRecursively(object.parent)
      if (foundParent) {
        highlightDescendantsRecursively(foundParent, highlightableMaterial)
        console.log(`Se pintaron ${highlightedChildren.length} descendientes.`)
      }
    }

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
