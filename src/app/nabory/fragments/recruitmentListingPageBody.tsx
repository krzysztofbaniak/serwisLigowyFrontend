'use client'
import {useEffect, useState} from "react";
import RecruitmentFeed from "@/fragments/recruitments/recruitmentFeed";

export default function RecruitmentListingPageBody() {

    const [voivodeship, setVoivodeship] = useState(null);
    const [recruitments, setRecruitments] = useState({data: [], placeholder: 'Ładowanie...'});
    const [pagination, setPagination] = useState<any>({
        "start": 0,
        "limit": 20,
        "total": undefined
    });

    useEffect(() => {
        async function fetchRecruitments() {
            let apiUrl = `${process.env.apiHost}/api/recruitments?populate=team&filter[active]=true${voivodeship ? `&filters[voivodeship][$eq]=${voivodeship}` : ''}&pagination[limit]=${pagination.limit}&pagination[start]=0&sort=datetime:asc`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setRecruitments({data: data.data, placeholder: 'Brak poborów'})
        }
        fetchRecruitments()
    }, [voivodeship]);

    useEffect(() => {
        async function updateRecruitments() {
            let apiUrl = `${process.env.apiHost}/api/recruitments?populate=team&filter[active]=true${voivodeship ? `&filters[voivodeship][$eq]=${voivodeship}` : ''}&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}&sort=datetime:asc`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setRecruitments((matches)=> {
                return {
                    data: pagination.start === 0 ? data.data : matches.data.concat(data.data),
                    placeholder: 'Brak wpisów'
                }
            })
            setPagination(data.meta.pagination)
        }
        if(pagination.start > 0)
            updateRecruitments()
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
            <RecruitmentFeed voivodeshipSelect={setVoivodeship} recruitments={recruitments.data} placeholder={recruitments.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined} />
        </div>
    )
}