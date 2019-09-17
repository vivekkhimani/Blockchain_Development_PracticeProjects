import React, { Component } from 'react'
import logo from '../logo.png'
import Web3 from 'web3'
import Eth from 'web3-eth'
import Accounts from 'web3-eth-accounts'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css'


var web3 = new Web3(Web3.givenProvider || "ws://some.local-or-remote.node:8545");
var eth = new Eth(Eth.givenProvider || "ws://some.local-or-remote.node:8545");
var accounts = new Accounts('ws://localhost:8545');
var contract = new web3.eth.Contract([
  {
    "constant": true,
    "inputs": [],
    "name": "blockNumber",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "numTransactions",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }
], '0xDfDb5ECfFCa5f145c4E4b79b18aC7B6F8b141F8e')

contract.deploy();
//web3.eth.defaultAccount = web3.eth.getAccounts[0];
//console.log(web3.eth.defaultAccount);

class App extends Component {

  constructor(props){
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
  }

  async componentWillMount(){
    await this.loadWeb3()
  }

  async loadWeb3(){
    window.addEventListener('load', async()=>{
      //Modern App Browsers
      if (window.ethereum){
        window.web3 = new Web3(window.ethereum);
        //await web3.ethereum.enable();
      }

      else if(window.web3){
        window.web3 = new Web3(web3.currentProvider);
        //Accounts are always exposed
        //web3.eth.sendTransaction({});
      }
      else{
        window.alert('Non-Ethereum Browser detected.')
      }
    });
  }

  showTransactions(reqBlock){
    web3.eth.getBlockTransactionCount(reqBlock).
      then(function (blockNum){
        window.alert("Num of Transactions = "+blockNum);
      }).catch(function(e) {
        window.alert(e);
      });
  }


  render() {
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Enter Block Number</Form.Label>
                    <Form.Control value={this.state.value} onChange={this.handleChange} type="text" placeholder="Enter Block Number" />
                </Form.Group>
                <Button variant="primary" onClick={() => this.showTransactions(this.state.value)}>
                  Submit
                </Button>
              </Form>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
