import {useEffect, useState} from "react";
import MatchFeed from "@/fragments/match/matchFeed";
import ResultFeed from "@/fragments/result/resultFeed";
import RecruitmentFeed from "@/fragments/recruitments/recruitmentFeed";

export default function PlayerMain({profile}) {

    const [matches, setMatches] = useState({data: [], placeholder: 'Ładowanie...'});
    const [scores, setScores] = useState({data: [], placeholder: 'Ładowanie...'});
    const [recruitments, setRecruitments] = useState({data: [], placeholder: 'Ładowanie...'});

    useEffect(() => {
        async function fetchMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[matchReport][$null]=true&filters[$or][0][awayTeam][documentId]=${profile.team.documentId}&filters[$or][1][homeTeam][documentId]=${profile.team.documentId}&sort=datetime:asc&pagination[limit]=3`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setMatches({data: data.data, placeholder: 'Brak meczów'})
        }

        async function fetchScores() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&populate[matchReport][populate][3]=goals&filters[matchReport][$notNull]=true&filters[$or][0][awayTeam][documentId]=${profile.team.documentId}&filters[$or][1][homeTeam][documentId]=${profile.team.documentId}&sort=datetime:asc&pagination[limit]=3`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setScores({data: data.data, placeholder: 'Brak meczów'})
        }

        async function fetchRecruitments() {
            let apiUrl = `${process.env.apiHost}/api/recruitments?populate=team&filter[active]=true`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setRecruitments({data: data.data, placeholder: 'Brak poborów'})
        }

        if(profile?.documentId && profile.team?.documentId) {
            fetchMatches()
            fetchScores()
        } else {
            fetchRecruitments()
        }
    }, [profile])

    return (
        <>
            {(profile?.documentId && profile.team?.documentId) ? (
                <>
                    <MatchFeed title={'Najbliższe spotkania drużyny'} matches={matches.data} placeholder={matches.placeholder} redirectLink={'/konto/mecze'} />
                    <ResultFeed title={'Ostatnie wyniki'} matches={scores.data} placeholder={scores.placeholder} redirectLink={'/konto/wyniki'} />
                </>
            ) : (
                <RecruitmentFeed recruitments={recruitments.data} placeholder={recruitments.placeholder} redirectLink={'/konto/druzyny'} />
            )}
        </>
    )
}