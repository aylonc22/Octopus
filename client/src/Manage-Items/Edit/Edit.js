import React from 'react';
import Table from './SmallTable/SmallTable.js';
//Api
import tail_api from '../../api/tail-api';
//import station_api from '../../api/station-api';
//import gdt_api from '../../api/gdt-api';
//import frequency_api from '../../api/frequency-api';
//Styling 
import './Edit.css';
const Edit = props =>{
return(
        <div className = "Edit-Page">
                <div className = "Tail-Component"> <Table getAllTable = {tail_api.getAllTail()} insertToTable = {(item)=>tail_api.insertTail(item)} secondary = {"סוג"} ID_Limit = "3"/> </div>
                <div className = "Station-Component"> <Table getAllTable = {tail_api.getAllTail()} insertToTable = {(item)=>tail_api.insertTail(item)} secondary = {"סוג"} ID_Limit = "3"/> </div>
                <div className = "GDT-Component"> <Table getAllTable = {tail_api.getAllTail()} insertToTable = {(item)=>tail_api.insertTail(item)} secondary = {"מקום"} ID_Limit = "3"/> </div>
                <div className = "Frequency-Component"> <Table getAllTable = {tail_api.getAllTail()} insertToTable = {(item)=>tail_api.insertTail(item)} secondary = {"סוג"} ID_Limit = "3"/> </div>
        </div>
)
};
export default Edit;