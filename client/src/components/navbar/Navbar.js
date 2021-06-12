import {useEffect, useState} from 'react';
import {MenuItems,ManageItems}  from '../Items';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";

import './Navbar.css';
const NavBar = (props)=>
    {
       // Conditionally render navbar "pressedLink" = clicked based on this condition 
       const[clicked,setClicked] = useState(props.url.length===0?"/":handleInitClicked(props.url));
       const DropDown =  ManageItems.map((MItem,index)=>(
            <Link  key = {index} onClick ={()=>setClicked("/")} to = {MItem.url} >
            <div className = "MItem">
                <label className = "MItem-label" > {MItem.hebrew} </label>
            </div></Link>
        ));
       
const PopUp =  <div className="contentDiv">
                {/* <label for="one" class="pointer-cursor">
                click/toggle notification
                </label> */}
                <input type="checkbox" id="one" class="hidden" name="ossm"/>  
                <label for="one" class="alert-message">
                <strong> <i class="fa fa-heart"></i> Attention</strong> CSS is Awesome, click me  !! ...
                <button class="close">x</button>
                </label> 
                </div> 

       // Conditionlly make the right button red depends on the url (after page refreshed)
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
       function handleOnClick(url) {
        switch (url) {
            case "/edit":
                setClicked("/")
                break;
            case "/notification":
                setClicked("/")
                break;
            case "/flight":
            setClicked("/")
                break;
            default:
                setClicked(url); // make the clicked button red === marked
                break;
        }   
       }
       
        return(
              <header  className="navDiv">
                    <div className = "NavbarItems"> 
                        <Link className="Navbar-logo" to = "/404">תמנון</Link>
                        <div className = "menu-icon"></div>
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
                {PopUp}
                    </header>
               
        );
    }
export default NavBar;