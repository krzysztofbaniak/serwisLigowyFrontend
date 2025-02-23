import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import styles from "./recruitment.module.scss";
import Image from "next/image";
import Markdown from "react-markdown";
import Link from "next/link";

export default function Recruitment({recruitment}) {

    const dateSource = Date.parse(recruitment?.datetime);
    const dateValue = new Date(dateSource)

    return (
        <ClassicBox>
            <ClassicHeader>
                <Link className={styles.returnLink} href={'/nabory'}>◀&nbsp;Powrót</Link>
                <p>Nabór</p>
            </ClassicHeader>
            <div>
                {recruitment ? (
                    <div>
                        {recruitment.image && (
                            <div className={styles.recruitment__imageHolder}>
                                <Image className={styles.recruitment__image} src={recruitment.image.url}
                                       alt={recruitment.image.alternativeText || recruitment.name} width={696} height={522}/>
                            </div>
                        )}
                        <div className={styles.recruitment__content}>
                            <h1 className={styles.recruitment__headline}>{recruitment.name}</h1>
                            <p className={styles.recruitment__info}>{recruitment.voivodeship}, {recruitment.city}, {recruitment.location}</p>
                            <p className={styles.recruitment__info}>{dateValue.toLocaleDateString()}r., godz. {dateValue.toLocaleTimeString().slice(0, -3)}</p>
                            <Link href={`/druzyny/${recruitment.team.slug}`} className={styles.recruitment__info}>{recruitment.team.name}</Link>
                            <Markdown className={styles.recruitment__markdown}>{recruitment.description}</Markdown>
                        </div>
                    </div>
                ) : (
                    <p className={styles.recruitment__empty}>Ładowanie...</p>
                )}
            </div>
        </ClassicBox>
    )
}