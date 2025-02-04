import Link from "next/link";
import {UrlObject} from "node:url";

import styles from './classicBox.module.scss';

export default function ClassicBox({
    condition = true,
    onClick,
    redirect,
    children,
}: Readonly<{
    condition?: boolean,
    onClick?: () => void,
    redirect?: string | UrlObject,
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.classicBox}>
            {children}
            {redirect && condition ? (
                <Link className={styles.classicBox__redirect} href={redirect}>Zobacz więcej</Link>
            ) : onClick && condition ? (
                <button className={styles.classicBox__redirect} onClick={onClick}>Zobacz więcej</button>
            ) : (
                <></>
            )}
        </div>
    )
}
