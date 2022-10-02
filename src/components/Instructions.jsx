import React from 'react'; 
import { useNavigate } from 'react-router-dom';

const Instructions = () => {

  let navigate = useNavigate(); 

  return (
    <div className='instructions3'>
      <div className='instructions-container1'>

          <h1 className='instructions-heading'>Instructions</h1>

          <ul className='instructions-details'>
             <li>Click the Roll Dice button</li> 
             <li>Click on two or three dices that have the same number to hold them</li> 
             <li>Click the roll dice button again to roll the numbers</li>
             <li>Click on one,two or three dices that have the same number as the ones you held before</li> 
             <li>Repeat this steps untill you hold 10 dices that look similar</li> 
             <li>You win the game once you hold 10 dices that look similar</li>
          </ul>

          <div className='button-container'>
            <button className='back-button' onClick={ () => navigate(-1)}>
                Back
            </button>
          </div>

      </div>
    </div>
  )
}

export default Instructions