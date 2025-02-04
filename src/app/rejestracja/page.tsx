'use client';
import {Form, Formik} from "formik";
import FormBox from "@/components/formBox";
import Input from "@/components/input";
import Button from "@/components/button";
import styles from './page.module.scss'
import axios from "axios";
import {useCookies} from "react-cookie";
import {useContext} from "react";
import {UserContext} from "@/app/providers";
import {redirect} from "next/navigation";
import Link from "next/link";

export default function Page() {

    let redirectPath = null

    const [cookies, setCookie] = useCookies(['access_token']);
    const userData = useContext(UserContext)

    function handleFormSubmit(values) {

        axios
            .post('${process.env.apiHost}/api/auth/local/register', {
                username: values.userName,
                email: values.userEmail,
                password: values.userPassword,
            })
            .then(response => {

                setCookie('access_token', response.data.jwt)
                userData.handleUserChange(response.data.user.id, response.data.user.username)
                redirectPath = '/'
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
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
                    initialValues={{userName: '', userEmail: '', userPassword: ''}}
                    onSubmit={(values) => handleFormSubmit(values)}
                >
                    <Form>
                        <FormBox>
                            <>
                                <p className={styles.formHeader}>Rejestracja</p>
                                <div className={styles.inputsWrapper}>
                                    <Input type="text" id={'userName'} name={'userName'} placeholder={'Nazwa użytkownika'}
                                           required={true}/>
                                    <Input type="email" id={'userEmail'} name={'userEmail'} placeholder={'Email'}
                                           required={true}/>
                                    <Input type="password" id={'userPassword'} name={'userPassword'} placeholder={'Hasło'}
                                           required={true}/>
                                </div>
                                <div className={styles.buttonsWrapper}>
                                    <Button type={"submit"}>Zarejestruj się</Button>
                                    <Button redirect={'/logowanie'}>Logowanie</Button>
                                </div>
                            </>
                        </FormBox>
                    </Form>
                </Formik>
            </main>
        </div>
    )
}