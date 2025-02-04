import CompetitionList from "@/fragments/competition/competitionList";
import styles from './leagueListingPageBody.module.scss'

export default function LeagueListingPageBody() {

    return (
        <div className={styles.leagueFeed}>
            <CompetitionList type={'league'} state={'inProgress'} headline={'Aktualne ligi'} />
            <CompetitionList type={'league'} state={'planned'} headline={'Planowane ligi'} />
            <CompetitionList type={'league'} state={'over'} headline={'Zakończone ligi'} />
        </div>
    )
}












