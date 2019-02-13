import React, { useState } from 'react'

const DiceRoller = ({handleRollDice}) => {
  const [numberOfDice, setNumberOfDice] = useState(1)
  const [numberOfSides, setNumberOfSides] = useState(6)

  return(
    <div className='form-container'>
      <form className='dice-roller-form' onSubmit={ (e) => { 
        // forms by default refresh the page
        // prevent this because React clears data on refresh
        e.preventDefault()
        handleRollDice(numberOfDice, numberOfSides) 
      }}>
        <div className='inputs-container'>
          <label for='die-input'>number of dice to roll</label>            
          <input
            id='die-input'
            type='number'
            placeholder='enter number'
            value={ numberOfDice }
            className='form-inputs'
            onChange={ e => setNumberOfDice( Number(e.target.value)) }
          />
        </div>
        <div className='inputs-container'>
          <label for='sides-input'>number of sides</label>
          <input
            id='sides-input'
            type='number'
            placeholder='enter number of sides'
            value={ numberOfSides }
            className='form-inputs'
            onChange={e => setNumberOfSides( Number(e.target.value)) }
          />
        </div>
        <button className='btn-submit' type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default DiceRoller