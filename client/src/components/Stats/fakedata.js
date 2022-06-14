class Transaction {
    constructor(amount, gas, blockNumber, date) {
        this.amount = amount;
        this.gas = gas;
        this.blockNumber = blockNumber;
        this.date = date;
    }
}
// amount, gas, blocknumber, time
export const txs = [
    new Transaction('0.5', '11234', '238492223', '2022-03-21'),
    new Transaction('0.1', '12993', '238492234', '2022-04-11'),
    new Transaction('0.2', '12389', '238493435', '2022-04-21'),
    new Transaction('1.1', '12311', '238494545', '2022-04-28'),
    new Transaction('1.8', '11231', '238494623', '2022-05-01'),
    new Transaction('0.3', '13522', '238495757', '2022-05-13'),
]