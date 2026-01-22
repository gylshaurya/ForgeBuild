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
  const [buttonText, setButtonText] = useState("Stick Your Note")
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
    
    setButtonText("Sticking your Note...")
    
    const tx = await contract.post(message)
    await tx.wait()
    
    setButtonText("Updating the Wall...")
    
    setMessage("")
    loadMessages(contract)
  }
  
  async function loadMessages(contract) {
    const totalPosts = await contract.getCount()
    
    let Posts = []
    
    let i = Number(totalPosts) - 1
    while (i >=0) {
      const message = await contract.wall(i)
      Posts.push(message)
      i-= 1
    }
    
    setPosts(Posts)
    
    setButtonText("Stick Your Note")
  }
  
  useEffect(() => {
    connectWallet().then(contract => {loadMessages(contract)})
  }, [])
  
  return (
    <div
    style={{
      minHeight: "100vh",
      background: "#fff",
      padding: "40px",
      fontFamily: "Arial, sans-serif",
      color: "#111"
    }}
    >
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
    <h1
    style={{
      textAlign: "center",
      fontFamily: "monospace",
      letterSpacing:-3,
      fontWeight:700,
      fontSize:40,
      marginBottom: 30,
      color: "#111"
    }}
    >
    The Public Wall
    </h1>
    
    <div
    style={{
      background: "#ffffff",
      padding: 20,
      borderRadius: 12,
      marginBottom: 40
    }}
    >
    <input
    value={message}
    onChange={e => setMessage(e.target.value)}
    style={{
      width: "100%",
      padding: 12,
      fontSize: 16,
      borderRadius: 8,
      border: "1px solid #ccc",
      marginBottom: 12,
      background: "transparent",
      color: "#111",
      outline: "none"
    }}
    />
    
    <button
    onClick={sendMessage}
    style={{
      padding: "10px 22px",
      background: "#111",
      color: "#fff",
      fontWeight: 600,
      fontSize: 15,
      border: "none",
      borderRadius: 999,
      cursor: "pointer"
    }}
    >
    {buttonText}
    </button>
    </div>
    
    <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: 40
    }}
    >
    {posts.map((post, i) => {
      const time = new Date(
        Number(post.time) * 1000
      ).toLocaleString()
      
      return (
        <div
        key={i}
        style={{
          background: "linear-gradient(135deg, #fff9c4, #fff176)",
          padding: 18,
          minHeight: 150,
          borderRadius: "2px 2px 8px 2px",
          boxShadow: "2px 4px 10px rgba(0,0,0,0.2)",
          transform: `rotate(${(i % 5 - 2) * 1.5}deg)`,
          position: "relative"
        }}
        >
        
        <div
  style={{
    position: "absolute",
    top: -8,
    left: "50%",
    width: 40,
    height: 14,
    background: "rgba(190, 190, 190,0.4)",
    transform: "translateX(-50%) rotate(-2deg)"
  }}
/>

        
        
        <div
        style={{
          fontSize: 18,
          fontWeight:600,
          marginBottom: 12,
          color: "#1a1a1a",
          lineHeight: 1.4
        }}
        >
        {post.message}
        </div>
        
        <div
        style={{
          fontSize: 12,
          color: "#333",
          marginBottom: 6
        }}
        >
        {post.user.slice(0, 30)}...
        </div>
        
        <div
        style={{
          fontSize: 11,
          color: "#555"
        }}
        >
        {time}
        </div>
        </div>
      )
    })}
    </div>
    </div>
    </div>
  )
  
}