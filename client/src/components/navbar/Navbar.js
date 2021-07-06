import {useEffect, useState} from 'react';
import {MenuItems,ManageItems}  from '../Items';
import {Link} from "react-router-dom";
import Bell from '../../icons/notification.svg';
import BellDef from '../../icons/bell.svg';
import {getAllOpenNotification} from '../../api/notification-api.js';

import './Navbar.css';
const NavBar = (props)=>
    {
       // Conditionally render navbar "pressedLink" = clicked based on this condition 
       const[clicked,setClicked] = useState(props.url.length===0?"/":handleInitClicked(props.url));
       const[notifications,setNotifications] = useState([]);
       const [notificationOpen,setNotificationOpen] = useState(false);
       let uniqid = require('uniqid');
       const DropDown =  ManageItems.map((MItem,index)=>(
            <Link  key = {index} onClick ={()=>setClicked("/")} to = {MItem.url} >
            <div className = "MItem">
                <label className = "MItem-label" > {MItem.hebrew} </label>
            </div></Link>
        ));    
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
     // get notification and remove it from the notifications array
     function removeNotification(e)
     {
        setNotifications(notifications.filter(element=>`${element.Stations[0]} ${element.Stations[1]} ${element.Duplicate} ${element.Type}`!==e));
        // if client delete last notification the notification div will close automaticlly
        if(notifications.length===1)
        setNotificationOpen(false);

    }
     useEffect(()=>{
        getAllOpenNotification().then(res=>{
            setNotifications(res.data.data.filter(e=>e))
        }); // eslint-disable-next-line
    },[]);

     useEffect(()=>{
        if(props.NewNotifications!==undefined)
            {setNotifications([...notifications,props.NewNotifications]);
            console.log("IM HERE");}
            // eslint-disable-next-line
    },[props.NewNotifications]);
        return(
            <div>
                <header  className="navDiv">
                    <div className = "NavbarItems"> 
                        <div className="Navbar-logo"><Link className ="Octopus-Label" to = "/404">תמנון</Link></div>
                        <div className = "notifications-icon">
                            <div tabIndex = "3" onBlur={()=>setNotificationOpen(false)} className = "wrapper" >
                                <div  onClick = {()=>notificationOpen?setNotificationOpen(false):setNotificationOpen(true)} className = {!notificationOpen?"button":"btnClicked"}>
                                    <img  alt ="" src = {!notifications.length?Bell:BellDef} className = "bell"></img>
                                    <div className={notificationOpen?"text":"textClose"}> <span className = "number"> {notifications.length}</span>התראות</div>
                                 </div>
                                    {/*only visible when user clicked on notification button*/}
                                    <div className={notificationOpen?"notifications":"notificationsOpen"}>
                                                    
                                                   {notifications.map((e,index)=><li onClick = {(el)=>removeNotification(el.target.innerText)}
                                                   key ={uniqid()} className="notification">
                                                       {`${e.Stations[0]} ${e.Stations[1]} ${e.Duplicate} ${e.Type}`}
                                                    </li>)} 
                                                    <li className="notification">
                                                       {`brrrrr`}
                                                    </li>
                                                    <li className="notification">
                                                       {`brrrrr`}
                                                    </li>
                                                    <li className="notification">
                                                       {`brrrrr`}
                                                    </li>
                                             </div>
                            </div>
                        </div>
                        <ul className = "nav-menu"> {MenuItems.map((item,index)=>
                        <li key = {index}>
                          <div className ="dropdown-menu">
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