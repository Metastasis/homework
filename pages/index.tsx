import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {Input, Button} from '@features/ui-kit'
import styles from './Home.module.css'


const Home: NextPage = () => {
  const [login, onChangeLogin] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback((event) => {
    event.preventDefault()
    const data = {login, password}
    console.log(data)
  }, [login, password])
  return (
    <div className={styles.container}>
      <Head>
        <title>Homework</title>
        <meta name="description" content="Небольшие домашки для закрепления теории" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Вход
        </h1>

        <form
          className={styles.form}
          autoComplete="off"
          onSubmit={onSubmit}
          noValidate
        >
          <Input name="login" placeholder="Логин" value={login} onChange={onChangeLogin} />
          <Input name="password" placeholder="Пароль" value={password} onChange={onChangePassword} />
          <Button type="submit">Войти</Button>
        </form>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
