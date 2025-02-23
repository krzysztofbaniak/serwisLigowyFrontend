'use client'
import MDEditor from "@uiw/react-md-editor";
import {useState} from "react";
import styles from './markdown.module.scss'
export default function Markdown({onChange}) {

    const [value, setValue] = useState("");

    function handleChange(value) {
        setValue(value)
        onChange(value)
    }

    return (
        <div className={styles.editor}>
            <MDEditor
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}