#!/usr/bin/env node
var commander = require('commander')
const fs = require('fs')
const p5 = require('node-p5')
const { Viper } = require('../dist/viper.js')
// const { convert } = require('convert-svg-to-png');
const sharp = require('sharp');
const dotenv = require('dotenv')
dotenv.config()
dotenv.config({ path: `.env.local`, override: true });

const formatName = function (tokenId, length) {
  const paddedTokenId = String(tokenId).padStart(4, '0')
  const paddedLength = String(length).padStart(3, '0')
  return `${paddedTokenId}-${paddedLength}`
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
  .command('heads <width>')
  .description('Generate viper tails from svg images')
  .action(async (width) => {
    await convertSVG('head', width)
  })

commander
  .command('tails <width>')
  .description('Generate viper tails from svg images')
  .action(async (width) => {
    await convertSVG('tail', width)
  })

async function convertSVG(path, width) {
  width = parseInt(width)
  if (width < 1) {
    console.log('width must be greater than 0')
    process.exit(1)
  }
  const rawFolder = `./public/${path}/raw`
  const distFolder = `./public/${path}`
  const files = fs.readdirSync(rawFolder).filter(file => file.endsWith('.svg'))
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    try {
      // use sharp to load the svg and convert to png with the right dimensions
      await sharp(`${rawFolder}/${file}`).resize(width).png().toFile(`${distFolder}/${file.replace("svg", "png")}`)
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
    console.log({width, height})
    if (width < 1 || height < 1) {
      console.log('width must be greater than 0')
      process.exit(1)
    }
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
    const preloads = {}
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        // use sharp to load the svg and convert to png with the right dimensions
        await sharp(`${rawFolder}/${file}`).resize(imageWidth, imageHeight).png().toFile(`${distFolder}/../resized/${i + 1}.png`)
      } catch (e) {
        console.log(e)
      }

      const viper = new Viper({
        setting: "server",
        tokenId: 2
      })
      console.log(file)
      await new Promise((resolve, reject) => {
      let p5Instance = p5.createSketch((p) => {
        p.setup = async () => {
          await loadImages(p, viper, preloads)
          viper.setup(p)
          p.noLoop()
          img = await p.loadImage(`${distFolder}/../resized/${i + 1}.png`)
          const color = [0,0,0]// [viper.random(0, 255), viper.random(0, 255), viper.random(0, 255)]
          const maskedImg = viper.makeMaskedImage(img, color, imageWidth, imageHeight)
          // p.image(maskedImg, 0, 0)
          // viper.image(maskedImg, viper.width / 2, viper.width / 2)
          console.log('save masked image')
          const filename = `${distFolder}/${i + 1}`
          await p.saveCanvas(maskedImg, filename, 'png')//.then(filename => {
            numSaved++
            console.log(`saved the canvas as ${filename}`);
            resolve()
          // });
        }
        p.draw = async () => {
          p.noLoop()
         }
      })
    })
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
  .action(async (tokenId, viperLength) => {
    console.log(`node env is ${process.env.NODE_ENV}`)

    const printLogs = process.env.NODE_ENV === 'development'

    const preloads = {}
    tokenId = parseInt(tokenId)
    viperLength = parseInt(viperLength)
    const filename = formatName(tokenId, viperLength)
    console.time(filename)
    const viper = new Viper({
      logs: printLogs,
      tokenId,
      setting: "server",
      dither: true,
      maxNumberOfLines: viperLength
    })
    console.timeLog(filename, "viper initialized")


    function sketch(p) {
      let seconds = viper.seconds()
      // seconds = (1 / 35) * 5
      let fps = 35
      let totalFrames = seconds * fps
      let framesSoFar = 0
      let readyToDraw = false
      p.setup = async () => {
        try {
          console.time(filename + "-load-images")
          await loadImages(p, viper, preloads)
          console.timeEnd(filename + "-load-images")
          viper.setup(p, preloads)
          if (viper.pattern !== "randomLoop") {
            viper.addAllLines()
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
          // console.log('not ready to draw')
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
        viper.draw(preloads)
        printLogs && console.timeEnd(filename + "-draw-" + framesSoFar)
        framesSoFar++
      }
    }

    p5.createSketch(sketch)
  })

  async function loadImages(p, viper, preloads) {
    // load bodies
    const bodyURLs = viper.getBodiesURLs()
    for (let i = 0; i < bodyURLs.rounded.length; i++) {
      const url = bodyURLs.rounded[i]
      if (!preloads[`body_rounded_${i}`]) {
        preloads[`body_rounded_${i}`] = await p.loadImage(url)
      }
      const url2 = bodyURLs.raw[i]
      if (!preloads[`body_raw_${i}`]) {
        preloads[`body_raw_${i}`] = await p.loadImage(url2)
      }
    }

    // load bg, pick one
    const bgURLS = viper.getBgURLs()
    for (let i = 0; i < bgURLS.length; i++) {
      const url = bgURLS[i]
      if (!preloads[`bg_${i}`]) {
        preloads[`bg_${i}`] = await p.loadImage(url)
      }
    }
    preloads.bgImg = preloads[`bg_${bgURLS.length - 1}`]

    // load hole
    if (!preloads.hole) {
      preloads.hole = await p.loadImage(viper.getHoleURL())
    }

    // load tails, pick one
    const tailURLS = viper.getTailURLs()
    for (let i = 0; i < tailURLS.length; i++) {
      const url = tailURLS[i]
      if (!preloads[`tail_${i}`]) {
        preloads[`tail_${i}`] = await p.loadImage(url)
      }
    }
    preloads.tail = preloads[`tail_${viper.tailRandom - 1}`]

    // load heads, pick one
    const headURLs = viper.getHeadURLs()
    for (let i = 0; i < headURLs.length; i++) {
      const url = headURLs[i]
      if (!preloads[`head_${i}`]) {
        preloads[`head_${i}`] = await p.loadImage(url)
      }
    }
    preloads.head = preloads[`head_${viper.headRandom - 1}`]

  }

if (process.argv === 0) {
  commander.help()
  process.exit(1)
}

commander.parse(process.argv)

