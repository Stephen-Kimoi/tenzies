import { useEffect, useState } from 'react'
import Die from './Die';
import { nanoid } from 'nanoid';
import './App.css'; 
import { useWindowSize } from 'usehooks-ts';
import Confetti from 'react-confetti';

function App() {

  const [tenzies, setTenzies] = useState(false)

  const { width, height } = useWindowSize(); 

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

  function refreshGame() {
    window.location.reload(); 
  }

  useEffect( () => {
    const allHeld = dice.every( dice => dice.isHeld)
    const firstValue = dice[0].value 
    const allSame = dice.every( dice => dice.value === firstValue)

    if  (allHeld && allSame){
      setTenzies(true); 
      console.log("You won!"); 
    }
  }, [dice])


  return (
    <div className="app">
        <div className='app-container'>

        { 
          tenzies && 
             <Confetti 
               width={width} 
               height={height}
             />
        }

        <h1 className="title">Tenzies</h1>
            <p className="instructions">
               Roll until all dice are the same. <br/>Click each die to freeze it at 
               its current value between rolls.
            </p>

            

          <div className='die-container'> 
             { dieDivs}
          </div>

          {
            tenzies ? 
              <div className='refresh-button' onClick={refreshGame}>
                  New game
              </div> : 

              <div className='reset-button' onClick={resetButton}>
                   Roll Dice
               </div>
          }

        </div>
    </div>
  )
}

export default App
