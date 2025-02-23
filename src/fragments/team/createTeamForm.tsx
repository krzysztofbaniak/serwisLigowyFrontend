'use client'
import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import Link from "next/link";
import MainForm from "@/fragments/form/mainForm";
import styles from './createTeamForm.module.scss';
import {voivodeshipsSelectOptions} from "@/utils/data";

export default function CreateTeamForm({profile}) {

    function getFormData(id) {
        const profileRelation= {name: `sportingDirector`, initialValue: id, type: 'hidden'}
        return formData.concat([profileRelation])
    }

    return (
        <ClassicBox>
            <ClassicHeader>
                <Link className={styles.returnLink} href={'/konto'}>◀&nbsp;Anuluj</Link>
                <p>Nowa drużyna</p>
            </ClassicHeader>
            <div className={styles.teamForm}>
                {profile && <MainForm data={getFormData(profile.id)} target={`${process.env.apiHost}/api/teams`} method={'post'} />}
            </div>
        </ClassicBox>
    )
}

const formData = [
    {name: 'name', initialValue: '', type: 'text', label: 'Nazwa drużyny'},
    {name: 'city', initialValue: '', type: 'text', label: 'Miasto'},
    {name: 'voivodeship', initialValue: '', type: 'select', options: voivodeshipsSelectOptions, label: 'Województwo'},
    {name: 'logotype', initialValue: '', type: 'file', label: 'Logotyp drużyny'},
    {name: `logotypeFile`, initialValue: '', type: 'none'}
]