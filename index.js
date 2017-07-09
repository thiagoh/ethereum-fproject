var fs = require('fs');
var minimist = require('minimist');
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
var abi = [{
  "constant": false,
  "inputs": [],
  "name": "kill",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "sender",
  "outputs": [{ "name": "", "type": "address" }],
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
}];
var contract = web3.eth.contract(abi);

var mainAccount = web3.eth.accounts[0];
var greeter;
var argv = minimist(process.argv.slice(2));
// console.log(argv);

new Promise(function(resolve, reject) {

    if (argv.submit === true || argv.submit === 'true') {

      greeter = contract.new(_greeting, {
          from: mainAccount,
          data: '0x6060604052341561000c57fe5b604051610412380380610412833981016040528080518201919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b806001908051906020019061008292919061008a565b505b5061012f565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100cb57805160ff19168380011785556100f9565b828001600101855582156100f9579182015b828111156100f85782518255916020019190600101906100dd565b5b509050610106919061010a565b5090565b61012c91905b80821115610128576000816000905550600101610110565b5090565b90565b6102d48061013e6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b51461005157806367e404ce14610063578063cfae3217146100b5575bfe5b341561005957fe5b61006161014e565b005b341561006b57fe5b6100736101e2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100bd57fe5b6100c56101eb565b6040518080602001828103825283818151815260200191508051906020019080838360008314610114575b805182526020831115610114576020820191506020810190506020830392506100f0565b505050905090810190601f1680156101405780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156101df57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b60003390505b90565b6101f3610294565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102895780601f1061025e57610100808354040283529160200191610289565b820191906000526020600020905b81548152906001019060200180831161026c57829003601f168201915b505050505090505b90565b6020604051908101604052806000815250905600a165627a7a72305820cc76a4738a5f5a3108552ea84f61a6db1a960982df5f9886ede72de163fbe8840029',
          gas: '987654'
        },
        function(e, contract) {
          console.log(e);

          if (!e) {
            console.log(contract);

            if (typeof contract.address !== 'undefined') {
              console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
              //Contract mined! address: 0x8b986cd7a73e2ea0fe54e970867fd2715641bd1a transactionHash: 0x194439869f64321ac11121ccdef9f22b20fa8b8eedeec311b9f2b95685d04287
              resolve();
            }
          }
        });
    } else {

      greeter = web3.eth.contract(abi).at('0x8b986cd7a73e2ea0fe54e970867fd2715641bd1a');
      resolve();
    }
  })
  .then(function() {
    console.log('greeter.address', web3.eth.getCode(greeter.address));
    console.log(greeter.greet());
    // console.log(greeter.sender());
    // console.log(greeter.kill.sendTransaction({ from: mainAccount }));

    var stdin = process.openStdin();
    var state = { killActivated: false };
    var getkill = function(state) {

      if (state.killActivated === true) {
        return function() {
          console.log(greeter.kill.sendTransaction({ from: mainAccount }));
          return true;
        };
      } else if (state.killActivated === false) {
        return function() {
          console.log('Are you sure you wanna kill this contract?');
          return false;
        };
      }
    };

    stdin.on("data", function(d) {

      // note:  d is an object, and when converted to a string it will
      // end with a linefeed.  so we (rather crudely) account for that  
      // with toString() and then trim() 
      var line = d.toString().trim();
      // console.log("you entered: [" + line + "]");

      var greeterArgv = minimist(line.split(' '));
      console.log(greeterArgv);

      if (greeterArgv.kill === true) {
        state.killActivated = !getkill(state)();
      } else if (greeterArgv.greet === true) {
        console.log(greeter.greet());
      } else if (greeterArgv._[0] === '') {
        // nop
      } else {
        console.log('No action linked to this argument');
      }

      if (greeterArgv.kill !== true) {
        state.killActivated = false;
      }

    });
  }, function(error) {
    console.error(error);
  });