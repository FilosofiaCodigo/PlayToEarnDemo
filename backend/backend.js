import createAlchemyWeb3 from "@alch/alchemy-web3"
import dotenv from "dotenv"
import fs from "fs"
import cors from "cors"
import express from "express"

const app = express()
dotenv.config();

const JSON_CONTRACT_PATH = "./MyToken.json"
const CONTRACT_ADDRESS = "0xCONTRACTADDRESSHERE"
const BACKEND_WALLET_ADDRESS = "0xVAULTOWNERADDRESSHERE"
const PORT = 8080
var web3 = null
var contract = null

const loadContract = async (data) => {
  data = JSON.parse(data);
  
  const netId = await web3.eth.net.getId();
  const deployedNetwork = data.networks[netId];
  contract = new web3.eth.Contract(
    data.abi,
    deployedNetwork && deployedNetwork.address
  );

  //var totalSupply = await contract.methods.totalSupply().call()
  //console.log("Contract initialized. Total supply is: " + totalSupply)
}

async function initAPI() {
  const { RINKEBY_RPC_URL, PRIVATE_KEY } = process.env;
  web3 = createAlchemyWeb3.createAlchemyWeb3(RINKEBY_RPC_URL);

  fs.readFile(JSON_CONTRACT_PATH, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    loadContract(data, web3)
  });

  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
  })
  app.use(cors())
}

async function transferCoins(address_beneficiary, amount)
{
  const nonce = await web3.eth.getTransactionCount(BACKEND_WALLET_ADDRESS, 'latest'); // nonce starts counting from 0

  const transaction = {
   'from': BACKEND_WALLET_ADDRESS,
   'to': CONTRACT_ADDRESS,
   'value': 0,
   'gas': 300000,
   'nonce': nonce,
   'data': contract.methods.transfer(address_beneficiary, amount).encodeABI()
  };
  const { RINKEBY_RPC_URL, PRIVATE_KEY } = process.env;
  const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

  web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
  });
}

//http://localhost:8080/exchange?address=0x730bF3B67090511A64ABA060FbD2F7903536321E&points=1234
app.get('/exchange', (req, res) => {
  var address = req.query["address"]
  var points = req.query["points"]
  var message = "Sent " + points + " tokens to " + " " + address
  transferCoins(address, web3.utils.toWei(points))
  res.setHeader('Content-Type', 'application/json');
  res.send({
    "message": message
  })
})
initAPI()
