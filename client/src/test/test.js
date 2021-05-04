const Test = (props) =>{
    let array = props.items.map(item =><div>{props.item}</div> );
    return(
        <div>{array}</div>
    )
};
export default Test;