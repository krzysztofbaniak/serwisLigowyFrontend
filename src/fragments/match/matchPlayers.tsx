import ClassicHeader from "@/components/classicHeader";
import ClassicBox from "@/components/classicBox";
import styles from './matchPlayers.module.scss';

export default function MatchPlayers({matchReport}) {

    const homePlayersStarters = matchReport.homePlayers.filter(player => player.starter);
    const awayPlayersStarters = matchReport.awayPlayers.filter(player => player.starter);
    const homePlayersBench = matchReport.homePlayers.filter(player => !player.starter)
    const awayPlayersBench = matchReport.awayPlayers.filter(player => !player.starter)

    return (
        <ClassicBox>
            <>
                <ClassicHeader><p>Składy</p></ClassicHeader>
                <p className={styles.matchPlayers__headline}>Skład wyjściowy</p>
                <div className={styles.matchPlayers__teamsWrapper}>
                    <div className={styles.matchPlayers__list}>
                        {homePlayersStarters.map((player) => {
                            return (
                                <p key={player.id}>
                                    {`${player.number}. ${player.fullname}`}
                                </p>
                            )
                        })}
                    </div>
                    <div className={styles.matchPlayers__list}>
                        {awayPlayersStarters.map((player) => {
                            return (
                                <p key={player.id}>
                                    {`${player.number}. ${player.fullname}`}
                                </p>
                            )
                        })}
                    </div>
                </div>
                {(homePlayersBench.length > 0 || awayPlayersBench.length) > 0 && (
                    <>
                        <p className={`${styles.matchPlayers__headline} ${styles.border}`}>Rezerwowi</p>
                        <div className={styles.matchPlayers__teamsWrapper}>
                            <div>
                                {homePlayersBench.map((player) => {
                                    return (
                                        <div key={player.id}>
                                            {`${player.number}. ${player.fullname}`}
                                        </div>
                                    )
                                })}
                            </div>
                            <div>
                                {awayPlayersBench.map((player) => {
                                    return (
                                        <div key={player.id}>
                                            {`${player.number}. ${player.fullname}`}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )}
            </>
        </ClassicBox>
    )
}