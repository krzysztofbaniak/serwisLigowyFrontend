import Header from "@/fragments/layout/header";
import CompetitionFeed from "@/fragments/competition/competitionFeed";
import MatchFeedColumn from "@/fragments/match/matchFeedColumn";
import styles from "./mainLayout.module.scss";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.main}>
                <CompetitionFeed/>
                <div>
                    {children}
                </div>
                <MatchFeedColumn/>
            </main>
        </div>
    );
}
