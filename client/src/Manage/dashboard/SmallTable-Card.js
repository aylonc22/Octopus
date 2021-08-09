import {React,useEffect,useState }from 'react';

const SmallTable = props=>{
    const [Data,setData] = useState([]);
    useEffect(()=>{
        props.arrt.getAllTable.then(res=>//props.getAllTable
            {
                //console.log(res.data.data);
                res.data?setData(res.data.data?res.data.data:[]):console.log()
                //console.log(res.data.data);
            });
        //eslint-disable-next-line
        },[props.arrt]);
       
        // get  count and pick count element in the array "DATA"
        const random = (number)=>{
            let result = [];
           // if array is not long enough return the length of the array
            let loop = Data.length<number?Data.length:number;
            if(Data.length===0) // if the array is empty return empty array
             return result;
            for(let i=0;i<loop;i++)
            {
                let x = Math.floor(Math.random() * Data.length);
               
                while(result.indexOf(x)!==-1)
                    x = Math.floor(Math.random() * Data.length);
        
                result[i] = x;
            }
            return result;
        }
   return( <div key = {props.arrt.table} className ="Card">           
   <div ></div>
   <div className  = "HeaderRow"> <div className = "Header-Cell">{props.arrt.secondaryH}</div> <div className = "Header-Cell">מס"ז</div> </div>                
   {random(5).map((e)=><div key = {Data[e]._id} className  = "Row"> <div className = "Cell">{Data[e].Type?Data[e].Type:Data[e].Location}</div> <div  className = "Cell">{Data[e].ID}</div> </div>)}
</div>);
};

export default SmallTable;