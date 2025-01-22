import Header from "@/app/fragments/header";
import PostFeed from "@/app/fragments/postFeed";
import ContestFeed from "@/app/fragments/contestFeed";
import MatchFeed from "@/app/fragments/matchFeed";

import styles from "./page.module.scss";

export default async function Home() {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.main}>
                <ContestFeed/>
                <PostFeed/>
                <MatchFeed/>
            </main>
        </div>
    );
}
