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
    return(<div className  = "Row"> 
    <div className = "Empty-Cell"></div> <div className = "Empty-Cell"></div> 
     </div>);}):Data.map((data,index)=>{
         console.log(index)
         return <div className  = "Row"> <div className = "Cell">{data.ID}</div> <div className = "Cell">{data.Type?data.Type:data.Location}</div> </div>                
     })
   return( <div className ="Card">           
   <div className  = "Row"> <div className = "Header-Cell">מס"ז</div> <div className = "Header-Cell">{props.secondaryH}</div> </div>                
   {card}
</div>);
};

export default SmallTable;