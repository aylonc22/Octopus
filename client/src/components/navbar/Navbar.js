import {useEffect, useState} from 'react';
import {MenuItems}  from '../MenuItems';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './Navbar.css';
const NavBar = (props)=>
    {
       const[clicked,setClicked] = useState(props.url.length===0?"Manage":props.url);
       console.log(props.url.length);
       function onClick(item) {
           setClicked(item.title)
       }
       
        return(
              
                <div className="navDiv">
                    <nav className = "NavbarItems"> 
                         <h1  className = "Navbar-logo">תמנון</h1>
                        <div className = "menu-icon"></div>
                        <ul className = "nav-menu"> {MenuItems.map((item,index)=><li key = {index}>
                    <Link onClick ={()=>onClick(item)} className = {clicked===item.url?"clicked-page":item.cName} to = {item.url}>
                        {item.title}
                </Link> </li>)}
                </ul>
            </nav>
                </div>
               
        );
    }
export default NavBar;