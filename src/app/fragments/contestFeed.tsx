import styles from "./contestFeed.module.scss";

export default async function ContestFeed() {

    const leaguesData = await fetch('http://localhost:1337/api/leagues')
    const leagues = await leaguesData.json()

    const tournamentsData = await fetch('http://localhost:1337/api/tournaments')
    const tournaments = await tournamentsData.json()

    return (
        <div className={styles.contestFeed}>
            <p className={styles.contestFeed__header}>Rozgrywki ligowe</p>
            <div className={styles.contestFeed__list}>
                {leagues.data.map(league => (
                    <div key={league.id}>
                        <p>{league.name}</p>
                    </div>
                ))}
            </div>
            <p className={styles.contestFeed__header}>Turnieje</p>
            <div className={styles.contestFeed__list}>
                {tournaments.data.map(tournament => (
                    <div key={tournament.id}>
                        <p>{tournament.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}