import { createContext, useContext, useEffect, useReducer, type PropsWithChildren } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './Blockchain/Blockchain';
import Web3 from 'web3';
import {Contract} from 'web3-eth-contract';

export type ConnectAction = { type: "connect"; wallet: string; };
export type DisconnectAction = { type: "disconnect" };
export type PageLoadedAction = { type: "pageLoaded"; isMetamaskInstalled: boolean };
export type LoadingAction = { type: "loading" };

export type Action =
  | ConnectAction
  | DisconnectAction
  | PageLoadedAction
  | LoadingAction;

export type Dispatch = (action: Action) => void;

export type Status = "loading" | "idle" | "pageNotLoaded";

export type State = {
  wallet: string | null;
  isMetamaskInstalled: boolean;
  status: Status;
};

export type StateDispatch = {
  state: State,
  dispatch: Dispatch
}

const MetamaskContext = createContext<{
    state: State; dispatch: Dispatch; FLDC: Contract
    } | undefined>(undefined);

const initialState: State = {
  wallet: null,
  isMetamaskInstalled: false,
  status: "loading",
} as const;

function metamaskReducer(state: State, action: Action): State {
  switch (action.type) {
    case "connect": {
      const { wallet } = action;
      return { ...state, wallet, status: "idle" };
    }
    case "disconnect": {
      return { ...state, wallet: null };
    }
    case "pageLoaded": {
      const { isMetamaskInstalled } = action;
      return { ...state, isMetamaskInstalled, status: "idle" };
    }
    case "loading": {
      return { ...state, status: "loading" };
    }
    default: {
      throw new Error("Unhandled action type");
    }
  }
}

function MetamaskProvider({children}: PropsWithChildren){
    const [state, dispatch] = useReducer(metamaskReducer, initialState);
    const provider = new Web3.providers.HttpProvider('https://goerli.infura.io/v3/caa94a0fce774247ac2cdb5ed0f4f485')
    const web3 = new Web3(provider)
    const FLDC = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    const value = {state, dispatch, FLDC};
        useEffect(()=>{
        if( typeof window !== undefined ){
            const ethereumProviderInjected = typeof window.ethereum != "undefined";

            const isMetamaskInstalled = ethereumProviderInjected && Boolean(window.ethereum.isMetaMask);

            dispatch({type: "pageLoaded", isMetamaskInstalled});
        }
    },[]);

    return (
        <MetamaskContext.Provider value={value}>
            {children}
        </MetamaskContext.Provider>
    )

}

function useMetamask() {
    const context = useContext(MetamaskContext);
    if (context == undefined) {
        throw new Error("error");
    }
    return context;
}

export { MetamaskProvider, useMetamask };
