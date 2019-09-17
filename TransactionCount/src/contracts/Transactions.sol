pragma solidity ^0.5.0;

contract Transactions {
	uint public blockNumber;
	uint public numTransactions;
	address public owner;


	//constructor - setting up the owner of the contract.
	    constructor() public{
		owner = msg.sender;
		}


}
