import MainLayout from "@/layouts/mainLayout";
import LeaguePageBody from "@/app/ligi/[leagueSlug]/fragments/leaguePageBody";

export default function Page() {
    return (
        <MainLayout>
            <LeaguePageBody />
        </MainLayout>
    );
}
