import {useEffect, useState} from 'react';
import {MenuItems,ManageItems}  from '../Items';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import airplane from '../../icons/airplane.png'
import './Navbar.css';
const NavBar = (props)=>
    {
       // Conditionally render navbar "pressedLink" = clicked based on this condition 
       const[clicked,setClicked] = useState(props.url.length===0?"/":props.url);
    
       
        return(
              
                <div className="navDiv">
                    <div className = "NavbarItems"> 
                         <h1  className = "Navbar-logo">תמנון</h1>
                        <div className = "menu-icon"></div>
                        <ul className = "nav-menu"> {MenuItems.map((item,index)=>
                        <li key = {index}>
                          <div className ="dropdown ">
                          <Link onClick ={()=>setClicked(item.url)}
                           className = {clicked===item.url?"clicked-page":item.cName} to = {item.url}>
                           {item.hebrew}
                          </Link>
                          </div> </li>)}
                        </ul>
                </div>
                    </div>
               
        );
    }
export default NavBar;