'use client';
import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import Button from "@/components/button";
import {useContext, useState} from "react";
import {UserContext} from "@/app/providers";
import styles from './account.module.scss'

export default function Account() {

    const userData = useContext(UserContext)
    const [show, setShow] = useState(false);

    function toggleShow() {
        setShow((state) => !state);
    }

    function translateAccountType(accountType) {
        if(accountType === 'referee') return 'Sędzia'
        if(accountType === 'player') return 'Piłkarz'
        if(accountType === 'organizer') return 'Organizator'
        if(accountType === 'sportingDirector') return 'Kierownik drużyny'
        return ''
    }

    return (
        <ClassicBox>
            <ClassicHeader><p>Konto</p></ClassicHeader>
            <div className={styles.account}>
                {show && (
                    <div className={styles.account__dataWrapper}>
                        <p>Użytkownik: {userData.currentUser?.username}</p>
                        <p>Email: {userData.currentUser?.email}</p>
                        <p>Profil: {translateAccountType(userData.currentUser?.accountType)}</p>
                    </div>
                )}
                <div className={styles.account__buttonsWrapper}>
                    <Button onClick={()=>{toggleShow()}}>{!show ? 'Pokaż dane' : 'Schowaj dane'}</Button>
                    <Button>Zmień hasło</Button>
                </div>
            </div>
        </ClassicBox>
    )
}