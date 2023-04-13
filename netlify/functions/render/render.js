const p5 = require('node-p5')
const { Viper } = require('../../../dist/viper.js')

const preloads = {}
const handler = async (event) => {
  let readyToServe = false
  const address = event.queryStringParameters.address || Math.random().toString()
  var viper = new Viper(address)

  async function loadImages(p) {
    const bodyURLs = viper.getBodiesURLs()
    for (let i = 0; i < bodyURLs.length; i++) {
      const url = bodyURLs[i]
      if (!preloads[`body_${i}`]) {
        preloads[`body_${i}`] = await p.loadImage(url)
      }
    }
    if (!preloads.bgImg) {
      preloads.bgImg = await p.loadImage(viper.getBgImgURL())
    }
    if (!preloads.hole) {
      preloads.hole = await p.loadImage(viper.getHoleURL())
    }
    if (!preloads.tail) {
      preloads.tail = await p.loadImage(viper.getHeadTailURL(false))
    }
    if (!preloads.head) {
      preloads.head = await p.loadImage(viper.getHeadTailURL(true))
    }
  }

  function sketch(p) {
    let readyToDraw = false
    p.setup = async () => {
      try {
        await loadImages(p)
        p.createCanvas(viper.width, viper.width)
        p.noLoop()
        viper.setup(p)
        readyToDraw = true
      } catch (setupError) {
        console.log({ setupError })
      }
    }
    p.draw = () => {
      if (!readyToDraw) return
      console.log('draw')
      viper.draw(preloads)
      readyToServe = true
    }
  }
  let foo
  try {
    let p5Instance = p5.createSketch(sketch)
    await new Promise((resolve) => {
      var counted = 0
      foo = setInterval(() => {
        counted++
        if (counted > 10) {
          readyToServe = true
        }
        if (readyToServe) {
          clearInterval(foo)
          resolve()
        }
      }, 500)
    })

    var dataURL = p5Instance.canvas.toDataURL("image/png", 1)//0.04)
    var datetime = new Date().toISOString().replace(/:/g, '-');
    return {
      statusCode: 200,
      headers: {
        'content-type': "image/png",
        'Content-Disposition': `inline; filename="viper-${datetime}.png"`
      },
      body: dataURL.replace('data:image/png;base64,', ''),
      isBase64Encoded: true
    }
  } catch (error) {
    clearInterval(foo)
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
