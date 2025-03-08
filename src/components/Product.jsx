import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";

const Product = (curElem) => {
  const { id, title, images, price, category } = curElem;
  return (
    <NavLink to={`/singleproduct/${id}`}>
      <div className="card">
        <figure>
          <img src={images[0]} alt={title} />
          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{title}</h3>
            <p className="card-data--price">{<FormatPrice price={price} />}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;