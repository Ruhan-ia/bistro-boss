import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase.config';
import axios from 'axios';
export const AuthContext = createContext()
 const auth = getAuth(app)
 const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] =useState(null)
    const [loader, setLoader] = useState(true)
    

    const createUser = (email, password) =>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) =>{
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut= () =>{
        setLoader(true)
        return signOut(auth)
    }
    const social = () =>{
        setLoader(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser)
            setUser(currentUser)
            if(currentUser){
                axios.post('https://bistro-boss-server-ten-teal.vercel.app/jwt', {email:currentUser.email})
                .then(data =>{
                    console.log(data.data.token)
                    localStorage.setItem('access-token', data.data.token)
                    setLoader(false)

                })
            }
            else{
                localStorage.removeItem('access-token')
            }
        })
        return ()=>{
            unsubscribe()
        }
    }, [])
    const authInfo = {
        user,
        loader,
        createUser,
        logIn, 
        social,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;