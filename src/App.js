import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import Web3 from 'web3';

const ADDRESS = '0x05347c5e04fFEC12F60aA359c784c15967D92F37';
const ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "startingPoint", type: "uint256" },
      { internalType: "string", name: "startingMessage", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "decreaseNumber", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "getNumber", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "increaseNumber", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "message", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
  { inputs: [{ internalType: "string", name: "newMessage", type: "string" }], name: "setMessage", outputs: [], stateMutability: "nonpayable", type: "function" },
];

function App() {
  const [number, setNumber] = useState('none');
  const [newMessage, setNewMessage] = useState("none");
  const [currentMessage, setCurrentMessage] = useState("none");

  // Initialize the Web3 object
  const web3 = new Web3(window.ethereum);

  // Initialize the contract with ABI and address
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  // Reading Functions
  async function getNumber() {
    const result = await myContract.methods.getNumber().call();
    setNumber(result.toString());
  }

  async function getMessage() {
    const message = await myContract.methods.message().call();
    setCurrentMessage(message);
  }

  // Writing Functions
  async function increaseNumber() {
    const accountsConnected = await web3.eth.requestAccounts();
    await myContract.methods.increaseNumber().send({
      from: accountsConnected[0],
    });
    getNumber();
  }

  async function decreaseNumber() {
    const accountsConnected = await web3.eth.requestAccounts();
    await myContract.methods.decreaseNumber().send({
      from: accountsConnected[0],
    });
    getNumber();
  }

  async function updateMessage() {
    const accountsConnected = await web3.eth.requestAccounts();
    await myContract.methods.setMessage(newMessage).send({
      from: accountsConnected[0],
    });
    getMessage();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Smart Contract Interaction</h1>
        <p>Number: {number}</p>
        <p>Message: {currentMessage}</p>
        <button onClick={getNumber}>Get Number</button>
        <button onClick={getMessage}>Get Message</button>
        <button onClick={increaseNumber}>Increase Number</button>
        <button onClick={decreaseNumber}>Decrease Number</button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter new message"
        />
        <button onClick={updateMessage}>Update Message</button>
      </header>
    </div>
  );
}

export default App;

