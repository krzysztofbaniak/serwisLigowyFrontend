'use client'
import CreatePostForm from "@/fragments/post/createPostForm";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/app/providers";
import {useCookies} from "react-cookie";

export default function CreatePostPageBody() {

    const userContext = useContext(UserContext)
    const [userData, setUserData] = useState({data: null, placeholder: 'Ładowanie...'})
    const [cookies, setCookie] = useCookies(['access_token']);
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        async function fetchProfile() {
            let apiUrl = `${process.env.apiHost}/api/users/me?populate[0]=${userContext.currentUser.accountType}Profile${getPopulate(userContext.currentUser.accountType)}`;
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
        <CreatePostForm profile={profile} />
    )
}

function getPopulate(accountType) {
    if(accountType === 'player')
        return '&populate[playerProfile][populate][1]=team&populate[playerProfile][populate][2]=image'
    if(accountType === 'sportingDirector')
        return '&populate[sportingDirectorProfile][populate][1]=team'
    if(accountType === 'referee')
        return '&populate[refereeProfile][populate][1]=image'
    return ''
}