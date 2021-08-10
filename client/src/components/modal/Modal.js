import React  from "react";
import Modal from 'react-modal';
//image
import Tihkur from '../../icons/tihkur.png';
import AirForce from '../../icons/AirForce.png';
import Tahzuka from '../../icons/tahzuka.png';

const AboutMe = props=>{
  //  className ="modal" just to remove the defualy styling of the modal
  return(
        <Modal className ="modal"
        isOpen={true}
        ariaHideApp={false}
        contentLabel="Example Modal">
              <div className ="about-page">
               <div className ="about">
               <div className = "logos">
               <img className ="logo" alt = "" src = {AirForce}/>
               <img className ="tihkur" alt = "" src = {Tihkur}/>
               <img className ="logo" alt = "" src = {Tahzuka}/>              
               </div>
                <div className = "rows">
                <div className = "about-row">פותח על ידי אילון כהן </div>
                 <div className = "about-row"> מחלקת תחקור, אוויוניקה כטמ"ם</div>
                 <div className = "about-row"> ©חייל האוויר 2021</div>
                </div>
               <div className = "exit" onClick={()=>props.setShouldBlur(false)}>סגור</div>
               </div>
               </div>
               
              
        </Modal>
    )
}

export default AboutMe;