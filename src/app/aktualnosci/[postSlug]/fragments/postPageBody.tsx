'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import Post from "@/fragments/post/post";
import PostFeed from "@/fragments/post/postFeed";
import styles from './postPageBody.module.scss';

export default function PostPageBody() {
    const params = useParams<{ postSlug: string; }>()

    const [post, setPost] = useState(null)
    const [posts, setPosts] = useState({data: [], placeholder: 'Ładowanie...'});

    useEffect(() => {
        async function fetchPost() {
            let apiUrl = `${process.env.apiHost}/api/posts?populate=*&filters[slug][$eq]=${params.postSlug}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setPost(data.data[0])
        }

        async function fetchPosts() {
            let apiUrl = `${process.env.apiHost}/api/posts?populate=image&filters[slug][$ne]=${params.postSlug}&pagination[limit]=3&sort=createdAt:desc`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setPosts({data: data.data, placeholder: 'Brak wpisów'})
        }

        fetchPost()
        fetchPosts()
    }, [])

    return (
        <div className={styles.column}>
            <Post post={post} />
            <PostFeed posts={posts.data} placeholder={posts.placeholder}/>
        </div>
    )
}