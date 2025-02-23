'use client'
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import Profile from "@/fragments/user/profile";
import MatchFeed from "@/fragments/match/matchFeed";
import styles from './accountSuggestionsPageBody.module.scss';

export default function AccountSuggestionsPageBody() {

    const [userData, setUserData] = useState({data: null, placeholder: 'Ładowanie...'})
    const [emptyMatches, setEmptyMatches] = useState({data: [], placeholder: 'Ładowanie...'});
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
            let apiUrl = `${process.env.apiHost}/api/users/me?populate=refereeProfile`;
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
        async function fetchEmptyMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[lookingForReferee]=true&filters[matchReport][$null]=true${voivodeship ? `&filters[voivodeship][$eq]=${voivodeship}` : null}&sort=datetime:asc&pagination[limit]=${pagination.limit}&pagination[start]=0`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setEmptyMatches({data: data.data, placeholder: 'Brak meczów'})
            setPagination(data.meta.pagination)
        }

        if(profile?.documentId) {
            fetchEmptyMatches()
        }
    }, [profile, voivodeship])

    useEffect(() => {
        async function updateEmptyMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[lookingForReferee]=true&filters[matchReport][$null]=true${voivodeship ? `&filters[voivodeship][$eq]=${voivodeship}` : null}&sort=datetime:asc&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setEmptyMatches((matches)=> {
                return {
                    data: pagination.start === 0 ? data.data : matches.data.concat(data.data),
                    placeholder: 'Brak meczów'
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
            <MatchFeed voivodeshipSelect={setVoivodeship} title={'Mecze poszukujące sędziego'} matches={emptyMatches.data} placeholder={emptyMatches.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined}/>
        </div>
    )
}