"use client"
import React,{useState, useEffect} from 'react'
import UserContext from './userContext'
import {toast } from "react-toastify";
import { httpAxios } from '@/helper/httpHelper';
import { currentUser } from '@/services/userService';



const UserProvider = ({children}) => {
    const [user, setUser] = useState(undefined);


    useEffect(()=>{

        async function load(){
            try {
                const logUser = await currentUser();
                console.log(logUser);
                setUser({...logUser});
                
            } catch(error) {
                console.log(error);
                //toast.error("error in loading current user");
                setUser(undefined);
            }
        }
        if(!user)  load();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>

    );
};

export default UserProvider
