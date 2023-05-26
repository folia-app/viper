const p5 = require('node-p5')
const { Viper } = require('../../../dist/viper.js')
const fs = require('fs')
const preloads = {}
let patterns = [
  // 'random', //0
  'circle', //1
  // 'random', //2
  'square',//3
  // 'random', //4
  'eight', //5
  // 'random', //6
  'bigEight', //7
  // 'random',  //8
  // 'rotatingEight', //9
  // 'random', //10
  'randomLoop', //11
  // 'random', // 12
  'heart', // 13
  // 'random', // 14
  'star' // 15
]
let patternIndex = Math.floor(Math.random() * (patterns.length))

const handler = async (event) => {
  let readyToServe = false
  const tokenId = event.queryStringParameters.tokenId || null
  var viper = new Viper({
    logs: "verbose",
    tokenId,
    setting: "server",
    dither: true,
    // style: 'randomColor',
    // backgroundStyle: 'gradient-low',
    maxNumberOfLines: 1,//Math.ceil(Math.random() * 20),
    // backgroundStyle: "image",
    // tweens: 1
    pattern: patterns[patternIndex]
  })


  async function loadImages(p) {
    console.log('loadImages')
    // load bodies
    const bodyURLs = viper.getBodiesURLs()
    console.log({ bodyURLs })
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
  var datetime = new Date().toISOString().replace(/:/g, '-');

  let filename = datetime + "--" + viper.tokenId

  function sketch(p) {
    let seconds = 3
    switch (viper.pattern) {
      case 'bigEight':
        seconds = 5.65714285
        break
      case 'eight':
        seconds = 3.7
        break
      case 'circle':
        seconds = 4.1
        break
      case 'square':
        seconds = 4.82285714
        break
      case 'heart':
        seconds = 4.75714286
        break
      case 'randomLoop':
        seconds = 6
        break
      case 'rotatingEight':
        seconds = 38
        break
      case 'star':
        seconds = 7.71428571
        break
    }
    // seconds = (1 / 35) * 3
    let fps = 35
    let totalFrames = seconds * fps
    let framesSoFar = 0
    let readyToDraw = false


    p.setup = async () => {
      try {

        // p.createCanvas(viper.width, viper.width)
        await loadImages(p)
        viper.setup(p, preloads)
        if (viper.pattern !== "randomLoop") {
          viper.addAllLines()
        }
        console.log(viper.setting)
        // p.noLoop()
        readyToDraw = true

        p.saveFrames(viper.canvas.drawingContext, filename, {
          repeat: 0, quality: 1 // image quality (1-30). 1 is best but slow. Above 20 doesn't make much difference in speed. 10 is default.
        }, seconds, fps).then(() => {
          console.log('gif is done')
          // console.timeEnd(datetime)
          readyToServe = true
          viper.endLog()
        })
      } catch (setupError) {
        console.log({ setupError })
      }
    }
    p.draw = () => {
      p.noLoop()
      if (!readyToDraw) return
      if (framesSoFar >= totalFrames) {
        return
      }
      if (framesSoFar === totalFrames) {
        console.log('done')
        return
      }
      viper.draw(preloads)
      framesSoFar++
    }
  }
  let foo
  try {
    let p5Instance = p5.createSketch(sketch)
    console.log('start waiting')
    await new Promise((resolve) => {
      var counted = 0
      foo = setInterval(() => {
        counted++
        if (counted > 10) {
          console.log('going to serve because i counted to 10')
          readyToServe = true
        }
        if (readyToServe) {
          clearInterval(foo)
          resolve()
        }
      }, 500)
    })
    console.log('done waiting')

    // const filename = './animated/frame-000.png'
    // const exists = fs.existsSync(filename)
    // if (!exists) {
    //   throw new Error(`File ${filename} does not exist`)
    // } else {
    //   console.log(`File ${filename} exists`)
    // }
    const gif = fs.readFileSync(`public/gifs/${filename}/complete.gif`, "base64")
    // const base64Gif = gif//.toString('base64')

    // var dataURL = p5Instance.canvas.toDataURL("image/png", 1)//0.04)
    var datetime = new Date().toISOString().replace(/:/g, '-');
    return {
      statusCode: 200,
      headers: {
        'content-type': "image/gif",
        'Content-Disposition': `inline; filename="viper-${datetime}.gif"`
      },
      body: gif.replace('data:image/gif;base64,', ''),
      isBase64Encoded: true
    }
  } catch (error) {
    clearInterval(foo)
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
