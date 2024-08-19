import { useEffect } from 'react'
import * as THREE from 'three'

const HighlightedEdges = ({ object }) => {
  const material = new THREE.MeshBasicMaterial({
    color: object.id === 106 ? 0x6AFF5B : 0x011F4B,
    transparent: true,
    opacity: 0.3
  })

  const highlightedObject = new THREE.Mesh(object.geometry.clone(), material)

  useEffect(() => {
    if (object.id !== 932) {
      object.add(highlightedObject)
    }
    return () => {
      object.remove(highlightedObject)
    }
  }, [object])

  return null
}

export default HighlightedEdges
