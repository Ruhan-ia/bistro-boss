import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const FoodCard = ({item}) => {
    const { image, name, price, recipe, _id } = item;
    const {user} = useContext(AuthContext)
    const [ , refetch] = useCart()
    const navigate = useNavigate()
    const location = useLocation()

    const handleAddToCart = item =>{
      console.log(item)
      if(user ){
        const orderItem = {menuId:_id, image, name, price, recipe, email:user.email

        }
        fetch('https://bistro-boss-server-ten-teal.vercel.app/carts',{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(orderItem)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.insertedId){
            refetch()
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
          }
         
        })
      }
      else{
        Swal.fire({
          title: 'Please login to order the food',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Please Login!'
        }).then((result) => {
          if (result.isConfirmed) {
           navigate('/login', {state:{form:location}})
          }
        })
      }
    }
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes"
        />
        <p className="bg-slate-800 text-white px-4 absolute top-0 right-0 me-3 mt-4 ">{price}</p>

      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <p>{price}</p>
        <div className="card-actions justify-center">
        <button onClick={() => handleAddToCart(item)}  className="btn btn-outline btn-info border-0 border-b-4 mt-8">
        Add to Cart
        </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
