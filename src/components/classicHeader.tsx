'use client'
import styles from './classicHeader.module.scss'

export default function ClassicHeader({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.classicHeader}>
            {children}
        </div>
    )
}

