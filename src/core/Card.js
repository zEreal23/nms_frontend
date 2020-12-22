import React from "react";

import ShowImage from './ShowImage'

const Card = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
            <ShowImage item={product} url="product"/>
          <p>{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
