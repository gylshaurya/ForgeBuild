import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.8.1/dist/ethers.min.js";

const form = document.getElementById('web3-form');
const input = document.getElementById('input');
const output = document.getElementById('output');

const contractAdd = "0x21638bD3019BfbD4Fb7B3d833b1F3F3E07BC2d60";

let signer;
let provider;
let contract;
let network;

const abi = [
  "function store(uint256 num)",
  "function get() view returns (uint256)"
]

form.addEventListener('submit', async (e) =>{
    
    e.preventDefault();
    await storeValue(input.value);
    await getValue();

});

async function storeValue (num){
    output.innerText = "";
    window.alert("Storing Number on Sepolia");

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAdd, abi, signer);

    const tx = await contract.store(num);
    await tx.wait();
}

async function getValue() {
    window.alert("Getting Number from Sepolia");
    const storedVal = await contract.get();
    output.innerText = storedVal.toString();
}