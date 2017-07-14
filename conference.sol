pragma solidity ^0.4.11;

contract Conference {
  address public organizer;
  mapping (address => uint) registrantsPaid;
  uint public totalAmount;
  uint public numRegistrants;
  uint public quota;
  uint80 constant None = uint80(0); 

  event Deposit(address _from, uint _amount);  // so you can log these events
  event Refund(address _to, uint _amount); 
  event Error(string message, address _from, address _to, uint _amount); 
  event Info(string message, address _from, address _to, uint _amount); 

  function Conference() payable { // Constructor
    organizer = msg.sender;		
    quota = 500;
    numRegistrants = 0;
    totalAmount=0;
  }
  function buyTicket() payable public returns (bool success) {
    if (numRegistrants >= quota) { return false; }
    registrantsPaid[msg.sender] = msg.value;
    totalAmount = totalAmount + msg.value;
    numRegistrants++;
    Deposit(msg.sender, msg.value);
    return true;
  }
  function changeQuota(uint newquota) public {
    if (msg.sender != organizer) { return; }
    quota = newquota;
  }
  function refundTicket(address recipient, uint amount) public {
    if (msg.sender != organizer) { return; }
    if (registrantsPaid[recipient] == amount) { 

      address myAddress = this;
      if (myAddress.balance >= amount) { 
        
        bool result = recipient.send(amount);
        
        if (result) {
          registrantsPaid[recipient] = 0;
          totalAmount = totalAmount - amount;
          numRegistrants--;
          Refund(recipient, amount);
        }
      }
    }
  }
  function conferenceBalance() returns (uint balance) {
    address myAddress = this;
    return myAddress.balance;
  }
  function sendFunds() payable {
    require(msg.sender == organizer);

    if (msg.sender != organizer) { 
      Error('sender is NOT the same as the organizer', None, None, None);
      return;
    }

    Info('sender is the same as the organizer', None, None, None);

    address myAddress = this;
    organizer.transfer(myAddress.balance);
  }
  function destroy() { // so funds not locked in contract forever
    if (msg.sender == organizer) { 
      suicide(organizer); // send funds to organizer
    }
  }
}