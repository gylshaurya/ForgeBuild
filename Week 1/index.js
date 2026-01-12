import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.8.1/dist/ethers.min.js";

const form = document.getElementById('web3-form');
const input = document.getElementById('input');
const output = document.getElementById('output');
const submitBtn = document.getElementById('submit-btn');
const getBtn = document.getElementById('get-btn');
const tHash = document.getElementById('transaction-hash');

const contractAdd = "0x21638bD3019BfbD4Fb7B3d833b1F3F3E07BC2d60";

let signer;
let provider;
let contract;

const abi = [
  "function store(uint256 num)",
  "function get() view returns (uint256)"
]

form.addEventListener('submit', async (e) =>{
    
    e.preventDefault();
    await storeValue(input.value);
    submitBtn.innerText = `Upload Successful`
});

getBtn.addEventListener( 'click', async(e)=> {
    await getValue();
    getBtn.innerText = `Fetch Successful`
});

async function storeValue (num){
    output.innerText = "";

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAdd, abi, signer);

    const tx = await contract.store(num);
    tHash.innerText = `Transaction Hash: ${tx.hash}`;   
    submitBtn.innerText = `Uploading... `
    await tx.wait();
}

async function getValue() {
    getBtn.innerText = `Fetching... `
    const storedVal = await contract.get();
    output.innerText = storedVal.toString();
}