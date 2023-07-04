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
  const provider = new ethers.providers.InfuraProvider(
    "homestead",
    '671d0acca9914d5b88ef05224f007fa2',
  );
  const name = await provider.lookupAddress(address)
  return name || address
}

// export extractBiteId
module.exports = { extractBiteId, reverseLookup }