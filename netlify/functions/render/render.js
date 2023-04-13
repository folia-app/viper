// const { Image, createCanvas } = require('canvas')
const p5 = require('node-p5')
// const p5 = require('./p5node.js')
// const { Image } = require('p5')
const { Viper } = require('../../../dist/viper.js')
// const Jimp = require('jimp')

const preloads = {}

// require('dotenv').config()

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  console.log({ preloads })
  let ready = false
  const address = event.queryStringParameters.address || Math.random().toString()
  var viper = new Viper(address)

  async function loadImages(p) {
    const bodyURLs = viper.getBodiesURLs()
    for (let i = 0; i < bodyURLs.length; i++) {
      const url = bodyURLs[i]
      if (!preloads[`body_${i}`]) {
        // console.log(`setting body_${i}`)
        preloads[`body_${i}`] = await loadImage(p, url)
      }
    }
    if (!preloads.bgImg) {
      // console.log('setting bgImg')
      preloads.bgImg = await loadImage(p, viper.getBgImgURL())
    }
    if (!preloads.hole) {
      // console.log('setting hole')
      preloads.hole = await loadImage(p, viper.getHoleURL())
    }
    if (!preloads.tail) {
      // console.log('setting tail')
      preloads.tail = await loadImage(p, viper.getHeadTailURL(false))
    }
    if (!preloads.head) {
      // console.log('setting head')
      preloads.head = await loadImage(p, viper.getHeadTailURL(true))
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
      ready = true
    }
  }
  let foo
  try {
    console.log('before create sketch')
    let p5Instance = p5.createSketch(sketch)
    console.log('after create sketch')
    await new Promise((resolve) => {
      var counted = 0
      foo = setInterval(() => {
        counted++
        console.log(ready ? 'is ready' : 'not ready')
        if (counted > 10) {
          ready = true
        }
        if (ready) {
          clearInterval(foo)
          resolve()
        }
      }, 500)
    })
    console.log('after interval')
    var dataURL = p5Instance.canvas.toDataURL("image/png", 1)//0.04)
    console.log('after toDataURL')
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

    // const subject = event.queryStringParameters.name || 'Worlddddd'
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({ message: `Hello ${subject}` }),
    //   // // more keys you can return:
    //   // headers: { "headerName": "headerValue", ... },
    //   // isBase64Encoded: true,
    // }
  } catch (error) {
    clearInterval(foo)
    return { statusCode: 500, body: error.toString() }
  }
}



async function loadImage(p, path) {
  let img, pro
  // console.log('loadImage', { path })
  pro = p.loadImage(path)
  // console.log({ pro })
  // if pro is a Promise
  if (pro instanceof Promise) {
    img = await pro
  } else {
    img = pro
  }
  return img

  // console.log({ p, path })
  // let img,
  //   base,
  //   w,
  //   h;
  // try {
  //   base = await Jimp.read(path);
  //   w = base.getWidth();
  //   h = base.getHeight();
  //   console.log({ p5 })
  //   img = new p.Image(w, h);
  // } catch (error) {
  //   console.log({ error });
  //   return
  // }

  // img.loadPixels();
  // for (let i = 0; i < w; i++) {
  //   for (let j = 0; j < h; j++) {
  //     let col = Jimp.intToRGBA(base.getPixelColor(i, j));
  //     writeColor(img, w, i, j, [col.r, col.g, col.b, col.a]);
  //   }
  // }
  // img.updatePixels();
  // return img
}

// helper for writing color to array - https://p5js.org/reference/#/p5.Image
function writeColor(image, width, x, y, col) {
  let index = (x + y * width) * 4;
  image.pixels[index] = col[0];
  image.pixels[index + 1] = col[1];
  image.pixels[index + 2] = col[2];
  image.pixels[index + 3] = col[3];
}

module.exports = { handler }
