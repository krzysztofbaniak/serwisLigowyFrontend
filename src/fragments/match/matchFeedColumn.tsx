'use client';
import styles from './matchFeedColumn.module.scss';
import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function MatchFeedColumn() {

    const [matches, setMatches] = useState([])

    useEffect(() => {
        async function fetchMatches() {
            const date = new Date().toLocaleDateString("en-CA");
            let url = `${process.env.apiHost}/api/matches?populate=*&filters[datetime][$gte]=2025-02-01&sort=datetime:asc`;
            const res = await fetch(url)
            const data = await res.json()
            setMatches(data.data)
        }
        fetchMatches()
    }, [])

    return (
        <div className={styles.matchFeed}>
            <ClassicBox redirect={'/mecze'} condition={matches && matches.length > 0}>
                <ClassicHeader><h2>Najbliższe mecze</h2></ClassicHeader>
                <div className={styles.matchFeed__list}>
                    {matches && matches.length > 0 ?
                        matches.map(match => {
                        const dateSource = Date.parse(match.datetime);
                        const dateValue = new Date(dateSource)
                        console.log(match)

                        return (
                            <Link href={`/mecze/${match.id}`} className={styles.matchFeed__entry} key={match.id}>
                                <p className={styles.matchFeed__teamName}>{match.homeTeam.name}</p>
                                <p className={styles.matchFeed__teamName}>{match.awayTeam.name}</p>
                                <p className={styles.matchFeed__smallDetails}>{dateValue.toLocaleDateString().slice(0, -5)}</p>
                                <p className={styles.matchFeed__smallDetails}>{dateValue.toLocaleTimeString().slice(0, -3)}</p>
                            </Link>
                        )
                    }): (
                        <p className={styles.matchFeed__empty}>Ładowanie...</p>
                    )}
                </div>
            </ClassicBox>
        </div>
    )
}