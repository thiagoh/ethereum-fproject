var web3 = require('web3');
var web3_provider = 'http://localhost:8545';
var _web3 = new web3();
_web3.setProvider(new web3.providers.HttpProvider(web3_provider));

// if (typeof web3 !== 'undefined') {
//   web3 = new web3(web3.currentProvider);
// } else {
//   // set the provider you want from Web3.providers
//   web3 = new web3(new Web3.providers.HttpProvider(web3_provider));
// }

exports.web3 = _web3;