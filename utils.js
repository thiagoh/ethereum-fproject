function checkAllBalances() {
  var totalBal = 0;
  for (var acctNum in eth.accounts) {
    var acct = eth.accounts[acctNum];
    var acctBal = web3.fromWei(eth.getBalance(acct), "ether");
    totalBal += parseFloat(acctBal);
    console.log("  eth.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + " ether");
  }
  console.log("  Total balance: " + totalBal + " ether");
}

function createAccounts(numOfAccounts) {
  for (var i = 0; i < numOfAccounts; i++) {
    personal.newAccount("test_" + i);
  }

  console.log(eth.accounts);
}

function randomizeEtherbase(count) {

  count = typeof count === 'undefined' ? 1 : count;

  if (count <= 0) {
    return;
  }

  var _randomizeEtherbase = function() {
    var account = eth.accounts[Math.round(Math.random() * eth.accounts.length)];
    miner.setEtherbase(account);
    console.log('New etherbase: ' + account);
  };

  setTimeout(function() {
    randomizeEtherbase(count - 1);
  }, 5000);
}