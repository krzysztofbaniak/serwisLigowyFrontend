'use client';

import {createContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";

const defaultUserValues: any = {currentUserId: null, currentUserName: '', handleUserChange: ()=> {}, checkIfUserIsAuth: () => {}, handleUserLogout: () => {}};

export const UserContext = createContext(defaultUserValues);

export function Providers({ children }) {

    const [currentUserId, setCurrentUserId] = useState(defaultUserValues.currentUserId);
    const [currentUserName, setCurrentUserName] = useState(defaultUserValues.currentUserName);
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

    useEffect(()=> {
        if(typeof window !== 'undefined') {
            const items = JSON.parse(localStorage.getItem('currentUser')) || {currentUserId: null, currentUserName: ''}
            setCurrentUserId(items.currentUserId);
            setCurrentUserName(items.currentUserName);
        }
    }, [])

    const handleUserChange = (id, name) => {
        setCurrentUserId(id)
        setCurrentUserName(name)
        localStorage.setItem('currentUser', JSON.stringify({currentUserId: id, currentUserName: name}));
    }

    const checkIfUserIsAuth = () => {
        return currentUserId !== null;
    }

    const handleUserLogout = () => {
        removeCookie('access_token');
        setCurrentUserId(defaultUserValues.currentUserId)
        setCurrentUserName(defaultUserValues.currentUserName)
        localStorage.removeItem('currentUser');
    }

    return (
        <UserContext.Provider value={{currentUserId, currentUserName, handleUserChange, checkIfUserIsAuth, handleUserLogout}}>
            {children}
        </UserContext.Provider>
    );
}