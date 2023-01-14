import { useState } from 'react'
import styles from '../styles/Transaction.module.css'
import { useMetamask } from './Metamask';

type Transfer = (from:string, to: string, amount: number)=>{}

export default function Transaction(wallet: string) {
    const { FLDC } = useMetamask();
    const [walletTo, setWalletTo] = useState<string>("");

    let transfer = (from: string, to: string, amount: number) => {
      console.log("test")
      let ret = FLDC.methods.transferFrom(from, to, amount).call().then((res:boolean) => console.log(res));
      console.log(ret);
    }


    return (
        <div className={styles.transaction}>
            <input type='text' onChange={(e)=>setWalletTo(e.target.value)} placeholder='Insert wallet address...' className={styles.address_input}/>
            <p className={styles.heading}>Eth amount:</p>
            <input min='1' defaultValue={1} type='number' placeholder='Insert amount...' className={styles.address_input}/>
            <button className={styles.button} onClick={()=>transfer(wallet, walletTo, 100)}>Send eth</button>
        </div>
    )
}
