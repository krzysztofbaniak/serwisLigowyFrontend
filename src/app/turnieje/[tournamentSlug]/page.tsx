import MainLayout from "@/layouts/mainLayout";
import TournamentPageBody from "@/app/turnieje/[tournamentSlug]/fragments/tournamentPageBody";

export default function Page() {
    return (
        <MainLayout>
            <TournamentPageBody />
        </MainLayout>
    );
}
