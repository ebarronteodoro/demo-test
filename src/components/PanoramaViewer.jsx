import React, { useEffect, useRef, Suspense } from 'react'
import { Viewer, ImagePanorama } from 'panolens'
import ModalBox from './ModalBox'

const PanoramaViewer = ({ handleLanguageChange, isVisible, isErased, handleTouchEnd, handleDoubleClick }) => {
  const imageContainerRef = useRef(null)
  const viewerRef = useRef(null)

  useEffect(() => {
    const loadPanorama = async () => {
      const panoramaImage = new ImagePanorama('images/image1.jpeg')

      viewerRef.current = new Viewer({
        container: imageContainerRef.current,
        autoRotate: true,
        controlBar: false,
        autoRotateSpeed: 0.2,
        cameraFov: 55
      })

      viewerRef.current.camera.rotation.x = Math.PI / 4
      viewerRef.current.add(panoramaImage)

      const imageContainer = imageContainerRef.current
      imageContainer.addEventListener('touchend', handleTouchEnd)
      imageContainer.addEventListener('dblclick', handleDoubleClick)

      const handleKeyDown = (event) => {
        const keysToPrevent = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        if (keysToPrevent.includes(event.key)) {
          event.preventDefault()
          event.stopPropagation()
        }
      }

      const preventArrowKeyScrolling = (event) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
          event.preventDefault()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keydown', preventArrowKeyScrolling)

      return () => {
        imageContainer.removeEventListener('touchend', handleTouchEnd)
        imageContainer.removeEventListener('dblclick', handleDoubleClick)
        document.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('keydown', preventArrowKeyScrolling)
      }
    }

    loadPanorama()
  }, [handleTouchEnd, handleDoubleClick])

  return (
    <section className={`initial-screen ${isVisible ? '' : 'hidden'} ${isErased ? 'erased' : ''}`}>
      <ModalBox handleLanguageChange={handleLanguageChange} />
      <div className='image-container' ref={imageContainerRef} tabIndex={0} />
    </section>
  )
}

const PanoramaViewerWithSuspense = (props) => (
  <Suspense fallback={null}>
    <PanoramaViewer {...props} />
  </Suspense>
)

export default PanoramaViewerWithSuspense
