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
var abi = [{ "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "metaCoin", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "sender", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "receiver", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "sendCoin", "outputs": [{ "name": "sufficient", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "greet", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "_greeting", "type": "string" }], "payable": false, "type": "constructor" }];
var contract = web3.eth.contract(abi);

var mainAccount = web3.eth.accounts[0];
var greeter;
var argv = minimist(process.argv.slice(2));
// console.log(argv);

new Promise(function(resolve, reject) {

    if (argv.submit === true || argv.submit === 'true') {

      greeter = contract.new(_greeting, {
          from: mainAccount,
          data: '0x6060604052341561000c57fe5b604051610782380380610782833981016040528080518201919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b806001908051906020019061008292919061008a565b505b5061012f565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100cb57805160ff19168380011785556100f9565b828001600101855582156100f9579182015b828111156100f85782518255916020019190600101906100dd565b5b509050610106919061010a565b5090565b61012c91905b80821115610128576000816000905550600101610110565b5090565b90565b6106448061013e6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b5146100675780634e3b52fe1461007957806367e404ce1461008b57806390b98a11146100dd578063cfae321714610134575bfe5b341561006f57fe5b6100776101cd565b005b341561008157fe5b610089610261565b005b341561009357fe5b61009b6102aa565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100e557fe5b61011a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506102b3565b604051808215151515815260200191505060405180910390f35b341561013c57fe5b6101446103aa565b6040518080602001828103825283818151815260200191508051906020019080838360008314610193575b8051825260208311156101935760208201915060208101905060208303925061016f565b505050905090810190601f1680156101bf5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561025e57600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b612710600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b565b60003390505b90565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561030557600090506103a4565b81600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550600190505b92915050565b6103b26105f0565b6103ba6105f0565b6103c2610604565b60006103cc610604565b60006000604060405190810160405280601481526020017f2066726f6d2074686961676f20616e64206c6565000000000000000000000000815250955085945060019350845184805460018160011615610100020316600290049050016040518059106104365750595b908082528060200260200182016040525b5092506000915060009050600090505b8380546001816001161561010002031660029004905081101561052a578381815460018160011615610100020316600290048110151561049357fe5b8154600116156104b25790600052602060002090602091828204019190065b9054901a7f01000000000000000000000000000000000000000000000000000000000000000283838060010194508151811015156104ec57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b8080600101915050610457565b600090505b84518110156105e357848181518110151561054657fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f01000000000000000000000000000000000000000000000000000000000000000283838060010194508151811015156105a557fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b808060010191505061052f565b8296505b50505050505090565b602060405190810160405280600081525090565b6020604051908101604052806000815250905600a165627a7a7230582037de8beec5a0976141f74544f71f917f12f16a045ab0323d974486a714ea85a50029',
          gas: '987654'
        },
        function(e, contract) {
          console.log(e);

          if (!e) {
            console.log(contract);

            if (typeof contract.address !== 'undefined') {
              console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
              //Contract mined! address: 0x2540e1a638bb0b562c9a173c7b8b9ddbfdb85b58 transactionHash: 0x25a56062fb2cbb86b4c7cb5a262937ac47d63eeb6d41bc928a79d009a85f606d
              //Contract mined! address: 0x67e8d29c9663bb32a1d1e66e673ee00c51017221 transactionHash: 0x11a7bb7bf3e93d6f4ded42595d2f070f4b07102720572944bf65717ec8125db1
              resolve();
            }
          }
        });
    } else {

      greeter = web3.eth.contract(abi).at('0x2540e1a638bb0b562c9a173c7b8b9ddbfdb85b58');
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
      } else if (greeterArgv.metaCoin === true) {
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