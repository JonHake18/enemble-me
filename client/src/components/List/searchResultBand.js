import React from "react";

const SearchResultBand = (props) => {
  return (
     <div className="row">
          <div className="col-sm-4">
               <h4>{props.bandName}</h4>
               <p>{props.bandDescription}</p>
          </div>
          <div className="col-sm-4">
               {props.instruments.map((instrument, index)=>{
                    return <h5 key={props.userId + ":" + index}>Looking for {props.experience[index]} years experience playing the {instrument}</h5>
               })}
          </div>
          <div className="col-sm-4">
               <button className="btn-primary" data-user={props.userId} type="submit">View Profile</button>
          </div>
     </div>
  );
};

export default SearchResultBand;