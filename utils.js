function checkAllBalances() {
  var totalBal = 0,
    accounts = [];

  for (var acctNum in eth.accounts) {
    var acct = eth.accounts[acctNum],
      acctBal = web3.fromWei(eth.getBalance(acct), "ether");

    totalBal += parseFloat(acctBal);

    accounts.push({
      id: acct,
      balance: acctBal
    });
  }

  accounts.sort(function(account1, account2) {
    return account1.balance - account2.balance;
  });

  for (var key in accounts) {
    var account = accounts[key];
    console.log("  eth.accounts[" + key + "]: \t" + account.id + " \tbalance: " + account.balance + " ether");
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

  var doRandomizeEtherbase = function() {
    var account = eth.accounts[Math.round(Math.random() * eth.accounts.length)];
    miner.setEtherbase(account);
    console.log('Randomized! New etherbase: ' + account);
  };

  if (typeof count === 'undefined') {
    doRandomizeEtherbase();

  } else {

    if (count <= 0) {
      return;
    }

    doRandomizeEtherbase();
    console.log('Missing ' + (count - 1));

    setTimeout(function() {
      randomizeEtherbase(count - 1);
    }, 5000);
  }

}