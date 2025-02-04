'use client';
import {useEffect, useState} from "react";
import MatchFeed from "@/fragments/match/matchFeed";
import Select from "react-select";
import {voivodeshipsSelectOptions} from "@/config/voivodeships";
import NoSSR from "@/components/noSSR";

export default function MatchListingPageBody() {

    const [voivodeship, setVoivodeship] = useState(null);
    const [matches, setMatches] = useState({data: [], placeholder: 'Ładowanie...'});
    const [pagination, setPagination] = useState<any>({
        "start": 0,
        "limit": 20,
        "total": undefined
    });

    useEffect(() => {
        async function fetchMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[matchReport][$null]=true&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            if(voivodeship) {
                apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[matchReport][$null]=true&filters[voivodeship][$eq]=${voivodeship}&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            }
            const res = await fetch(apiUrl)
            const data = await res.json()
            setMatches((matches)=> {
                return {
                    data: pagination.start === 0 ? data.data : matches.data.concat(data.data),
                    placeholder: 'Brak wpisów'
                }
            })
            setPagination(data.meta.pagination)
        }
        fetchMatches()
    }, [voivodeship])

    useEffect(() => {
        async function updateMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[matchReport][$null]=true&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            if(voivodeship) {
                apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[matchReport][$null]=true&filters[voivodeship][$eq]=${voivodeship}&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            }
            const res = await fetch(apiUrl)
            const data = await res.json()
            setMatches((matches)=> {
                return {
                    data: pagination.start === 0 ? data.data : matches.data.concat(data.data),
                    placeholder: 'Brak wpisów'
                }
            })
            setPagination(data.meta.pagination)
        }
        if(pagination.start > 0)
            updateMatches()
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
            <MatchFeed voivodeshipSelect={setVoivodeship} matches={matches.data} placeholder={matches.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined}/>
        </div>
    )
}