import './Button.css'
const Button = (props) =>{
return(
<label className ="MyButton" onClick = {props.func}>{props.name}</label>
);
};
export default Button;
