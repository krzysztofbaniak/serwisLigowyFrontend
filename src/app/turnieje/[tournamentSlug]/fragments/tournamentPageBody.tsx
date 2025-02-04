'use client';
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import PostFeed from "@/fragments/post/postFeed";
import MatchFeed from "@/fragments/match/matchFeed";

import styles from "./tournamentPageBody.module.scss";
import ResultFeed from "@/fragments/result/resultFeed";
import CompetitionInfo from "@/fragments/competition/competitionInfo";

export default function TournamentPageBody() {
    const params = useParams<{ tournamentSlug: string; }>()

    const [tournament, setTournament] = useState(null)
    const [posts, setPosts] = useState({data: [], placeholder: 'Ładowanie...'});
    const [matches, setMatches] = useState({data: [], placeholder: 'Ładowanie...'});
    const [scores, setScores] = useState({data: [], placeholder: 'Ładowanie...'});

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
        async function fetchPosts() {
            let apiUrl = `${process.env.apiHost}/api/posts?populate=image&filters[relatedCompetition][documentId][$eq]=${tournament?.documentId}&pagination[limit]=3`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setPosts({data: data.data, placeholder: 'Brak wpisów'})
        }

        async function fetchMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[competition][documentId][$eq]=${tournament.documentId}&filters[matchReport][$null]=true&pagination[limit]=20`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setMatches({data: data.data, placeholder: 'Brak meczów'})
        }

        async function fetchScores() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&populate[matchReport][populate][3]=goals&filters[competition][documentId][$eq]=${tournament.documentId}&filters[matchReport][$notNull]=true&pagination[limit]=20`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setScores({data: data.data, placeholder: 'Brak meczów'})
        }

        if(tournament) {
            fetchPosts()
            fetchMatches()
            fetchScores()
        }

    }, [tournament])

    return (
        <div className={styles.column}>
            <CompetitionInfo competition={tournament}/>
            <PostFeed posts={posts.data} placeholder={posts.placeholder} redirectLink={`/turnieje/${tournament?.slug}/aktualnosci`}/>
            <MatchFeed matches={matches.data} placeholder={matches.placeholder} redirectLink={`/turnieje/${tournament?.slug}/mecze`}/>
            <ResultFeed matches={scores.data} placeholder={matches.placeholder} redirectLink={`/turnieje/${tournament?.slug}/wyniki`}/>
        </div>
    )
}