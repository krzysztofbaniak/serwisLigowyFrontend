'use client'
import NoSSR from "@/components/noSSR";
import Select from "react-select";
import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import CompetitionEntry from "@/fragments/competition/competitionEntry";
import {voivodeshipsSelectOptions} from "@/config/voivodeships";
import {useEffect, useState} from "react";
import styles from './competitionList.module.scss';

export default function CompetitionList({type, state, headline}) {
    const [voivodeship, setVoivodeship] = useState(null);
    const [competition, setCompetition] = useState(null)
    const [emptyText, setEmptyText] = useState('Ładowanie...')
    const [pagination, setPagination] = useState<any>({
        "start": 0,
        "limit": 5,
        "total": undefined
    });

    useEffect(() => {
        async function fetchCompetitions() {
            let apiUrl = `${process.env.apiHost}/api/competitions?populate=logotype&filters[state][$eq]=${state}&filters[competitionType][$eq]=${type}&pagination[limit]=${limit}&pagination[start]=0`;
            if(voivodeship) {
                apiUrl = `${process.env.apiHost}/api/competitions?populate=logotype&filters[state][$eq]=${state}&filters[competitionType][$eq]=${type}&filters[voivodeship][$eq]=${voivodeship}&pagination[limit]=${limit}&pagination[start]=0`
            }
            const res = await fetch(apiUrl)
            const data = await res.json()
            if(data.data.length < 1) {
                setEmptyText('Brak rozgrywek')
            }
            setCompetition(data.data)
            setPagination(data.meta.pagination)
        }
        fetchCompetitions()
    }, [voivodeship])

    useEffect(() => {
        async function updateCompetitions() {
            let apiUrl = `${process.env.apiHost}/api/competitions?populate=logotype&filters[state][$eq]=${state}&filters[competitionType][$eq]=${type}&pagination[limit]=5&pagination[start]=${pagination.start}`;
            if(voivodeship) {
                apiUrl = `${process.env.apiHost}/api/competitions?populate=logotype&filters[state][$eq]=${state}&filters[competitionType][$eq]=${type}&filters[voivodeship][$eq]=${voivodeship}&pagination[limit]=5&pagination[start]=${pagination.start}`
            }
            const res = await fetch(apiUrl)
            const data = await res.json()
            if(data.data.length < 1) {
                setEmptyText('Brak rozgrywek')
            }
            setCompetition((competition) => competition.concat(data.data))
        }
        if(pagination.start > 0)
            updateCompetitions()
    }, [pagination.start]);

    const handleLoadMore = () => {
        setPagination((pagination) => {
            return {
                ...pagination,
                start: pagination.start + pagination.limit
            }
        })
    }

    const isMoreContentToLoad = () => {
        return pagination.total > pagination.start + pagination.limit
    }

    return (
        <div className={styles.competitionList}>
            <ClassicBox onClick={isMoreContentToLoad() ? () => handleLoadMore() : undefined} condition={competition?.length}>
                <>
                    <ClassicHeader>
                        <h2>{`${headline} (${competition?.length || 0})`}</h2>
                        <NoSSR><Select placeholder={'Województwo'} className={styles.competitionList__select} onChange={(option) => setVoivodeship(option.value)} options={voivodeshipsSelectOptions}/></NoSSR>
                    </ClassicHeader>
                    <div>
                        {competition?.length > 0 ? competition.map(competition => (
                            <CompetitionEntry key={competition.id} competition={competition}/>
                        )) : <p className={styles.competitionList__empty}>{emptyText}</p>}
                    </div>
                </>
            </ClassicBox>
        </div>
    )
}

const limit = 5;