import Link from "next/link";
import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import MainForm from "@/fragments/form/mainForm";
import styles from './profileEdit.module.scss';

export default function ProfileEdit({profileData, profile, model}) {

    return (
        <ClassicBox>
            <ClassicHeader>
                <Link className={styles.returnLink} href={'/konto'}>◀&nbsp;Anuluj</Link>
                <p>Edytuj profil</p>
            </ClassicHeader>
            <div className={styles.profileEdit}>
                {(!!Object.keys(profileData).length) && <MainForm data={profileData} target={`${process.env.apiHost}/api/${model}/${profile.documentId}`} method={'put'} />}
            </div>
        </ClassicBox>
    )
}