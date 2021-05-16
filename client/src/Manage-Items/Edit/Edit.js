import React from 'react';
//Table componnents
import Tail from './Tails/tail.js';
import GDT from './GDT/gdt.js';
import Station from './Stations/station.js'
import Frequency from './Frequencies/frequency.js';
//Styling 
import './Edit.css';
const Edit = props =>{
    const defaultColumns = 20;
return(
        <div className = "Edit-Page">
                <div className = "Tail-Component"> <Tail defaultColumns = {defaultColumns} /> </div>
                <div className = "GDT-Component"> <Tail defaultColumns = {defaultColumns} /> </div>
                <div className = "Station-Component"> <Tail defaultColumns = {defaultColumns} /> </div>
                <div className = "Frequency-Component"> <Tail defaultColumns = {defaultColumns} /> </div>
        </div>
)
};
export default Edit;