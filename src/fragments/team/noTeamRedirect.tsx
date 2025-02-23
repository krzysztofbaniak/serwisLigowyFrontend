import ClassicBox from "@/components/classicBox";
import ClassicHeader from "@/components/classicHeader";
import Button from "@/components/button";
import styles from './noTeamRedirect.module.scss'

export default function NoTeamRedirect() {
    return (
        <ClassicBox>
            <ClassicHeader><p>Drużyna</p></ClassicHeader>
            <div className={styles.noTeamRedirect}>
                <p>Utwórz drużyne, aby brać udział w rozgrywkach</p>
                <Button redirect={'/konto/utworz-druzyne'}>Utwórz drużyne</Button>
            </div>
        </ClassicBox>
    )
}