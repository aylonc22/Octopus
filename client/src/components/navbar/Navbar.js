import {useEffect, useState} from 'react';
import {MenuItems}  from '../Items/MenuItems';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './Navbar.css';
const NavBar = (props)=>
    {
       const[clicked,setClicked] = useState(props.url.length===0?"/":props.url);
       function onClick(item) {
           setClicked(item.url)
       }
       
        return(
              
                <div className="navDiv">
                    <div className = "NavbarItems"> 
                         <h1  className = "Navbar-logo">תמנון</h1>
                        <div className = "menu-icon"></div>
                        <ul className = "nav-menu"> {MenuItems.map((item,index)=><li key = {index}>
                    <Link onClick ={()=>onClick(item)} className = {clicked===item.url?"clicked-page":item.cName} to = {item.url}>
                        {item.title}
                </Link> </li>)}
                </ul>
            </div>
                </div>
               
        );
    }
export default NavBar;