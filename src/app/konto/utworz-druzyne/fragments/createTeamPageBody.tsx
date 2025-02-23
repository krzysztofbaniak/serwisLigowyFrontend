'use client'
import CreateTeamForm from "@/fragments/team/createTeamForm";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/app/providers";
import {useCookies} from "react-cookie";

export default function CreateTeamPageBody() {

    const userContext = useContext(UserContext)
    const [userData, setUserData] = useState({data: null, placeholder: 'Ładowanie...'})
    const [cookies, setCookie] = useCookies(['access_token']);
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        async function fetchProfile() {
            let apiUrl = `${process.env.apiHost}/api/users/me?populate[0]=${userContext.currentUser.accountType}Profile`;
            const res = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            })
            const data = await res.json()
            setUserData({data: data, placeholder: 'Błąd przy ładowaniu profilu'});
        }
        if(userContext.currentUser?.accountType)
            fetchProfile()
    }, [userContext.currentUser])


    useEffect(() => {
        const {accountType} = userData.data || {};
        if(userData.data && userData.data[`${accountType}Profile`])
            setProfile(userData.data[`${accountType}Profile`])
    }, [userData]);


    return (
        <CreateTeamForm profile={profile}/>
    )
}