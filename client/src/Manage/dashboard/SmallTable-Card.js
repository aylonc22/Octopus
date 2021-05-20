import {React,useEffect,useState }from 'react';

const SmallTable = props=>{
    const [Data,setData] = useState([]);
    useEffect(()=>{
        props.getAllTable.then(res=>//props.getAllTable
            {
                res.data?setData(res.data.data):console.log()
                //console.log(res.data.data.length);
            });
        //eslint-disable-next-line
        },[]);
   
    const card = !Data.length?[...Array(10)].map((i)=>{
    return(<div key = {i} className  = "Row"> 
    <div key = {i+"a"} className = "Empty-Cell"></div> <div key = {i+"b"} className = "Empty-Cell"></div> 
     </div>);}):[...Data.slice(0,9),...Array(10-Data.slice(0,9).length)].map((data,index)=>{
         if(data)
            return <div key = {index} className  = "Row"> <div key = {index+"a"} className = "Cell">{data.ID}</div> <div key = {index+"b"} className = "Cell">{data.Type?data.Type:data.Location}</div> </div>                
        else
            return <div key = {index} className  = "Row"> <div key = {index+"a"} className = "Empty-Cell"></div> <div key = {index+"b"} className = "Empty-Cell"></div></div> 
     })
   return( <div key = {props.table} className ="Card">           
   <div key = {props.table+"a"} className  = "Row"> <div key = {props.table+"b"} className = "Header-Cell">מס"ז</div> <div key = {props.table+"c"} className = "Header-Cell">{props.secondaryH}</div> </div>                
   {card}
</div>);
};

export default SmallTable;