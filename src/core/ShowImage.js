import React from "react";

import { API } from "../config";

const ShowImage = ({ item, url }) => {
  return (
    <div className="product-img container text-center">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{ height: "70px", width: "auto", borderRadius:'10%'}}
      />
    </div>
  );
};

export default ShowImage;
