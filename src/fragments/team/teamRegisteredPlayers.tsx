'use client'
import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import Avatar from "@/components/avatar";
import styles from "./teamRegisteredPlayers.module.scss";
import Link from "next/link";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useState} from "react";

export default function TeamRegisteredPlayers({players, teamId}) {

    const [cookies, setCookie] = useCookies(['access_token']);
    const [responsePlayers, setResponsePlayers] = useState(null);

    function handleRemovePlayer(playerId) {
        axios.put(`${process.env.apiHost}/api/teams/${teamId}?populate=players`, {
            data: {
                players: {
                    disconnect: [playerId]
                }
            }
        }, {
            headers: {
                Authorization: `Bearer ${cookies.access_token}`,
            },
        })
            .then(function (response) {
                console.log(response)
                setResponsePlayers(response.data.data.players)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const correctPlayers = responsePlayers?.length ? responsePlayers : players.data;
    console.log(responsePlayers)

    return (
        <ClassicBox>
            <ClassicHeader>
                <Link className={styles.returnLink} href={'/nabory'}>◀&nbsp;Powrót</Link>
                <p>Zarejestrowani zawodnicy</p>
            </ClassicHeader>
            <div className={styles.teamRegisteredPlayers}>
                {correctPlayers.length > 0 ? (
                    correctPlayers.map((player) => (
                        <div className={styles.teamRegisteredPlayers__entry} key={player.id}>
                            <Avatar className={styles.teamRegisteredPlayers__avatar} src={player.image?.src || ''} alt={player.image?.url} width={40} height={40}/>
                            <p className={styles.teamRegisteredPlayers__name}>{player.name} {player.surname}</p>
                            <button onClick={() => handleRemovePlayer(player.documentId)} className={styles.teamRegisteredPlayers__delete}>Usuń</button>
                            <div className={styles.teamRegisteredPlayers__info}>
                                <p>Miasto: {player.city}</p>
                                <p>Data urodzenia: {player.birthday}</p>
                            </div>
                            <div className={styles.teamRegisteredPlayers__info}>
                                <p>Pozycja: {player.position}</p>
                                <p>Ulubiony numer: {player.favoriteNumber}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.teamRegisteredPlayers__empty}>{players.placeholder}</p>
                )}
            </div>
        </ClassicBox>
    )
}