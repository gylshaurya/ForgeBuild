import { ethers } from "ethers"
import { useEffect, useState } from "react"

const contractAddress = "0x8Bb7Bc576e518440194DDaFFd973CE9F34040fBb"
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "post",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
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
		"name": "wall",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default function Home() {
  
  const [message, setMessage] = useState("")
  const [posts, setPosts] = useState([])
  const [contract, setContract] = useState(null)

  async function connectWallet() {
    const ethereum = window.ethereum
    const provider = new ethers.BrowserProvider(ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer = await provider.getSigner()
    const wallContract = new ethers.Contract(contractAddress,abi,signer)

    setContract(wallContract)
    return wallContract
  }

  async function sendMessage() {
    if (!contract) {
      return
    }

    const tx = await contract.post(message)
    await tx.wait()

    setMessage("")
    loadMessages(contract)
  }

  async function loadMessages(contract) {
    const totalPosts = await contract.getCount()

    let Posts = []

    let i = 0
    while (i < Number(totalPosts)) {
      const message = await contract.wall(i)
      Posts.push(message)
      i+= 1
    }

    setPosts(Posts)
  }

  useEffect(() => {
    connectWallet().then(contract => {loadMessages(contract)})
  }, [])

  return (
    <div>
      <h2>I Was Here</h2>

      <input value={message} onChange={e => setMessage(e.target.value)}/>

      <button onClick={sendMessage}>post</button>

      <div>
        {posts.map((post, id) => {
          return (<div key={id}>{post.message} : {post.user} : {post.time} </div>)
        })}
      </div>

    </div>
  )
}