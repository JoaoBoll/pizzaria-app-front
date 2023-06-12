import Head from 'next/head'
import styles from '../../styles/home.module.scss'
import Image from 'next/image'
import logoImg from '../../public/logo.svg'
import { Input } from '../components/ui/Input/input'
import { Button } from '../components/ui/Button/button'

export default function Home() {
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
          <form>
            <Input placeholder='Digite seu E-mail'
              type='text'/>

            <Input placeholder='Digite sua Senha'
              type='password'/>

            <Button type='submit'
            Loading={false}>
              Acessar
            </Button>

          </form>
        </div>
      </div>
    </>
  )
}
