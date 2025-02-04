import Avatar from "@/components/avatar";
import styles from "./resultEntry.module.scss";
import Link from "next/link";

export default function ResultEntry({match}) {

    const homeResult = match.matchReport.goals.filter(goal => goal.team === 'home').length
    const awayResult = match.matchReport.goals.filter(goal => goal.team === 'away').length

    return (
        <Link className={styles.resultEntry} href={`/mecze/${match.id}`}>
            <div className={styles.resultEntry__wrapper}>
                <div className={styles.resultEntry__team}>
                    <Avatar width={24} height={24} src={match.homeTeam.logotype?.url}
                            alt={match.homeTeam.logotype?.name}/>
                    <p className={styles.resultEntry__teamName}>{match.homeTeam.name}</p>
                </div>
                <div className={styles.resultEntry__team}>
                    <Avatar width={24} height={24} src={match.awayTeam.logotype?.url}
                            alt={match.awayTeam.logotype?.name}/>
                    <p className={styles.resultEntry__teamName}>{match.awayTeam.name}</p>
                </div>
                <p className={`${styles.resultEntry__score} ${homeResult > awayResult ? styles.win : homeResult < awayResult ? styles.lose : null}`}>{homeResult}</p>
                <p className={`${styles.resultEntry__score} ${awayResult > homeResult ? styles.win : awayResult < homeResult ? styles.lose : null}`}>{awayResult}</p>
            </div>
        </Link>
    )
}