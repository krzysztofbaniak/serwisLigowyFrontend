import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import Avatar from "@/components/avatar";
import styles from './profile.module.scss';
import Link from "next/link";

export default function Profile({profile, placeholder, returnLink}) {

    return (
        <ClassicBox>
            <>
                <ClassicHeader>
                    <>
                        {returnLink && <Link className={styles.returnLink} href={returnLink}>◀&nbsp;Powrót</Link>}
                        <p>Profil</p>
                        <Link className={styles.editLink} href={'/konto/edytuj'}>Edytuj</Link>
                    </>
                </ClassicHeader>
                <div className={styles.profile}>
                    {profile ? (
                        <div className={styles.profile__wrapper}>
                            <Avatar className={styles.profile__image} src={profile.image?.url || ''} alt={profile.image?.alternativeText || ''} width={80} height={80} />
                            <h1 className={styles.profile__name}>{profile.name} {profile.surname ? profile.surname : null}</h1>
                            <div>
                                {profile.voivodeship && <p>Województwo: {profile.voivodeship}</p>}
                                {profile.city && <p>Miasto: {profile.city}</p>}
                                {profile.birthday && <p>Data urodzenia: {profile.birthday}</p>}
                            </div>
                            <div>
                                {profile.team && <p>Drużyna: <Link className={styles.profile__link} href={`/druzyny/${profile.team.slug}`}>{profile.team.name}</Link></p>}
                                {profile.position && <p>Pozycja: {profile.position}</p>}
                                {profile.favoriteNumber && <p>Ulubiony numer: {profile.favoriteNumber}</p>}
                            </div>
                        </div>
                    ) : (
                        <p className={styles.profile__empty}>{placeholder}</p>
                    )}
                </div>
            </>
        </ClassicBox>
    )
}