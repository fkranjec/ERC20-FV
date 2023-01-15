import {useEffect} from 'react'
import styles from '../styles/Connect.module.css'
import { Status, Dispatch, useMetamask } from './Metamask'

export interface IConnect{
  status: Status,
  isMetamaskInstalled: boolean,
  dispatch: Dispatch
}


export default function Connect({status, isMetamaskInstalled, dispatch}: IConnect) {
    const showInstallMetamask = status !== "pageNotLoaded" && !isMetamaskInstalled;
    const showConnectButton = status !== "pageNotLoaded" && isMetamaskInstalled;

    useEffect(() => {
      return () => {
      }
    }, [])

    const handleConnect = async () => {
      dispatch({type: "loading"});
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      console.log(accounts);
      if(accounts.length > 0){
        dispatch({type: "connect", wallet: accounts[0]})

      }
    }

  return (
      <>
          { showConnectButton && (
              <button onClick={handleConnect} className={styles.button}>
                  Connect using MetaMask
              </button>
              )
          }
          {
              showInstallMetamask && (
                  <a>
                      Install metamask
                  </a>
              )
          }
      </>
  )
}
