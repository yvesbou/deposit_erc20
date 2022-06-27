import React from 'react'

const Actions = () => {
    return (
        <div className='Actions'>
            <input className='AmountInput'></input>
            <button data-cy='deposit-to-contract-button' className='Deposit'>Deposit</button>
            <button data-cy='withdraw-from-contract-button' className='Withdraw'>Withdraw</button>
        </div>
    )
}

export default Actions;