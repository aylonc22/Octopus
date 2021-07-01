import {useEffect, useState} from 'react';
import {MenuItems,ManageItems}  from '../Items';
import {Link} from "react-router-dom";
import Bell from '../../icons/notification.svg';
import BellDef from '../../icons/ring.svg';
import './Navbar.css';
const NavBar = (props)=>
    {
       // Conditionally render navbar "pressedLink" = clicked based on this condition 
       const[clicked,setClicked] = useState(props.url.length===0?"/":handleInitClicked(props.url));
       const[notifications,setNotifications] = useState([]);
       const [notificationOpen,setNotificationOpen] = useState(false);
       const DropDown =  ManageItems.map((MItem,index)=>(
            <Link  key = {index} onClick ={()=>setClicked("/")} to = {MItem.url} >
            <div className = "MItem">
                <label className = "MItem-label" > {MItem.hebrew} </label>
            </div></Link>
        ));

const PopUp = (e)=> <div className="contentDiv">
                    <label htmlFor="one" className="pointer-cursor">
                    click/toggle notification
                    </label>
                    <input type="checkbox" id="one" className="hidden popCheckBox" name="ossm"/>  
                    <label htmlFor="one" className="alert-message">
                    <strong> <i className="fa fa-heart"></i> Attention</strong> {e.Stations}
                    <button className="close">x</button>
                    </label> 
                    </div> 
    
       // Conditionlly make the right button [red/clicked] depends on the url (after page refreshed)
       function handleInitClicked(url) {
        switch (url) {
            case "/edit":
                return("/");
            case "/notification":
                return("/");
            case "/flight":
                return("/");
            default:
                return(url); // make the clicked button red === marked
       }
     }
       console.log(notificationOpen);
        return(
            <div>
                <header  className="navDiv">
                    <div className = "NavbarItems"> 
                        <Link className="Navbar-logo" to = "/404">תמנון</Link>
                        <div className = "notifications-icon">
                            <div className = "wrapper">
                                <div  onClick = {()=>notificationOpen?setNotificationOpen(false):setNotificationOpen(true)} className = {!notificationOpen?"button":"button clicked"}>
                                    <img  src = {BellDef} className = "bell"></img>
                                    {//only visible when user clicked on notification button
                                        notificationOpen?<div className="text"> <span className = "number"> {notifications.length}</span>התראות</div>:null}
                                </div>
                            </div>
                        </div>
                        <ul className = "nav-menu"> {MenuItems.map((item,index)=>
                        <li key = {index}>
                          <div className ="dropdown ">
                          <Link onClick ={()=>setClicked(item.url)}
                           className = {clicked===item.url?"clicked-page":item.cName} to = {item.url}>
                           {item.hebrew}
                          </Link>
                          <div className ="ManNav-links">{item.title==="Manage"?DropDown:null}</div>
                          </div> </li>)}
                        </ul>
                    </div>
                </header>
            </div>
               
        );
    }
export default NavBar;