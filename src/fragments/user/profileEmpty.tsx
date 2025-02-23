import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import Button from "@/components/button";
import styles from './profileEmpty.module.scss'

export default function ProfileEmpty() {
    return (
        <ClassicBox>
            <ClassicHeader><p>Profil</p></ClassicHeader>
            <div className={styles.profileEmpty}>
                <p>Uzupełnij swój profil, aby uzyskać dostęp do pełnej funkcjonalności serwisu</p>
                <Button redirect={'/konto/edytuj'}>Uzupełnij profil</Button>
            </div>
        </ClassicBox>
    )
}