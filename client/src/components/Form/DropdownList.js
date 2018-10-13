import React from "react";

const DropdownList = props => 
    <select class="custom-select" id={props.id}>{props.data.map((x,y) => <option key={y}>{x}</option>)}</select>;

export default DropdownList;