'use client';
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import PostFeed from "@/fragments/post/postFeed";
import MatchFeed from "@/fragments/match/matchFeed";
import ResultFeed from "@/fragments/result/resultFeed";
import CompetitionInfo from "@/fragments/competition/competitionInfo";
import styles from './leaguePageBody.module.scss'

export default function LeaguePageBody() {
    const params = useParams<{ leagueSlug: string; }>()

    const [league, setLeague] = useState(null)
    const [posts, setPosts] = useState({data: [], placeholder: 'Ładowanie...'});
    const [matches, setMatches] = useState({data: [], placeholder: 'Ładowanie...'});
    const [scores, setScores] = useState({data: [], placeholder: 'Ładowanie...'});

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
        async function fetchPosts() {
            let apiUrl = `${process.env.apiHost}/api/posts?populate=image&filters[relatedCompetition][documentId][$eq]=${league?.documentId}&pagination[limit]=3`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setPosts({data: data.data, placeholder: 'Brak wpisów'})
        }

        async function fetchMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[competition][documentId][$eq]=${league.documentId}&filters[matchReport][$null]=true&pagination[limit]=20`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setMatches({data: data.data, placeholder: 'Brak meczów'})
        }

        async function fetchScores() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&populate[matchReport][populate][3]=goals&filters[competition][documentId][$eq]=${league.documentId}&filters[matchReport][$notNull]=true&pagination[limit]=20`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setScores({data: data.data, placeholder: 'Brak meczów'})
        }

        if(league) {
            fetchPosts()
            fetchMatches()
            fetchScores()
        }

    }, [league])

    return (
        <div className={styles.column}>
            <CompetitionInfo competition={league}/>
            <PostFeed posts={posts.data} placeholder={posts.placeholder}
                      redirectLink={`/ligi/${league?.slug}/aktualnosci`}/>
            <MatchFeed matches={matches.data} placeholder={matches.placeholder}
                       redirectLink={`/ligi/${league?.slug}/mecze`}/>
            <ResultFeed matches={scores.data} placeholder={matches.placeholder}
                        redirectLink={`/ligi/${league?.slug}/wyniki`}/>
        </div>
    )
}