import MainLayout from "@/layouts/mainLayout";
import TournamentResultsPageBody from "@/app/turnieje/[tournamentSlug]/wyniki/fragments/tournamentResultsPageBody";

export default function Page() {
    return (
        <MainLayout>
            <TournamentResultsPageBody />
        </MainLayout>
    )
}