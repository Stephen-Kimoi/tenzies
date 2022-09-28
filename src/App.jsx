import { useState } from 'react'
import Die from './Die';
import { nanoid } from 'nanoid';
import './App.css'

function App() {

  const holdDice = (id) => {
    setDice( prevDice => prevDice.map( dice => {
      return dice.id === id ? 
          { ...dice, isHeld: !dice.isHeld} : 
          dice 
    }))
  }

  const newNumbers = () => {
    let numbers = [] 

    for(let i = 0; i <= 9; i++){
      numbers.push( {
        value: Math.ceil(Math.random() * 6), 
        isHeld: false, 
        id: nanoid()
      }) 
    }
    
    return numbers; 
  }

  const [dice, setDice] = useState(newNumbers());

  const dieDivs = dice.map( die => {
    return (
      <Die number={die.value} hold={() => holdDice(die.id)} key={die.id} isHeld={die.isHeld} /> 
    )
  })

  function resetButton() {
    setDice( prevDice => prevDice.map( dice => {
      return dice.isHeld ? 
            dice : 
            { 
              value: Math.ceil(Math.random() * 6), 
              isHeld: false, 
              id: nanoid()
            }
    }))
  }


  return (
    <div className="app">
        <div className='app-container'>

        <h1 className="title">Tenzies</h1>
            <p className="instructions">
               Roll until all dice are the same. <br/>Click each die to freeze it at 
               its current value between rolls.
            </p>

          <div className='die-container'> 
             { dieDivs}
          </div>
          
          <div className='reset-button' onClick={resetButton}>
             Roll Dice
          </div>

        </div>
    </div>
  )
}

export default App
