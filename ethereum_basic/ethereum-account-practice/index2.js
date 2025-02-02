const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const privateKey = 'cb4b17f1451534de3911e770da25ef60ed64e989d8eddde9a288fe76d5b96a53';

const keyPair = ec.keyFromPrivate(privateKey);

const myPublicKey = keyPair.getPublic().encodeCompressed('hex');
console.log('myPublicKey:::',myPublicKey);