const fs = require('fs')

const handler = async (event) => {
  try {


    let allGifFolders = fs.readdirSync('./public/gifs')
    allGifFolders = allGifFolders.filter(folder => folder.indexOf("--") > 0)
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

    allGifs = allGifs.sort((a, b) => {
      const splitA = parseInt(a.split("--")[1].replace('/complete.gif', ''))
      const splitB = parseInt(b.split("--")[1].replace('/complete.gif', ''))
      return splitA > splitB ? 1 : splitA < splitB ? -1 : 0;
    })

    allGifs = allGifs.map(gif => `<img title=${gif} src="http://localhost:8888/${gif.replace("public/", "").replace("./", "")}" />`)
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