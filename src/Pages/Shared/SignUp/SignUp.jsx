
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin";


const SignUp = () => {

  const navigate = useNavigate()
    
  

    const{createUser}= useContext(AuthContext)

    const handleSignUp = event =>{
        event.preventDefault()
        const form = event.target;
        const name= form.name.value;
        const photo =form.photo.value;
        const email= form.email.value;
        const password =form.password.value;
        console.log(name, photo, email, password)
        createUser(email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser)
            profile(result.user, name, photo)
            
        })
        .catch(error =>{
            console.log(error.message)
        })

        const profile = (user, name, photo) =>{
          updateProfile(user, {
            displayName:name, photoURL:photo
          })
          .then(() =>{
            const user={
              name,
              email:email,
            }
            fetch('https://bistro-boss-server-ten-teal.vercel.app/users', {
              method:'POST',
              headers:{
                'content-type': 'application/json'
              },
              body:JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if(data.insertedId){
               
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Your work has been saved',
                  showConfirmButton: false,
                  timer: 1500
                })
                navigate('/')
              }
            })
          })
          .catch(error =>{
            console.log(error.message)
          })
        }
    }

        
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse w-1/2">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-1/2">
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="url"
                placeholder="photo"
                name="photo"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
            <p>Already have an account?Please  <Link className="font-bold text-blue-500" to='/login'>Login</Link></p>        
            
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};




export default SignUp;