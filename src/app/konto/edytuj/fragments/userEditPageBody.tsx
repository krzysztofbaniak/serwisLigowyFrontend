'use client'
import ProfileEdit from "@/fragments/user/profileEdit";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/app/providers";
import {useCookies} from "react-cookie";
import {
    accountTypesOptions,
    boolOptions,
    keyTranslation,
    positionsOptions,
    voivodeshipsSelectOptions
} from "@/utils/data";

export default function UserEditPageBody() {

    const userContext = useContext(UserContext)
    const [userData, setUserData] = useState({data: null, placeholder: 'Ładowanie...'})
    const [cookies, setCookie] = useCookies(['access_token']);

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

        if (userContext.currentUser?.accountType)
            fetchProfile()
    }, [userContext.currentUser])

    return (
        <>
            {userContext.currentUser?.accountType && userData.data &&
                <ProfileEdit
                    profileData={createProfileEditableData(userData.data[`${userContext.currentUser.accountType}Profile`])}
                    profile={userData.data[`${userContext.currentUser.accountType}Profile`]}
                    model={`${userContext.currentUser.accountType}s`}/>}
        </>
    )
}

function createProfileEditableData(profile) {
    const editableData = []
    if (profile) {
        Object.keys(profile).forEach(function (key) {
            if (['name', 'surname', 'city'].includes(key)) {
                editableData.push({name: key, initialValue: profile[key] || undefined, type: 'text', label: keyTranslation[key]})
            }
            if (['birthday'].includes(key)) {
                editableData.push({name: key, initialValue: profile[key], type: 'date', label: keyTranslation[key]})
            }
            if (['favoriteNumber'].includes(key)) {
                editableData.push({name: key, initialValue: profile[key], type: 'number', label: keyTranslation[key]})
            }
            if (['voivodeship'].includes(key)) {
                editableData.push({
                    name: key,
                    initialValue: profile[key],
                    type: 'select',
                    options: voivodeshipsSelectOptions,
                    label: keyTranslation[key]
                })
            }
            if (['position'].includes(key)) {
                editableData.push({name: key, initialValue: profile[key], type: 'select', options: positionsOptions, label: keyTranslation[key]})
            }
            if (['availableForTeams'].includes(key)) {
                editableData.push({
                    name: key,
                    initialValue: profile[key] ? profile[key] : false,
                    type: 'bool',
                    options: boolOptions,
                    label: keyTranslation[key]
                })
            }
            if (['image'].includes(key)) {
                editableData.push({name: key, initialValue: '', type: 'file', label: keyTranslation[key]})
                editableData.push({name: `${key}File`, initialValue: '', type: 'none'})
            }
        });
    }
    return editableData;
}

function getPopulate(accountType) {
    if (accountType === 'player')
        return '&populate[playerProfile][populate][1]=team&populate[playerProfile][populate][2]=image'
    if (accountType === 'sportingDirector')
        return '&populate[sportingDirectorProfile][populate][1]=team'
    if (accountType === 'referee')
        return '&populate[refereeProfile][populate][1]=image'
    return ''
}