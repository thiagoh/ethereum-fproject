var fs = require('fs');
var web3 = require('./config');

// var exec = require('child_process').execSync;
// exec(`solc --bin --abi --optimize -o bin contract.sol`);

// console.log(web3.eth.accounts);

var abi = fs.readFileSync('bin/greeter.abi', 'utf8');
// console.log(abi);

var compiled = '0x' + fs.readFileSync("bin/greeter.bin");
// console.log(compiled);

var _greeting = "Hello World!";
var contract = web3.eth.contract(compiled.greeter);
// console.log(contract);

// var contract = web3.eth.contract(compiled.greeter.info.abiDefinition);

var greeter = contract.new(_greeting, {
  from: web3.eth.accounts[0],
  data: compiled.greeter.code,
  gas: 300000
}, function(e, contract) {
  if (!e) {

    if (!contract.address) {
      console.log("Contract transaction send: TransactionHash: " +
        contract.transactionHash + " waiting to be mined...");

    } else {
      console.log("Contract mined! Address: " + contract.address);
      console.log(contract);
    }
  }
});