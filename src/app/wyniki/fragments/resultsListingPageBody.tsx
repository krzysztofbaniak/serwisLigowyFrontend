'use client';
import {useEffect, useState} from "react";
import MatchFeed from "@/fragments/match/matchFeed";
import Select from "react-select";
import {voivodeshipsSelectOptions} from "@/utils/data";
import NoSSR from "@/components/noSSR";
import ResultFeed from "@/fragments/result/resultFeed";

export default function ResultsListingPageBody() {

    const [voivodeship, setVoivodeship] = useState(null);
    const [results, setResults] = useState({data: [], placeholder: 'Ładowanie...'});
    const [pagination, setPagination] = useState<any>({
        "start": 0,
        "limit": 20,
        "total": undefined
    });

    useEffect(() => {
        async function fetchResults() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&populate[matchReport][populate][3]=goals&filters[matchReport][$notNull]=true&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            if(voivodeship) {
                apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&populate[matchReport][populate][3]=goals&filters[matchReport][$notNull]=true&filters[voivodeship][$eq]=${voivodeship}&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            }
            const res = await fetch(apiUrl)
            const data = await res.json()
            setResults((matches)=> {
                return {
                    data: pagination.start === 0 ? data.data : matches.data.concat(data.data),
                    placeholder: 'Brak wpisów'
                }
            })
            setPagination(data.meta.pagination)
        }
        fetchResults()
    }, [voivodeship])

    useEffect(() => {
        async function updateResults() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[matchReport][$null]=true&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            if(voivodeship) {
                apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&filters[matchReport][$null]=true&filters[voivodeship][$eq]=${voivodeship}&pagination[limit]=${pagination.limit}&pagination[start]=${pagination.start}`;
            }
            const res = await fetch(apiUrl)
            const data = await res.json()
            setResults((matches)=> {
                return {
                    data: pagination.start === 0 ? data.data : matches.data.concat(data.data),
                    placeholder: 'Brak wpisów'
                }
            })
            setPagination(data.meta.pagination)
        }
        if(pagination.start > 0)
            updateResults()
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
            <ResultFeed voivodeshipSelect={setVoivodeship} matches={results.data} placeholder={results.placeholder} loadFunction={isMoreContentToLoad() ? () => handleLoadMore() : undefined}/>
        </div>
    )
}