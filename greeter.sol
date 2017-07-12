// pragma solidity ^0.4.11;

// contract mortal {
//     /* Define variable owner of the type address*/
//     address owner;

//     /* this function is executed at initialization and sets the owner of the contract */
//     function mortal() { owner = msg.sender; }

//     /* Function to recover the funds on the contract */
//     function kill() { 
//       if (msg.sender == owner)
//         selfdestruct(owner); 
//     }

//     function sender() constant returns (address) {
//         return msg.sender;
//     }
// }

// contract greeter is mortal {
//   /* define variable greeting of the type string */
//   string greeting;
//   mapping (address => uint) balances;

//   /* this runs when the contract is executed */
//   function greeter(string _greeting) public {
//       greeting = _greeting;
//   }

//   /* main function */
//   function greet() constant returns (string) {
//       return greeting;
//   }

//   function metaCoin() {
//     balances[msg.sender] = 10000;
//   }
  
//   function sendCoin(address receiver, uint amount) returns(bool sufficient) {
//     if (balances[msg.sender] < amount) return false;
//     balances[msg.sender] -= amount;
//     balances[receiver] += amount;
//     return true;
//   }
// }


pragma solidity ^0.4.11;

contract mortal {
    /* Define variable owner of the type address*/
    address owner;

    /* this function is executed at initialization and sets the owner of the contract */
    function mortal() { owner = msg.sender; }

    /* Function to recover the funds on the contract */
    function kill() { 
      if (msg.sender == owner)
        selfdestruct(owner); 
    }

    function sender() constant returns (address) {
        return msg.sender;
    }
}

contract greeter is mortal {
  /* define variable greeting of the type string */
  string greeting;
  mapping (address => uint) balances;

  /* this runs when the contract is executed */
  function greeter(string _greeting) public {
      greeting = _greeting;
  }

  /* main function */
  function greet() constant returns (string) {
      
      var right = " from thiago and lee";
      var _right = bytes(right);
      var _greeting = bytes(greeting);
      var full = new bytes(_greeting.length + _right.length);
      uint k = 0;
      uint i = 0;

      for (i = 0; i < _greeting.length; i++) full[k++] = _greeting[i];
      for (i = 0; i < _right.length; i++) full[k++] = _right[i];
      
      return string(full);
  }

  /* main function */
  function greet_dinamyc() returns (string) {
      
      var right = " from thiago and lee";
      var _right = bytes(right);
      var _greeting = bytes(greeting);
      var full = new bytes(_greeting.length + _right.length);
      uint k = 0;
      uint i = 0;

      for (i = 0; i < _greeting.length; i++) full[k++] = _greeting[i];
      for (i = 0; i < _right.length; i++) full[k++] = _right[i];
      
      return string(full);
  }

  function metaCoin() {
    balances[msg.sender] = 10000;
  }
  
  function sendCoin(address receiver, uint amount) returns(bool sufficient) {
    if (balances[msg.sender] < amount) return false;
    balances[msg.sender] -= amount;
    balances[receiver] += amount;
    return true;
  }
}