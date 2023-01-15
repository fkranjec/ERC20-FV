import { Provider, useState } from 'react'
import styles from '../styles/Transaction.module.css'
import { useMetamask } from './Metamask';
import {Contract} from 'web3-eth-contract';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './Blockchain/Blockchain';

type Transfer = (from:string, to: string, amount: number)=>{}
export interface Wallet {
  wallet: string
}
export default function Transaction(wallet: string) {
    const [walletTo, setWalletTo] = useState<string>("");

    let transfer = async(from: string, to: string, amount: number) => {
      let w3 = new FLDCProvider(window.ethereum);
      w3.transfer(from,to,amount).then(balance => console.log(balance))
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

export class FLDCProvider {
  private web3:Web3;
  private FLDC:Contract

  constructor(provider:any) {
    this.web3 = new Web3(provider);
    console.log(this.web3)
    this.FLDC = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  }

  public async getBalance(wallet: Wallet): Promise<string> {
    console.log(wallet)
    return await this.FLDC.methods.balanceOf(wallet.wallet).call();
  }

  public async transfer(from:Wallet, to: Wallet, amount: number):Promise<any> {
    return await this.FLDC.methods.transfer("0x396Ab55f4281A150B08D5b71adB2Eb9EB1DA36F9",amount).send({from: from.wallet})
  }


}
