const { Image, createCanvas } = require('canvas')
const { setup, draw, nodePreload } = require('../../../public/wander.js')
const p5 = require('node-p5')
const { Viper } = require('../../../public/viper.js')

// require('dotenv').config()

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  console.time()
  let ready = false
  const address = event.queryStringParameters.address || Math.random().toString()
  var viper = new Viper(address)
  const preloads = {
    bgImg: viper.getBgImgURL() && p5.loadImage(viper.getBgImgURL()),
    hole: viper.getHoleURL() && p5.loadImage(viper.getHoleURL()),
    tail: viper.getHeadTailURL(false) && p5.loadImage(viper.getHeadTailURL(false)),
    head: viper.getHeadTailURL(true) && p5.loadImage(viper.getHeadTailURL(true)),
    bodies: async () => {
      console.log('start preload')
      console.timeLog()
      var loadedBodies = []
      var allBodies = viper.getBodiesURLs()
      for (var i = 0; i < allBodies.length; i++) {
        const url = allBodies[i]
        const loaded = await p5.loadImage(url)()
        loadedBodies.push(loaded)
      }
      console.log('end preload')
      console.timeLog()
      return loadedBodies
    }
  }
  function sketch(p, preloaded) {
    p.setup = () => {
      try {
        p.createCanvas(viper.width, viper.width)
        p.noLoop()
        viper.setup(p)
      } catch (setupError) {
        console.log({ setupError }, console.timeLog())
      }
    }
    p.draw = () => {
      console.log('draw')
      console.timeLog()
      viper.draw(preloaded)
      // viper.draw(preloaded)
      // viper.draw(preloaded)
      ready = true
    }
  }
  let foo
  try {
    console.log('before create sketch')
    console.timeLog()
    let p5Instance = p5.createSketch(sketch, preloads)
    console.log('after create sketch')
    console.timeLog()
    // console.log({ p5Instance })
    // const canvas = createCanvas(size, size)
    // ctx = canvas.getContext('2d')
    // canvas.width = size
    // canvas.height = size
    // await makeImg()
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     p5Instance.saveCanvas(canvas, 'myCanvas', 'png').then(filename => {
    //       console.log(`saved the canvas as ${filename}`);
    //     });
    //     resolve()
    //   }, 100);
    // })
    // await new Promise((resolve) => {
    //   setTimeout(() => { resolve() }, 500)
    // })
    // console.log('save', { p5Instance })
    // dataURL = await replaceWhite(dataURL)
    await new Promise((resolve) => {
      foo = setInterval(() => {
        console.log(ready ? 'is ready' : 'not ready')
        if (ready) {
          clearInterval(foo)
          resolve()
        }
      }, 500)
    })
    console.log('after interval')
    console.timeLog()
    var dataURL = p5Instance.canvas.toDataURL("image/png", 1)//0.01)
    console.log('after toDataURL')
    console.timeLog()
    console.timeEnd()
    return {
      statusCode: 200,
      headers: {
        'content-type': "image/png",
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

  async function makeImg() {
    var grid = new Array(gridSize).fill([]).map(item => new Array(gridSize).fill(0))
    ctx.fillStyle = `white`;
    ctx.fillRect(0, 0, size, size);
    addNodes(grid)
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

  function addNodes(grid) {

    circleSize = size / (gridSize + margin * 2)
    radius = circleSize / 10
    offset = margin * circleSize


    var sequence = Array.from(Array(grid.length * grid.length).keys())

    for (var i = 0; i < sequence.length; i++) {
      var row = Math.floor(sequence[i] / grid.length)
      var col = (sequence[i] % grid.length)
      var color = `rgba(0, 0, 0, 1)`
      makeNode(row, col, color)
    }
  }

  function makeNode(i, j, color) {
    var x = (i * circleSize) + (circleSize / 2) + offset;
    var y = (j * circleSize) + (circleSize / 2) + offset;
    ctx.fillStyle = color
    let rotate
    ctx.beginPath();

    // rotate = 0
    // ctx.arc(x - (radius), y, radius * 2, rotate, rotate + .4 * Math.PI, 0);
    // ctx.arc(x - (radius * 2), y, radius * 2, rotate, rotate, 0)

    // circle
    var startAngle = 0
    var endAngle = 2 * Math.PI
    var counterclockwise = 0
    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx.fill();
  }
}



module.exports = { handler }
