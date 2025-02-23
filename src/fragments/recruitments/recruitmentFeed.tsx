import NoSSR from "@/components/noSSR";
import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import Select from "react-select";
import {voivodeshipsSelectOptions} from "@/utils/data";
import RecruitmentEntry from "@/fragments/recruitments/recruitmentEntry";
import styles from './recruitmentFeed.module.scss'

export default function RecruitmentFeed({
     recruitments,
     placeholder = 'Ładowanie...',
     redirectLink,
     loadFunction,
     voivodeshipSelect,
     title = 'Najbliższe nabory do drużyn'
 }) {
    return (
        <ClassicBox redirect={redirectLink} onClick={loadFunction} condition={recruitments && recruitments.length > 0}>
            <ClassicHeader>
                <>
                    <h2>{title} {recruitments && recruitments.length ? `(${recruitments.length})` : null}</h2>
                    {voivodeshipSelect &&
                        <NoSSR>
                            <Select placeholder={'Województwo'}
                                       onChange={(option) => voivodeshipSelect(option.value)}
                                       options={voivodeshipsSelectOptions}
                            className={styles.recruitmentFeed__select}/>
                        </NoSSR>
                    }
                </>
            </ClassicHeader>
            <div>
                {recruitments && recruitments.length > 0 ? recruitments.map(recruitment => {
                    return (
                        <RecruitmentEntry key={recruitment.id} recruitment={recruitment}/>
                    )
                }) : (
                    <p className={styles.recruitmentFeed__empty}>{placeholder}</p>
                )}
            </div>
        </ClassicBox>
    )
}