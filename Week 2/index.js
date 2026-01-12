import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.8.1/dist/ethers.min.js";

const form = document.getElementById('deposit-form');
const input = document.getElementById('deposit-input');
const connectBtn = document.getElementById('connect-btn');
const balanceTable = document.getElementById('balance-table');
// const depositBtn = document.getElementById('deposit-btn');
// const historyBtn = document.getElementById('history-btn');
// const balanceBtn = document.getElementById('balance-btn');
const tHash = document.getElementById('transaction-hash');

const contractAdd = "0xD5c98751E71C1D0EB4871FD189f0630D1a6F3432"
const abi = [
	{
		"anonymous": false,
		"inputs": [],
		"name": "AmountDeposited",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "depositer",
				"type": "address"
			}
		],
		"name": "addressToAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "depositers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let provider;
let signer;
let contract;

connectBtn.addEventListener( 'click' , async() => {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if(accounts.length>0){
        connectBtn.innerText= "connected";
    }
    contract = new ethers.Contract(contractAdd, abi, signer);
});

contract.on("AmountDeposited", (depositerId, amount) => {
});

form.addEventListener('submit', async()=>{
    const tx= await contract.deposit(input.value);
    tHash.innerText = `Transaction Hash: ${tx.hash}`;
    await tx.wait();
});
