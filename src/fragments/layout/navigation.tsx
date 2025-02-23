import Link from "next/link";
import {useContext} from "react";
import {UserContext} from "@/app/providers";
import styles from './navigation.module.scss';

export default function Navigation() {

    const userData = useContext(UserContext)

    return (
        <nav className={styles.navigation}>
            <div className={styles.navigation__layout}>
                <Link className={styles.navigation__link} href={'/turnieje'}>Turnieje</Link>
                <Link className={styles.navigation__link} href={'/ligi'}>Ligi</Link>
                <Link className={styles.navigation__link} href={'/mecze'}>Mecze</Link>
                <Link className={styles.navigation__link} href={'/wyniki'}>Wyniki</Link>
                <Link className={styles.navigation__link} href={'/nabory'}>Nabory</Link>
                <Link className={styles.navigation__link} href={'/aktualnosci'}>Aktualności</Link>
                {userData.checkIfUserIsAuth() ? (
                    <>
                        <div className={styles.navigation__account}>
                            <Link className={styles.navigation__link} href={'/konto'}>Konto</Link>
                            <Link className={styles.navigation__link} href={'/wyloguj'}>Wyloguj</Link>
                        </div>
                    </>
                ) : (
                    <Link className={styles.navigation__link} href={'/logowanie'}>Logowanie</Link>
                )}
            </div>
        </nav>
    )
}