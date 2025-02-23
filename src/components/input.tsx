import {Field, FieldAttributes} from "formik";
import styles from './input.module.scss'

export default function Input(props: FieldAttributes<any>) {
    return (
        <>
            <div>
                <Field {...props} className={styles.input} />
                {props.error ? (
                    <p className={styles.error}>{props.error}</p>
                ) : null}
            </div>
        </>
    )
}