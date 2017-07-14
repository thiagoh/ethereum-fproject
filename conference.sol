pragma solidity ^0.4.11;

contract Conference {
  address public organizer;
  mapping (address => uint) registrantsPaid;
  uint public totalAmount;
  uint public numRegistrants;
  uint public quota;

  event Deposit(address _from, uint _amount);  // so you can log these events
  event Refund(address _to, uint _amount); 

  function Conference() { // Constructor
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
  function refundTicket(address recipient, uint amount) public  {
    if (msg.sender != organizer) { return; }
    if (registrantsPaid[recipient] == amount) { 
      address myAddress = this;
      if (myAddress.balance >= amount) { 
        recipient.transfer(amount);
        registrantsPaid[recipient] = 0;
        totalAmount = totalAmount - amount;
        numRegistrants--;
        Refund(recipient, amount);
      }
    }
  }
  function destroy() { // so funds not locked in contract forever
    if (msg.sender == organizer) { 
      suicide(organizer); // send funds to organizer
    }
  }
}