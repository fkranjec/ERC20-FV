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
  dispatch: Dispatch,
}

const MetamaskContext = createContext<{
    state: State; dispatch: Dispatch;
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
    //const provider = detectEthereumProvider()
    const [state, dispatch] = useReducer(metamaskReducer, initialState);

    const value = {state, dispatch};
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
