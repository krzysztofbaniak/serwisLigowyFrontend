'use client';
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import CompetitionInfo from "@/fragments/competition/competitionInfo";
import styles from './tournamentMatchesPageBody.module.scss';
import MatchFeed from "@/fragments/match/matchFeed";

export default function TournamentMatchesPageBody() {
    const params = useParams<{ tournamentSlug: string; }>()

    const [tournament, setTournament] = useState(null)
    const [matches, setMatches] = useState({data: [], placeholder: 'Ładowanie...'});
    const [pagination, setPagination] = useState<any>({
        "start": 0,
        "limit": 20,
        "total": undefined
    });

    useEffect(() => {
        async function fetchTournament() {
            let apiUrl = `${process.env.apiHost}/api/competitions?populate=logotype&filters[slug][$eq]=${params.tournamentSlug}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setTournament(data.data[0])
        }
        fetchTournament()
    }, [])

    useEffect(() => {
        async function fetchMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[competition][documentId][$eq]=${tournament.documentId}&filters[matchReport][$null]=true&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setMatches((matches)=> {
                return {
                    data: pagination.start === 0 ? data.data : matches.data.concat(data.data),
                    placeholder: 'Brak wpisów'
                }
            })
            setPagination(data.meta.pagination)
        }
        if(tournament)
            fetchMatches()
        else
            setMatches({data: [], placeholder: 'Brak meczów'})
    }, [tournament, pagination.start])

    const isMoreContentToLoad = () => {
        return pagination.total > pagination.start + pagination.limit
    }

    const handleLoadMore = () => {
        setPagination((pagination) => {
            return {
                ...pagination,
                start: pagination.start + pagination.limit
            }
        })
    }

    return (
        <div className={styles.column}>
            <CompetitionInfo competition={tournament} returnLink={`/turnieje/${tournament?.slug}`}/>
            <MatchFeed matches={matches.data} placeholder={matches.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined}/>
        </div>
    )
}