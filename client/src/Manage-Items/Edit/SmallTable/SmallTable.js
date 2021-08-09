import {React,useEffect,useState} from 'react';
//Icons
import Add_icon from '../../../icons/add.svg';
import Delete_icon from '../../../icons/delete.svg'; // Delete Icon
//Styling
import './SmallTable.css'
let uniqid = require('uniqid');

const SmallTable = props =>{

    const [newID,setNewID] = useState("");
    const [newType,setNewType] = useState("");
    const [Data,setData] = useState([]);
    const [submitData,setSubmitData] = useState({id:"",type:""});
    const [_success,Set_Success] = useState(true);
    const [removeClick,setRemoveClick] = useState(undefined);
    

    useEffect(()=>{
        props.getAllTable.then(res=>//props.getAllTable
            {
                res.data?setData(res.data.data?res.data.data:[]):console.log()
                res.data.success?Set_Success(true):Set_Success(false)
                
            });//TODO when error need to change to mongo doesnt work page
        //eslint-disable-next-line
        },[]);
    useEffect(()=>{
        let flag = false;
        const insert ={ID:submitData.id,Type:submitData.type};//eslint-disable-next-line
                if(insert.ID.length===3&&submitData.type.length>0)
                {
                    Data.map(d=>d.ID===submitData.id?flag=true:console.log());
                    !flag && submitData.id.length && 
                    Number.isInteger(submitData.id*1) &&
                    submitData.id.length===props.ID_Limit*1//* to convert string to int
                    ?props.insertToTable(insert):console.log();//props.insertToTable
                    !flag && submitData.id.length &&
                    Number.isInteger(submitData.id*1) &&
                    submitData.id.length===props.ID_Limit*1//* to convert string to int
                    ?setData([...Data,insert]):console.log();
                }
                else if(removeClick!==undefined)
                {
                    let newData = [];
                    //stupid Eslint
                    // eslint-disable-next-line 
                    Data.map(d=>{
                        if(d.ID!==removeClick)
                        newData = [...newData,d];
                    });
                    setData(newData);
                    setRemoveClick(undefined);
                    props.getAllTable.then(res=>//props.getAllTable
                        {
                           res.data.data.filter(d=>d.ID===removeClick).map(d=>props.deleteFromTable(d._id));
                        });
                }
         //eslint-disable-next-line
    },[submitData,Data,removeClick])

    const success = (
            <div className = "DataCard">
               <div className = "Top-Card">
                   <div className = "Table-Name"> {props.name} </div>
               </div>   
                    <div className ="Row">
                    <div className = "Header-Cell">מס"ז</div>
                    <div className = "Header-Cell">{props.secondaryH}</div>
                    </div>
                    <div className ="Row">
                    <div className = "Cell"><input type ="text" value = {newID} onChange ={(e)=>setNewID(e.target.value)} minLength="3" maxLength="3" className = "input"/></div>
                    <div className = "Cell"><input type ="text" value = {newType} onChange ={(e)=>setNewType(e.target.value)} className = "input"/></div>
                    <img onClick ={()=>{setSubmitData({id:newID,type:newType});setNewID("");setNewType("");}} className = "icon" id = "add" src = {Add_icon} alt =""/></div>
                    <div className = "DataTable">
                        {Data.map((e,index)=><div  key = {e._id || uniqid()} className = "Row">
                        <div className = "Cell">{e.ID}</div>
                        <div className = "Cell">{e.Type?e.Type:e.Location}</div>
                        <img className ="icon" src={Delete_icon} alt="" onClick={()=>setRemoveClick(e.ID)}/>
                        </div>)}
                    </div>
         </div>
    );
    const error = <label>TODO MAKE ERROR PAGE FOR MONGO</label>;//TODO MAKE ERROR PAGE FOR MONGO 
    return(
        <div>
            {_success?success:error}
        </div>
    );
};
export default SmallTable;