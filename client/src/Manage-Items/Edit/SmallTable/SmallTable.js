import {React,useEffect,useState} from 'react';
//Icons
import Add_icon from '../../../icons/add.png';
import Delete_icon from '../../../icons/delete.png'; // Delete Icon
//Styling
import './SmallTable.css'


const SmallTable = props =>{

    const [newID,setNewID] = useState("");
    const [newType,setNewType] = useState("");
    const [Data,setData] = useState([]);
    const [submitData,setSubmitData] = useState({id:"",type:""});
    const [_success,Set_Success] = useState(true);
    const [removeClick,setRemoveClick] = useState(false);
    

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
        Data.map(d=>d.ID==submitData.id?flag=true:console.log());
        !flag && submitData.id.length && 
        Number.isInteger(submitData.id*1) &&
        submitData.id.length===props.ID_Limit*1//* to convert string to int
        ?props.insertToTable(insert):console.log();//props.insertToTable
        !flag && submitData.id.length &&
         Number.isInteger(submitData.id*1) &&
         submitData.id.length===props.ID_Limit*1//* to convert string to int
         ?setData([...Data,insert]):console.log();
         //eslint-disable-next-line
    },[submitData,Data])
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
                    <input type ="text" value = {newID} onChange ={(e)=>setNewID(e.target.value)} minLength="3" maxLength="3" className = "input"/>
                    <input type ="text" value = {newType} onChange ={(e)=>setNewType(e.target.value)} className = "input"/>
                    <img onClick ={()=>{setSubmitData({id:newID,type:newType});setNewID("");setNewType("");}} className = "icon" id = "add" src = {Add_icon} alt =""/>
                    </div>
                    <div className = "DataTable">
                        {Data.map((e,index)=><div  key = {e._id} className = "Row">
                        <div className = "Cell">{e.ID}</div>
                        <div className = "Cell">{e.Type?e.Type:e.Location}</div>
                        <img className ="icon" src={Delete_icon} alt=""/>
                        </div>)}
                        <div className = "Row">
                        <div className = "Cell">dsadsa</div>
                        <div className = "Cell">dsadsa</div>
                        <img className ="icon" src={Delete_icon} alt=""/>
                        </div>
                        <div className = "Row">
                        <div className = "Cell">dsadsa</div>
                        <div className = "Cell">dsadsa</div>
                        <img className ="icon" src={Delete_icon} alt=""/>
                        </div>
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