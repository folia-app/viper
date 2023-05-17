#!/usr/bin/env node
var commander = require('commander')
const fs = require('fs')
const p5 = require('node-p5')
const { Viper } = require('../dist/viper.js')
// const { convert } = require('convert-svg-to-png');
const sharp = require('sharp');

commander
  .version('0.0.1')

const viper = new Viper({})
function sketch(p) {
  p.setup = async () => {
    // viper.setup(p)
  }
  p.draw = () => {
    // viper.draw(preloads)
  }
}

async function wait(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

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
    const files = fs.readdirSync(rawFolder).filter(file => file.endsWith('.svg'))
    let numSaved = 0
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        // use sharp to load the svg and convert to png with the right dimensions
        await sharp(`${rawFolder}/${file}`).resize(imageWidth, imageHeight).png().toFile(`${distFolder}/../resized/${i + 1}.png`)
      } catch (e) {
        console.log(e)
      }
      const viper = new Viper({
        source: i.toString() + "-",
        // width: 300
      })
      console.log(file)
      let p5Instance = p5.createSketch((p) => {
        console.log('createSketch runs')
        p.setup = async () => {
          console.log('setup runs')
          viper.setup(p)
          p.noLoop()
          img = await p.loadImage(`${distFolder}/../resized/${i + 1}.png`)
          const color = [viper.random(0, 255), viper.random(0, 255), viper.random(0, 255)]
          const maskedImg = viper.makeMaskedImage(img, color, imageWidth, imageHeight)
          // p.image(maskedImg, 0, 0)
          // viper.image(maskedImg, viper.width / 2, viper.width / 2)
          p.saveCanvas(maskedImg, `${distFolder}/${i + 1}`, 'png').then(filename => {
            numSaved++
            console.log(`saved the canvas as ${filename}`);
          });
        }
        p.draw = async () => { }
      })
      await wait(1000)
      // console.log({ p5Instance })
    }
    await new Promise((resolve) => {
      foo = setInterval(() => {
        if (numSaved === files.length) {
          clearInterval(foo)
          resolve()
        } else {
          console.log({ numSaved })
        }
      }, 1000)
    })

    process.exit(1)
  })



if (process.argv === 0) {
  commander.help()
  process.exit(1)
}

commander.parse(process.argv)