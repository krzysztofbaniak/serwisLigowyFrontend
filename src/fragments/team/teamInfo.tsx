import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import Avatar from "@/components/avatar";
import styles from './teamInfo.module.scss';
import Link from "next/link";

export default function TeamInfo({team, emptyText, returnLink}) {
    return (
        <ClassicBox>
            <ClassicHeader>
                <>
                    {returnLink && <Link className={styles.returnLink} href={returnLink}>◀&nbsp;Powrót</Link>}
                    <p>Drużyna</p>
                </>
            </ClassicHeader>
            <div className={styles.teamInfo}>
                {team ? (
                    <div className={styles.teamInfo__wrapper}>
                        <Avatar className={styles.teamInfo__image} src={team.logotype?.url} alt={team.logotype?.alternativeText} width={80} height={80} />
                        <p className={styles.teamInfo__teamName}>{team.name}</p>
                        <p className={styles.teamInfo__additionalInfo}>{`${team.voivodeship}, ${team.city}`}</p>
                    </div>
                ) : (
                    <div className={styles.teamInfo__empty}>
                        {emptyText}
                    </div>
                )}
            </div>
        </ClassicBox>
    )
}