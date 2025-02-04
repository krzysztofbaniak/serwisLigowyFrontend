import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import styles from './teamPlayers.module.scss';

export default function TeamPlayers({team, placeholder}) {
    return (
        <ClassicBox>
            <ClassicHeader><p>Zarejestrowani zawodnicy</p></ClassicHeader>
            <div className={styles.teamPlayers}>
                {team && team.players.length > 0 ? (
                    <div className={styles.teamPlayers__wrapper}>
                        {team.players.map((player) => (
                            <p key={player.id}>{`${player.favoriteNumber}. ${player.name} ${player.surname} (${player.position})`}</p>
                        ))}
                    </div>
                ) : (
                    <p className={styles.teamPlayers__empty}>{placeholder}</p>
                )}
            </div>
        </ClassicBox>
    )
}