import type { NextPage } from 'next'
import Head from 'next/head'

import LoginForm from '../components/login/LoginForm';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Authentication</title>
      </Head>
      <LoginForm />
    </div>
  )
}

export default Home
