import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.8.1/dist/ethers.min.js";

const form = document.getElementById('deposit-form');
const input = document.getElementById('deposit-input');
const connectBtn = document.getElementById('connect-btn');
const balanceTable = document.getElementById('balance-table');
const tHash = document.getElementById('transaction-hash');

const contractAdd = "0x3cB0ce6D0c48B19B960841661275464A825025ca"
const abi =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "depositerId",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "AmountDeposited",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
    
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if(accounts.length>0){
        connectBtn.innerText= "connected";
    }
   
});

form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAdd, abi, signer);

    contract.on("AmountDeposited", (depositerId, amount) => {
    addEntryToTable(depositerId, amount);
    });

    const tx= await contract.deposit(input.value);
    tHash.innerText = `Transaction Hash: ${tx.hash}`;
    await tx.wait();
    
});

function addEntryToTable(depositerId, amount){
    const tBody = balanceTable.getElementsByTagName('tbody')[0];

    const newRow = document.createElement('tr');
    const idCell = document.createElement('td');
    const amountCell = document.createElement('td');

    idCell.textContent = depositerId;
    amountCell.textContent = amount;
  
    newRow.appendChild(idCell);
    newRow.appendChild(amountCell);
    tBody.appendChild(newRow)
}