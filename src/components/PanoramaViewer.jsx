import React, { useEffect, useState, useRef, Suspense } from 'react'
import { Viewer, ImagePanorama } from 'panolens'
import MobileRotatedIcon from '../icons/MobileRotatedIcon'
import ModalBox from './ModalBox'

const PanoramaViewer = ({ handleLanguageChange, isVisible, isErased, handleTouchEnd, handleDoubleClick }) => {
  const [isPortrait, setIsPortrait] = useState(false)
  const imageContainerRef = useRef(null)
  const viewerRef = useRef(null)

  const handleOrientationChange = () => {
    if (window.orientation === 0 || window.orientation === 180) {
      setIsPortrait(true)
    } else {
      setIsPortrait(false)
    }
  }

  useEffect(() => {
    handleOrientationChange()
    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

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

      return () => {
        imageContainer.removeEventListener('touchend', handleTouchEnd)
        imageContainer.removeEventListener('dblclick', handleDoubleClick)
      }
    }

    loadPanorama()
  }, [])

  return (
    <section className={`initial-screen ${isVisible ? '' : 'hidden'} ${isErased ? 'erased' : ''}`}>
      <ModalBox handleLanguageChange={handleLanguageChange} />
      <div className='image-container' ref={imageContainerRef} />
      {isPortrait && (
        <div className='rotate-message'>
          <MobileRotatedIcon width='90' height='90' />
          Por favor, gire el dispositivo
        </div>
      )}
    </section>
  )
}

const PanoramaViewerWithSuspense = (props) => (
  <Suspense fallback={<div>Loading panorama...</div>}>
    <PanoramaViewer {...props} />
  </Suspense>
)

export default PanoramaViewerWithSuspense
