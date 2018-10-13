import React from "react";

const Button = props => (
    <button className={"btn " + props.className}>
        {props.label}
    </button>
);

export default Button;