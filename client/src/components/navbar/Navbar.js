//import {useState} from 'react';
import {MenuItems}  from '../MenuItems'
//import OfflineStation from '../../offlineStation/offlineStation';
//import OnlineStation from '../../onlineStation/onlineStation';
import './Navbar.css';
const NavBar = (props)=>
    {
       
       
        return(
                <nav className = "NavbarItems"> 
                <h1 className = "Navbar-logo">תמנון</h1>
                <div className = "menu-icon">

                </div>
                <ul className = "nav-menu">
                {MenuItems.map((item,index)=><li key = {index}>
                    <a className = {item.cName} href = {item.url}>
                        {item.title}
                </a> </li>)}
                </ul>
            </nav>
        );
    }
export default NavBar;