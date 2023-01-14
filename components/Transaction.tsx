import styles from '../styles/Transaction.module.css'
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './Blockchain/Blockchain';
import { useEffect } from 'react';

export default function Transaction() {
    const web3 = new Web3()
    const FLDC = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const test = async() =>{
      await window.ethereum.enable();
      let a = FLDC.methods.totalSupply().call();
      console.log("aa")
    }
    useEffect(()=>{
      test();
    },[])
    return (
        <div className={styles.transaction}>
            <input type='text' placeholder='Insert wallet address...' className={styles.address_input}/>
            <p className={styles.heading}>Eth amount:</p>
            <input min='1' defaultValue={1} type='number' placeholder='Insert amount...' className={styles.address_input}/>
            <button className={styles.button}>Send eth</button>
        </div>
    )
}
