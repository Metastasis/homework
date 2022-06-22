import React from 'react';
import type {NextPage} from 'next';
import Head from 'next/head';
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
    // @ts-ignore
    if (errors.pass) {
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
  }, [])
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
      </main>
    </div>
  )
}

export default Home

function validate(values: {login?: string, password?: string}) {
  let errors: {[field: string]: string} = {}
  if (!values.login || !values.login.trim()) errors.login = 'Укажите логин'
  if (!values.password || !values.password.trim()) errors.password = 'Укажите пароль'
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
