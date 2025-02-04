import styles from './formBox.module.scss';

export default function FormBox({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.formBox}>
            {children}
        </div>
    )
}