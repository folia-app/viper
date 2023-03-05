const { Image, createCanvas } = require('canvas')
const fs = require('fs')
const Eth = require('web3-eth')
const { Kudzu } = require('kuzu-contracts')
const path = require("path");
require('dotenv').config()

var loadFromUrl = true

exports.handler = async function (event, context) {
  var size = 768
  var gridSize = 8
  var margin = 2
  let circleSize, radius, offset, ctx
  const ignoreIsOwned = process.env.VUE_APP_DEV_IGNORE_IS_OWNED === 'true'

  let kudzuContract
  // infura endpoints
  const infura = {
    1: 'wss://mainnet.infura.io/ws/v3/21b72335f32c40eb8f48a7ee7d9beebb', // https://mainnet.infura.io/v3/21b72335f32c40eb8f48a7ee7d9beebb',
    4: 'wss://rinkeby.infura.io/ws/v3/21b72335f32c40eb8f48a7ee7d9beebb' // https://rinkeby.infura.io/v3/21b72335f32c40eb8f48a7ee7d9beebb'
  }

  let tokenId = event.path.substr(event.path.lastIndexOf('/') + 1)
  const networkId = event.queryStringParameters.network ?? '1' // ?network=4
  const byIndex = event.queryStringParameters.byIndex

  if (byIndex) {
    tokenId = await getTokenByIndex(tokenId)
  }

  if (!ignoreIsOwned) {
    // !! generative && not owned / minted yet
    const owner = await getNFTOwnerByTokenId(tokenId, networkId)
    if (!owner) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Not yet minted'
        })
      }
    }
  }


  const canvas = createCanvas(size, size)
  ctx = canvas.getContext('2d')
  canvas.width = size
  canvas.height = size

  await makeKudzu(tokenId)

  var dataURL = canvas.toDataURL("image/jpeg", 0.01)
  dataURL = await replaceWhite(dataURL)

  return {
    statusCode: 200,
    headers: {
      'content-type': "image/jpeg",
    },
    body: dataURL.replace('data:image/jpeg;base64,', ''),
    isBase64Encoded: true
  }


  async function makeKudzu(tokenId) {
    var grid = new Array(gridSize).fill([]).map(item => new Array(gridSize).fill(0))



    ctx.fillStyle = `white`;
    ctx.fillRect(0, 0, size, size);

    addLeaves(grid, tokenId)

    await addEyesAndMouth(tokenId)
  }

  function addLeaves(grid, tokenId) {

    circleSize = size / (gridSize + margin * 2)
    radius = circleSize / 1.25
    offset = margin * circleSize

    var tokenBase = BigInt(tokenId)
    tokenBase = tokenBase >> 16n
    tokenBase = tokenBase.toString(10)

    var sequence = Array.from(Array(grid.length * grid.length).keys())

    shuffle(sequence, tokenBase)
    var off = 0;
    for (var i = 0; i < sequence.length; i++) {
      var row = Math.floor(sequence[i] / grid.length)
      var col = (sequence[i] % grid.length)
      var num = tokenBase.substr(-off, 1)
      num = ((num * 11) + 119)
      var color = `rgba(0, ${num}, 0, 1)`
      off += 1
      if (off >= tokenBase.length) {
        off = 0
      }

      makeSmallLeaf(row, col, color, tokenBase, off)
    }
  }

  function shuffle(array, tokenId) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    var off = 0;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      // randomIndex = Math.floor(Math.random() * currentIndex);
      randomIndex = Math.floor((tokenId.substr(-off, 1) / 10) * currentIndex)

      // randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      off += 1
      if (off >= tokenId.length) {
        off = 0
      }
    }
    return array;
  }

  function makeSmallLeaf(i, j, color, tokenId, off) {

    var x = (i * circleSize) + (circleSize / 2) + offset;
    var y = (j * circleSize) + (circleSize / 2) + offset;
    ctx.fillStyle = color
    let rotate
    ctx.beginPath();

    var side = Math.floor((tokenId.substr(off, 1) / 10) * 4) + 1

    switch (side) {
      case (1):
        rotate = 0
        ctx.arc(x - (radius), y, radius * 2, rotate, rotate + .4 * Math.PI, 0);
        ctx.arc(x - (radius * 2), y, radius * 2, rotate, rotate, 0)
        break;
      case (2):
        rotate = Math.PI
        ctx.arc(x + radius, y, radius * 2, rotate, rotate + .4 * Math.PI, 0);
        ctx.arc(x + (radius * 2), y, radius * 2, rotate, rotate, 0)
        break;
      case (3):
        rotate = - Math.PI / 2
        ctx.arc(x, y + radius, radius * 2, rotate, rotate + .4 * Math.PI, 0);
        ctx.arc(x, y + radius * 2, radius * 2, rotate, rotate, 0)
        break;
      case (4):
        rotate = - Math.PI
        ctx.arc(x + (radius / 2), y + (radius * .9), radius * 2, rotate, rotate + .4 * Math.PI, 0);
        ctx.arc(x + radius * 2, y - (radius * .1), radius * 2, rotate, rotate, 0)
        break;
    }

    // circle
    var startAngle = 0
    var endAngle = 2 * Math.PI
    var counterclockwise = 0
    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx.fill();

  }

  async function addEyesAndMouth(tokenId) {

    tokenId = BigInt(tokenId)
    var mouth = tokenId & 31n
    var eyes = tokenId >> 8n & 31n

    var drawingSize = size / 1.6
    var drawingPos = (size - drawingSize) / 2

    return new Promise((resolve) => {
      var done = false

      var drawing = new Image();
      if (!loadFromUrl) {
        var filename = `./eyes/${eyes}.png`
        const data = fs.readFileSync(require.resolve(filename))
        // // convert image file to base64-encoded string
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        // // combine all strings
        const base64ImageStr = `data:image/${eyes};base64,${base64Image}`;
        src = base64ImageStr
      } else {
        src = `${process.env.IMG_URL}/eyes/${eyes}.png`
      }

      drawing.onload = function () {
        ctx.drawImage(drawing, drawingPos, drawingPos, drawingSize, drawingSize);
        if (done) {
          resolve()
        } else {
          done = true
        }
      };
      drawing.src = src


      var drawing2 = new Image();
      if (!loadFromUrl) {
        var filename = `./mouth/${mouth}.png`
        const data = fs.readFileSync(require.resolve(filename))
        // // convert image file to base64-encoded string
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        // // combine all strings
        const base64ImageStr = `data:image/${eyes};base64,${base64Image}`;
        src2 = base64ImageStr
      } else {
        src2 = `${process.env.IMG_URL}/mouth/${mouth}.png`
      }

      drawing2.onload = function () {
        ctx.drawImage(drawing2, drawingPos, drawingPos, drawingSize, drawingSize);
        if (done) {
          resolve()
        } else {
          done = true
        }
      };
      drawing2.src = src2
    })
  }

  function replaceWhite(dataURL) {
    return new Promise((resolve) => {
      const cnv = createCanvas(size, size)
      const ctx = cnv.getContext('2d')
      cnv.width = size
      cnv.height = size
      const img = new Image;
      img.onload = function () {
        ctx.drawImage(img, 0, 0)
        const oldRed = 228
        const oldGreen = 228
        const oldBlue = 228

        var imageData = ctx.getImageData(0, 0, size, size);

        // change any old rgb to the new-rgb
        for (var i = 0; i < imageData.data.length; i += 4) {
          // is this pixel the old rgb?
          if (imageData.data[i] == oldRed &&
            imageData.data[i + 1] == oldGreen &&
            imageData.data[i + 2] == oldBlue
          ) {
            // change to your new rgb
            imageData.data[i] = 255;
            imageData.data[i + 1] = 255;
            imageData.data[i + 2] = 255;
          }
        }
        // put the altered data back on the canvas  
        ctx.putImageData(imageData, 0, 0);
        resolve(cnv.toDataURL("image/jpeg"))
      };
      img.src = dataURL;
    })
  }

  async function getTokenByIndex(tokenId) {
    // setup contract
    const eth = new Eth(infura[networkId])
    kudzuContract = new eth.Contract(
      Kudzu.abi,
      Kudzu.networks[networkId].address
    )

    const tokenByIndex = await kudzuContract.methods.tokenByIndex(tokenId).call()
    return tokenByIndex.toString(10)

  }

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

      const totalSupply = await kudzuContract.methods.totalSupply().call()
      console.log({ totalSupply })

      owner = await kudzuContract.methods.ownerOf(tokenId).call()
    } catch (e) {
      // will throw error if no owner...
      console.error(e)
    }
    return owner
  }


}