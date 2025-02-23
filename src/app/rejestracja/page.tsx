'use client';
import axios from "axios";
import Link from "next/link";
import { Form, Formik} from "formik";
import FormBox from "@/components/formBox";
import Input from "@/components/input";
import Button from "@/components/button";
import styles from './page.module.scss'
import {useCookies} from "react-cookie";
import {useContext} from "react";
import {UserContext} from "@/app/providers";
import NoSSR from "@/components/noSSR";
import Select from "react-select";
import {accountTypesOptions} from "@/utils/data";
import {redirect} from "next/navigation";

export default function Page() {

    let redirectPath = null

    const [cookies, setCookie] = useCookies(['access_token']);
    const userData = useContext(UserContext)

    function handleFormSubmit(values) {

        axios
            .post(`${process.env.apiHost}/api/auth/local/register`, {
                username: values.userName,
                email: values.userEmail,
                password: values.userPassword,
            })
            .then(response => {

                setCookie('access_token', response.data.jwt)
                userData.handleUserChange(response.data.user)
                createProfile(values)
            })
            .catch(error => {
                alert('Wystąpił nieoczekiwany błąd');
            })
    }

    function createProfile(values) {
        let apiUrl = 'sporting-directors';

        switch (values.accountType) {
            case 'player':
                apiUrl = 'players'
                break;
            case 'referee':
                apiUrl = 'referees'
                break;
            case 'organizer':
                apiUrl = 'organizers'
                break;
            default:
                apiUrl = 'sporting-directors'
        }

        axios.post(`${process.env.apiHost}/api/${apiUrl}`, {
            data: {
                name: '',
            }
        }, {
            headers: {
                Authorization: `Bearer ${cookies.access_token}`,
            },
        })
            .then(function (response) {
                redirectPath = '/'
            })
            .catch(function (error) {
                alert('Wystąpił nieoczekiwany błąd');
            })
            .finally(()=> {
                if(redirectPath)
                    redirect(redirectPath)
            });
    }

    // noinspection TypeScriptValidateTypes
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <p className={styles.logo}><Link href="/">Serwis ligowy</Link></p>
                <Formik
                    initialValues={{userName: '', userEmail: '', userPassword: '', accountType: ''}}
                    onSubmit={(values) => handleFormSubmit(values)}
                >
                    {(props) => {

                        function setAccountType(option) {
                            props.setValues((values) => {
                                return {
                                    ...values, accountType: option
                                }
                            })
                        }

                        return (
                        <Form>
                            <FormBox>
                                <p className={styles.formHeader}>Rejestracja</p>
                                <div className={styles.inputsWrapper}>
                                    <Input type="text" id={'userName'} name={'userName'} placeholder={'Nazwa użytkownika'}
                                           required={true}/>
                                    <Input type="email" id={'userEmail'} name={'userEmail'} placeholder={'Email'}
                                           required={true}/>
                                    <Input type="password" id={'userPassword'} name={'userPassword'} placeholder={'Hasło'}
                                           required={true}/>
                                    <NoSSR>
                                        <Select placeholder={'Rodzaj konta'} id={'accountType'} options={accountTypesOptions}
                                                required={true}
                                                onChange={(option) => setAccountType(option.value)}
                                                className={styles.select}
                                                classNames={{
                                                    control: (state) => 'selectControl',
                                                    placeholder: (state) => 'selectPlaceholder',
                                                    option: (state) => 'option',
                                                    singleValue: (state) => 'singleValue',
                                                    menu: (state) => 'menu',
                                                }}
                                        />
                                    </NoSSR>
                                </div>
                                <div className={styles.buttonsWrapper}>
                                    <Button type={"submit"}>Zarejestruj się</Button>
                                    <Button redirect={'/logowanie'} ghostStyle={true}>Logowanie</Button>
                                </div>
                            </FormBox>
                        </Form>
                    )}}
                </Formik>
            </main>
        </div>
    )
}