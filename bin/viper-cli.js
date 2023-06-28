#!/usr/bin/env node
var commander = require('commander')
const fs = require('fs')
const p5 = require('node-p5')
const { Viper } = require('../dist/viper.js')
const { extractBiteId } = require('./utils')
const sharp = require('sharp');
const { ethers } = require("ethers")
const dotenv = require('dotenv')
dotenv.config()
dotenv.config({ path: `.env.local`, override: true });

const formatName = function (tokenId, length) {
  const paddedTokenId = String(tokenId).padStart(4, '0')
  const paddedLength = String(length).padStart(3, '0')
  return `${paddedTokenId}-${paddedLength}`
}

async function reverseLookup(address) {
  const provider = new ethers.providers.InfuraProvider(
    "homestead",
    process.env.INFURA_API_KEY,
  );
  const name = await provider.lookupAddress(address)
  return name || address
}


commander
  .version('0.0.1')


async function wait(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

commander
  .command('population')
  .description('Generate viper population')
  .action(async () => {

    const viper = new Viper({})
    viper.populate()
  })

commander
  .command('firstFrames')
  .description('Generate first frames')
  .action(async () => {

    const viper = new Viper({
      setting: "server"
    })
    const totalVipers = viper.allVipers.length
    for (let i = 0; i < totalVipers; i++) {
      await new Promise((resolve, reject) => {
        const viper = new Viper({
          setting: "server",
          tokenId: i + 1,
          pattern: "random",
          maxNumberOfLines: 100,
        })
        function sketch(p) {
          let framesSoFar = 0
          let readyToDraw = false
          p.setup = async () => {
            viper.setup(p)
            await viper.preload()
            viper.addAllLines(viper.maxNumberOfLines)
            readyToDraw = true
            // await p.saveFrames(viper.canvas.drawingContext, filename, {}, seconds, fps)

            viper.endLog()
          }
          p.draw = () => {
            if (!readyToDraw) return
            // so that the draw doesn't go on forever
            p.noLoop()
            viper.draw()
            // const contents = c.canvas.toDataURL();
            p.saveCanvas(viper.canvas.drawingContext, "firstframes/" + (i + 1), 'png')
            resolve()
          }
        }
        p5.createSketch(sketch)
      })
    }

  })

commander
  .command('hole <width>')
  .description('Generate viper holes from svg images')
  .action(async (width) => {
    await convertSVG('holes', width)
  })

commander
  .command('heads <width>')
  .description('Generate viper heads from svg images')
  .action(async (width) => {
    await convertSVG('head', width)
    await convertSVG('skeleton-head', width)
  })

commander
  .command('tails <width>')
  .description('Generate viper tails from svg images')
  .action(async (width) => {
    await convertSVG('tail', width)
    await convertSVG('skeleton-tail', width)
  })

commander
  .command('big-heads <width>')
  .description('Generate viper big heads from svg images')
  .action(async (width) => {
    await convertSVG('big-head', width)
  })

commander
  .command('skeleton-bodies')
  .action(async () => {
    await convertSVG('skeleton-body', 100)
  })

async function convertSVG(path, width) {
  width = parseInt(width)
  if (width < 1) {
    console.log('width must be greater than 0')
    process.exit(1)
  }
  const rawFolder = `./public/${path}/raw`
  const distFolder = `./public/${path}`
  const files = fs.readdirSync(rawFolder).filter(file => file.endsWith('.svg')).sort((a, b) => {
    a = parseInt(a.split("/").pop().split(".").shift())
    b = parseInt(b.split("/").pop().split(".").shift())
    return a > b ? 1 : (a < b ? -1 : 0)
  })
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    try {
      // use sharp to load the svg and convert to png with the right dimensions
      await sharp(`${rawFolder}/${file}`).resize(width).png().toFile(`${distFolder}/${i + 1}.png`)
    } catch (e) {
      console.log(e)
    }
  }
}


commander
  .command('bodies <width> <height>')
  .description('Generate viper segments from svg images')
  .action(async (width, height) => {
    width = parseInt(width)
    height = parseInt(height)
    if (width < 1 || height < 1) {
      console.log('width must be greater than 0')
      process.exit(1)
    }
    await convertSVG('skeleton-body', width)
    // loop through all images in raw folder
    // generate viper segments
    // save to dist folder
    let strokeWidth = Math.round(width / 30)
    let imageWidth = Math.round(width - strokeWidth * 2)
    let imageHeight = Math.round(height - strokeWidth * 2)

    const rawFolder = './public/body/raw'
    const distFolder = './public/body/masked'
    // readFileSync in raw
    const files = fs.readdirSync(rawFolder).filter(file => file.endsWith('.svg')).sort((a, b) => {
      return parseInt(a.split('.')[0]) - parseInt(b.split('.')[0])
    })

    let numSaved = 0
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        // use sharp to load the svg and convert to png with the right dimensions
        await sharp(`${rawFolder}/${file}`).resize(imageWidth, imageHeight).png().toFile(`${distFolder}/../mask-resized/${i + 1}.png`)
        await sharp(`${rawFolder}/${file}`).resize(width, height).png().toFile(`${distFolder}/../resized/${i + 1}.png`)
      } catch (e) {
        console.log(e)
      }

      // const viper = new Viper({
      //   setting: "server",
      //   tokenId: 2
      // })

      // await new Promise((resolve, reject) => {
      //   let p5Instance = p5.createSketch((p) => {
      //     p.setup = async () => {
      //       // await loadImages(p, viper, preloads)
      //       viper.setup(p)
      //       viper.preload()
      //       p.noLoop()
      //       img = await p.loadImage(`${distFolder}/../mask-resized/${i + 1}.png`)
      //       const color = [0, 0, 0]// [viper.random(0, 255), viper.random(0, 255), viper.random(0, 255)]
      //       const maskedImg = viper.makeMaskedImage(img, color, imageWidth, imageHeight)
      //       // p.image(maskedImg, 0, 0)
      //       // viper.image(maskedImg, viper.width / 2, viper.width / 2)
      //       console.log('save masked image')
      //       const filename = `${distFolder}/${i + 1}`
      //       await p.saveCanvas(maskedImg, filename, 'png')//.then(filename => {
      //       numSaved++
      //       console.log(`saved the canvas as ${filename}`);
      //       resolve()
      //       // });
      //     }
      //     p.draw = async () => {
      //       p.noLoop()
      //     }
      //   })
      // })
      // await wait(1000)
      // console.log({ p5Instance })
    }
    // await new Promise((resolve) => {
    //   foo = setInterval(() => {
    //     if (numSaved === files.length) {
    //       clearInterval(foo)
    //       resolve()
    //     } else {
    //       console.log({ numSaved })
    //     }
    //   }, 1000)
    // })

    process.exit(1)
  })

commander
  .command('generate-gif <tokenId> <viperLength>')
  .description('Generate viper gif')
  .action(async (tokenIdParam, viperLength) => {
    const printLogs = process.env.NODE_ENV === 'development'
    let tokenId = parseInt(tokenIdParam)
    let bittenBy = null, bitten = false
    viperLength = parseInt(viperLength)
    let originalTokenId, length, senderAddress
    if (tokenId > 512) {
      bitten = true;
      ({ length, originalTokenId, senderAddress } = extractBiteId(tokenIdParam));
      tokenId = originalTokenId.toNumber()
      bittenBy = senderAddress.toHexString()

      // get ens name of address bittenBy
      bittenBy = await reverseLookup(bittenBy)
      viperLength = length.toNumber()
    }
    const filename = bitten ? "b" + formatName(originalTokenId, viperLength) : formatName(tokenId, viperLength)
    console.time(filename)
    const viper = new Viper({
      logs: printLogs,
      tokenId,
      bittenBy,
      maxNumberOfLines: viperLength
    })

    console.log(filename, `>> Generating ${parseInt(filename.split("-")[1])}-segment Viper #${(bitten ? 'b' : '') + parseInt(filename.split("-")[0].replace("b", ""))}, ${viper.seconds()} seconds, ${viper.seconds() * viper.fps} frames`)

    function sketch(p) {
      let seconds = viper.seconds()
      // seconds = (1 / 35) * 5
      let fps = 35
      let totalFrames = seconds * fps
      let framesSoFar = 0
      let readyToDraw = false
      p.setup = async () => {
        try {
          viper.setup(p)
          await viper.preload()
          if (viper.pattern !== "randomLoop") {
            viper.addAllLines(viper.maxNumberOfLines)
          }
          readyToDraw = true
          await p.saveFrames(viper.canvas.drawingContext, filename, {}, seconds, fps)
          console.timeEnd(filename, "gif is done")
          viper.endLog()
        } catch (setupError) {
          console.log({ setupError })
        }
      }
      p.draw = () => {
        // so that the draw doesn't go on forever
        p.noLoop()
        // will try to draw immediately after setup runs but images aren't loaded and we only want saveFrames
        // to be the one to call draw
        if (!readyToDraw) {
          return
        }
        if (framesSoFar >= totalFrames) {
          console.error('tried to draw more frames than totalFrames, this shouldnt happen')
          return
        }
        if (framesSoFar === totalFrames) {
          console.error('framesSoFar === totalFrames, but this shouldnt happen')
          return
        }
        printLogs && console.time(filename + "-draw-" + framesSoFar)
        viper.draw()
        printLogs && console.timeEnd(filename + "-draw-" + framesSoFar)
        framesSoFar++
      }
    }

    p5.createSketch(sketch)
  })

if (process.argv === 0) {
  commander.help()
  process.exit(1)
}

commander.parse(process.argv)

