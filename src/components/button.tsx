import {ClassAttributes} from "react";
import Link from "next/link";

import styles from './button.module.scss'

export default function Button(props: ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & any) {
    return (
        <>
            {props.redirect ? (
                <Link href={props.redirect} className={`${styles.button} ${styles.ghostStyle}`}>{props.children}</Link>
            ) : (
                <button {...props} className={styles.button}>{props.children}</button>
            )}
        </>
    )
}