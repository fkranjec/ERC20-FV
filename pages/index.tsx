import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../components/Card'
import Connect from '../components/Connect'
import Transaction from '../components/Transaction'

export default function Home() {
  return (
    <>
      <Head>
        <title>Crypto Transfer</title>
        <meta name="description" content="Application for transfering eth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
            <Connect/>
            <Card/>
            <Transaction/>
      </main>
    </>
  )
}
