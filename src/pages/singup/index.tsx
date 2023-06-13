import Head from 'next/head'
import styles from '../../../styles/home.module.scss'
import Image from 'next/image'
import logoImg from '../../../public/logo.svg'
import { Input } from '../../components/ui/Input/input'
import { Button } from '../../components/ui/Button/button'
import Link from 'next/link'
import { useState, FormEvent, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export default function SingUp() {

  const {signUp} = useContext(AuthContext);;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSingUp(event: FormEvent) {
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      alert('Preencha todos os campos');
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await signUp(data);

    setLoading(false);

  }

  return (
    <>
      <Head>
        <title>
          Faça seu cadastro agora.
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>

          <form onSubmit={handleSingUp}>
            <h1 className={styles.text}>Criando sua conta</h1>
            <Input placeholder='Digite seu Nome'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)} />

            <Input placeholder='Digite seu E-mail'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <Input placeholder='Digite sua Senha'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <Button type='submit'
              Loading={loading}>
              Cadastrars
            </Button>

          </form>


        </div>

        <Link href="/" className={styles.text}>
          Já possui uma conta? Faça login!
        </Link>

      </div>
    </>
  )
}
