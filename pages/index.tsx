import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../components/Card'
import Connect from '../components/Connect'
import Transaction from '../components/Transaction'
import { Action, Dispatch, useMetamask } from '../components/Metamask'
import { useEffect, useState } from 'react'

export default function Home() {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  let {
    dispatch,
    state: {status, isMetamaskInstalled, wallet},
    FLDC
    } = useMetamask();

  const getBalance = async(walletId: string) => {
    let ret = await FLDC.methods.balanceOf(walletId).call();
    setBalance(ret);
  }

  useEffect(()=>{
    if(signedIn) getBalance(wallet? wallet : "");
  },[wallet]);

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
                        <Card wallet={wallet ? wallet : ""} eth={balance} eur={"2"}/>
                        <Transaction wallet={"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"}/>
                    </>
                )
                :
                <Connect dispatch={disp} status={status} isMetamaskInstalled={isMetamaskInstalled}/>
            }
      </main>
    </>
  )
}
