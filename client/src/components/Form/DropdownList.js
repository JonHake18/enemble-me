import React from "react";

const DropdownList = props => 
    <select className="custom-select" id={props.id} onChange={props.onChange} name={props.name}>{props.data.map((x,y) => <option key={y} index={y}>{x}</option>)}</select>;

export default DropdownList;


