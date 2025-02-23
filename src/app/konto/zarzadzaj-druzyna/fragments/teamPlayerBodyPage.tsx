'use client'
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import TeamRegisteredPlayers from "@/fragments/team/teamRegisteredPlayers";

export default function TeamPlayerBodyPage() {

    const [userData, setUserData] = useState({data: null, placeholder: 'Ładowanie...'})
    const [cookies, setCookie] = useCookies(['access_token']);
    const [players, setPlayers] = useState({data: [], placeholder: 'Ładowanie...'});

    useEffect(() => {
        async function fetchProfile() {
            let apiUrl = `${process.env.apiHost}/api/users/me?populate[0]=SportingDirectorProfile&populate[sportingDirectorProfile][populate][1]=team`;
            const res = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            })
            const data = await res.json()
            setUserData({data: data, placeholder: 'Błąd przy ładowaniu profilu'});
        }
        fetchProfile()
    }, [])

    useEffect(() => {
        async function fetchPlayers() {
            let apiUrl = `${process.env.apiHost}/api/players?populate=image&filters[team][documentId][$eq]=${userData.data.sportingDirectorProfile.team.documentId}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setPlayers({data: data.data, placeholder: 'Brak piłkarzy'})
        }
        if(userData.data?.sportingDirectorProfile)
            fetchPlayers()
    }, [userData])

    console.log(players)

    return (
        <div>
            <TeamRegisteredPlayers players={players} teamId={userData.data?.sportingDirectorProfile.team.documentId} />
        </div>
    )
}