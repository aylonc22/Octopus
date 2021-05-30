import {React,useEffect,useState }from 'react';

const SmallTable = props=>{
    const [Data,setData] = useState([]);
    useEffect(()=>{
        props.getAllTable.then(res=>//props.getAllTable
            {
                res.data?setData(res.data.data?res.data.data:[]):console.log()
                //console.log(res.data.data);
            });
        //eslint-disable-next-line
        },[]);
   
    const card = !Data.length?[...Array(10)].map((i,index)=>{
    return(<div key = {index} className  = "Row"> 
    <div className = "Empty-Cell"></div> <div  className = "Empty-Cell"></div> 
     </div>);}):[...Data.slice(0,9),...Array(10-Data.slice(0,9).length)].map((data,index)=>{
         if(data)
            return <div key = {index} className  = "Row"> <div className = "Cell">{data.Type?data.Type:data.Location}</div> <div  className = "Cell">{data.ID}</div> </div>                
        else
            return <div key = {index} className  = "Row"> <div  className = "Empty-Cell"></div> <div  className = "Empty-Cell"></div></div> 
     })
   return( <div key = {props.table} className ="Card">           
   <label className = "Table-Name"> {props.name} </label>
   <div className  = "Row"> <div className = "Header-Cell">{props.secondaryH}</div> <div className = "Header-Cell">מס"ז</div> </div>                
   {card}
</div>);
};

export default SmallTable;