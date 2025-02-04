'use client'
import {useEffect, useState} from "react";
import PostFeed from "@/fragments/post/postFeed";

export default function PostListingPageBody() {

    const [posts, setPosts] = useState({data: [], placeholder: 'Ładowanie...'});
    const [pagination, setPagination] = useState<any>({
        "start": 0,
        "limit": 20,
        "total": undefined
    });

    useEffect(() => {
        async function fetchPosts() {
            let apiUrl = `${process.env.apiHost}/api/posts?populate=*&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
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
        fetchPosts()
    }, [pagination.start])

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
        <div>
            <PostFeed posts={posts.data} placeholder={posts.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined}/>
        </div>
    )
}