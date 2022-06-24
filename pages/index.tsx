import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import {Autocomplete} from '@features/ui-kit'
import {top100Films, search} from '@features/films'
import styles from './Home.module.css'

const Home: NextPage = () => {
  const [disabled, setDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState('')
  const [films, setFilms] = React.useState<typeof top100Films>([])
  const onChange = React.useCallback((nextValue: string) => {
    // Устаналиваем новое значение и ищем по совпадению
    setValue(nextValue)
    setLoading(true)
    search(nextValue)
      .then(nextFilms => {
        // Если нашли совпадение, то обновим стейт
        setLoading(false)
        setFilms(nextFilms)
      })
      // при ошибке запроса, просто сбрасываем лоадер
      .catch(() => setLoading(false))
  }, [setValue, setLoading, setFilms])
  return (
    <div className={styles.container}>
      <Head>
        <title>Homework</title>
        <meta name="description" content="Небольшие домашки для закрепления теории" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h3 className={styles.title}>Поиск фильмов</h3>
        <Autocomplete
          name="film"
          placeholder="Название фильма"
          value={value}
          loading={loading}
          onChange={onChange}
          disabled={disabled}
          items={
            films.map(item => (
              {text: `${item.title} (${item.year})`, value: item.id}
            )
          )}
        />
      </main>
    </div>
  )
}

export default Home
