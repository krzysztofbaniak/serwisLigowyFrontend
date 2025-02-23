import Image from "next/image";
import styles from './competitionEntry.module.scss'
import Link from "next/link";
import Avatar from "@/components/avatar";

export default function CompetitionEntry({competition}) {
    const linkCategory = competition.competitionType === 'league' ? 'ligi' : 'turnieje';

    return (
        <Link className={styles.competitionEntry} href={`/${linkCategory}/${competition.slug}`}>
            <div className={styles.competitionEntry__wrapper}>
                <Avatar className={styles.competitionEntry__logotype} src={competition.logotype ? competition.logotype[0]?.formats?.thumbnail?.url : null} alt={competition.name} width={40} height={40}/>
                <p className={styles.competitionEntry__title}>{competition.name}</p>
                <p className={styles.competitionEntry__location}>{`${competition.voivodeship}, ${competition.city}`}</p>
                {competition.reward && <p className={styles.competitionEntry__reward}>Nagroda: {competition.reward}</p>}
            </div>
        </Link>
    )
}