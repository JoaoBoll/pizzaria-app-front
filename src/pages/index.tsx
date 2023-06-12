import Head from 'next/head'
import styles from '../../styles/home.module.scss'
import Image from 'next/image'
import logoImg from '../../public/logo.svg'
import { Input } from '../components/ui/Input/input'
import { Button } from '../components/ui/Button/button'
import Link from 'next/link'
import {AuthContext} from '../contexts/AuthContext'
import { FormEvent, useContext, useState } from 'react'

export default function Home() {

  const {signIn} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');	
  const [loading, setLoading] = useState(false);


  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    
    if (email === '' || password === '') {
      alert('Preencha os dados');
      return;
    }

    setLoading(true);

    let data = {
      email: email,
      password: password	
    }

    await signIn(data);

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>
          Sujeito Pizza
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt = "Logo Sujeito Pizzaria"/>

          <div className={styles.login}>
            <form onSubmit={handleLogin}>
              <Input placeholder='Digite seu E-mail'
                type='text'
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input placeholder='Digite sua Senha'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type='submit'
              Loading={false}>
                Acessar
              </Button>

            </form>

          </div>

          <Link href="/singup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>

      </div>
    </>
  )
}
