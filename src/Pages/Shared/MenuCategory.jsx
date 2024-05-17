import React from "react";
import MenuItems from "./MenuItems";
import Cover from "./Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, img, title }) => {
  return (
    <div className="pt-12">
      {title && <Cover img={img} title={title}></Cover>}

      <div className="grid md:grid-cols-2 gap-5 mt-20">
        {items.map((item) => (
          <MenuItems key={item._id} item={item}></MenuItems>
        ))}
      </div>
      <Link to={`/order/${title}`}>
        
        <button className="btn btn-outline btn-info border-0 border-b-4 mt-8">
          Order Now
        </button>
      </Link>
    </div>
  );
};

export default MenuCategory;
