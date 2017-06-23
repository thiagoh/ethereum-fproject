var fs = require('fs');
var web3 = require('./config');

// var exec = require('child_process').execSync;
// exec(`solc --bin --abi --optimize -o bin contract.sol`);

// console.log(web3.eth.accounts);

/*

var abi = JSON.parse(fs.readFileSync('bin/greeter.abi', 'utf8'));
// console.log(abi);

var compiled = '0x' + fs.readFileSync("bin/greeter.bin");
// console.log(compiled);

var _greeting = "Hello World!";
var contract = web3.eth.contract(abi);
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
*/

var _greeting = "Hello World";
var contract = web3.eth.contract([{
  "constant": false,
  "inputs": [],
  "name": "kill",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "greet",
  "outputs": [{ "name": "", "type": "string" }],
  "payable": false,
  "type": "function"
}, {
  "inputs": [{ "name": "_greeting", "type": "string" }],
  "payable": false,
  "type": "constructor"
}]);

var mainAccount = web3.eth.accounts[0];
var greeter;

new Promise(function(resolve, reject) {

  greeter = contract.new(_greeting, {
      from: mainAccount,
      data: '0x6060604052341561000c57fe5b6040516103ac3803806103ac833981016040528080518201919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b806001908051906020019061008292919061008a565b505b5061012f565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100cb57805160ff19168380011785556100f9565b828001600101855582156100f9579182015b828111156100f85782518255916020019190600101906100dd565b5b509050610106919061010a565b5090565b61012c91905b80821115610128576000816000905550600101610110565b5090565b90565b61026e8061013e6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610046578063cfae321714610058575bfe5b341561004e57fe5b6100566100f1565b005b341561006057fe5b610068610185565b60405180806020018281038252838181518152602001915080519060200190808383600083146100b7575b8051825260208311156100b757602082019150602081019050602083039250610093565b505050905090810190601f1680156100e35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561018257600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b61018d61022e565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102235780601f106101f857610100808354040283529160200191610223565b820191906000526020600020905b81548152906001019060200180831161020657829003601f168201915b505050505090505b90565b6020604051908101604052806000815250905600a165627a7a72305820360288bf4d40982c136303e49a9e84c10deb5c3c8fdcc0cfb4eaedc3b7a77e0e0029',
      gas: '987654'
    },
    function(e, contract) {
      console.log(e);

      if (!e) {
        console.log(contract);

        if (typeof contract.address !== 'undefined') {
          console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
          resolve();
        }
      }
    });

}).then(function() {
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
  console.log(greeter.greet());
});