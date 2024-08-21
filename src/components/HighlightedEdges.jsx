import { useEffect } from 'react'
import * as THREE from 'three'

const HighlightedEdges = ({ object }) => {
  useEffect(() => {
    const highlightedChildren = []

    if (object && object.parent) {
      object.parent.children.forEach((child, index) => {
        if (child.geometry) {
          console.log(`Procesando hijo ${index} con UUID: ${child.uuid}`)
          console.log(`visible: ${child.visible}, frustumCulled: ${child.frustumCulled}`)

          // Comentando temporalmente la verificación de visibilidad y frustum culling
          /*
          if (!child.visible || child.frustumCulled) {
            console.warn(`Hijo ${index} está oculto o fuera del frustum:`, child);
            return;
          }
          */

          const material = new THREE.MeshBasicMaterial({
            color: object.parent.id === 106 ? 0x6AFF5B : 0x011F4B,
            transparent: true,
            opacity: 0.3
          })

          const highlightedChild = new THREE.Mesh(child.geometry.clone(), material)
          highlightedChild.position.copy(child.position)
          highlightedChild.rotation.copy(child.rotation)
          highlightedChild.scale.copy(child.scale)

          // Asegurar que el hijo destacado esté visible y no sea culling
          highlightedChild.visible = true
          highlightedChild.frustumCulled = false

          highlightedChildren.push(highlightedChild)
          object.parent.add(highlightedChild)
        }
      })

      console.log(`Se pintaron ${highlightedChildren.length} hijos.`)
    }

    return () => {
      highlightedChildren.forEach((highlightedChild) => {
        object.parent.remove(highlightedChild)
      })
    }
  }, [object])

  return null
}

export default HighlightedEdges
