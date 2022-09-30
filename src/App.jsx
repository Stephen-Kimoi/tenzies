import { useEffect, useState } from 'react'
import Die from './Die';
import { nanoid } from 'nanoid';
import './App.css'; 
import { useWindowSize } from 'usehooks-ts';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

function App() {

  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0); 
  const [time, setTime] = useState({
    minutes: 0, 
    seconds: 0
  }); 
  
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

  function timer() {
    let minutes = 0; 
    let seconds = 0; 

    setInterval(() => {
       seconds + 1 
    }, 1000); 

    if (seconds >= 60){
      seconds = 0; 
      minutes = 1; 
    }  

    console.log(minutes, seconds); 
  }
  

  useEffect( () => {
    const allHeld = dice.every( dice => dice.isHeld)
    const firstValue = dice[0].value 
    const allSame = dice.every( dice => dice.value === firstValue)

    if  (allHeld && allSame){
      setTenzies(true); 
    }
  }, [dice])

  useEffect( () => {
    setInterval(timer(), 1000); 
  }, [time])


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

              <div className='reset-button' onClick={resetButton}>
                   Roll Dice
               </div>
          }

            <div className="other-info">

                <div className='time'>
                    {/* { 
                      setInterval(timer(), 1000)
                    } */}
                    Time: { time.minutes }:{ time.seconds }
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

                <div className='reset-game'> 
                    Reset Game
                </div>
            </div>

        </div>
    </div>
  )
}

export default App
