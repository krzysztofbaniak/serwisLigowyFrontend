import CompetitionList from "@/fragments/competition/competitionList";
import styles from './tournamentListingPageBody.module.scss'

export default function TournamentListingPageBody() {

    return (
        <div className={styles.tournamentFeed}>
            <CompetitionList type={'tournament'} state={'inProgress'} headline={'Aktualne turnieje'} />
            <CompetitionList type={'tournament'} state={'planned'} headline={'Planowane turnieje'} />
            <CompetitionList type={'tournament'} state={'over'} headline={'Zakończone turnieje'} />
        </div>
    )
}












