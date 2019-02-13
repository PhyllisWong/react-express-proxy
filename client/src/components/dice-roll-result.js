import React from 'react'

const DiceRollResults = (props) => {
  // Function components do not have 'this' key word
  return (
    <div className='results-message'>
      <h2>You rolled {props.die} die</h2>
      <h2>With {props.sides} sides</h2>
      <h2>For a total of {props.total}</h2>
    </div>
  )
}

export default DiceRollResults