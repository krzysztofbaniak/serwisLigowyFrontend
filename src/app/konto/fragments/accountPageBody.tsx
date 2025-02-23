'use client'
import {useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import ProfileEmpty from "@/fragments/user/profileEmpty";
import Account from "@/fragments/user/account";
import Profile from "@/fragments/user/profile";
import RefereeMain from "@/app/konto/fragments/refereeMain";
import styles from './accountPageBody.module.scss';
import {UserContext} from "@/app/providers";
import PlayerMain from "@/app/konto/fragments/playerMain";
import SportingDirectorMain from "@/app/konto/fragments/sportingDirectorMain";

export default function AccountPageBody() {

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
        <div className={styles.column}>
            {profile && !profile.name ? (
                <ProfileEmpty/>
            ) : (
                <>
                    {profile && <Profile profile={profile} placeholder={userData.placeholder} />}
                    {userData.data && userData.data['accountType'] === 'referee' && (
                        <RefereeMain profile={profile} />
                    )}
                    {userData.data && userData.data['accountType'] === 'player' && (
                        <PlayerMain profile={profile} />
                    )}
                    {userData.data && userData.data['accountType'] === 'sportingDirector' && (
                        <SportingDirectorMain profile={profile} />
                    )}
                </>
            )}
            <Account/>
        </div>
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