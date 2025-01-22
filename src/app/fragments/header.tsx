'use client';

import {useContext} from "react";
import {UserContext} from "@/app/providers";
import Link from "next/link";

import styles from "./header.module.scss";

export default function Header() {

    const userData = useContext(UserContext)

    return (
        <header className={styles.header}>
            <div className={styles.header__layout}>
                <p className={styles.header__logo}>Logotyp</p>
                <nav className={styles.header__navigation}>
                    {userData.checkIfUserIsAuth() ? (
                        <>
                            <Link href={'/logout'}>Wyloguj</Link>
                            <p>
                                {userData.currentUserName}
                            </p>
                        </>
                    ) : (
                        <>
                            <a href={'/login'}>Logowanie</a>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}