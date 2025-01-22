'use client';
import axios from "axios";
import {Field, Form, Formik} from "formik";
import {useContext, useState} from "react";
import {useCookies} from "react-cookie";
import {redirect} from "next/navigation";

import {UserContext} from "@/app/providers";

import styles from "./page.module.scss";
export default function Page() {

    const [loginFeedback, setLoginFeedback] = useState('');
    const [cookies, setCookie] = useCookies(['access_token']);
    const userData = useContext(UserContext)

    function handleFormSubmit(values) {
        axios
            .post("http://localhost:1337/api/auth/local", {
                identifier: values.userEmail,
                password: values.userPassword,
            })
            .then((response) => {
                console.log("User profile", response.data.user);
                console.log("User token", response.data.jwt);

                setCookie('access_token', response.data.jwt)
                userData.handleUserChange(response.data.user.id, response.data.user.username)
            })
            .catch((error) => {
                console.log("An error occurred:", error);

                if(error.response?.data.error.name === "ValidationError") {
                    setLoginFeedback('Nieprawidłowy email lub hasło')
                }
            })
            .finally(()=> {
                redirect('/')
            });
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <p className={styles.logo}><a href="/">Logotyp</a></p>
                <Formik
                    initialValues={{ userEmail: '', userPassword: '' }}
                    onSubmit={(values) => handleFormSubmit(values)}
                >
                    <Form className={styles.formWrapper}>
                        <Field className={styles.input} type="email" id={'userEmail'}  name={'userEmail'} placeholder={'Email'} required={true} />
                        <Field className={styles.input} type="password" id={'userPassword'}  name={'userPassword'} placeholder={'Hasło'} required={true} />
                        <p>{loginFeedback}</p>
                        <button type={"submit"} className={styles.button}>Zaloguj</button>
                    </Form>
                </Formik>
            </main>
        </div>
    );
}
