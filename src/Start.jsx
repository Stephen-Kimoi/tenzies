import React from 'react'; 
import { useNavigate } from 'react-router-dom';

const Start = () => {
  let navigate = useNavigate(); 

  return (
    <div className='app'>
        <div className='app-container'>

          <h1 className="title">Tenzies</h1>

          <p className="instructions">
              Roll until all dice are the same. <br/>Click each die to freeze it at 
              its current value between rolls.
              Check the instructions page for more instructions before getting started
          </p>
          
          <div className='start-buttons'>
              <button className='refresh-button' onClick={ () => navigate('/game')}>
                Start Game
              </button>

              <button className='refresh-button' onClick={ () => navigate('/instructions')}>
                Instructions
              </button>
          </div>

        </div>
    </div>
  )
}

export default Start