**Setup**
1. Deploy the Ledger smart contract on a test network
2. Copy the deployed contract address
3. Paste the address into this line in the JS file:
   ```const contractAdd = "CONTRACT_ADDRESS";```
4. Update the ABI of the contract in the line:
   ```const abi = "CONTRACT_ABI";```

**Usage**
1. Click Connect to connect with MetaMask wallet
2. Enter a number in the deposit field
3. Click Deposit
4. Confirm the transaction in MetaMask
5. After the transaction, the table updates automatically
   
**What the app shows**
1. All Wallet addresses which have deposited
2. Total deposited amount for each address
