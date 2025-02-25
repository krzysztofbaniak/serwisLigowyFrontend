'use client';
import Navigation from "@/fragments/layout/navigation";
import styles from "./header.module.scss";
import Link from "next/link";

export default function Header() {

    return (
        <header className={styles.header}>
            <div className={styles.header__layout}>
                <Link href={'/'} className={styles.header__logo}>Serwis Ligowy</Link>
            </div>
            <Navigation />
        </header>
    )
}