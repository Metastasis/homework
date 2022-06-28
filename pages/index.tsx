import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import {
  search
} from '@features/products'
import {withBreakpoints} from '@features/helpers'
import styles from './Home.module.css'

const Home: NextPage = () => {
  const [products, setProducts] = React.useState<any>([])
  React.useEffect(() => {
    search().then(setProducts)
  }, [setProducts])
  const Desc = withBreakpoints(Description)
  return (
    <div className={styles.container}>
      <Head>
        <title>Homework</title>
        <meta name="description" content="Небольшие домашки для закрепления теории" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Товары
        </h1>
        <Desc />
        <div className={styles.grid}>
          {products.map((product: any) => <Product key={product.id} product={product} />)}
        </div>
      </main>
    </div>
  )
}

function Description(props: {media: string}) {
  const {media} = props
  if (media === 'mobile') return null
  return (
    <p className={styles.description}>
      Самые дешевые товары тут
    </p>
  );
}

function Product(props: {product: any}) {
  const {product} = props
  switch (product.categoryId) {
    case '0':
      return <ProductDefault product={product} />
    case '1':
      return <ProductMobilePhone product={product} />
    case '2':
      return <ProductMouse product={product} />
    default:
      // const p: never = product
      // return p
      return null
  }
}

function ProductDefault(props: {product: any}) {
  const {product} = props
  return (
    <div key={product.id} className={styles.card}>
      <h3>{product.category}, {product.brand} {product.model}</h3>
      <div className={styles.attributes}>
        <div className={styles.attribute}>Цена: {product.price}</div>
      </div>
    </div>
  )
}

function ProductMobilePhone(props: {product: any}) {
  const {product} = props
  return (
    <div key={product.id} className={styles.card}>
      <h3>{product.category}, {product.brand} {product.model}</h3>
      <div className={styles.attributes}>
        <div className={styles.attribute}>Цена: {product.price}</div>
        <div className={styles.attribute}>Камера: {product.cameraBack}</div>
        <div className={styles.attribute}>Камера (фронт): {product.cameraFront}</div>
        <div className={styles.attribute}>Вес: {product.weight}</div>
        <div className={styles.attribute}>Разрешение: {product.screenWidth}x{product.screenHeight}</div>
      </div>
    </div>
  )
}

function ProductMouse(props: {product: any}) {
  const {product} = props
  return (
    <div key={product.id} className={styles.card}>
      <h3>{product.category}, {product.brand} {product.model}</h3>
      <div className={styles.attributes}>
        <div className={styles.attribute}>Цена: {product.price}</div>
        <div className={styles.attribute}>Кнопок: {product.buttonsQty} шт.</div>
      </div>
    </div>
  )
}

export default Home
