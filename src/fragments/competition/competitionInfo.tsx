import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import styles from './competitionInfo.module.scss'
import Avatar from "@/components/avatar";
import Link from "next/link";

export default function CompetitionInfo({competition, returnLink}: any) {

    return (
        <ClassicBox>
            <ClassicHeader>
                <>
                    {returnLink && <Link className={styles.returnLink} href={returnLink}>◀&nbsp;Powrót</Link>}
                    <p>Rozgrywki</p>
                </>
            </ClassicHeader>
            <div className={styles.infoWrapper}>
                {competition ? (
                    <>
                        <Avatar src={competition.logotype ? competition.logotype[0]?.url : null} width={80} height={80}
                                alt={competition.logotype ? competition.logotype[0]?.name : ''}/>
                        <div className={styles.infoWrapper__infoList}>
                            <h1 className={styles.infoWrapper__name}>{competition.name}</h1>
                            <p className={styles.infoWrapper__paragraph}>{`${competition.voivodeship}, ${competition.city}`}</p>
                            {competition.reward && <p className={styles.infoWrapper__paragraph}>Nagroda: {competition.reward}</p>}
                        </div>
                    </>
                ) : (
                    <p className={styles.infoWrapper__empty}>Ładowanie...</p>
                )}
            </div>
</ClassicBox>
)
}