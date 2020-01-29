import React from "react";
import './Form.css'

const Form = (props) => {
    return(
    <div className="main-form">
        <div id="login" className="form">
            <h2>{props.title}</h2>
            <form onSubmit={props.function} className="campos-form">
                {props.children}
            </form>
        </div>
    </div>

    )
};
export default Form;