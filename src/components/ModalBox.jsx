import React from 'react'
import EyeIcon from '../icons/EyeIcon'
import View360Icon from '../icons/View360Icon'
import FlagIcons from '../icons/FlagIcons'
const { SpainIcon, UsaIcon } = FlagIcons

const ModalBox = ({ handleLanguageChange, switchToMain, language }) => {
  return (
    <>
      <div className='modalbox'>
        <div>
          <button type='button' className={language === 'es' ? 'selected' : null} onClick={() => handleLanguageChange('es')}>
            <SpainIcon id='spain-pattern' width='30' height='30' />
          </button>
          <button type='button' className={language === 'en' ? 'selected' : null} onClick={() => handleLanguageChange('en')}>
            <UsaIcon id='usa-pattern' width='30' height='30' />
          </button>
        </div>
      </div>
      <div className='main-menu'>
        <img width={150} src='images/soil_logo.png' alt='Logo Soil' />
        <div className='menu-options'>
          <button type='button' className='view-3d' onClick={switchToMain}>
            <EyeIcon width='55' height='55' />
            VISTA 3D
          </button>
          <button type='button' className='tour-360' disabled>
            <View360Icon width='55' height='55' />
            TOUR 360°
          </button>
        </div>
      </div>
    </>
  )
}

export default ModalBox
