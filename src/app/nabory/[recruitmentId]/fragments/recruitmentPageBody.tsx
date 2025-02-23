'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import Recruitment from "@/fragments/recruitments/recruitment";

export default function RecruitmentPageBody() {
    const params = useParams<{ recruitmentId: string; }>()

    const [recruitment, setRecruitment] = useState(null)

    useEffect(() => {
        async function fetchRecruitment() {
            let apiUrl = `${process.env.apiHost}/api/recruitments?populate=*&filters[id][$eq]=${params.recruitmentId}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setRecruitment(data.data[0])
        }

        fetchRecruitment()
    }, [])
    return (
        <div>
            <Recruitment recruitment={recruitment} />
        </div>
    )
}