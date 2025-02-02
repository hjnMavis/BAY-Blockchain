const { ethers } = require('ethers');

const wallet = ethers.Wallet.createRandom();
console.log('random wallet:',wallet);

const privateKey = wallet.privateKey;
console.log('Private key:', privateKey);

const address = wallet.address;
console.log('My ethereum address:',address);


