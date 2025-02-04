'use client';
import axios from "axios";
import Link from "next/link";
import {Form, Formik} from "formik";
import {useContext, useState} from "react";
import {useCookies} from "react-cookie";
import {redirect} from "next/navigation";
import {UserContext} from "@/app/providers";
import FormBox from "@/components/formBox";
import Input from "@//components/input";
import Button from "@/components/button";
import styles from "./page.module.scss";

export default function Page() {

    let redirectPath = null;

    const [loginFeedback, setLoginFeedback] = useState('');
    const [cookies, setCookie] = useCookies(['access_token']);
    const userData = useContext(UserContext)

    function handleFormSubmit(values) {
        axios
            .post("${process.env.apiHost}/api/auth/local", {
                identifier: values.userEmail,
                password: values.userPassword,
            })
            .then((response) => {
                console.log("User profile", response.data.user);
                console.log("User token", response.data.jwt);

                setCookie('access_token', response.data.jwt)
                userData.handleUserChange(response.data.user.id, response.data.user.username)
                redirectPath = '/'
            })
            .catch((error) => {
                console.log("An error occurred:", error);

                if(error.response?.data.error.name === "ValidationError") {
                    setLoginFeedback('Nieprawidłowy email lub hasło')
                }
            })
            .finally(()=> {
                if(redirectPath)
                    redirect(redirectPath)
            });
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <p className={styles.logo}><Link href="/">Serwis ligowy</Link></p>
                <Formik
                    initialValues={{ userEmail: '', userPassword: '' }}
                    onSubmit={(values) => handleFormSubmit(values)}
                >
                    <Form>
                        <FormBox>
                            <>
                                <p className={styles.formHeader}>Logowanie</p>
                                <div className={styles.inputsWrapper}>
                                    <Input type="email" id={'userEmail'}  name={'userEmail'} placeholder={'Email'} required={true} />
                                    <Input error={loginFeedback} type="password" id={'userPassword'}  name={'userPassword'} placeholder={'Hasło'} required={true} />
                                </div>
                                <div className={styles.buttonsWrapper}>
                                    <Button type={"submit"}>Zaloguj się</Button>
                                    <Button redirect={'/rejestracja'}>Rejestracja</Button>
                                </div>
                            </>
                        </FormBox>
                    </Form>
                </Formik>
                <Link className={styles.link} href={'/odzyskiwanie-hasla'}>Zapomniałeś hasła?</Link>
            </main>
        </div>
    );
}
