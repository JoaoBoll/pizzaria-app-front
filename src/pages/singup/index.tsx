import Head from 'next/head'
import styles from '../../../styles/home.module.scss'
import Image from 'next/image'
import logoImg from '../../../public/logo.svg'
import { Input } from '../../components/ui/Input/input'
import { Button } from '../../components/ui/Button/button'
import Link from 'next/link'

export default function SingUp() {
  return (
    <>
      <Head>
        <title>
          Faça seu cadastro agora.
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div>

          <form>
            <h1 className={styles.text}>Criando sua conta</h1>
            <Input placeholder='Digite seu Nome'
              type='text' />

            <Input placeholder='Digite seu E-mail'
              type='text' />

            <Input placeholder='Digite sua Senha'
              type='password' />

            <Button type='submit'
              Loading={false}>
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
