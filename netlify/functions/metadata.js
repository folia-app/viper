
require('dotenv').config()
const Eth = require('web3-eth')
const { Kudzu } = require('kuzu-contracts')

const infura = {
  // 1: 'wss://mainnet.infura.io/ws/v3/21b72335f32c40eb8f48a7ee7d9beebb', 
  1: 'https://mainnet.infura.io/v3/21b72335f32c40eb8f48a7ee7d9beebb',
  // 4: 'wss://rinkeby.infura.io/ws/v3/21b72335f32c40eb8f48a7ee7d9beebb',
  4: 'https://rinkeby.infura.io/v3/21b72335f32c40eb8f48a7ee7d9beebb',
}

// require('encoding') // netlify build error / missing package??

const eyes = {
  '0': 'worry-sweat',
  '1': 'whyyy',
  '2': 'upside-down',
  '3': 'cool',
  '4': 'x-eyes',
  '5': 'literally-crying',
  '6': 'wink',
  '7': 'worry-sweat-2',
  '8': 'pwease',
  '9': 'drunk',
  '10': 'mad',
  '11': 'rawr',
  '12': 'sorrow',
  '13': 'whyyy-2',
  '14': 'blank',
  '15': 'hehe',
  '16': 'stress',
  '17': 'eye-roll',
  '18': 'glasses',
  '19': 'wink-2',
  '20': 'dollar-eyes',
  '21': 'surprise',
  '22': 'wink-3',
  '23': 'eeee',
  '24': 'heart',
  '25': 'wink-4',
  '26': 'blank-2',
  '27': 'big-eyes',
  '28': 'fml',
  '29': 'ugh',
  '30': 'blank-3',
  '31': 'pleased'
}
const mouths = {
  '0': 'smile',
  '1': 'barf',
  '2': 'upside-down',
  '3': 'smile-2',
  '4': 'big-o',
  '5': 'big-o-teeth',
  '6': 'drunk',
  '7': 'hot',
  '8': 'small-frown',
  '9': 'party',
  '10': 'little-mad',
  '11': 'wha-wha-wha',
  '12': 'whyyy',
  '13': 'little-mad-2',
  '14': 'big-sad',
  '15': 'happy',
  '16': 'little-mad-3',
  '17': 'shock',
  '18': 'flat',
  '19': 'front-teeth',
  '20': 'party-2',
  '21': 'money-mouth',
  '22': 'kiss-heart',
  '23': 'small-o',
  '24': 'silly',
  '25': 'open-smile',
  '26': 'small-smile',
  '27': 'uh-oh',
  '28': 'flat-2',
  '29': 'big-flat',
  '30': 'drool',
  '31': 'grimmace'
}

// // handler
exports.handler = async function (event, context) {
  try {
    // const networkId = event.queryStringParameters.network ?? '1' // ?network=4
    const tokenId = event.path.substr(event.path.lastIndexOf('/') + 1) // 1000005

    var bigTokenId = BigInt(tokenId)
    var mouth = bigTokenId & 31n
    var eye = bigTokenId >> 8n & 31n

    const owner = await getNFTOwnerByTokenId(tokenId)

    // the sauce
    const metadata = {
      // both opensea and rarebits
      name: `Kudzu No ${bigTokenId >> 16n}`,
      owner,

      description: `Kudzu is contagious, let the vine grow...\n\nThis is the token number ${bigTokenId >> 16n} but it has ID ${tokenId} (0x${(bigTokenId).toString(16)}) with ${eyes[eye]} eyes (0x${(bigTokenId >> 8n & 31n).toString(16)}) and ${mouths[mouth]} mouth (0x${(bigTokenId & 31n).toString(16)}).`,

      // opensea
      external_url: `https://folia.app/works/kudzu?token=${tokenId}`,
      // rarebits
      home_url: `https://folia.app/works/kudzu?token=${tokenId}`,

      // opensea
      image: `${process.env.VUE_APP_CANONICAL_DOMAIN}/img/${tokenId}`,

      // rarebits
      image_url: `${process.env.VUE_APP_CANONICAL_DOMAIN}/img/${tokenId}`,

      // opensea
      attributes: [
        {
          trait_type: 'eyes',
          value: eyes[eye]
        },
        {
          trait_type: 'mouth',
          value: mouths[mouth]
        }
      ],
      // rarebits
      properties: [
        { key: 'eyes', value: eyes[eye], type: 'string' },
        { key: 'mouth', value: mouths[mouth], type: 'string' }
      ],
    }

    // return metadata :)
    return {
      statusCode: 200,
      body: JSON.stringify(metadata)
    }

    // errors...
  } catch (e) {
    console.error(e)
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 500, message: 'Internal Server Error', error: e })
    }
  }
}

// HELPERS
// get token owner (check if token minted...)
async function getNFTOwnerByTokenId(tokenId, networkId = 1) {
  let owner
  try {
    // setup contract

    const eth = new Eth(infura[networkId])
    kudzuContract = new eth.Contract(
      Kudzu.abi,
      Kudzu.networks[networkId].address
    )
    owner = await kudzuContract.methods.ownerOf(tokenId).call()
  } catch (e) {
    // will throw error if no owner...
    console.error(e)
  }
  return owner
}
