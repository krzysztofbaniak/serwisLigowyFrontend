'use client'
import {useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import Profile from "@/fragments/user/profile";
import MatchFeed from "@/fragments/match/matchFeed";
import styles from './accountMatchesPageBody.module.scss';
import {UserContext} from "@/app/providers";

export default function AccountMatchesPageBody() {

    const userContext = useContext(UserContext)
    const [userData, setUserData] = useState({data: null, placeholder: 'Ładowanie...'})
    const [nextMatches, setNextMatches] = useState({data: [], placeholder: 'Ładowanie...'});
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
        async function fetchNextMatches() {
            let apiUrl = relatedMatchesApiURL(userData.data.accountType, profile, voivodeship, pagination, 0);
            const res = await fetch(apiUrl)
            const data = await res.json()
            setNextMatches({data: data.data, placeholder: 'Brak meczów'})
            setPagination(data.meta.pagination)
        }

        if(profile?.documentId) {
            fetchNextMatches()
        }
    }, [profile, voivodeship])

    useEffect(() => {
        async function updateNextMatches() {
            let apiUrl = relatedMatchesApiURL(userData.data.accountType, profile, voivodeship, pagination, pagination.start);
            const res = await fetch(apiUrl)
            const data = await res.json()
            setNextMatches((matches)=> {
                return {
                    data: pagination.start === 0 ? data.data : matches.data.concat(data.data),
                    placeholder: 'Brak meczów'
                }
            })
            setPagination(data.meta.pagination)
        }
        if(pagination.start > 0)
            updateNextMatches()
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
            <MatchFeed voivodeshipSelect={setVoivodeship} title={'Twoje najbliższe spotkania'} matches={nextMatches.data} placeholder={nextMatches.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined}/>
        </div>
    )
}

function relatedMatchesApiURL(accountType, profile, voivodeship, pagination, start) {
    if(accountType === "referee")
        return `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[referee][documentId][$eq]=${profile?.documentId}&filters[matchReport][$null]=true${voivodeship ? `&filters[voivodeship][$eq]=${voivodeship}` : ''}&sort=datetime:asc&pagination[limit]=${pagination.limit}&pagination[start]=${start}`
    if(accountType === "player")
        return `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[matchReport][$null]=true&filters[$or][0][awayTeam][documentId]=${profile.team.documentId}${voivodeship ? `&filters[voivodeship][$eq]=${voivodeship}` : ''}&filters[$or][1][homeTeam][documentId]=${profile.team.documentId}&sort=datetime:asc&pagination[limit]=${pagination.limit}&pagination[start]=${start}`;
    return ''
}