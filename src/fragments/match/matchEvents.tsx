import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import styles from './matchEvents.module.scss';

export default function MatchEvents({matchReport}) {

    const firstHalfEvents = matchReport.events.filter((event) => event.minute <= 45)
    const secondHalfEvents = matchReport.events.filter((event) => event.minute > 45)

    return (
        <ClassicBox>
            <>
                <ClassicHeader><p>Przebieg spotkania</p></ClassicHeader>
                <p className={styles.matchEvents__headline}>1. Połowa</p>
                {firstHalfEvents.length > 0 ? firstHalfEvents.map((event) => (
                    <p className={`${styles.matchEvents__event} ${event.team === 'home' ? styles.matchEvents__home : styles.matchEvents__away }`} key={event.id}>{`${event.minute}' ${event.name}`}</p>
                )) : (
                    <p className={styles.matchEvents__empty}>Brak wydarzeń</p>
                )}
                <p className={`${styles.matchEvents__headline} ${styles.border}`}>2. Połowa</p>
                {secondHalfEvents.length > 0 ? secondHalfEvents.map((event) => (
                    <p className={`${styles.matchEvents__event} ${event.team === 'home' ? styles.matchEvents__home : styles.matchEvents__away }`} key={event.id}>{`${event.minute}' ${event.name}`}</p>
                )) : (
                    <p className={styles.matchEvents__empty}>Brak wydarzeń</p>
                )}
            </>
        </ClassicBox>
    )
}