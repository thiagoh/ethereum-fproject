var fs = require('fs');
var minimist = require('minimist');
var web3 = require('./config');

var minimumGas = 564436;
var code = '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506101f4600481905550600060038190555060006002819055505b5b610a08806100706000396000f300606060405236156100a2576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806301a80041146100a45780631a39d8ef146100ca57806361203265146100f0578063705099b91461014257806383197ef0146101815780638d68cf5914610193578063a977c71e146101b1578063cebe09c9146101d1578063ec3a6f73146101f7578063edca914c1461021d575bfe5b34156100ac57fe5b6100b461023f565b6040518082815260200191505060405180910390f35b34156100d257fe5b6100da610265565b6040518082815260200191505060405180910390f35b34156100f857fe5b61010061026b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561014a57fe5b61017f600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610291565b005b341561018957fe5b610191610473565b005b61019b610507565b6040518082815260200191505060405180910390f35b34156101b957fe5b6101cf600480803590602001909190505061087d565b005b34156101d957fe5b6101e16108e4565b6040518082815260200191505060405180910390f35b34156101ff57fe5b6102076108ea565b6040518082815260200191505060405180910390f35b6102256108f0565b604051808215151515815260200191505060405180910390f35b600060003090508073ffffffffffffffffffffffffffffffffffffffff163191505b5090565b60025481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102f15761046d565b82600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141561046c57309150828273ffffffffffffffffffffffffffffffffffffffff163110151561046b578373ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f193505050509050801561046a576000600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508260025403600281905550600360008154809291906001900391905055507fbb28353e4598c3b9199101a66e0989549b659a59a54d2c27fbb183f1932c8e6d8484604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b5b5b5b50505050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561050457600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b60006000309050600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106c4577f75982f9abb756f00628ae04c14091213bcd6851f1fc3e4c6d30bb0877bf2f45933600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff163160405180806020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828103825260308152602001807f4552524f522121212053656e646572206973204e4f54207468652073616d652081526020017f617320746865206f7267616e697a65720000000000000000000000000000000081525060400194505050505060405180910390a17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9150610879565b7f42e851dea31a9f19d79d364356285ec853df1cc74b680083be6895bdfdb109b281600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff163160405180806020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828103825260238152602001807f53656e646572206973207468652073616d6520617320746865206f7267616e6981526020017f7a6572000000000000000000000000000000000000000000000000000000000081525060400194505050505060405180910390a1600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc8273ffffffffffffffffffffffffffffffffffffffff16319081150290604051809050600060405180830381858888f19350505050151561087457fe5b600091505b5090565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108d9576108e1565b806004819055505b50565b60045481565b60035481565b600060045460035410151561090857600090506109d9565b34600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555034600254016002819055506003600081548092919060010191905055507fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c3334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1600190505b905600a165627a7a723058206226abd60ecaaa83e82a72e10802e67ad7537dcb09a592656696cea7d88c98e50029';
var abi = [{ "constant": false, "inputs": [], "name": "conferenceBalance", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalAmount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "organizer", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "recipient", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "refundTicket", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "destroy", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "sendFunds", "outputs": [{ "name": "result_code", "type": "int256" }], "payable": true, "type": "function" }, { "constant": false, "inputs": [{ "name": "newquota", "type": "uint256" }], "name": "changeQuota", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "quota", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "numRegistrants", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "buyTicket", "outputs": [{ "name": "success", "type": "bool" }], "payable": true, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_to", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "Refund", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "message", "type": "string" }, { "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_to", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "Error", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "message", "type": "string" }, { "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_to", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "Info", "type": "event" }];
var previouslyDeployedAddress = '0x8373f6d76caa6a27247f9dc3a898976ed445a7da';

var contract = web3.eth.contract(abi);

var mainAccount = web3.eth.accounts[0];
console.log('Deployer account: ' + mainAccount);

var argv = minimist(process.argv.slice(2));
// console.log(argv);

new Promise(function(resolve, reject) {

    if (argv.submit === true || argv.submit === 'true') {

      contract.new({
          from: mainAccount,
          data: '0x' + code,
          gas: '' + (400000 + minimumGas)
        },
        function(e, contract) {
          console.log(e);

          if (!e) {
            // console.log(contract);

            if (typeof contract.address !== 'undefined') {
              console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
              resolve(contract.address);
            }
          }
        });
    } else {

      resolve(previouslyDeployedAddress);
    }
  })
  .then(function(address) {

      var conference = web3.eth.contract(abi).at(address);

      var event = conference.allEvents();
      event.watch(function(error, result) {
        if (error) {
          console.log("Error: " + error);
        } else {
          console.log("Event: " + result.event);

          if (result.event === 'Deposit') {
            // console.log('    ', result.args);
            console.log('DEPOSIT:');
            console.log('    ', 'result.args._amount', result.args._amount);
            console.log('    ', 'conference.quota()', conference.quota());
            console.log('    ', 'conference.numRegistrants()', conference.numRegistrants());
            console.log('    ', 'conference.totalAmount()', conference.totalAmount());
          } else if (result.event === 'Error') {
            console.error('ERROR: ', result.args.message);
            console.error('    ', '_from', result.args._from);
            console.error('    ', '_to', result.args._to);
            console.error('    ', '_amount', result.args._amount);
          } else if (result.event === 'Info') {
            console.log('INFO: ', result.args.message);
            console.log('    ', '_from', result.args._from);
            console.log('    ', '_to', result.args._to);
            console.log('    ', '_amount', result.args._amount);
          }

        }
      });

      console.log('conference.address', conference.address);
      console.log('conference.code', web3.eth.getCode(conference.address).substring(0, 80) + '...');

      var stdin = process.openStdin();

      stdin.on("data", function(d) {

        var line = d.toString().trim();
        var account;
        var ticketPrice = web3.toWei(23, 'ether');
        var conferenceArgv = minimist(line.split(' '));
        console.log(conferenceArgv);

        if (typeof conferenceArgv.eval === 'string' || conferenceArgv.eval === true) {

          // console.log('conference.conferenceBalance()', conference.conferenceBalance());

          var cmd = '';

          if (typeof conferenceArgv.eval === 'string' && typeof conferenceArgv.cmd === 'undefined') {
            cmd = conferenceArgv.eval.trim().replace(/^'(.*)/, '$1').replace(/(.*)'$/, '$1');
          } else if (typeof conferenceArgv.cmd === 'undefined') {
            console.error('cmd not defined. Please use --cmd to set the source cmd');
            return;
          }

          // console.log(cmd);

          try {

            eval(cmd);

          } catch (error) {
            console.error(error);
          }

        } else if (conferenceArgv.info === true) {

          console.log('conference.address', conference.address);
          console.log('conference.organizer()', conference.organizer());
          console.log('getBalance(conference.address)', web3.eth.getBalance(conference.address).toNumber());
          console.log('getBalance(conference.organizer())', web3.eth.getBalance(conference.organizer()).toNumber());

          console.log('conference.quota()', conference.quota());
          console.log('conference.numRegistrants()', conference.numRegistrants());
          console.log('conference.totalAmount()', conference.totalAmount());

        } else if (typeof conferenceArgv.sendFunds === 'string' || conferenceArgv.sendFunds === true) {

          console.log('Sending funds to the organizer');
          console.log('The organizer ', conference.organizer(), ' will receive ', conference.totalAmount());

          account = '';

          if (typeof conferenceArgv.sendFunds === 'string' && typeof conferenceArgv.account === 'undefined') {
            account = conferenceArgv.sendFunds.replace(/'/g, '');
          } else if (typeof conferenceArgv.account === 'undefined') {
            console.error('Account not defined. Please use --account to set the source account');
            return;
          } else if (typeof conferenceArgv.account !== 'string') {
            console.error('Account should be a string. Please use --account \'account id\' to set the source account');
            return;
          }

          console.log('Sending funds to the organizer from account ' + account);

          try {

            conference.sendFunds.call({
              from: account,
              value: ticketPrice
            }, function(err, result) {

              if (err) {
                console.error(err);
                return;
              }

              // console.log(result.constructor);

              if (result.valueOf() < 0) {
                console.error('Sender is NOT the same as the organizer');
                return;
              }

              conference.sendFunds({ from: account, value: ticketPrice });
            });

          } catch (error) {
            console.error(error);
          }

        } else if (typeof conferenceArgv.buy === 'string' || conferenceArgv.buy === true) {

          account = '';

          if (typeof conferenceArgv.buy === 'string' && typeof conferenceArgv.account === 'undefined') {
            account = conferenceArgv.buy.replace(/'/g, '');
          } else if (typeof conferenceArgv.account === 'undefined') {
            console.error('Account not defined. Please use --account to set the source account');
            return;
          } else if (typeof conferenceArgv.account !== 'string') {
            console.error('Account should be a string. Please use --account \'account id\' to set the source account');
            return;
          }

          console.log('Buying ticket from account ' + account);

          try {

            conference.buyTicket({ from: account, value: ticketPrice });

          } catch (error) {
            console.error(error);
          }

        } else if (conferenceArgv._[0] === '') {
          // nop
        } else {
          console.log('No action linked to this argument');
        }

      });
    },
    function(error) {
      console.error(error);
    });