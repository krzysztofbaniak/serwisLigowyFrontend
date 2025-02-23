'use client'
import {useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import Profile from "@/fragments/user/profile";
import MatchFeed from "@/fragments/match/matchFeed";
import styles from './accountResultsPageBody.module.scss';
import {UserContext} from "@/app/providers";
import ResultFeed from "@/fragments/result/resultFeed";

export default function AccountResultsPageBody() {

    const userContext = useContext(UserContext)
    const [userData, setUserData] = useState({data: null, placeholder: 'Ładowanie...'})
    const [scores, setScores] = useState({data: [], placeholder: 'Ładowanie...'});
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
            let apiUrl = `${process.env.apiHost}/api/users/me?populate[0]=${userContext.currentUser.accountType}Profile${userContext.currentUser.accountType === 'player' ? '&populate[playerProfile][populate][1]=team' : null}`;
            const res = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            })
            const data = await res.json()
            setUserData({data: data, placeholder: 'Błąd przy ładowaniu profilu'});
        }
        if(userContext.currentUser?.accountType)
            fetchProfile()
    }, [userContext.currentUser])

    useEffect(() => {
        const {accountType} = userData.data || {};
        if(userData.data && userData.data[`${accountType}Profile`])
            setProfile(userData.data[`${accountType}Profile`])
    }, [userData]);

    useEffect(() => {
        async function fetchScores() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&populate[matchReport][populate][3]=goals&filters[matchReport][$notNull]=true&filters[$or][0][awayTeam][documentId]=${profile.team.documentId}${voivodeship ? `&filters[voivodeship][$eq]=${voivodeship}` : ''}&filters[$or][1][homeTeam][documentId]=${profile.team.documentId}&sort=datetime:asc&pagination[limit]=${pagination.limit}&pagination[start]=0`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setScores({data: data.data, placeholder: 'Brak meczów'})
            setPagination(data.meta.pagination)
        }

        if(profile?.documentId) {
            fetchScores()
        }
    }, [profile, voivodeship])

    useEffect(() => {
        async function updateScores() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&populate[matchReport][populate][3]=goals&filters[matchReport][$notNull]=true&filters[$or][0][awayTeam][documentId]=${profile.team.documentId}${voivodeship ? `&filters[voivodeship][$eq]=${voivodeship}` : ''}&filters[$or][1][homeTeam][documentId]=${profile.team.documentId}&sort=datetime:asc&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setScores((matches)=> {
                return {
                    data: pagination.start === 0 ? data.data : matches.data.concat(data.data),
                    placeholder: 'Brak meczów'
                }
            })
            setPagination(data.meta.pagination)
        }
        if(pagination.start > 0)
            updateScores()
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
            <ResultFeed voivodeshipSelect={setVoivodeship} title={'Mecze poszukujące sędziego'} matches={scores.data} placeholder={scores.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined}/>
        </div>
    )
}