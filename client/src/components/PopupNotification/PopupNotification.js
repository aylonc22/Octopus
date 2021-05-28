import React from 'react';
import './PopupNotification.css';

const PopupNotification = (props)=>{
    return(
        <div>
     <label for="one" class="pointer-cursor">
      click/toggle notification
     </label>


  <input type="checkbox" id="one" class="hidden" name="ossm"/>  
  <label for="one" class="alert-message">
    <strong> <i class="fa fa-heart"></i> Attention</strong> CSS is Awesome, click me  !! ...
    <button class="close">x</button>
  </label> 
</div> 
    );
}

export default PopupNotification;