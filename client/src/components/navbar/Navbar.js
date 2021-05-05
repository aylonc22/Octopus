import React from 'react';
import {MenuItems}  from '../MenuItems'
import './Navbar.css';
class NavBar extends React.Component{
    render(){
        return(
            <nav className = "NavbarItems"> 
            <h1 className = "Navbar-logo">מנהל</h1>
            <div className = "menu-icon">

            </div>
            <ul className = "list">
            {MenuItems.map((item,index)=><li key = {index}>
                <a className = {item.cName} href = {item.url}> </a>
                {item.title}
                </li>)}
            </ul>
            </nav>
        );
    }
}
export default NavBar;