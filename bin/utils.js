const { ethers } = require("ethers");

function extractBiteId(tokenId) {
  tokenId = ethers.BigNumber.from(tokenId.toString())
  // length is tokenId bit shifted right 169 bits
  const length = tokenId.shr(169)
  if (length.lt(1)) {
    throw new Error(`Invalid length ${length} for tokenId ${tokenId}`)
  }
  // originalTokenId is tokenId bit shifted right 160 bits and then masked with 0x1ff
  const originalTokenId = tokenId.shr(160).and(0x1ff)
  if (originalTokenId.lt(1) || originalTokenId.gt(486)) {
    throw new Error(`Invalid originalTokenId ${originalTokenId} for tokenId ${tokenId}`)
  }
  // senderAddress is tokenId masked with 0xffffffffffffffffffffffffffffffffffffffff
  const senderAddress = tokenId.and("0xffffffffffffffffffffffffffffffffffffffff")
  return { length, originalTokenId, senderAddress }
}

async function reverseLookup(address) {
  let name
  try {
    const provider = new ethers.providers.InfuraProvider(
      "homestead",
      process.env.INFURA_API_KEY,
    );
    name = await provider.lookupAddress(address)
  } catch (e) {
    return address
  }
  return name || address
}

// export extractBiteId
module.exports = { extractBiteId, reverseLookup }