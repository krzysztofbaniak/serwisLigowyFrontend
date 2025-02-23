'use client'
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import Profile from "@/fragments/user/profile";
import RecruitmentFeed from "@/fragments/recruitments/recruitmentFeed";
import styles from './accountTeamsPageBody.module.scss';

export default function AccountTeamsPageBody() {

    const [userData, setUserData] = useState({data: null, placeholder: 'Ładowanie...'})
    const [recruitments, setRecruitments] = useState({data: [], placeholder: 'Ładowanie...'});
    const [cookies, setCookie] = useCookies(['access_token']);
    const [profile, setProfile] = useState(null);
    const [voivodeship, setVoivodeship] = useState(null);
    const [pagination, setPagination] = useState<any>({
        "start": 0,
        "limit": 5,
        "total": undefined
    });

    useEffect(() => {
        async function fetchProfile() {
            let apiUrl = `${process.env.apiHost}/api/users/me?populate=playerProfile`;
            const res = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            })
            const data = await res.json()
            setUserData({data: data, placeholder: 'Błąd przy ładowaniu profilu'});
        }
        fetchProfile()
    }, [])

    useEffect(() => {
        const {accountType} = userData.data || {};
        if(userData.data && userData.data[`${accountType}Profile`])
            setProfile(userData.data[`${accountType}Profile`])
    }, [userData]);

    useEffect(() => {
        async function fetchRecruitments() {
            let apiUrl = `${process.env.apiHost}/api/recruitments?populate=team&filter[active]=true${voivodeship ? `&filters[voivodeship][$eq]=${voivodeship}` : ''}&sort=datetime:asc&pagination[limit]=${pagination.limit}&pagination[start]=0`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setRecruitments({data: data.data, placeholder: 'Brak naborów'})
            setPagination(data.meta.pagination)
        }

        if(profile?.documentId) {
            fetchRecruitments()
        }
    }, [profile, voivodeship])

    useEffect(() => {
        async function updateEmptyMatches() {
            let apiUrl = `${process.env.apiHost}/api/recruitments?populate=team&filter[active]=true${voivodeship ? `&filters[voivodeship][$eq]=${voivodeship}` : null}&sort=datetime:asc&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setRecruitments((matches)=> {
                return {
                    data: pagination.start === 0 ? data.data : matches.data.concat(data.data),
                    placeholder: 'Brak naborów'
                }
            })
            setPagination(data.meta.pagination)
        }
        if(pagination.start > 0)
            updateEmptyMatches()
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
        <div className={styles.column}>
            <Profile profile={profile} returnLink={'/konto'}/>
            <RecruitmentFeed voivodeshipSelect={setVoivodeship} title={'Najbliższe nabory do drużyn'} recruitments={recruitments.data} placeholder={recruitments.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined}/>
        </div>
    )
}