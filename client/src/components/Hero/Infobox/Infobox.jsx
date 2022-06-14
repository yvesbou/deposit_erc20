import React from 'react'
import Balance from './Balance';
import LastTransactions from './LastTransactions';


const Infobox = () => {
    return (
        <div className='Infobox'>
            <Balance/>
            <LastTransactions/>
        </div>
    )
}

export default Infobox;