import React, { useState, useContext } from 'react'
import { SmartContractContext } from '../../context/SmartContractContext';

const Wallet = () => {
    const {connectedWallet, connectWallet} = useContext(SmartContractContext);

    console.log(connectedWallet);
    return (
        <>
            {
                (connectedWallet.length!==0) ? 
                <button className='Wallet-btn' onClick={()=>{}}>{`${connectedWallet.slice(0,4)}...${connectedWallet.slice(-4,-1)}`}</button> 
                :
                <button className='Wallet-btn' onClick={()=>{connectWallet()}}>Connect Wallet</button>
            }
        </>
    )
}

export default Wallet;