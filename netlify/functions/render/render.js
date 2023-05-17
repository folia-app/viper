const p5 = require('node-p5')
const { Viper } = require('../../../dist/viper.js')
const fs = require('fs')
const preloads = {}
const handler = async (event) => {
  let readyToServe = false
  const address = event.queryStringParameters.address || Math.random().toString()
  var viper = new Viper({
    source: address,
    // style: 'randomColor',
    // backgroundStyle: 'gradient-low',
    maxNumberOfLines: 10,
    tweens: 1
    // pattern: 'circle'
  })

  async function loadImages(p) {
    console.log('loadImages')
    // load bodies
    const bodyURLs = viper.getBodiesURLs()
    for (let i = 0; i < bodyURLs.length; i++) {
      const url = bodyURLs[i]
      if (!preloads[`body_${i}`]) {
        preloads[`body_${i}`] = await p.loadImage(url)
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
    preloads.bgImg = preloads[`bg_${viper.randomBG - 1}`]

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

  let filename = 'animated-' + datetime

  function sketch(p) {
    let seconds = 1
    switch (viper.pattern) {
      case 'bigEight':
        seconds = 3.8
        break
      case 'eight':
        seconds = 4.15
        break
      case 'circle':
        seconds = 4.1
        break
      case 'square':
        seconds = 5.48
        break
      case 'heart':
        seconds = 5.1
        break
      case 'randomLoop':
        seconds = 6
        break
      case 'rotatingEight':
        seconds = 38
        break
    }
    let fps = 1 // 35
    let totalFrames = seconds * fps
    let framesSoFar = 0
    let readyToDraw = false


    p.setup = async () => {
      try {

        // p.createCanvas(viper.width, viper.width)
        viper.setup(p)
        await loadImages(p)
        viper.setting = "browser"
        viper.addAllLines()
        viper.addAllLines()
        console.log(viper.setting)
        // p.noLoop()
        readyToDraw = true

        p.saveFrames(viper.canvas.drawingContext, filename, {
          repeat: 0, quality: 30 // image quality (1-30). 1 is best but slow. Above 20 doesn't make much difference in speed. 10 is default.
        }, seconds, fps).then(() => {
          console.log('gif is done')
          // console.timeEnd(datetime)
          readyToServe = true

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
    const gif = fs.readFileSync(`${filename}/${filename}.gif`, "base64")
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
