import React from "react";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const{social} = useContext(AuthContext)
    const from = location.state?.from?.pathname || '/'
    const handleLogInWithGoogle = () =>{
        social()
        .then(result =>{
            const loggedUser =result.user;
            console.log(loggedUser)
            const user ={
                name:loggedUser.displayName,
                email:loggedUser.email

            }
            fetch('https://bistro-boss-server-ten-teal.vercel.app/users', {
                method:'POST',
                headers:{
                  'content-type': 'application/json'
                },
                body:JSON.stringify(user)
              })
              .then(res => res.json())
              .then(() => {
                
              
                  navigate(from, {replace:true})

                
              })
        })
        .catch(error =>{
            console.log(error.message)
        })
    }
  return (
    <div>
      <div className="divider">OR</div>

     <div className="w-full text-center my-4">
     <button onClick={handleLogInWithGoogle} className="btn btn-circle bg-white">
        <FcGoogle className="text-2xl"></FcGoogle>
      </button>
     </div>
    </div>
  );
};

export default SocialLogin;
