import React from 'react'

const ModalBox = ({ handleLanguageChange }) => {
  return (
    <div className='modalbox'>
      <h1>ARISE</h1>
      <div>
        <button onClick={() => handleLanguageChange('en')}>English</button>
        <button onClick={() => handleLanguageChange('es')}>Español</button>
      </div>
    </div>
  )
}

export default ModalBox
