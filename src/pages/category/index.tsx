import {Header} from "../../components/Header";
import styles from "./syles.module.scss"
import Head from "next/head";
import {FormEvent, useState} from "react";
export default function Category(){

    const [name, setName] = useState('');

    function handleRegister(event: FormEvent) {
        event.preventDefault();

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
