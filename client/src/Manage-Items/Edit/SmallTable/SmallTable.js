import {React,useEffect,useState} from 'react';
//components 
import Button from '../../../components/button/Button.js';
//Icons
import Add_icon from '../../../icons/add.png';
import Edit_icon from '../../../icons/edit.png';
import Trash_icon from '../../../icons/trash.png'; // Delete Icon
//Styling
import './SmallTable.css'


const SmallTable = props =>{

    const [newID,setNewID] = useState("");
    const [Data,setData] = useState([]);
    const [submitData,setSubmitData] = useState("");
    const [_success,Set_Success] = useState(true);
    const [removeClick,setRemoveClick] = useState(false);
    
    //Handlers
    const handleAdd =( <div>
    <textarea className = "InsertData" 
    maxLength= "3" //Tail can be only 3 chars
    value = {newID}
    onChange = {(e)=>setNewID(e.target.value)}>
    </textarea>
    <Button  func = {()=>{setSubmitData(newID);setNewID("")}} name = "הוסף מספר זנב"/>
    </div>);

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
        const insert = props.secondary==="Type"?{ID:submitData,Type:"type"}:{ID:submitData,Location:"Location"};//eslint-disable-next-line
        Data.map(d=>d.ID==submitData?flag=true:console.log());
        !flag && submitData.length && 
        Number.isInteger(submitData*1) &&
        submitData.length===props.ID_Limit*1//* to convert string to int
        ?props.insertToTable(insert):console.log();//props.insertToTable
        !flag && submitData.length &&
         Number.isInteger(submitData*1) &&
         submitData.length===props.ID_Limit*1//* to convert string to int
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
                    <input type ="text" minLength="3" maxLength="3" className = "Header-Cell"/>
                    <input type ="text" className = "Header-Cell"/>
                    <div className = "Header-Cell">מס"ז</div>
                    </div>
                    <div className = "DataTable">
                        {Data.map((e,index)=><div  key = {e._id} className = "Row">
                        <div className = "Cell">{e.ID}</div>
                        <div className = "Cell">{e.Type?e.Type:e.Location}</div>
                        <div className = {removeClick?"Delete-Cell-Active":"Delete-Cell"}>
                        <input type="checkbox" id={index} name={index}/>
                        <label htmlFor={index}></label>
                        </div>
                        </div>)}
                        <div className = "Row">
                        <div className = "Cell">dsadsa</div>
                        <div className = "Cell">dsadsa</div>
                        <div className = {removeClick?"Delete-Cell-Active":"Delete-Cell"}>
                        <input type="checkbox" id={0} name={0}/>
                        <label htmlFor={0}></label>
                        </div>
                        </div>
                        <div className = "Row">
                        <div className = "Cell">dsadsa</div>
                        <div className = "Cell">dsadsa</div>
                        <div className = {removeClick?"Delete-Cell-Active":"Delete-Cell"}>
                        <input type="checkbox" id={1} name={1}/>
                        <label htmlFor={1}></label>
                        </div>
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