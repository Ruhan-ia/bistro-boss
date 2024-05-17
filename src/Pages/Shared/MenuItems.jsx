import React from "react";

const MenuItems = ({ item }) => {
  const { image, name, price, recipe } = item;
  return (
    <div className="flex space-x-4">
      <div className="avatar">
        <div className="w-[120px] h-[100px] rounded">
          <img style={{borderRadius:'0 200px 200px 200px'}} src={image}/>
        </div>
      </div>
      <div>
        <h3 className="uppercase">{name}----------</h3>
        <p>{recipe}</p>
      </div>
      <p className="text-yellow-600">${price}</p>
    </div>
  );
};

export default MenuItems;
