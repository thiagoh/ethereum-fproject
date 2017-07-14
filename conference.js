var fs = require('fs');
var minimist = require('minimist');
var web3 = require('./config');

var _greeting = "Hello World";
var abi = [{ "constant": true, "inputs": [], "name": "totalAmount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "organizer", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "recipient", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "refundTicket", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "destroy", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "newquota", "type": "uint256" }], "name": "changeQuota", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "quota", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "numRegistrants", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "buyTicket", "outputs": [{ "name": "success", "type": "bool" }], "payable": true, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_to", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "Refund", "type": "event" }];
var contract = web3.eth.contract(abi);

var mainAccount = web3.eth.accounts[0];
console.log('Deployer account: ' + mainAccount);
var argv = minimist(process.argv.slice(2));
// console.log(argv);

new Promise(function(resolve, reject) {

    if (argv.submit === true || argv.submit === 'true') {

      contract.new({
          from: mainAccount,
          data: '0x' + '6060604052341561000c57fe5b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506101f4600481905550600060038190555060006002819055505b5b61060e806100786000396000f3006060604052361561008c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631a39d8ef1461008e57806361203265146100b4578063705099b91461010657806383197ef014610145578063a977c71e14610157578063cebe09c914610177578063ec3a6f731461019d578063edca914c146101c3575bfe5b341561009657fe5b61009e6101e5565b6040518082815260200191505060405180910390f35b34156100bc57fe5b6100c46101eb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561010e57fe5b610143600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610211565b005b341561014d57fe5b6101556103ef565b005b341561015f57fe5b6101756004808035906020019091905050610483565b005b341561017f57fe5b6101876104ea565b6040518082815260200191505060405180910390f35b34156101a557fe5b6101ad6104f0565b6040518082815260200191505060405180910390f35b6101cb6104f6565b604051808215151515815260200191505060405180910390f35b60025481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561026f576103ea565b81600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414156103e957309050818173ffffffffffffffffffffffffffffffffffffffff16311015156103e8578273ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051809050600060405180830381858888f19350505050151561031957fe5b6000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160025403600281905550600360008154809291906001900391905055507fbb28353e4598c3b9199101a66e0989549b659a59a54d2c27fbb183f1932c8e6d8383604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b5b5b505050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561048057600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104df576104e7565b806004819055505b50565b60045481565b60035481565b600060045460035410151561050e57600090506105df565b34600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555034600254016002819055506003600081548092919060010191905055507fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c3334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1600190505b905600a165627a7a7230582080aff7acf13f5bf8ea24a24ed4c1ef4eed47c11abaaf8003b4f389bc5b8e389e0029',
          gas: '360655'
        },
        function(e, contract) {
          console.log(e);

          if (!e) {
            console.log(contract);

            if (typeof contract.address !== 'undefined') {
              console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
              // Contract mined! address: 0xa70d4d8cd684652334293b984931cf7b64812242
              resolve(contract.address);
            }
          }
        });
    } else {

      resolve('0xa70d4d8cd684652334293b984931cf7b64812242');
    }
  })
  .then(function(address) {

    var conference = web3.eth.contract(abi).at(address);

    var event = conference.allEvents(); // or use conference.Deposit() or .Refund()
    event.watch(function(error, result) {
      if (error) {
        console.log("Error: " + error);
      } else {
        console.log("Event: " + result.event, result);

        if (result.event === 'Deposit') {
          console.log(result.args);
          console.log(result.args._amount);
          console.log('conference.quota()', conference.quota());
          console.log('conference.numRegistrants()', conference.numRegistrants());
          console.log('conference.totalAmount()', conference.totalAmount());
        }

        // {
        //   address: '0x5ce5b8d12ce0aa831a7d9c14659a5266bb6e04cd',
        //   blockNumber: 7258,
        //   transactionHash: '0xa4d7ed72bb75750557dee50c8f072ea1b09d2ac317a2bdffa45b3285a0e98ee9',
        //   transactionIndex: 0,
        //   blockHash: '0xa80c1be5c5ea2dfe295f86036b821f1ab2488f114f76bf66f72ebef0ffab7a68',
        //   logIndex: 0,
        //   removed: false,
        //   event: 'Deposit',
        //   args: {
        //     _from: '0x1f08f398166140646d062d368b9177d9dd3f03a2',
        //     _amount: {
        //       [String: '23000000000000000000'] s: 1,
        //       e: 19,
        //       c: [Object]
        //     }
        //   }
        // }
      }
    });

    console.log('conference.address', conference.address);
    console.log('conference.code', web3.eth.getCode(conference.address).substring(0, 80) + '...');

    var stdin = process.openStdin();

    stdin.on("data", function(d) {

      var line = d.toString().trim();

      var conferenceArgv = minimist(line.split(' '));
      console.log(conferenceArgv);

      if (conferenceArgv.eval === true) {

        try {

          eval(conferenceArgv.cmd);

        } catch (error) {
          console.error(error);
        }

      } else if (typeof conferenceArgv.buy === 'string' || conferenceArgv.buy === true) {

        var account = '';
        var ticketPrice = web3.toWei(23, 'ether');

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
  }, function(error) {
    console.error(error);
  });