import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.8.1/dist/ethers.min.js";

const form = document.getElementById('deposit-form');
const input = document.getElementById('deposit-input');
const connectBtn = document.getElementById('connect-btn');
const depositBtn = document.getElementById('deposit-btn');
const balanceTable = document.getElementById('balance-table');
const tHash = document.getElementById('transaction-hash');

const contractAdd = "0x5a55744deAE60cCEaba59f30Ded1b314B1d84479"
const abi =[
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
		"name": "addressCheck",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isDepositer",
				"type": "bool"
			}
		],
		"stateMutability": "view",
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
	},
	{
		"inputs": [],
		"name": "getDepositers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
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
    contract = new ethers.Contract(contractAdd, abi, signer);

    contract.on("AmountDeposited", async() => {
        await updateTable();
    });

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if(accounts.length>0){
        connectBtn.innerText= "Connected";
    }
   
});

form.addEventListener('submit', async(e)=>{

    e.preventDefault();

    if(input.value>0){
    depositBtn.innerText = "Depositing...";
    const tx= await contract.deposit(input.value);
    tHash.innerText = `Transaction Hash: ${tx.hash}`;

    await tx.wait();
    depositBtn.innerText = "Deposit";
    input.value = null;

    }
    
});

async function updateTable(){

    const tBody = balanceTable.getElementsByTagName('tbody')[0];
    tBody.innerHTML="";
    const depositers = await contract.getDepositers();
    for(let i =0; i<depositers.length; i++){

        const newRow = document.createElement('tr');
        const idCell = document.createElement('td');
        const amountCell = document.createElement('td');

        idCell.textContent = depositers[i].toString();
        amountCell.textContent = (await contract.addressToAmount(depositers[i])).toString();
    
        newRow.appendChild(idCell);
        newRow.appendChild(amountCell);
        tBody.appendChild(newRow);

    };

}