import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../components/Card'
import Connect from '../components/Connect'
import Transaction from '../components/Transaction'
import { Action, Dispatch, useMetamask } from '../components/Metamask'
import { useEffect, useState } from 'react'

export default function Home() {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  let {
    dispatch,
    state: {status, isMetamaskInstalled, wallet, balance}
    } = useMetamask();

  useEffect(()=>{
    },[wallet, balance]);

  let disp:Dispatch = (a:Action) =>{
    dispatch(a);
    if(a.type == "connect") setSignedIn(true);
  };

  return (
    <>
      <Head>
        <title>Crypto Transfer</title>
        <meta name="description" content="Application for transfering eth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
            {
                signedIn ? (
                    <>
                        <Card wallet={wallet ? wallet : ""} eth={balance? balance : ""} eur={"2"}/>
                        <Transaction/>
                    </>
                )
                :
                <Connect dispatch={disp} status={status} isMetamaskInstalled={isMetamaskInstalled}/>
            }
      </main>
    </>
  )
}
