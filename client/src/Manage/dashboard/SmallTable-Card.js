import {React,useEffect,useState }from 'react';

const SmallTable = props=>{
    const [Data,setData] = useState([]);
    useEffect(()=>{
        props.getAllTable.then(res=>//props.getAllTable
            {
                //console.log(res.data.data);
                res.data?setData(res.data.data?res.data.data:[]):console.log()
                //console.log(res.data.data);
            });
        //eslint-disable-next-line
        },[]);
   return( <div key = {props.table} className ="Card">           
   <label className = "Table-Name"> {props.name} </label>
   <div className  = "Row"> <div className = "Header-Cell">{props.secondaryH}</div> <div className = "Header-Cell">מס"ז</div> </div>                
   {Data.slice(0,9).map((e)=><div key = {e._id} className  = "Row"> <div className = "Cell">{e.Type?e.Type:e.Location}</div> <div  className = "Cell">{e.ID}</div> </div>)}
</div>);
};

export default SmallTable;