'use strict';

import Web3 from 'web3';

// Instantiate Web3 using personal Ganache blockchain.
// Replace with ""http://localhost:8545" or other port number for 'truffle develop'
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

// Print ether balances for pre-generated accounts
const printAccountBalances = () => {
    web3.eth.accounts.forEach(account => {
        let balance = web3.eth.getBalance(account);
        let ethBalance = web3.fromWei(balance, 'ether');
        console.log(`Account ${account}: ${balance} wei = ${ethBalance} eth`);
    });
    console.log(`\n`);
};

// Send ether from account[0] to account[1]
const transferEth = () => {
    let from = web3.eth.accounts[0];
    let to = web3.eth.accounts[1];
    let ethAmount = 1; // expressed in ETH
    
    let weiAmount = web3.toWei(ethAmount, 'ether');
    let transaction = { from: from, to: to, value: weiAmount };
    
    console.log(`Sending transaction... ${JSON.stringify(transaction)}`);
    
    web3.eth.sendTransaction(transaction, function (error, transactionHash) {
      console.log(`Transaction: ${transactionHash}\n`);

      if (error){
        console.error(`Error sending transaction:\n${error}\n`);
        return;
      } 
        
      web3.eth.getTransaction(transactionHash, function(error, transactionInfo) {
        
        if (error){
            console.error(`Error fetching transaction by its hash:\n${error}`);
        } 
        else {
            const infoString = 
            `Hash: ${transactionInfo.hash}` +
            `\nNonce: ${transactionInfo.nonce}` +
            `\nBlock Hash: ${transactionInfo.blockHash}` +
            `\nBlock Number: ${transactionInfo.blockNumber}` +
            `\nGas Usage: ${transactionInfo.gas}` +
            `\nTransaction Index: ${transactionInfo.transactionIndex}` +
            `\nFrom: ${transactionInfo.from}` +
            `\nTo: ${transactionInfo.to}` +
            `\nValue in Wei: ${transactionInfo.value}`;
            
            console.log(infoString);
            console.log(`\n`);
        }
      });
    });
}

// STEP 1
printAccountBalances();

// STEP 2
transferEth();

// STEP 3
// Print balances again, after waiting 2 seconds, 
// to allow state change to be reflected in local node
setTimeout(() => {
    printAccountBalances();
}, 2000);
