import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Authentication</title>
      </Head>
      <h1>Kumalala</h1>
    </div>
  )
}

export default Home
