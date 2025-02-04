import MainLayout from "@/layouts/mainLayout";
import TournamentMatchesPageBody from "@/app/turnieje/[tournamentSlug]/mecze/fragments/tournamentMatchesPageBody";

export default function Page() {
    return (
        <MainLayout>
            <TournamentMatchesPageBody />
        </MainLayout>
    )
}