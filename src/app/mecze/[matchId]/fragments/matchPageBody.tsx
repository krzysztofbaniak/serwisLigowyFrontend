'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import MatchInfo from "@/fragments/match/matchInfo";
import MatchEvents from "@/fragments/match/matchEvents";
import MatchPlayers from "@/fragments/match/matchPlayers";
import styles from './matchPageBody.module.scss';

export default function MatchPageBody() {
    const params = useParams<{ matchId: number; }>()

    const [match, setMatch] = useState(null)
    const [matchReport, setMatchReport] = useState(null)

    useEffect(() => {
        async function fetchMatch() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[awayTeam][populate][0]=logotype&populate[homeTeam][populate][1]=logotype&populate[matchReport][populate][2]=true&populate=referee&filters[id][$eq]=${params.matchId}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setMatch(data.data[0])
        }
        fetchMatch()
    }, [])

    useEffect(() => {
        async function fetchMatchReport() {
            let apiUrl = `${process.env.apiHost}/api/match-reports?populate=*&filter[documentId][$eq]=${match?.matchReport.documentId}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setMatchReport(data.data.filter((matchReport) => matchReport.documentId === match?.matchReport.documentId)[0])
        }
        if(match?.matchReport)
            fetchMatchReport()
    }, [match])

    return (
        <div className={styles.column}>
            <MatchInfo match={match} matchReport={matchReport} />
            { matchReport && (
                <>
                    <MatchEvents matchReport={matchReport} />
                    <MatchPlayers matchReport={matchReport} />
                </>
            )}
        </div>
    )
}