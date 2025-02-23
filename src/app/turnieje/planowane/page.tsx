import MainLayout from "@/layouts/mainLayout";
import CompetitionList from "@/fragments/competition/competitionList";

export default function Page() {

    return (
        <MainLayout>
            <CompetitionList type={'tournament'} state={'planned'} headline={'Planowane turnieje'} />
        </MainLayout>
    );
}