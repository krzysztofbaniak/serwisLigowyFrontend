'use client';
import {useContext, useEffect} from "react";
import {redirect} from "next/navigation";
import {UserContext} from "@/app/providers";

export default function Page() {

    const userData = useContext(UserContext)

    useEffect(()=>{
        userData.handleUserLogout();
        redirect('/')
    },[])
}