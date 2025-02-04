import MainLayout from "@/layouts/mainLayout";
import LeagueMatchesPageBody from "@/app/ligi/[leagueSlug]/mecze/fragments/leagueMatchesPageBody";

export default function Page() {
    return (
        <MainLayout>
            <LeagueMatchesPageBody />
        </MainLayout>
    )
}