import {useEffect, useState} from 'react';
import {MenuItems,ManageItems}  from '../Items';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import './Navbar.css';
const NavBar = (props)=>
    {
       // Conditionally render navbar "pressedLink" = clicked based on this condition 
       const[clicked,setClicked] = useState(props.url.length===0?"/":props.url);
       const showManage = (item)=>{
        return item.title==="Manage"?ManageItems.map((MItem,index)=>(
            <label key = {index} onClick = {()=>handleManage(MItem.title)}> {MItem.title} </label>
        )):null;
       }
       function onClick(item) {
           setClicked(item.url);
       }
       
       //Setting in App.js the State Manager with conditionally render the the chosen table from Manage button
       function handleManage(table) {
           props.Manager(table);
       }
        return(
              
                <div className="navDiv">
                    <div className = "NavbarItems"> 
                         <h1  className = "Navbar-logo">תמנון</h1>
                        <div className = "menu-icon"></div>
                        <ul className = "nav-menu"> {MenuItems.map((item,index)=>
                        <li key = {index}>
                          <div className ="dropdown ">
                          <Link onClick ={()=>onClick(item)}
                           className = {clicked===item.url?"clicked-page":item.cName} to = {item.url}>
                           {item.title}
                          </Link>
                         <div className="ManNav-links"> {showManage(item)}</div>
                          </div> </li>)}
                        </ul>
                </div>
                    </div>
               
        );
    }
export default NavBar;