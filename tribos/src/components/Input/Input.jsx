import React, {Fragment} from "react";
import './Input.css'

const Input = (props) => {
    return (
        <Fragment>
            <label htmlFor={props.name}>{props.name.replace(props.name[0], props.name[0].toUpperCase())}:</label>
            <input type={props.type} id={props.name} name={props.name}/>
        </Fragment>
    )
};
export default Input;