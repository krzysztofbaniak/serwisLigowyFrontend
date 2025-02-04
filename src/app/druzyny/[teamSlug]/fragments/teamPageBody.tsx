'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import TeamInfo from "@/fragments/team/teamInfo";
import MatchFeed from "@/fragments/match/matchFeed";
import ResultFeed from "@/fragments/result/resultFeed";
import styles from './teamPageBody.module.scss';
import TeamPlayers from "@/fragments/team/teamPlayers";

export default function TeamPageBody() {
    const params = useParams<{ teamSlug: string; }>()

    const [team, setTeam] = useState({data: null, placeholder: 'Ładowanie...'})
    const [matches, setMatches] = useState({data: [], placeholder: 'Ładowanie...'});
    const [scores, setScores] = useState({data: [], placeholder: 'Ładowanie...'});

    useEffect(() => {
        async function fetchTeam() {
            let apiUrl = `${process.env.apiHost}/api/teams?populate=*&filters[slug][$eq]=${params.teamSlug}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setTeam({data: data.data[0], placeholder: 'Brak drużyny'})
        }
        fetchTeam()
    }, [])

    useEffect(() => {
        async function fetchMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[matchReport][$null]=true&pagination[limit]=20&filters[$or][0][awayTeam][documentId]=${team.data.documentId}&filters[$or][1][homeTeam][documentId]=${team.data.documentId}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setMatches({data: data.data, placeholder: 'Brak meczów'})
        }
        async function fetchScores() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&populate[matchReport][populate][3]=goals&filters[matchReport][$notNull]=true&pagination[limit]=20&filters[$or][0][awayTeam][documentId]=${team.data.documentId}&filters[$or][1][homeTeam][documentId]=${team.data.documentId}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setScores({data: data.data, placeholder: 'Brak wyników'})
        }
        if(team.data) {
            fetchMatches()
            fetchScores()
        }
    }, [team.data]);

    console.log(matches)

    return (
        <div className={styles.column}>
            <TeamInfo team={team.data} emptyText={team.placeholder} />
            <MatchFeed matches={matches.data} placeholder={matches.placeholder} redirectLink={`/druzyny/${params.teamSlug}/mecze`} />
            <ResultFeed matches={scores.data} placeholder={scores.placeholder} redirectLink={`/druzyny/${params.teamSlug}/wyniki`} />
            <TeamPlayers team={team.data} placeholder={team.placeholder} />
        </div>
    )
}