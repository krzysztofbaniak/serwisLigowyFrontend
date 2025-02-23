'use client';
import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import styles from './competitionLadder.module.scss';
import {useEffect, useState} from "react";
import {groupBy} from "@/utils/functions";
import LadderResult from "@/fragments/result/ladderResult";

export default function CompetitionLadder({competitionLadder, placeholder}) {

    const [matches, setMatches] = useState({data: [], placeholder: 'Ładowanie...'});

    useEffect(() => {
        async function fetchMatches() {
            let apiUrl = `${process.env.apiHost}/api/matches?populate[0]=*&populate[awayTeam][populate][1]=logotype&populate[homeTeam][populate][2]=logotype&populate[matchReport][populate][3]=goals&filters[competition][documentId][$eq]=${competitionLadder?.relatedCompetition.documentId}`;
            const res = await fetch(apiUrl)
            const data = await res.json()
            setMatches({data: data.data, placeholder: 'Brak meczów'})
        }
        fetchMatches()
    }, [competitionLadder])

    const completeStages = competitionLadder?.stages.map((stage) => {
        if(matches.data.length && stage.match && stage.rematch)
            return {...stage, round: stage.match.stage, match: matches.data.find((match) => match.id === stage.match.id), rematch: matches.data.find((match) => match.id === stage.rematch.id)}
        if(matches.data.length && stage.match)
            return {...stage, round: stage.match.stage, match: matches.data.find((match) => match.id === stage.match.id)}
        return {...stage, round: stage.match.stage}
    })

    const groupByStage = groupBy(['round']);
    const stages = completeStages ? groupByStage(completeStages) : null


    return (
        <ClassicBox>
            <ClassicHeader><p>Drabinka</p></ClassicHeader>
            <div className={styles.competitionLadder}>
                {completeStages ? (
                    <div className={styles.competitionLadder__board}>
                        <div className={styles.competitionLadder__wrapper}>
                            {Object.keys(stages).map((key) => (
                                <div className={styles.competitionLadder__stage} key={key}
                                     style={{order: stages[key].length}}>
                                    <p>{key}</p>
                                    {stages[key].map((stage) => (
                                        <LadderResult key={stage.id} stage={stage}/>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className={styles.competitionLadder__empty}>{placeholder}</p>
                )}
            </div>
        </ClassicBox>
    )
}