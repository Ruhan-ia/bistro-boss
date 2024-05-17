import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiFillDelete } from "react-icons/ai";
import { FaUserShield } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure()
    const {data:users=[], refetch} = useQuery(['users'], async()=>{
        const  res = await axiosSecure.get('/users')
        return res.data;
    })
    const handleUpdate = user =>{
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method:'PATCH',
        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data)
            if(data.modifiedCount){
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleDelete = (user) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            fetch(`http://localhost:5000/users/${user._id}`, {
              method:'DELETE',
            
            })
            .then(res => res.json())
            .then(data =>{
              console.log(data)
              if(data.deletedCount >0){
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
        <div>
          <h3 className='font-semibold text-3xl text center my-4'>Total users: {users.length}</h3>
          <div className="overflow-x-auto">
  <table className="table table-zebra">
     {/* head  */}
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {
        users.map((user, index) => <tr key={user._id}>
            <th>{index +1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role === 'admin' ? 'admin':
              <button onClick={()=>handleUpdate(user)} className="btn btn-ghost bg-red-600 text-white text-xl"><FaUserShield></FaUserShield></button>}</td>
            <th>
              <button onClick={()=>handleDelete(user)} className="btn btn-ghost bg-red-600 text-white text-xl"><AiFillDelete></AiFillDelete></button>
            </th>
          </tr>)
    }
     
   
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUsers;