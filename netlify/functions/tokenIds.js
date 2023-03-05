// import { Kudzu } from 'kuzu-contracts'
const { Kudzu } = require('kuzu-contracts')
const Eth = require('web3-eth')
// import Eth from 'web3-eth'

require('dotenv').config()

const ignoreIsOwned = process.env.VUE_APP_DEV_IGNORE_IS_OWNED === 'true'
const transferInputs = [
  {
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
]

let kudzuContract
// infura endpoints
const infura = {
  // 1: 'wss://mainnet.infura.io/ws/v3/21b72335f32c40eb8f48a7ee7d9beebb', 
  1: 'https://mainnet.infura.io/v3/21b72335f32c40eb8f48a7ee7d9beebb',
  // 4: 'wss://rinkeby.infura.io/ws/v3/21b72335f32c40eb8f48a7ee7d9beebb',
  4: 'https://rinkeby.infura.io/v3/21b72335f32c40eb8f48a7ee7d9beebb',
}

exports.handler = async function (event, context) {
  const networkId = event.queryStringParameters.network ?? '1' // ?network=4
  const tokenIds = await getTokenIds(networkId)
  return {
    statusCode: 200,
    headers: {
      "access-control-allow-origin": "*",
    },
    body: JSON.stringify({ tokens: tokenIds })
  }
}

async function getTokenIds(networkId) {
  const eth = new Eth(infura[networkId])

  kudzuContract = new eth.Contract(
    Kudzu.abi,
    Kudzu.networks[networkId].address
  )
  // const totalSupply = await kudzuContract.methods
  //   .totalSupply().call()

  const events = await kudzuContract.getPastEvents('Transfer', {
    fromBlock: 12273212,
    toBlock: "latest"
  })
  // if (events.length != totalSupply) {
  //   throw Error(`totalSupply ${totalSupply} does not match number of Transfer events ${events.length}`)
  // }
  const tokenIds = events.map(event => {
    const tokenId = event.returnValues.tokenId
    return {
      tokenId,
      image: `${process.env.VUE_APP_CANONICAL_DOMAIN}/img/${tokenId}`,
      link: `https://opensea.io/assets/${Kudzu.networks[networkId].address}/${tokenId}`,
      owner: event.returnValues.to
    }
  })
  return tokenIds
}
