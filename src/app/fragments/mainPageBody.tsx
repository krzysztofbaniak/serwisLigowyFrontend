'use client';
import PostFeed from "@/fragments/post/postFeed";
import {useEffect, useState} from "react";

export default function MainPageBody() {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            let apiUrl = `${process.env.apiHost}/api/posts?populate=*&pagination[limit]=10&sort=createdAt:desc`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setPosts(data.data)
        }
        fetchPosts()
    }, [])

    return (
        <PostFeed posts={posts} redirectLink={`/aktualnosci`}/>
    )
}