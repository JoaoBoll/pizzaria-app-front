import {Header} from "../../components/Header";
import styles from "./syles.module.scss"
import Head from "next/head";
import {FormEvent, useState} from "react";

import {setupAPIClient} from "../../services/api";
import {toast} from "react-toastify";
import {canSSRGuest} from "../../utils/canSSRGuest";

export default function Category(){

    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (name === '') {
            return;
        }

        const apiClient = setupAPIClient();
        const response = await apiClient.post('/category', {
            name
        }).then((res) => {
            toast.success("Categoria cadastrada com sucesso!")
        }).catch((err) => {
            err.print();
        });

        console.log(response);
        console.log("Sucesso");

    }

    return(
        <>
            <Head>
                <title>Nova Categoria - Pizzaria</title>
            </Head>
            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Cadastrar Categoria</h1>

                    <form className={styles.form}
                        onSubmit={handleRegister}>
                        <input
                            type='text'
                            placeholder={"Digite o nome da Categoria"}
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                        <button type='submit'
                            className={styles.buttonAdd}>Salvar</button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {}
    }
})
