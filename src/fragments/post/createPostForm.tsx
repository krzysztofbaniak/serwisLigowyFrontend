import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import Link from "next/link";
import MainForm from "@/fragments/form/mainForm";
import styles from "./createPostForm.module.scss";
import {boolOptions} from "@/utils/data";

export default function CreatePostForm({profile}) {

    function getFormData(id) {
        const teamRelation= {name: `relatedTeams`, initialValue: id, type: 'hidden'}
        return formData.concat([teamRelation])
    }

    return (
        <ClassicBox>
            <ClassicHeader>
                <Link className={styles.returnLink} href={'/konto'}>◀&nbsp;Anuluj</Link>
                <p>Nowy post</p>
            </ClassicHeader>
            <div className={styles.postForm}>
                {profile && <MainForm data={getFormData(profile.team?.id)} target={`${process.env.apiHost}/api/posts`} method={'put'} />}
            </div>
        </ClassicBox>
    )
}

const formData = [
    {name: 'title', initialValue: '', type: 'text', label: 'Tytuł artykułu'},
    {name: 'image', initialValue: '', type: 'file', label: 'Zdjęcie'},
    {name: `imageFile`, initialValue: '', type: 'none'},
    {name: 'lead', initialValue: '', type: 'textarea', label: 'Wstęp'},
    {name: 'content', initialValue: '', type: 'md-editor', label: 'Treść'},
    {name: 'public', initialValue: false, type: 'bool', options: boolOptions, label: 'Publiczny'},
    {name: 'slug', initialValue: '', type: 'slug', relatedKey: 'title'},
]