import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import styles from './matchInfo.module.scss';
import Avatar from "@/components/avatar";
import Link from "next/link";

export default function MatchInfo({match, matchReport}) {

    const dateSource = Date.parse(match?.datetime);
    const dateValue = new Date(dateSource)

    const homeScore = matchReport?.goals.filter(goal => goal.team === 'home').length
    const awayScore = matchReport?.goals.filter(goal => goal.team === 'away').length

    return (
        <ClassicBox>
            <ClassicHeader>
                <p>Mecz</p>
            </ClassicHeader>
            <div className={styles.matchInfo}>
                {match ? (
                    <div className={styles.matchInfo__wrapper}>
                        <div className={styles.matchInfo__teamWrapper}>
                            <Avatar className={styles.matchInfo__logotype} src={match.homeTeam ? match.homeTeam.logotype?.formats.thumbnail.url : ''}
                                    alt={match.homeTeam ? match.homeTeam.logotype?.alternativeText : ''} width={80} height={80}/>
                            {match.homeTeam ? (
                                <Link href={`/druzyny/${match.homeTeam.slug}`}>{match.homeTeam.name}</Link>
                            ) : (
                                <p>TBA</p>
                            )}
                        </div>
                        <div className={styles.matchInfo__info}>
                            {match.stage && <p className={styles.matchInfo__infoParagraph}>{match.stage}</p>}
                            <p className={styles.matchInfo__infoParagraph}>{dateValue.toLocaleDateString()}r.,
                                godz. {dateValue.toLocaleTimeString().slice(0, -3)}</p>
                            <p className={styles.matchInfo__infoParagraph}>{match.location}</p>
                            {match.referee && <p className={styles.matchInfo__infoParagraph}>{`Sędzia: ${match.referee.name} ${match.referee.surname}`}</p>}
                            {matchReport ? (
                                <p className={styles.matchInfo__score}>{`${homeScore}-${awayScore}`}</p>
                            ) : (
                                <p className={styles.matchInfo__score}>-</p>
                            )}
                        </div>
                        <div className={styles.matchInfo__teamWrapper}>
                            <Avatar className={styles.matchInfo__logotype} src={match.awayTeam ? match.awayTeam.logotype?.formats.thumbnail.url : ''}
                                    alt={match.awayTeam ? match.awayTeam.logotype?.alternativeText : ''} width={80} height={80}/>
                            {match.awayTeam ? (
                                <Link href={`/druzyny/${match.awayTeam.slug}`}>{match.awayTeam.name}</Link>
                            ) : (
                                <p>TBA</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className={styles.matchInfo__empty}>Ładowanie...</p>
                )}
            </div>
        </ClassicBox>
    )
}