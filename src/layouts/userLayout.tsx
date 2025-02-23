'use client'
import Header from "@/fragments/layout/header";
import styles from './userLayout.module.scss';
import Notifications from "@/fragments/user/notifications";
import {useContext, useEffect} from "react";
import {UserContext} from "@/app/providers";
import {redirect} from "next/navigation";

export default function UserLayout({
   children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const userData = useContext(UserContext)

    useEffect(() => {
        console.log(userData);
        console.log(userData.checkIfUserIsAuth());
    }, [userData]);

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.main}>
                <div>
                    {/* Pusta kolumna póki co */}
                </div>
                <div>
                    {children}
                </div>
                <div>
                    <Notifications />
                </div>
            </main>
        </div>
    );
}