import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import styles from './competitionTable.module.scss';
import Link from "next/link";

export default function CompetitionTable({leagueTable, placeholder}) {
    return (
        <ClassicBox>
            <ClassicHeader><p>Tabela</p></ClassicHeader>
            <div className={styles.competitionTable}>
                {leagueTable && leagueTable?.tableEntries.sort((a,b) => b.points - a.points) ? (
                    <table className={styles.competitionTable__table}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Drużyna</th>
                            <th>M</th>
                            <th>W</th>
                            <th>R</th>
                            <th>P</th>
                            <th>BZ</th>
                            <th>BS</th>
                            <th>RB</th>
                            <th>P</th>
                        </tr>
                        </thead>
                        <tbody>
                            {leagueTable.tableEntries.map((entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td><Link href={`/druzyny/${entry.team.slug}`}>{entry.team.name}</Link></td>
                                    <td>{entry.matches}</td>
                                    <td>{entry.wins}</td>
                                    <td>{entry.draws}</td>
                                    <td>{entry.loses}</td>
                                    <td>{entry.scoredGoals}</td>
                                    <td>{entry.concededGoals}</td>
                                    <td>{entry.scoredGoals - entry.concededGoals}</td>
                                    <td>{entry.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className={styles.competitionTable__empty}>{placeholder}</p>
                )}
            </div>
        </ClassicBox>
    )
}