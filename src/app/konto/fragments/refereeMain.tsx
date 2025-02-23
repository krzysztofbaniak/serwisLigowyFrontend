import MatchFeed from "@/fragments/match/matchFeed";
import {useEffect, useState} from "react";

export default function RefereeMain({profile}) {

    const [nextMatches, setNextMatches] = useState({data: [], meta: null, placeholder: 'Ładowanie...'});
    const [emptyMatches, setEmptyMatches] = useState({data: [], meta: null, placeholder: 'Ładowanie...'});

    useEffect(() => {
        async function fetchNextMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[referee][documentId][$eq]=${profile?.documentId}&filters[matchReport][$null]=true&sort=datetime:asc&pagination[limit]=3`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setNextMatches({data: data.data, meta: data.meta, placeholder: 'Brak meczów'})
        }

        async function fetchEmptyMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[lookingForReferee]=true&filters[matchReport][$null]=true&sort=datetime:asc&pagination[limit]=3`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setEmptyMatches({data: data.data, meta: data.meta, placeholder: 'Brak meczów'})
        }

        if(profile?.documentId) {
            fetchNextMatches()
            fetchEmptyMatches()
        }
    }, [profile])

    return (
        <>
            <MatchFeed title={'Twoje najbliższe spotkania'} matches={nextMatches.data} placeholder={nextMatches.placeholder} redirectLink={'/konto/mecze'} />
            <MatchFeed title={'Mecze poszukujące sędziego'} matches={emptyMatches.data} placeholder={emptyMatches.placeholder} redirectLink={'/konto/sugestie'} />
        </>
    )
}