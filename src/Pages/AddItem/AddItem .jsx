import React from "react";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
// https://api.imgbb.com/1/upload
const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
  const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit,      reset  } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])
        fetch(img_hosting_url, {
            method:'POST',
            body:formData
        })
        .then(res => res.json())
        .then(imgResponse =>{
           if(imgResponse.success){
            const imgURL = imgResponse.data.display_url;
            const {name, price, category, recipe} = data;
            const newItem = {name, price:parseFloat(price), category, recipe, image:imgURL}
            console.log(newItem)
            axiosSecure.post('/menu', newItem)
            .then(data =>{
              console.log(data.data)
              if(data.data.insertedId){
                reset()
                Swal.fire(
                  'Good job!',
                  'You clicked the button!',
                  'success'
                )
              }
            })
          }
        })

    };
  
  return (
    <div className="w-full px-14">
      <Helmet>
        <title>Bistro Boss | Item</title>
      </Helmet>
      <SectionTitle
        subHeading="What's New"
        heading="Add an item"
      ></SectionTitle>

      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Recipe Name*</span>
          </label>
          <input
            type="text"
            placeholder="recipe name"
            {...register("name", {required: true, maxLength: 120})}
            className="input input-bordered w-full "
          />
        </div>
        <div className="flex">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Category*</span>
          </label>
          <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-bordered">
            <option disabled>
              Pick One
            </option>
            <option>Dessert</option>
            <option>Salad</option>
            <option>Soup</option>
            <option>Pizza</option>
            <option>Drinks</option>
          </select>
        </div>
        <div className="form-control w-full ml-4 ">
          <label className="label">
            <span className="label-text">Price*</span>
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="Type here"
            className="input input-bordered w-full "
          />
        </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipe Details*</span>
          </label>
          <textarea
           {...register("recipe", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="details"
          ></textarea>
         
        </div>
            <div>
                <label className="label">
                    <span className="label-text">Item Image*</span>
                </label>
                <input type="file"
                  {...register("image", { required: true })}
                className="file-input w-full " />

             </div>        
    
        <button className="btn btn-sm mt-5">Add Item  <GiForkKnifeSpoon></GiForkKnifeSpoon></button>
        <input  className="btn btn-sm mt-5"  type="submit" value="Add Item" />
      </form>
    </div>
  );
};

export default AddItem;
