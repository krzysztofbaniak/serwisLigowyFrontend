'use client';
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import CompetitionInfo from "@/fragments/competition/competitionInfo";
import ResultFeed from "@/fragments/result/resultFeed";
import styles from './leagueResultsPageBody.module.scss'

export default function LeagueResultsPageBody() {
    const params = useParams<{ leagueSlug: string; }>()

    const [league, setLeague] = useState(null)
    const [scores, setScores] = useState({data: [], placeholder: 'Ładowanie...'});
    const [pagination, setPagination] = useState<any>({
        "start": 0,
        "limit": 20,
        "total": undefined
    });

    useEffect(() => {
        async function fetchLeague() {
            let apiUrl = `${process.env.apiHost}/api/competitions?populate=logotype&filters[slug][$eq]=${params.leagueSlug}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setLeague(data.data[0])
        }
        fetchLeague()
    }, [])

    useEffect(() => {
        async function fetchScores() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&populate[matchReport][populate][3]=goals&filters[competition][documentId][$eq]=${league.documentId}&filters[matchReport][$notNull]=true&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setScores((matches)=> {
                return {
                    data: pagination.start === 0 ? data.data : matches.data.concat(data.data),
                    placeholder: 'Brak wpisów'
                }
            })
            setPagination(data.meta.pagination)
        }
        if(league)
            fetchScores()
        else
            setScores({data: [], placeholder: 'Brak meczów'})
    }, [league, pagination.start])

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
            <CompetitionInfo competition={league} returnLink={`/ligi/${league?.slug}`}/>
            <ResultFeed matches={scores.data} placeholder={scores.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined}/>
        </div>
    )
}