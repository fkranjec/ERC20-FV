import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../components/Card'
import Connect from '../components/Connect'
import Transaction from '../components/Transaction'
import { Action, Dispatch, useMetamask } from '../components/Metamask'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../components/Blockchain/Blockchain'

export default function Home() {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  let {
    dispatch,
    state: {status, isMetamaskInstalled, wallet},
    } = useMetamask();

  const getBalance = async(walletId: string) => {
    const web3 = new Web3(window.ethereum)
    const FLDC = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
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
                        <Transaction wallet={wallet?wallet: ""}/>
                    </>
                )
                :
                <Connect dispatch={disp} status={status} isMetamaskInstalled={isMetamaskInstalled}/>
            }
      </main>
    </>
  )
}
