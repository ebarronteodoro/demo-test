import React, { useState } from 'react'
import MainPreview from './components/MainPreview'
import PanoramaViewerWithSuspense from './components/PanoramaViewer'
import { ModelProvider } from './hooks/ModelContext'

function App () {
  const [language, setLanguage] = useState('es')
  const [isVisible, setIsVisible] = useState(true)
  const [isErased, setIsErased] = useState(false)
  const [mainHidden, setMainHidden] = useState(false)
  const [model, setModel] = useState('building')
  let lastTouchEnd = 0

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
  }

  const switchToMain = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsErased(true)
    }, 300)
  }

  const switchToPanorama = () => {
    setIsErased(false)
    setTimeout(() => {
      setIsVisible(true)
      setMainHidden(true)
    }, 300)
  }

  const toggleFullscreen = () => {
    const mainContainer = document.documentElement
    if (!document.fullscreenElement) {
      if (mainContainer.requestFullscreen) {
        mainContainer.requestFullscreen()
      } else if (mainContainer.mozRequestFullScreen) { // Firefox
        mainContainer.mozRequestFullScreen()
      } else if (mainContainer.webkitRequestFullscreen) { // Chrome, Safari y Opera
        mainContainer.webkitRequestFullscreen()
      } else if (mainContainer.msRequestFullscreen) { // IE/Edge
        mainContainer.msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) { // Chrome, Safari y Opera
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen()
      }
    }
  }

  const handleTouchEnd = () => {
    const now = (new Date()).getTime()
    if (now - lastTouchEnd <= 300) {
      toggleFullscreen()
    }
    lastTouchEnd = now
  }

  const handleDoubleClick = () => {
    toggleFullscreen()
  }

  const handleDesktopDoubleClick = () => {
    toggleFullscreen()
  }

  return (
    <ModelProvider>
      <div className='app' onDoubleClick={handleDesktopDoubleClick}>
        <PanoramaViewerWithSuspense
          handleLanguageChange={handleLanguageChange}
          language={language}
          isVisible={isVisible}
          isErased={isErased}
          toggleFullscreen={toggleFullscreen}
          handleTouchEnd={handleTouchEnd}
          handleDoubleClick={handleDoubleClick}
          switchToMain={switchToMain}
        />
        {isVisible !== true && isErased === true && <MainPreview language={language} mainHidden={mainHidden} switchToPanorama={switchToPanorama} model={model} setModel={setModel} />}
      </div>
    </ModelProvider>
  )
}

export default App
