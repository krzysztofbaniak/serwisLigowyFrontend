'use client'
import {Form, Formik} from "formik";
import Input from "@/components/input";
import Button from "@/components/button";
import Select from "react-select";
import styles from './mainForm.module.scss'
import {Fragment, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import NoSSR from "@/components/noSSR";
import Markdown from "@/components/markdown";
import slugify from "slugify";

export default function MainForm({data, target, method}) {

    const initialValues = createInitialValues(data);
    const [cookies, setCookie] = useCookies(['access_token']);

    function submitChanges(values) {
        const keyExist = Object.keys(values).find(key => key.includes("File"));
        if(keyExist) {
            if(values[keyExist] !== '') {
                const formData = new FormData();
                formData.append('files', values.imageFile)
                uploadImage(formData, function (fileId) {
                    const updatedValues = values;
                    updatedValues[keyExist.replace('File', '')] = fileId;
                    delete updatedValues[keyExist];
                    uploadForm(updatedValues)
                })
            } else {
                delete values[keyExist];
                delete values[keyExist.replace('File', '')];
                uploadForm(values)
            }
        } else {
            uploadForm(values)
        }
    }

    function uploadImage(formData, callback) {
        axios.post("http://localhost:1337/api/upload", formData, {
            headers: {
                Authorization: `Bearer ${cookies.access_token}`,
            },
        })
            .then((response)=>{
                console.log(response)
                callback(response.data[0].id);
            })
            .catch((error)=>{
                alert(error)
            })
    }

    function uploadForm(values) {
        if(values.hasOwnProperty('slug')) {
            values.slug = slugify(values[data.find(entry => entry.name === 'slug').relatedKey])
        }
        axios({
            method: method,
            url: `${target}/iah7fgkxg11z0m6v9l6y14gw`,
            data: {
                data: values
            },
            headers: {
                Authorization: `Bearer ${cookies.access_token}`,
            },
        })
            .then(function (response) {
                console.log(response)
                //userData.handleUserChange(response.data.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // noinspection TypeScriptValidateTypes
    return (
        <div className={styles.mainForm}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    submitChanges(values)
                }}
            >
                {(props) => {
                    console.log(props.values)
                    return (
                        <Form>
                            <div className={styles.mainForm__inputsWrapper}>
                                {data.map((entry, index) => {
                                    if (['text', 'number', 'date', 'datetime-local'].includes(entry.type)) return (
                                        <Fragment key={index}>
                                            <p className={styles.mainForm__label}>{entry.label}</p>
                                            <Input type={entry.type} id={entry.name} name={entry.name}
                                                   placeholder={entry.label} required={true}/>
                                        </Fragment>
                                    )
                                    if (['textarea'].includes(entry.type)) return (
                                        <Fragment key={index}>
                                            <p className={styles.mainForm__label}>{entry.label}</p>
                                            <Input as={'textarea'} type={entry.type} id={entry.name} name={entry.name}
                                                   placeholder={entry.label} required={true}/>
                                        </Fragment>
                                    )
                                    if (['md-editor'].includes(entry.type)) {
                                        function changeValues(option) {
                                            props.setValues((values) => {
                                                return {
                                                    ...values, [entry.name]: option
                                                }
                                            })
                                        }

                                        return (
                                            <Fragment key={index}>
                                                <p className={styles.mainForm__label}>{entry.label}</p>
                                                <Markdown onChange={changeValues}/>
                                            </Fragment>
                                        )
                                    }
                                    if (['select', 'bool'].includes(entry.type)) {
                                        function changeValues(option) {
                                            props.setValues((values) => {
                                                return {
                                                    ...values, [entry.name]: option
                                                }
                                            })
                                        }

                                        return (
                                            <Fragment key={index}>
                                                <p className={styles.mainForm__label}>{entry.label}</p>
                                                <NoSSR><Select className={styles.mainForm__select} key={index}
                                                        name={entry.name}
                                                        onChange={(option) => changeValues(option.value)}
                                                        options={entry.options}
                                                        defaultValue={entry.options.find(element => element.value === entry.initialValue)}
                                                        placeholder={entry.label}
                                                        classNames={{
                                                            control: (state) => 'selectControl',
                                                            placeholder: (state) => 'selectPlaceholder',
                                                            option: (state) => 'option',
                                                            singleValue: (state) => 'singleValue',
                                                            menu: (state) => 'menu',
                                                            input: (state) => 'input',
                                                        }}/></NoSSR>
                                            </Fragment>
                                        )
                                    }
                                    if (['file'].includes(entry.type)) return (
                                        <Fragment key={index}>
                                            <p className={styles.mainForm__label}>{entry.label}</p>
                                            <Input type={entry.type} id={entry.name} name={entry.name}
                                                   placeholder={entry.name}
                                                   onChange={(event) => {
                                                       props.setFieldValue(`${entry.name}File`, event.currentTarget.files[0]);
                                                       props.handleChange(event);
                                                   }}/>
                                        </Fragment>
                                    )
                                })}
                                <Button type='submit'>Zapisz</Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

function createInitialValues(array) {
    const obj = {}
    array.map((entry) => {
        obj[entry.name] = entry.initialValue
    })
    return obj;
}