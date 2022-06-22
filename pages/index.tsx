import React from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {Button, Input} from '@features/ui-kit';
import {signIn, SignInResponse} from '@features/login';
import styles from './Home.module.css';


const Home: NextPage = () => {
  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errors, setErrors] = React.useState<{login?: string, password?: string}>({})
  const [loginResult, setLoginResult] = React.useState<SignInResponse['status'] | null>(null)
  const onChangeLogin = React.useCallback((value: string) => {
    if (errors.login) {
      const {login, ...restErrors} = errors
      setErrors(restErrors)
    }
    setLogin(value)
  }, [setLogin, setErrors, errors])
  const onChangePassword = React.useCallback((value: string) => {
    if (errors.password) {
      const {password, ...restErrors} = errors
      setErrors(restErrors)
    }
    setPassword(value)
  }, [setPassword, setErrors, errors])
  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(async (event) => {
    setLoginResult(null)
    event.preventDefault()
    const data = {login, password}
    const errors = validate({login, password})
    if (errors) {
      setErrors(errors)
      return
    }
    try {
      const result = await signIn(data)
      setLoginResult(result.status)
    } catch(error) {
      console.error(error)
      setLoginResult('error')
    }
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
          {errors.login && <Error>{errors.login}</Error>}
          <Input name="password" placeholder="Пароль" value={password} onChange={onChangePassword} />
          {errors.password && <Error>{errors.password}</Error>}
          <Button type="submit">Войти</Button>
          {loginResult && <LoginResult result={loginResult} />}
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

function validate(values: {login?: string, password?: string}) {
  let errors: {[field: string]: string} = {}
  if (!values.login) errors.login = 'Укажите логин'
  if (!values.password) errors.password = 'Укажите пароль'
  return Object.keys(errors).length ? errors : null
}

function Error(props: React.PropsWithChildren<{}>) {
  return <div className={styles.error}>{props.children}</div>
}

function LoginResult({result}: {result: 'ok' | 'error' | 'invalid_user'}) {
  switch (result) {
    case 'ok':
      return <div className={styles.loginSuccess}>Вы успешно вошли</div>
    case 'invalid_user':
      return <Error>Не правильно введен логин или пароль</Error>
    case 'error':
      return <Error>Что-то пошло не так</Error>
    default:
      return (result as never)
  }
}
