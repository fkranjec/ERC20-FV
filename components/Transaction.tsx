import { useEffect, useState } from 'react'
import { Rings, ThreeDots } from 'react-loader-spinner';
import styles from '../styles/Transaction.module.css'
import { FLDCProvider, Wallet } from './Blockchain/Blockchain';

type Transfer = (from: string, to: string, amount: number) => {}

interface ITransaction {
  wallet: Wallet,
  status: boolean,
  transfer: (from: Wallet, to: Wallet, amount: number) => void
}

export default function Transaction({ wallet, status, transfer }: ITransaction) {
  const [walletTo, setWalletTo] = useState<Wallet>({ wallet: "" });
  const [amount, setAmount] = useState<number>(0.01);

  let handleInputWallet = (value: string) => {
    setWalletTo({ wallet: value });
  }

  let handleInputAmount = (value: number) => {
    setAmount(value);
  }

  return (
    <div className={styles.transaction}>
      <p className={styles.heading} style={{ marginTop: "20px" }}>Send to wallet:</p>
      <input type='text' defaultValue={walletTo.wallet} onChange={(e) => handleInputWallet(e.target.value)} placeholder='Insert wallet address...' className={styles.address_input} />
      <p className={styles.heading}>$FLDC amount:</p>
      <input min='0.00' step='0.01' defaultValue={amount} onChange={(e) => handleInputAmount(e.target.value != "" ? parseFloat(parseFloat(e.target.value).toFixed(2)) : 0)} type='number' placeholder='Insert amount...' className={styles.address_input} />
      <button className={styles.button} disabled={status} onClick={() => transfer(wallet, walletTo, amount)}>
        {
          status ? (
            <ThreeDots
              height='40'
              width='40'
              radius='9'
              wrapperClass={styles.margin}
              color='white'
              visible={true}
            />
          ):(
            <p className={styles.margin}>Send $FLDC</p>
          )
        }
      </button>
    </div>
  )
}


