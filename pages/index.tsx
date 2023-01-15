import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../components/Card'
import Connect from '../components/Connect'
import Transaction from '../components/Transaction'
import { Action, Dispatch, useMetamask } from '../components/Metamask'
import { useCallback, useEffect, useState } from 'react'
import { FLDCProvider, Wallet } from '../components/Blockchain/Blockchain'
import toast, { DisplayIcon } from '../components/Toast'


export default function Home() {

  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [btnStatus, setBtnStatus] = useState<boolean>(false);

  let {
    dispatch,
    state: { status, isMetamaskInstalled, wallet },
  } = useMetamask();

  const notify = useCallback((type: DisplayIcon, message: string, url?: string) => {
    toast({ type, message, url })
  }, []);

  const getBalance = (walletId: string) => {
    const FLDC = new FLDCProvider(window.ethereum)
    console.log("GET BALANCE")
    FLDC.getBalance({ wallet: walletId }).then((balance) => {
      setBalance(parseInt(balance));
    });
  }

  const transfer = (from: Wallet, to: Wallet, amount: number): void => {
    setBtnStatus(true);
    const FLDC = new FLDCProvider(window.ethereum);
    FLDC.transfer(from, to, amount * 100).then(res => {
      setBtnStatus(false);
      notify("success", "Transaction successful", "https://goerli.etherscan.io/tx/" + res.transactionHash);
    }).catch(err => {
      if (typeof err.code === "number") notify("error", err.message.split(":")[1])
      if (typeof err.code === "string") notify("error", "Invalid address");
      setBtnStatus(false);
    })
  }

  useEffect(() => {
    if (signedIn) getBalance(wallet ? wallet : "");
  }, [wallet, btnStatus]);

  let disp: Dispatch = (a: Action) => {
    dispatch(a);
    if (a.type == "connect") setSignedIn(true);
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
        <h1 className={styles.heading}>FLDC Coin Transfer</h1>
        {
          signedIn ? (
            <>
              <Card wallet={wallet ? wallet : ""} eth={balance.toString()} />
              <Transaction wallet={wallet ? { wallet: wallet } : { wallet: "" }} status={btnStatus} transfer={transfer} />
            </>
          )
            :
            <Connect dispatch={disp} status={status} isMetamaskInstalled={isMetamaskInstalled} />
        }
      </main>
    </>
  )
}
