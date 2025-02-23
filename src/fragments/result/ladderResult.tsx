import Avatar from "@/components/avatar";
import styles from './ladderResult.module.scss';

export default function LadderResult({stage}) {

    const match = stage.match;
    const rematch = stage.rematch;

    if(match) {
        const homeResult = {match: match.matchReport ? match.matchReport.goals.filter(goal => goal.team === 'home').length : '-', rematch: null}
        const awayResult = {match: match.matchReport ? match.matchReport.goals.filter(goal => goal.team === 'away').length : '-', rematch: null}

        if(rematch) {
            homeResult.rematch = rematch.matchReport ? rematch.matchReport.goals.filter(goal => goal.team === 'away').length : '-'
            awayResult.rematch = rematch.matchReport ? rematch.matchReport.goals.filter(goal => goal.team === 'away').length : '-'
        }

        return (
            <div className={styles.ladderResult}>
                <div className={styles.ladderResult__team}>
                    <Avatar width={24} height={24} src={match.homeTeam ? match.homeTeam.logotype?.url : ''}  alt={match.homeTeam ? match.homeTeam.logotype?.name : ''}/>
                    <p className={styles.ladderResult__teamName}>{match.homeTeam ? match.homeTeam.name : 'TBA'}</p>
                </div>
                <div className={styles.ladderResult__team}>
                    <Avatar width={24} height={24} src={match.awayTeam ? match.awayTeam.logotype?.url : ''} alt={match.awayTeam ? match.awayTeam.logotype?.name : ''}/>
                    <p className={styles.ladderResult__teamName}>{match.awayTeam ? match.awayTeam.name : 'TBA'}</p>
                </div>
                <p className={styles.ladderResult__score}>{homeResult.match}</p>
                <p className={styles.ladderResult__score}>{awayResult.match}</p>
                {rematch && (
                    <>
                        <p className={styles.ladderResult__score}>{homeResult.rematch}</p>
                        <p className={styles.ladderResult__score}>{awayResult.rematch}</p>
                    </>
                )}
            </div>
        )
    }

    return null

}