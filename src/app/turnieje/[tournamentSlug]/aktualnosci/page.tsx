import MainLayout from "@/layouts/mainLayout";
import TournamentPostsPageBody from "@/app/turnieje/[tournamentSlug]/aktualnosci/fragments/tournamentPostsPageBody";

export default function Page() {
    return (
        <MainLayout>
            <TournamentPostsPageBody />
        </MainLayout>
    )
}