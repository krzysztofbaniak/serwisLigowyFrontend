'use client'
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {UserContext} from "@/app/providers";
import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import styles from './notifications.module.scss';

export default function Notifications() {

    const [notifications, setNotifications] = useState({data: null, placeholder: 'Ładowanie...'})
    const [cookies, setCookie] = useCookies(['access_token']);

    const userData = useContext(UserContext)

    useEffect(() => {
        async function fetchNotifications() {
            let apiUrl = `${process.env.apiHost}/api/notifications?filters[seen][$eq][0]=false&filters[user][documentId][$eq][1]=${userData.currentUser?.documentId}`;
            const res = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            })
            const data = await res.json()
            setNotifications({data: data, placeholder: 'Brak powiadomień'});
        }
        if(userData.currentUser)
            fetchNotifications()
    }, [userData.currentUser])

    function seenNotification(id) {
        axios.put(`${process.env.apiHost}/api/notifications/${id}`, {
            data: {
                seen: true,
            }
        }, {
            headers: {
                Authorization: `Bearer ${cookies.access_token}`,
            },
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <ClassicBox>
            <ClassicHeader><p>Powiadomienia</p></ClassicHeader>
            <div className={styles.notifications}>
                {notifications.data?.data && notifications.data.data.length > 0 ? (
                    <div>
                        {notifications.data.data.map((notification)=>(
                            <div className={styles.notifications__entry} key={notification.id}>
                                <p className={styles.notifications__paragraph}>{notification.text}</p>
                                <button onClick={() => seenNotification(notification.documentId)} className={styles.notifications__button}>✔️</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={styles.notifications__empty}>{notifications.placeholder}</p>
                )}
            </div>
        </ClassicBox>
    )
}