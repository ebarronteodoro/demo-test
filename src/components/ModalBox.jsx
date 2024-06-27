import React from 'react'

const ModalBox = ({ handleLanguageChange }) => {
  return (
    <div className='modalbox'>
      <img src='images/soil_logo.png' alt='Logo Soil' />
      <div>
        <button onClick={() => handleLanguageChange('en')}>English</button>
        <button onClick={() => handleLanguageChange('es')}>Español</button>
      </div>
    </div>
  )
}

export default ModalBox
