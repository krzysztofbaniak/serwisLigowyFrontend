import Avatar from "@/components/avatar";
import styles from "./matchEntry.module.scss";
import Link from "next/link";

export default function MatchEntry({match}) {

    const dateSource = Date.parse(match.datetime);
    const dateValue = new Date(dateSource)

    return (
        <Link className={styles.matchEntry} href={`/mecze/${match.id}`}>
            <div className={styles.matchEntry__wrapper}>
                <div className={styles.matchEntry__team}>
                    <Avatar width={24} height={24} src={match.homeTeam.logotype?.url}
                            alt={match.homeTeam.logotype?.name}/>
                    <p className={styles.matchEntry__teamName}>{match.homeTeam.name}</p>
                </div>
                <div className={styles.matchEntry__team}>
                    <Avatar width={24} height={24} src={match.awayTeam.logotype?.url}
                            alt={match.awayTeam.logotype?.name}/>
                    <p className={styles.matchEntry__teamName}>{match.awayTeam.name}</p>
                </div>
                <p className={styles.matchEntry__info}>{dateValue.toLocaleDateString()}r.,
                    godz. {dateValue.toLocaleTimeString().slice(0, -3)}</p>
                <p className={styles.matchEntry__info}>{match.location}</p>
            </div>
        </Link>
    )
}