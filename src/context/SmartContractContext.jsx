import React, {useEffect, useState} from 'react';

export const SmartContractContext = React.createContext();

const ethereum = window.ethereum;

export const SmartContractProvider = ({children}) => {
    const [connectedWallet, setConnectedWallet] = useState("");

    const checkIfWalletIsConnected = async () => {
        try {
            // ethereum object exists in window when metamask is installed, 
            // metamask injects an ethereum object (their api) into the window object
            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({method: "eth_accounts"});
            console.log(accounts);

            if (accounts.length) {
                setConnectedWallet(accounts[0]);
            } else {
                console.log("No wallets found");
                setConnectedWallet("");
            }
            
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    }

    const connectWallet = async () => {
        try {

            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({method: "eth_requestAccounts"});

            setConnectedWallet(accounts[0]);

        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    }

    window.ethereum.on('accountsChanged', async () => {
        console.log('accounts Changed')
        checkIfWalletIsConnected();
    });

    useEffect(()=> {
        checkIfWalletIsConnected();
    }, []);

    return (
        <SmartContractContext.Provider value={{connectedWallet, connectWallet}}>
            {children}
        </SmartContractContext.Provider>
    )
}