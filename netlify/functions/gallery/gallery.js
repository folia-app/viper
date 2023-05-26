const fs = require('fs')

const handler = async (event) => {
  try {


    let allGifFolders = fs.readdirSync('./public/gifs')
    allGifFolders = allGifFolders.filter(folder => folder.indexOf("--") > 0)
    console.log({ allGifFolders })
    allGifFolders = allGifFolders.sort((a, b) => {
      const splitA = a.split("--")
      const splitB = b.split("--")
      return (parseInt(splitA[splitA.length - 1]) > parseInt(splitB[splitB.length - 1]))
    })
    console.log({ allGifFolders })
    let allGifs = []
    allGifFolders.forEach(folder => {
      if (folder === '.DS_Store') return
      const files = fs.readdirSync(`./public/gifs/${folder}`)
      files.forEach(file => {
        if (file.indexOf(".gif") > 0) {
          allGifs.push(`./public/gifs/${folder}/${file}`)
        }
      })
    })

    allGifs = allGifs.map(gif => `<img title=${gif} src="http://localhost:8888/${gif.replace("public/", "").replace("./", "")}" />`)
    console.log({ allGifs })
    // allGifs = shuffle(allGifs)
    const website = `
    <html>
    <style>
    img {
      width: 686px;
      margin:0;
      display:inline;
    }
    </style>
    <body>
    ${allGifs.join("")}
    </body>
    </html>
    `
    console.log({ website })
    return {
      statusCode: 200,
      headers: {
        'content-type': "text/html",
        // 'Content-Disposition': `inline; filename="viper-${datetime}.gif"`
      },
      body: website,
      // isBase64Encoded: true
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}


module.exports = { handler }
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}