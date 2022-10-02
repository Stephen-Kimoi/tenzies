import { useEffect, useState } from 'react'
import Die from './Die';
import { nanoid } from 'nanoid';
import './App.css'; 
import { useWindowSize } from 'usehooks-ts';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { useStopwatch } from 'react-timer-hook'; 


function App() { 

  const [tenzies, setTenzies] = useState(false)
  const [pauseGame, setPauseGame] = useState(false)
  const [rolls, setRolls] = useState(0);  
  const { minutes, seconds, start, pause} = useStopwatch({ autoStart: true })

  const styles = {
    backgroundColor: pauseGame ? "grey" : "black", 
    cursor: pauseGame ? "not-allowed" : "pointer", 
  }
  
  let navigate = useNavigate(); 

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
    setRolls(rolls + 1); 
    console.log(rolls)
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
      stop; 
    }
  }, [dice])

  function gamePaused() {
    setPauseGame(!pauseGame)
  }


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
          
          {
            tenzies && 
                <div className="won-div">
                  You won!
                </div> 
          }

          <div className='die-container'> 
             { dieDivs}
          </div>

          { 

            tenzies ? 
              <div className='refresh-button' onClick={refreshGame}>
                  New game
              </div> : 

              <button className='reset-button' onClick={resetButton} disabled={pauseGame} style={{ styles }}>
                   Roll Dice
               </button>
          }

            <div className="other-info">

                <div className='time'>
                    Time: { minutes }:{ seconds }
                </div> 

                <div className='rolls'>
                   Rolls: { rolls }
                </div>
            </div>

            <div className='other-info2'>
                <div className='instructions2' onClick={() => navigate("/instructions")}>
                    Check Instructions
                </div>

                <div className='scoreboard' onClick={() => navigate("/scoreboard")}>
                    Check scoreboard
                </div>

                <div className='reset-game' onClick={refreshGame}> 
                    Reset Game
                </div>
                
                {
                  pauseGame ? 
                  <button className='reset-game' onClick={ () => { start(); gamePaused(); }}>
                    Resume Game
                  </button> : 
                  <button className='reset-game' onClick={ () => { pause(); gamePaused(); }}>
                    Pause Game
                  </button>
                }

            </div>

        </div>
    </div>
  )
}

export function Scoreboard() {
   
}

export default App; 
