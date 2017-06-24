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

function startCheckingAllBalances() {

  var interval = setInterval(checkAllBalances, 3000);

  return interval;
}

function unlockAccount(account) {

  account = typeof account === 'undefined' ? '0x39ac693fa97b784d2f04b8fa6d42c7d4122a893d' : account;

  personal.unlockAccount(account, 'thisismystupidpassword!!', 3000);
}

function createAccounts(numOfAccounts) {
  for (var i = 0; i < numOfAccounts; i++) {
    personal.newAccount("thisismystupidpassword!!");
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