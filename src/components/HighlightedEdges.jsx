import { useEffect } from 'react'
import * as THREE from 'three'

const HighlightedEdges = ({ object }) => {
  useEffect(() => {
    const highlightedChildren = []

    // Recorre todos los hijos del objeto
    object.traverse((child) => {
      if (child.geometry) { // Verifica si el hijo tiene geometría
        const material = new THREE.MeshBasicMaterial({
          color: object.id === 106 ? 0x6AFF5B : 0x011F4B,
          transparent: true,
          opacity: 0.3
        })

        const highlightedChild = new THREE.Mesh(child.geometry.clone(), material)
        highlightedChildren.push(highlightedChild)
        object.add(highlightedChild)
      }
    })

    return () => {
      // Remueve todos los objetos destacados añadidos
      highlightedChildren.forEach((highlightedChild) => {
        object.remove(highlightedChild)
      })
    }
  }, [object])

  return null
}

export default HighlightedEdges
