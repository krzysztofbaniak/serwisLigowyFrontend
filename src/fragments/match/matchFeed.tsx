import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import MatchEntry from "@/fragments/match/matchEntry";
import styles from "./matchFeed.module.scss";
import Select from "react-select";
import {voivodeshipsSelectOptions} from "@/config/voivodeships";
import NoSSR from "@/components/noSSR";

export default function MatchFeed({
  matches,
  placeholder = 'Ładowanie...',
  redirectLink,
  loadFunction,
  voivodeshipSelect
}) {

    return (
        <div>
            <ClassicBox redirect={redirectLink} onClick={loadFunction} condition={matches && matches.length > 0}>
                <ClassicHeader>
                    <>
                        <h2>Najbliższe mecze</h2>
                        {voivodeshipSelect &&
                            <NoSSR><Select className={styles.matchFeed__select} placeholder={'Województwo'}
                                           onChange={(option) => voivodeshipSelect(option.value)}
                                           options={voivodeshipsSelectOptions}/></NoSSR>}
                    </>
                </ClassicHeader>
                <div className={styles.matchFeed}>
                    {matches && matches.length > 0 ? matches.map(match => {
                        return (
                            <MatchEntry key={match.id} match={match}/>
                        )
                    }) : (
                        <p className={styles.matchFeed__empty}>{placeholder}</p>
                    )}
                </div>
            </ClassicBox>
        </div>
    )
}