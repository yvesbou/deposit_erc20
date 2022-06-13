import React, { useContext } from 'react';
import { SmartContractContext } from '../../context/SmartContractContext';
import Infobox from './Infobox/Infobox';
import Actions from './Actions/Actions';
import Welcome from './Welcome/Welcome';

const Hero = () => {
    const {connectedWallet, connectWallet} = useContext(SmartContractContext);

    return (
        <div className='Hero'>
            {(connectedWallet.length!==0) ?  
                <>
                    <Actions/>
                    <Infobox/>
                </>
                :
                <Welcome/>
            }
        </div>
        
    )
}

export default Hero