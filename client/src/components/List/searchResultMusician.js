import React from "react";

const SearchResultMusician = (props) => {
  return (
     <div className="row">
          <div className="col-sm-4">
               <h4>{props.firstName} {props.lastName}</h4>
          </div>
          <div className="col-sm-4">
               {props.instruments.map((instrument, index)=>{
                    return <h5 key={props.userId + ":" + index}>{props.experience[index]} years experience playing the {instrument}</h5>
               })}
          </div>
          <div className="col-sm-4">
               <button className="btn-primary" data-user={props.userId} type="submit">View Profile</button>
          </div>
     </div>
  );
};

export default SearchResultMusician;