'use client';
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import CompetitionInfo from "@/fragments/competition/competitionInfo";
import PostFeed from "@/fragments/post/postFeed";
import styles from './tournamentPostsPageBody.module.scss'

export default function TournamentPostsPageBody() {
    const params = useParams<{ tournamentSlug: string; }>()

    const [tournament, setTournament] = useState(null)
    const [posts, setPosts] = useState({data: [], placeholder: 'Ładowanie...'});
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
        async function fetchPosts() {
            let apiUrl = `${process.env.apiHost}/api/posts?populate=image&filters[relatedCompetition][documentId][$eq]=${tournament?.documentId}&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setPosts((posts)=> {
                return {
                    data: pagination.start === 0 ? data.data : posts.data.concat(data.data),
                    placeholder: 'Brak wpisów'
                }
            })
            setPagination(data.meta.pagination)
        }
        if(tournament)
            fetchPosts()
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
            <CompetitionInfo competition={tournament} returnLink={`/turnieje/${tournament?.slug}`} />
            <PostFeed posts={posts.data} placeholder={posts.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined}/>
        </div>
    )
}