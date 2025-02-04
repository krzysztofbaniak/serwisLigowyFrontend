import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import ResultEntry from "@/fragments/result/resultEntry";
import styles from "./resultFeed.module.scss";
import NoSSR from "@/components/noSSR";
import Select from "react-select";
import {voivodeshipsSelectOptions} from "@/config/voivodeships";

export default function ResultFeed({
   matches, placeholder = 'Ładowanie...', redirectLink,
   voivodeshipSelect
}) {

    return (
        <div>
            <ClassicBox redirect={redirectLink} condition={matches && matches.length > 0}>
                <ClassicHeader>
                    <>
                        <h2>Ostatnie wyniki</h2>
                        {voivodeshipSelect &&
                            <NoSSR><Select className={styles.resultFeed__select} placeholder={'Województwo'}
                                           onChange={(option) => voivodeshipSelect(option.value)}
                                           options={voivodeshipsSelectOptions}/></NoSSR>}
                    </>
                </ClassicHeader>
                <div className={styles.resultFeed}>
                    {matches && matches.length > 0 ? matches.map(match => {
                        return (
                            <ResultEntry key={match.id} match={match}/>
                        )
                    }) : (
                        <p className={styles.resultFeed__empty}>{placeholder}</p>
                    )}
                </div>
            </ClassicBox>
        </div>
    )
}