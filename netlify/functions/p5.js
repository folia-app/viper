// import setup, draw and preload from /p5/viper.js
const { setup, draw, preload } = require('../../p5/viper.js');
const p5 = require('node-p5');
let c
function sketch(p) {
  p.setup = () => {
    c = setup(p, p5)
  }
  p.draw = () => {
    draw(p)
  }
}
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {

  try {

    let p5Instance = p5.createSketch(sketch);

    var dataURL = ''//c.toDataURL("image/jpeg", 1)//0.01)
    // dataURL = await replaceWhite(dataURL)

    return {
      statusCode: 200,
      headers: {
        'content-type': "image/jpeg",
      },
      body: dataURL.replace('data:image/jpeg;base64,', ''),
      isBase64Encoded: true
    }

  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
module.exports = { handler }
