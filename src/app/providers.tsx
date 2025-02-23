'use client';

import {createContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";

const defaultUserValues: any = {currentUser: null, handleUserChange: ()=> {}, checkIfUserIsAuth: () => {}, handleUserLogout: () => {}};

export const UserContext = createContext(defaultUserValues);

export function Providers({ children }) {

    const [currentUser, setCurrentUser] = useState(defaultUserValues.currentUser);
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

    useEffect(()=> {
        if(typeof window !== 'undefined') {
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null
            setCurrentUser(currentUser);
        }
    }, [])

    const handleUserChange = (user) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    const checkIfUserIsAuth = () => {
        return !!currentUser && currentUser.id !== null;
    }

    const handleUserLogout = () => {
        removeCookie('access_token');
        setCurrentUser(defaultUserValues.currentUser)
        localStorage.removeItem('currentUser');
    }

    if (!cookies.access_token && (currentUser && currentUser.id !== null)) {
        handleUserLogout()
    }

    return (
        <UserContext.Provider value={{currentUser, handleUserChange, checkIfUserIsAuth, handleUserLogout}}>
            {children}
        </UserContext.Provider>
    );
}