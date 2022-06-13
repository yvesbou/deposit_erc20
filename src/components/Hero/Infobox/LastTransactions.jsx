import React from 'react';
import { txs } from '../../Stats/fakedata';

const LastTransactions = () => {
    return (
        <div className='LastTransactions'>
            <h2>Last Transactions</h2>
            <table className='Table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Gas</th>
                        <th className='ConditionalColumn'>Blocknumber</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        txs.map((tx)=>
                            {return <tr>
                                <td>{tx.date}</td>
                                <td className='Amount'>{tx.amount}</td>
                                <td className='Amount'>{tx.gas}</td>
                                <td className='Amount ConditionalColumn'>{tx.blockNumber}</td>
                                </tr>
                            })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default LastTransactions;