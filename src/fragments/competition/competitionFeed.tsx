'use client';
import styles from "./competitionFeed.module.scss";
import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function CompetitionFeed() {
    const [tournaments, setTournaments] = useState({data: [], placeholder: "Ładowanie..."})
    const [leagues, setLeagues] = useState({data: [], placeholder: "Ładowanie..."});

    useEffect(() => {
        async function fetchContests() {
            let tournamentsUrl = `${process.env.apiHost}/api/competitions?filters[state][$eq]=inProgress&filters[competitionType][$eq]=tournament`;
            const tournamentsResponse = await fetch(tournamentsUrl)
            const tournamentsData = await tournamentsResponse.json()
            setTournaments({data: tournamentsData.data, placeholder: 'Brak turniejów'})

            let leaguesUrl = `${process.env.apiHost}/api/competitions?filters[state][$eq]=inProgress&filters[competitionType][$eq]=league`;
            const leagueResponse = await fetch(leaguesUrl)
            const leaguesData = await leagueResponse.json()
            setLeagues({data: leaguesData.data, placeholder: 'Brak rozgrywek'})
        }
        fetchContests()
    }, [])

    return (
        <div className={styles.contestFeed}>
            <ClassicBox redirect={'/ligi'} condition={leagues.data.length > 0}>
                <>
                    <ClassicHeader><h2>Aktywne ligi</h2></ClassicHeader>
                    {leagues.data.length > 0 ? (
                        <div className={styles.contestFeed__list}>
                            {leagues.data.map(league => (
                                <Link href={`/ligi/${league.slug}`} key={league.id} className={styles.contestFeed__entry}>
                                    <p>{league.name}</p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.contestFeed__empty}>{leagues.placeholder}</p>
                    )}
                </>
            </ClassicBox>
            <ClassicBox redirect={'/turnieje'} condition={tournaments.data.length > 0}>
                <>
                    <ClassicHeader><h2>Aktualne turnieje</h2></ClassicHeader>
                    {tournaments.data.length > 0 ? (
                        <div className={styles.contestFeed__list}>
                            {tournaments.data.map(tournament => (
                                <Link href={`/turnieje/${tournament.slug}`} key={tournament.id} className={styles.contestFeed__entry}>
                                    <p>{tournament.name}</p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.contestFeed__empty}>{tournaments.placeholder}</p>
                    )}
                </>
            </ClassicBox>
        </div>
    )
}