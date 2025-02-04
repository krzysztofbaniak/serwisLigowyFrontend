'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import styles from "./teamMatchesPageBody.module.scss";
import TeamInfo from "@/fragments/team/teamInfo";
import MatchFeed from "@/fragments/match/matchFeed";

export default function TeamMatchesPageBody() {
    const params = useParams<{ teamSlug: string; }>()

    const [team, setTeam] = useState({data: null, placeholder: 'Ładowanie...'})
    const [matches, setMatches] = useState({data: [], placeholder: 'Ładowanie...'});
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
        async function fetchMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate=*&filters[$or][0][awayTeam][documentId]=${team.data.documentId}&filters[$or][1][homeTeam][documentId]=${team.data.documentId}&filters[matchReport][$null]=true&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
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
        if(team.data)
            fetchMatches()
        else
            setMatches({data: [], placeholder: 'Brak meczów'})
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
            <MatchFeed matches={matches.data} placeholder={matches.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined}/>
        </div>
    )
}