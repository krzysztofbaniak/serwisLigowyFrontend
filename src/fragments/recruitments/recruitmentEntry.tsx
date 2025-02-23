import Link from "next/link";
import styles from "@/fragments/match/matchEntry.module.scss";
import Avatar from "@/components/avatar";

export default function RecruitmentEntry({recruitment}) {

    const dateSource = Date.parse(recruitment.datetime);
    const dateValue = new Date(dateSource)

    console.log(recruitment)

    return (
        <Link href={`/nabory/${recruitment.id}`} className={styles.matchEntry}>
            <div className={styles.matchEntry__wrapper}>
                <p className={styles.matchEntry__name}>{recruitment.name}</p>
                <div className={styles.matchEntry__team}>
                    <Avatar width={24} height={24} src={recruitment.team.logotype?.url}
                            alt={recruitment.team.logotype?.name}/>
                    <p className={styles.matchEntry__teamName}>{recruitment.team.name}</p>
                </div>
                <p className={styles.matchEntry__info}>{recruitment.voivodeship}, {recruitment.city}</p>
                <p className={styles.matchEntry__info}>{dateValue.toLocaleDateString()}r., godz. {dateValue.toLocaleTimeString().slice(0, -3)}</p>
            </div>
        </Link>
    )
}