import styles from './matchFeed.module.scss';
export default async function MatchFeed() {

    const matchesData = await fetch('http://localhost:1337/api/matches?populate=*')
    const matches = await matchesData.json()

    return (
        <div className={styles.matchFeed}>
            <p className={styles.matchFeed__header}>Mecze</p>
            <div className={styles.matchFeed__list}>
                {matches.data.map(matches => {
                    const dateSource = Date.parse(matches.datetime);
                    const dateValue = new Date(dateSource)

                    return (
                        <div className={styles.matchFeed__article} key={matches.id}>
                            <p className={styles.matchFeed__teamName}>{matches.homeTeam.name}</p>
                            <p className={styles.matchFeed__teamName}>{matches.awayTeam.name}</p>
                            <p className={styles.matchFeed__smallDetails}>{dateValue.toLocaleDateString()}</p>
                            <p className={styles.matchFeed__smallDetails}>{dateValue.toLocaleTimeString()}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}