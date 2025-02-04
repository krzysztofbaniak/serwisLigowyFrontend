'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import TeamInfo from "@/fragments/team/teamInfo";
import ResultFeed from "@/fragments/result/resultFeed";
import styles from "./teamResultsPageBody.module.scss";

export default function TeamResultsPageBody() {
    const params = useParams<{ teamSlug: string; }>()

    const [team, setTeam] = useState({data: null, placeholder: 'Ładowanie...'})
    const [scores, setScores] = useState({data: [], placeholder: 'Ładowanie...'});
    const [pagination, setPagination] = useState<any>({
        "start": 0,
        "limit": 20,
        "total": undefined
    });

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
        async function fetchScores() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&populate[matchReport][populate][3]=goals&filters[$or][0][awayTeam][documentId]=${team.data.documentId}&filters[$or][1][homeTeam][documentId]=${team.data.documentId}&filters[matchReport][$notNull]=true&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
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
        if(team.data)
            fetchScores()
        else
            setScores({data: [], placeholder: 'Brak meczów'})
    }, [team, pagination.start])

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
            <TeamInfo team={team.data} emptyText={team.placeholder} returnLink={`/druzyny/${params.teamSlug}`}/>
            <ResultFeed matches={scores.data} placeholder={scores.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined}/>
        </div>
    )
}