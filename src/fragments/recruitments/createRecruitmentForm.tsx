'use client'
import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import Link from "next/link";
import MainForm from "@/fragments/form/mainForm";
import styles from './createRecruitmentForm.module.scss'
import {voivodeshipsSelectOptions} from "@/utils/data";

export default function CreateRecruitmentForm({profile}) {

    function getFormData(id) {
        const teamRelation= {name: `team`, initialValue: id, type: 'hidden'}
        return formData.concat([teamRelation])
    }

    return (
        <ClassicBox>
            <ClassicHeader>
                <Link className={styles.returnLink} href={'/konto'}>◀&nbsp;Anuluj</Link>
                <p>Nowy nabór</p>
            </ClassicHeader>
            <div className={styles.recruitmentForm}>
                {profile && <MainForm data={getFormData(profile.team?.id)} target={`${process.env.apiHost}/api/recruitments`} method={'post'} />}
            </div>
        </ClassicBox>
    )
}

const formData = [
    {name: 'image', initialValue: '', type: 'file', label: 'Zdjęcie'},
    {name: `imageFile`, initialValue: '', type: 'none'},
    {name: 'name', initialValue: '', type: 'text', label: 'Tytuł'},
    {name: 'city', initialValue: '', type: 'text', label: 'Miasto'},
    {name: 'voivodeship', initialValue: '', type: 'select', options: voivodeshipsSelectOptions, label: 'Województwo'},
    {name: 'datetime', initialValue: '', type: 'datetime-local', label: 'Data i godzina'},
    {name: 'location', initialValue: '', type: 'text', label: 'Lokalizacja'},
    {name: 'description', initialValue: '', type: 'md-editor', label: 'Treść'},
    {name: 'active', initialValue: true, type: 'hidden'},
]