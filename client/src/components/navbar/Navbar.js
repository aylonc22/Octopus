import {useState} from 'react';
import {MenuItems}  from '../MenuItems'
import './Navbar.css';
const NavBar = (props)=>
    {
       const[clicked,setClicked] = useState("Manage");
       function onClick(item) {
           setClicked(item.title)
       }
        return(
                <nav className = "NavbarItems"> 
                <h1  className = "Navbar-logo">תמנון</h1>
                <div className = "menu-icon">

                </div>
                <ul className = "nav-menu">
                {MenuItems.map((item,index)=><li key = {index}>
                    <a onClick ={()=>onClick(item)} className = {clicked===item.title?"clicked-page":item.cName} href = {item.url}>
                        {item.title}
                </a> </li>)}
                </ul>
            </nav>
        );
    }
export default NavBar;