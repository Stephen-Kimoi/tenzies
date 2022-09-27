import { useState } from 'react'
import Die from './Die';
import { nanoid } from 'nanoid';
import './App.css'

function App() {

  const hold = () => {
    console.log(11233)
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
      <Die number={die.value} hold={hold} key={die.id}/> 
    )
  })

  function resetButton() {
    setDice(newNumbers())
  }


  return (
    <div className="app">
        <div className='app-container'>

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
