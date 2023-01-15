import { useState } from 'react'
import styles from '../styles/Transaction.module.css'
import { useMetamask } from './Metamask';
import {Contract} from 'web3-eth-contract';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './Blockchain/Blockchain';

type Transfer = (from:string, to: string, amount: number)=>{}

export default function Transaction(wallet: string) {
    const [walletTo, setWalletTo] = useState<string>("");

    let transfer = async(from: string, to: string, amount: number) => {
      console.log("test");
      const web3 = new Web3(window.ethereum);
      const FLDC = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      let ret = await FLDC.methods.transfer("0x396Ab55f4281A150B08D5b71adB2Eb9EB1DA36F9",  "100").send({from: "0x81fF4ca232b34A26155Ada8ecC4F1100B7ECd718"}).on('receipt', ()=>{console.log("test")});
      let bal = await FLDC.methods.balanceOf("0x81fF4ca232b34A26155Ada8ecC4F1100B7ECd718").call();
      console.log(bal)
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
