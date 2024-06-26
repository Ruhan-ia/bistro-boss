import React from "react";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import useMenu from "../../Hooks/useMenu";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure()
  const handleDelete = (item) =>{
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
       axiosSecure.delete(`/menu/${item._id}`)
        
        .then(res =>{
          console.log(res.data)
          if(res.data.deletedCount >0){
            refetch()
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
        }
      })
  }
  return (
    <div className="w-full">
      <SectionTitle
        subHeading="hurry up"
        heading="manage all items"
      ></SectionTitle>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
              #
              </th>
              <th>Item Image</th>
              <th>Category</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
                menu.map((item, index) =>    <tr key={item._id}>
                    <th>
                      {index +1}
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div className="font-bold">
                            {item.name}
                        </div>
                       
                      </div>
                    </td>
                    <td>
                        {item.category}                      
                    </td>
                    <td className="text-right">${item.price}</td>
                    <td>
                      <button className="btn btn-ghost btn-xs">Update</button>
                    </td>
                    <td>
                    <button onClick={()=>handleDelete(item)} className="btn btn-ghost bg-red-600 text-white text-xl"><AiFillDelete></AiFillDelete></button>
                    </td>
                  </tr>)
            }
         
            
          </tbody>
         
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
