import Prando from 'prando'

// const { quantize } = require("gifenc")
// const dither = require("dither-me-this")
const RgbQuant = require('rgbquant');
// import { createClient } from 'pexels';

// const client = createClient('QktuTsIIkMA6zX85eEIU0SiSkZclyUYPJU1z4PpMS95SALVO1P5KiePb');



// import fs from 'fs'
let fs, path
export class Viper {
  constructor(overwriteOptions = {}) {
    const options = {
      tokenId: null,
      setting: "server",
      logs: false, // false, true, "verbose"
      style: null/*
      // style options
      // 'randomImage',
      // 'everythingMatches',
      // 'randomImageRounded',
      // 'everythingMatchesRounded',
      // 1. randomColor
      // 1. debug
      // 1. skeleton
      // 1. randomGreen*/,
      backgroundStyle: null/*
      // backgroundStyle options
      // 1. solid
      // 1. gradient-high
      // 1. gradient-low
      // 1. bw-gradient-high
      // 1. bw-gradient-low*/,
      pattern: "circle"/*
      // pattern options
      // 1. random
      // 1. circle
      // 1. square
      // 1. eight 
      // 1. bigEight
      // 1. rotatingEight
      // 1. heart
      // 1. randomLoop */,
      width: 686,
      maxNumberOfLines: 20,
      maxLen: null,
      strokeW: null,
      headWidth: null,
      tailLength: null,
      holeWidth: null,
      margin: null,
      angleDistanceMin: 60,
      fps: 35,
      tweens: 6,
      bgColor: "rgb(240,240,240)",
      hideHole: false,
      hideHead: false,
      hideTail: false,
      hideSnake: false,
      redrawBackground: true,
      wanderLoopDuration: 20,
      dither: false,
      ...overwriteOptions
    }
    let {
      tokenId, setting, logs, style, backgroundStyle, pattern, wanderLoopDuration,
      width, maxNumberOfLines, maxLen, strokeW, headWidth, tailLength, holeWidth, margin, angleDistanceMin,
      fps, tweens, bgColor, hideHole, hideHead, hideTail, redrawBackground, hideSnake, dither
    } = options
    this.logs = logs
    this.logs && console.log('constructor')
    this.logs && console.time("viper")

    this.rng = new Prando("viper bite invites embrace")
    this.allVipers = this.populate()
    // tokenId is 1-indexed
    this.tokenId = tokenId ? tokenId - 1 : Math.floor(Math.random() * this.allVipers.length)
    this.me = this.allVipers[this.tokenId]

    this.logs && console.log(`Viper population: ${this.allVipers.length} vipers`)
    this.logs && console.log(`Hello viper #${this.tokenId}!`, this.me)


    this.setting = setting
    if (this.setting == "server") {
      // so that webpack doesn't try to pack up fs for the browser
      fs = eval('require')('fs')
      path = eval('require')('path')
      // width *= 2
    }

    this.style = style || this.me.style
    this.backgroundStyle = backgroundStyle || backgroundsIndex[this.me.background]
    this.pattern = pattern
    this.width = width
    this.maxNumberOfLines = maxNumberOfLines
    this.maxLen = maxLen || this.width * 0.14577259 // 100
    this.strokeW = strokeW || this.width * 0.0728863 // 50
    this.holeWidth = holeWidth || this.width * 0.20116618 // 138
    this.headWidth = headWidth || this.width * 0.17492711 // 120
    this.tailLength = tailLength || this.width * 0.11661808 // 80
    this.margin = margin || this.width * 0.20116618 // 138
    this.angleDistanceMin = angleDistanceMin
    this.fps = fps
    this.tweens = tweens
    this.bgColor = bgColor
    this.hideHole = hideHole
    this.hideHead = hideHead
    this.hideTail = hideTail
    this.redrawBackground = redrawBackground
    this.hideSnake = hideSnake
    this.wanderLoopDuration = wanderLoopDuration

    this.allLines = []
    this.allColors = []
    this.totalLength = 0
    this.renderedBodies = {}
    this.totalBodies = 4
    this.totalHeads = 4
    this.totalTails = this.totalHeads
    this.totalBgs = 8
    this.whichSegment = this.me.style.indexOf("Matches") > -1 ? this.me.head : this.random(0, this.totalBodies - 1)
    this.bodyOffset = this.me.style.indexOf("Matches") > -1 ? 0 : this.random(1, this.totalBodies)
    this.headRandom = this.me.head + 1// this.random(1, this.totalHeads)
    this.tailRandom = this.headRandom//this.random(1, this.totalTails)
    // this.randomBG = this.random(0, this.totalBgs)
    this.dither = dither

    this.setHeartPattern()

    this.headOffset = headOffsets.hasOwnProperty("_" + this.headTailRandom) ? headOffsets["_" + this.headTailRandom] : defaultHeadOffsets
    this.tailOffset = tailOffsets.hasOwnProperty("_" + this.headTailRandom) ? tailOffsets["_" + this.headTailRandom] : defaultTailOffsets
    this.logs == "verbose" && console.timeLog("viper", "end constructor")
  }

  endLog() {
    this.logs && console.timeEnd("viper")
  }

  async loadBGImg(changeIndex = 1, query = "geometry") {
    if (this.me.bgImage == undefined) {
      return
    }
    const bgImg = `/bg/rock-${this.me.bgImage}.jpeg`
    this.preloaded.bgImg = window.loadImage(bgImg)
  }


  async preload() {
    try {
      this.logs == "verbose" && console.timeLog("viper", "preload")
      this.logs && console.log('preload')
      this.preloaded = {}

      await this.loadBGImg()

      this.preloaded.tail = window.loadImage('/tail/' + this.tailRandom + '.png')
      this.preloaded.head = window.loadImage('/head/' + this.headRandom + '.png')
      this.preloaded.hole = window.loadImage('/holes/1.png')
      this.preloaded.bodies = { rounded: [], raw: [] }
      for (var i = 1; i <= this.totalBodies; i++) {
        const roundedOrRaw = ["rounded", "raw"]
        for (var j = 0; j < 2; j++) {
          const path = roundedOrRaw[j].indexOf("rounded") > -1 ? `/body/masked/${i}.png` : `/body/resized/${i}.png`
          const loadedImage = await new Promise((resolve, reject) => {
            window.loadImage(path, (a) => {
              resolve(a)
            }, reject)
          })
          this.preloaded.bodies[roundedOrRaw[j]].push(loadedImage)
        }
      }
    } catch (preloadError) {
      console.error({ preloadError })
    }
  }

  getTailURLs() {
    const units = []
    for (let i = 1; i <= this.totalTails; i++) {
      const filename = path.join(__dirname, `tail/${i}.png`)
      if (!fs.existsSync(filename)) {
        throw new Error('tail' + ' image not found: ' + filename)
      }
      units.push(filename)
    }
    return units
  }
  getHeadURLs() {
    const units = []
    for (let i = 1; i <= this.totalHeads; i++) {
      const filename = path.join(__dirname, `head/${i}.png`)

      if (!fs.existsSync(filename)) {
        throw new Error('head' + ' image not found: ' + filename)
      }
      units.push(filename)
    }
    return units
  }
  getHeadTailURLs(isHead) {
    const units = []
    for (let i = 1; i <= this.totalHeads; i++) {
      const filename = path.join(__dirname, (isHead ? 'head' : 'tail'), `${i}.png`)

      if (!fs.existsSync(filename)) {
        throw new Error((isHead ? 'head' : 'tail') + ' image not found: ' + filename)
      }
      units.push(filename)
    }
    return units
  }

  getHeadTailURL(isHead) {
    if (!this.headImg || !this.tailImg) {
      this.headImg = this.headTailRandom + '.png'
      this.tailImg = this.headImg
    }
    const img = isHead ? '/head/' + this.headImg : '/tail/' + this.tailImg
    const filename = path.join(__dirname, img)
    if (!fs.existsSync(filename)) {
      throw new Error('head/tail image not found: ' + filename)
    }
    return filename
  }
  getHoleURL() {
    if (!this.holeImg) {
      this.holeImg = '1.png'
    }
    const filename = path.join(__dirname, "holes", this.holeImg)

    if (!fs.existsSync(filename)) {
      throw new Error('hole image not found: ' + filename)
    }
    return filename
  }

  // TODO: remove these probably
  getBgURLs() {
    const bgs = []
    for (let i = 0; i < this.totalBgs; i++) {
      const filename = path.join(__dirname, "bg", 'rock-' + (i) + '.jpeg')
      if (!fs.existsSync(filename)) {
        throw new Error('background image not found: ' + filename)
      }
      bgs.push(filename)
    }
    if (this.me.bgImage != undefined) {
      const filename = path.join(__dirname, "bg", `rock-${this.me.bgImage}.jpeg`)
      bgs.push(filename)
    }
    return bgs
  }

  // getBgImgURL() {
  //   if (!this.backgroundImg) {
  //     this.backgroundImg = 'bg3_' + this.randomBG + '.png'
  //   }
  //   const backgroundImageURL = process.cwd() + "/public/bg/" + this.backgroundImg
  //   if (!fs.existsSync(backgroundImageURL)) {
  //     throw new Error('background image not found: ' + backgroundImageURL)
  //   }
  //   return backgroundImageURL
  // }

  getBodiesURLs() {
    if (this.setting !== "server") {
      throw new Error('getBodiesURLs should only be called on server')
    }
    switch (this.style) {
      // case "randomImage":
      // case "everythingMatches":
      // case "randomImageRounded":
      // case "everythingMatchesRounded":
      // case "skeleton":
      // case "randomColor":
      // case "debug":
      // return false
    }
    const bodies = { rounded: [], raw: [] }
    for (var i = 1; i <= this.totalBodies; i++) {

      // get the path of the current file
      const bodyURL = path.join(__dirname, "body", "masked", `${i}.png`)

      if (!fs.existsSync(bodyURL)) {
        throw new Error('bodyURL image not found: ' + bodyURL)
      }
      bodies.rounded.push(bodyURL)
      const resizedBodyURL = path.join(__dirname, `body/resized/${i}.png`)
      if (!fs.existsSync(resizedBodyURL)) {
        throw new Error('resizedBodyURL image not found: ' + resizedBodyURL)
      }
      bodies.raw.push(resizedBodyURL)
    }
    return bodies
  }
  async setup(p, preloaded) {
    if (typeof preloaded === 'undefined') {
      preloaded = this.preloaded
    }
    this.logs == "verbose" && console.timeLog("viper", "setup")
    this.point = p ? p.point.bind(p) : window.point
    this.line = p ? p.line.bind(p) : window.line
    this.fill = p ? p.fill.bind(p) : window.fill
    this.textFont = p ? p.textFont.bind(p) : window.textFont
    this.textSize = p ? p.textSize.bind(p) : window.textSize
    this.text = p ? p.text.bind(p) : window.text
    this.arc = p ? p.arc.bind(p) : window.arc
    this.rect = p ? p.rect.bind(p) : window.rect
    this.stroke = p ? p.stroke.bind(p) : window.stroke
    this.frameRate = p ? p.frameRate.bind(p) : window.frameRate
    this.strokeWeight = p ? p.strokeWeight.bind(p) : window.strokeWeight
    this.rectMode = p ? p.rectMode.bind(p) : window.rectMode
    this.imageMode = p ? p.imageMode.bind(p) : window.imageMode
    this.angleMode = p ? p.angleMode.bind(p) : window.angleMode
    this.strokeCap = p ? p.strokeCap.bind(p) : window.strokeCap
    this.image = p ? p.image.bind(p) : window.image
    this.background = p ? p.background.bind(p) : window.background
    this.CORNER = p ? p.CORNER : window.CORNER
    this.DEGREES = p ? p.DEGREES : window.DEGREES
    this.RADIANS = p ? p.RADIANS : window.RADIANS
    this.ROUND = p ? p.ROUND : window.ROUND
    this.CENTER = p ? p.CENTER : window.CENTER
    this.TWO_PI = p ? p.TWO_PI : window.TWO_PI
    this.createCanvas = p ? p.createCanvas.bind(p) : window.createCanvas
    this.createGraphics = p ? p.createGraphics.bind(p) : window.createGraphics
    this.dist = p ? p.dist.bind(p) : window.dist
    this.pop = p ? p.pop.bind(p) : window.pop
    this.push = p ? p.push.bind(p) : window.push
    this.translate = p ? p.translate.bind(p) : window.translate
    this.rotate = p ? p.rotate.bind(p) : window.rotate
    this.scale = p ? p.scale.bind(p) : window.scale
    this.noStroke = p ? p.noStroke.bind(p) : window.noStroke
    this.clear = p ? p.clear.bind(p) : window.clear



    this.canvas = this.createCanvas(this.width, this.width)

    if (typeof document !== "undefined") {
      this.canvas.parent('sketch-holder')
    }

    const { x, y, previousAngle } = this.getStart()
    this.x = x
    this.startingX = x
    this.y = y
    this.startingY = y
    this.previousAngle = previousAngle

    this.frameRate(this.fps);
    this.strokeWeight(this.strokeW);
    this.rectMode(this.CENTER)
    this.imageMode(this.CENTER);
    this.angleMode(this.DEGREES);
    this.strokeCap(this.ROUND);

    // TODO: make sure this is how it should be done
    // This pre-calculates all possible future segment colors for this viper
    // it assumes there will never be vipers over 1000 segments long
    // this.setupBgColors()
    for (let i = 0; i < 1000 + 1; i++) {
      const c = [this.random(0, 255), this.random(0, 255), this.random(0, 255)]
      this.allColors.push(c)
    }
    this.drawBackground(preloaded)
  }

  drawCartesian() {

    this.background(this.bgColor);
    const center = this.width / 2


    this.rectMode(this.CORNER)
    this.strokeWeight(0)
    this.fill('rgba(255,255,0,0.5)')
    // out of bounds top
    this.rect(0, 0, this.width, this.margin)
    // out of bounds left
    this.rect(0, this.margin, this.margin, this.width)
    // out of bounds right
    this.rect(this.width - this.margin, this.margin, this.margin, this.width)
    // out of bounds bottom
    this.rect(this.margin, this.width - this.strokeW, this.width - this.margin - this.margin, this.strokeW)

    this.rectMode(this.CENTER)
    this.strokeWeight(1)

    for (var i = 0; i < this.width / 2; i += 100) {
      this.strokeWeight(1)
      this.stroke("black")
      this.line(center + i, 0, center + i, this.width)
      this.line(center - i, 0, center - i, this.width)
      this.line(0, center + i, this.width, center + i)
      this.line(0, center - i, this.width, center - i)
    }

    this.stroke("green")
    for (var i = 0; i < 12; i++) {
      var cardinalX = (this.width / 2) + Math.cos(((i * 30)) * Math.PI / 180) * 225
      var cardinalY = (this.width / 2) + Math.sin(((i * 30)) * Math.PI / 180) * 225
      this.strokeWeight(0)
      this.fill("green")
      this.text(i * 30, cardinalX, cardinalY)
      this.strokeWeight(1)
      this.line(this.width / 2, this.width / 2, cardinalX, cardinalY)

    }

    this.stroke("red")
    this.fill("red")
    for (var i = 0; i < 8; i++) {
      var cardinalX = (this.width / 2) + Math.cos(((i * 45)) * Math.PI / 180) * (this.width / 2.5)
      var cardinalY = (this.width / 2) + Math.sin(((i * 45)) * Math.PI / 180) * (this.width / 2.5)
      this.strokeWeight(1)
      this.line(this.width / 2, this.width / 2, cardinalX, cardinalY)
      this.strokeWeight(0)
      this.text(i * (360 / 8), cardinalX, cardinalY)
    }
    this.strokeWeight(10)
    this.point(center, center)
    this.strokeWeight(0)



    const flooredMargin = Math.floor(this.margin)
    this.fill("black")
    this.stroke("black")
    this.strokeWeight(0)
    this.text(`${flooredMargin},${flooredMargin}`, this.margin - 20, this.margin - 20)
    this.text(`${this.width - flooredMargin},${flooredMargin}`, this.width - this.margin - 20, this.margin - 20)
    this.text(`${flooredMargin},${Math.floor(this.width - this.strokeW)}`, this.margin - 20, this.width - this.strokeW - 20)
    this.text(`${this.width - flooredMargin},${this.width - flooredMargin}`, this.width - this.margin - 20, this.width - this.strokeW - 20)
    this.strokeWeight(10)
    this.point(this.margin, this.margin)
    this.point(this.width - this.margin, this.margin)
    this.point(this.margin, this.width - this.strokeW)
    this.point(this.width - this.margin, this.width - this.strokeW)
  }


  drawBackground(preloaded) {
    if (this.style == "debug") {
      this.drawCartesian()
      return
    }
    switch (this.backgroundStyle) {
      case "solid":
        this.background(this.bgColor)
        break;
      case "gradient-low":
        this.fourColorGradient(7)
        break
      case "gradient-high":
        this.fourColorGradient(this.width / 2)
        break;
      case "bw-gradient-low":
        this.fourColorGradient(7, true)
        break
      case "bw-gradient-high":
        this.fourColorGradient(this.width / 2, true)
        break;
      case "text":
        this.backgroundText()
        break;
      case "image":
        // if (!preloaded) return
        this.image(
          preloaded.bgImg,
          this.width / 2,
          this.width / 2,
          this.width,
          this.width
        )
        break;
      case "gradient":
        throw new Error("Simple gradient not transferred from old code")
        break;
      default:
        throw new Error('Unknown backgroundStyle: ' + this.backgroundStyle);
    }
  }

  backgroundText() {
    this.redrawBackground = false
    // if (!this.savedBG) {
    // const bgOptions = [
    //   "bw-gradient-low",
    //   "bw-gradient-high",
    //   "gradient-low",
    //   "gradient-high"
    // ]
    // const bgIndex = 0//this.random(0, 3)
    // this.fourColorGradient(this.width / 4, true)
    this.backgroundStyle = bgOptions[this.me.background]
    this.drawBackground()

    const textWidth = 1160
    const textHeight = 30
    const rows = 2//Math.ceil(this.width / textWidth)
    const columns = Math.ceil(this.width / textHeight) + 1
    this.fill("white")
    this.textFont("Arial")
    this.stroke("black")
    this.strokeWeight(0)
    // this.textSize(42)
    const ctx = this.canvas.drawingContext;
    this.canvas.elt.style.letterSpacing = "9px";
    ctx.font = `${textHeight}px Courier`;
    this.text("Bitten by", 12, textHeight + 6)
    for (let i = 0; i < rows; i++) {
      for (let j = 2; j < columns; j++) {
        let rowOffset = j % 2 == 0 ? 0 : (this.width / 2)
        this.text("0xFa398d672936Dcf428116F687244034961545D91-", (i * textWidth) - rowOffset + 12, j * textHeight * 1.3)
      }
    }
    // }
    // this.image(this.savedBG, this.width / 2, this.width / 2, this.width, this.width)
  }

  setupBgColors(style) {
    let bgColors
    const a = this.random(0, 255)
    const b = this.random(0, 255)
    const c = this.random(0, 255)
    const d = this.random(0, 255)
    if (style.indexOf("bw") > -1) {
      bgColors = [[a, a, a], [b, b, b], [c, c, c], [d, d, d]]
    } else {
      bgColors = [
        [a, this.random(0, 255), this.random(0, 255)],
        [b, this.random(0, 255), this.random(0, 255)],
        [c, this.random(0, 255), this.random(0, 255)],
        [d, this.random(0, 255), this.random(0, 255)]
      ]
    }
    // this.bgColors = bgColors
    return bgColors
  }

  async fourColorGradient(resolution = 7, isBlackAndWhite = false) {
    try {
      if (!this.savedBG) {
        let colors
        colors = this.me.bgColors
        const bgCanvas = this.createGraphics(this.width, this.width)
        bgCanvas.noStroke()
        for (let i = 0; i < resolution; i++) {
          for (let j = 0; j < resolution; j++) {
            let s = this.width / resolution;
            let wx = i * s / this.width
            let wy = j * s / this.width
            let c = weightedAvgColor(weightedAvgColor(colors[0], colors[1], wx), weightedAvgColor(colors[3], colors[2], wx), wy)
            bgCanvas.fill(c)
            bgCanvas.rect(i * s, j * s, s, s)
          }
        }

        if (this.dither) {
          // options with defaults (not required)
          var opts = {
            colors: 128,             // desired palette size
            // method: 2,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
            // boxSize: [64, 64],        // subregion dims (if method = 2)
            // boxPxls: 2,              // min-population threshold (if method = 2)
            // initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
            // minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
            // dithKern: null,          // dithering kernel name, see available kernels in docs below
            // dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
            // dithSerp: false,         // enable serpentine pattern dithering
            // palette: [],             // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
            // reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
            // useCache: true,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
            // cacheFreq: 10,           // min color occurance count needed to qualify for caching
            // colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
          };

          const q = new RgbQuant(opts);
          q.sample(bgCanvas.canvas);
          // const pal = q.palette(true);
          const idxi8 = q.reduce(bgCanvas.canvas, 1, 'Burkes', true);
          const ctx = bgCanvas.canvas.getContext("2d")
          var imgd = ctx.createImageData(bgCanvas.canvas.width, bgCanvas.canvas.width);
          var data = imgd.data;
          for (var i = 0, len = data.length; i < len; ++i)
            data[i] = idxi8[i];
          ctx.putImageData(imgd, 0, 0);
        }
        this.savedBG = bgCanvas
      }
      this.image(this.savedBG, this.width / 2, this.width / 2, this.width, this.width)
    } catch (e) {
      console.error(e)
      this.savedBG = this.createGraphics(this.width, this.width)
    }
  }

  draw(preloaded) {
    // this.clear()
    this.logs == "verbose" && console.timeLog("viper", "draw")
    if (typeof preloaded === 'undefined') {
      preloaded = this.preloaded
    } else if (typeof this.bodies == "undefined") {
      this.logs && console.log('reload bodies')
      this.bodies = { rounded: [], raw: [] }
      for (var i = 0; i < this.totalBodies; i++) {
        this.bodies.rounded.push(preloaded[`body_rounded_${i}`])
        this.bodies.raw.push(preloaded[`body_raw_${i}`])
      }
      preloaded.bodies = this.bodies
    } else {
      preloaded.bodies = this.bodies
    }
    this.totalLength++
    if (this.tweens == 0 || this.totalLength % this.tweens == 1) {
      this.addLine()
    }
    this.logs == "verbose" && console.timeLog("viper", "addLine")
    this.redrawBackground && this.drawBackground(preloaded)
    this.logs == "verbose" && console.timeLog("viper", "drawBackground")
    this.drawSegments(preloaded)
    this.logs == "verbose" && console.timeLog("viper", "drawSegments")
  }

  drawSegments(preloaded) {
    let skippedDraw = 0
    for (var i = 0; i < this.allLines.length; i++) {
      var c = this.allColors[this.allLines.length - i]
      var { x1, y1, x2, y2, len, ang } = this.getSegmentCoordinates(i)

      this.drawHole(i, preloaded)

      const onTopOfEachOther = (Math.abs(x1 - x2) < this.maxLen / 10 && Math.abs(y1 - y2) < this.maxLen / 10)
      if (onTopOfEachOther && this.reachedHome) {
        skippedDraw++
        continue
      }

      if (!this.hideSnake) {
        if (this.style == "debug") {
          this.drawDebug(x1, y1, x2, y2, len, ang, i, c)
        } else {
          switch (this.style) {
            case ("randomImage"):
            case ("randomImageRounded"):
              const index = this.allLines.length - i
              const roundedOrRaw = this.me.style.indexOf("Rounded") ? "rounded" : "raw"
              this.whichSegment = (index + this.bodyOffset) % preloaded.bodies[roundedOrRaw].length
            case ("everythingMatches"):
            case ("everythingMatchesRounded"):
              this.drawImageSegment(x1, y1, x2, y2, len, ang, c, preloaded, i)
              break;
            case ("randomColor"):
              this.drawRandomColor(x1, y1, x2, y2, c)
              break;
            case ("skeleton"):
              break;
            case ("randomGreen"):
              break;
            default:
              throw new Error('Unknown style: ' + this.style);
          }
        }
      }

      // this.fill("black")
      // if (this.totalLength % this.tweens == 0) {
      //   this.noStroke()
      //   this.text("real segment", this.width / 2, 50)
      // } else {
      //   this.noStroke()
      //   this.text("tween segment", this.width / 2, 50)
      // }

      // draw the tail
      this.drawTail(x1, y1, x2, y2, i, preloaded)

      // draw the head
      this.drawHead(x1, y1, x2, y2, i, preloaded)
    }
    if (skippedDraw == this.allLines.length && !this.justReset) {
      this.justReset = true
      setTimeout(() => this.reset(), 3000)
      // this.reset()
    }
  }

  drawHead(x1, y1, x2, y2, i, preloaded) {
    if (this.hideHead) return
    if (i == this.allLines.length - 1) {
      const l = this.allLines[i]
      // stroke("rgba(255,0,0,0.1)")
      this.noStroke()
      this.fill("rgba(255,0,0,0.5)")
      // var headOffset = {
      //   xFactor: 2,
      //   yFactor: 2.5
      // }

      var calcHeadOffset = {
        x: this.headWidth / this.headOffset.xFactor,
        y: this.headWidth / this.headOffset.yFactor
      }
      if ((l.x1 - l.x2) > (this.width / 80)) {
        this.push()
        this.scale(-1, 1)
        // this.rect((-l.x2) + calcHeadOffset.x, l.y2 - calcHeadOffset.y, this.headWidth)
        this.image(preloaded.head, (-x2) + calcHeadOffset.x, y2 - calcHeadOffset.y, this.headWidth, this.headWidth);
        this.pop()
      } else {
        // rect(l.x2 + calcHeadOffset.x, l.y2 - calcHeadOffset.y, this.headWidth)
        this.image(preloaded.head, x2 + calcHeadOffset.x, y2 - calcHeadOffset.y, this.headWidth, this.headWidth);
      }

    }

  }

  drawTail(x1, y1, x2, y2, i, preloaded) {
    if (this.hideTail) return

    var tailLength = this.tailLength
    var tailWidth = tailLength / 2
    var calcTailOffset = {
      x: tailLength / this.tailOffset.xFactor,
      y: tailWidth * this.tailOffset.yFactor
    }

    if (i == 0 && this.allLines.length >= this.maxNumberOfLines && this.totalLength > this.maxNumberOfLines * this.tweens) {
      if ((x1 - x2) > (this.width / 80)) {
        this.push()
        this.scale(-1, 1)
        var tailX = -x1 - calcTailOffset.x // TODO: fix this
        var tailY = y1 - calcTailOffset.y // TODO: fix this
        // this.rect(tailX, tailY, tailLength, tailWidth)
        this.image(preloaded.tail, tailX, tailY, tailLength, tailWidth);
        this.pop()
      } else {

        var tailX = x1 - calcTailOffset.x // TODO: fix this
        var tailY = y1 - calcTailOffset.y // TODO: fix this
        // this.rect(tailX, tailY, tailLength, tailWidth)
        this.image(preloaded.tail, tailX, tailY, tailLength, tailWidth);
      }
    }
  }

  makeMaskedImage(pic, c, len, width) {

    var strokeMask = this.createGraphics(len, width);
    strokeMask.strokeWeight(width)
    // strokeMask.line(width / 2, width / 2, len - (width * 2), width / 2)
    strokeMask.line(width / 2, width / 2, len - (width / 2), width / 2)

    var imagePattern = this.createGraphics(len, width);
    imagePattern.background(c)
    // imagePatter n.textSize(50)
    // imagePattern.text(i, (len) / 2, width)
    imagePattern.image(pic, 0, 0, len, width)

    imagePattern.loadPixels()
    strokeMask.loadPixels()
    for (let j = 0; j < imagePattern.pixels.length; j += 4) {
      imagePattern.pixels[j + 3] = strokeMask.pixels[j + 3]
    }
    imagePattern.updatePixels()

    let strokeWidth = Math.round(len / 30)
    let withStrokeLen = len + strokeWidth * 2
    let withStrokeWidth = width + strokeWidth * 2
    var withStroke = this.createGraphics(withStrokeLen, withStrokeWidth)
    // withStroke.tint(100)
    withStroke.stroke("black")
    withStroke.strokeWeight(width + strokeWidth)
    withStroke.line(withStrokeWidth / 2, withStrokeWidth / 2, withStrokeLen - (withStrokeWidth / 2), withStrokeWidth / 2)
    withStroke.image(imagePattern, strokeWidth, strokeWidth, len, width)

    return withStroke//imagePattern
  }

  drawImageSegment(x1, y1, x2, y2, len, ang, c, preloaded, i, mask = false) {
    const roundedOrRaw = this.me.style.indexOf("Rounded") > -1 ? "rounded" : "raw"
    const pic = preloaded.bodies[roundedOrRaw][this.whichSegment]
    if (!pic) {
      throw new Error(`No image for segment ${this.whichSegment}`)
    }
    const flip = x1 - x2 > 0

    let imagePattern
    if (mask) {
      var renderedID = this.whichSegment.toString()
      if (!this.renderedBodies[renderedID]) {
        imagePattern = this.makeMaskedImage(pic, c, len, this.strokeW)
        this.renderedBodies[renderedID] = imagePattern
      } else {
        imagePattern = this.renderedBodies[renderedID]
      }
    } else {
      imagePattern = pic
    }

    this.push()
    var xDist = Math.abs(x2 - x1)
    var yDist = Math.abs(y2 - y1)
    var fractionOfTotal = 1 / 2
    var p = {
      x: x1 + ((x2 < x1 ? -1 : 1) * xDist) * fractionOfTotal,
      y: y1 + ((y2 < y1 ? -1 : 1) * yDist) * fractionOfTotal
    }
    this.translate(p.x, p.y);
    this.rotate(ang)

    this.push()
    this.scale(flip ? -1 : 1, flip ? -1 : 1)
    // this.image(imagePattern, 0, 0, len + (this.strokeW / 2), this.strokeW);
    try {
      this.image(imagePattern, 0, 0, len + this.strokeW, this.strokeW);
    } catch (e) {
      console.error(`failed to load image ${this.whichSegment} `)
    }
    this.pop()
    this.pop()
  }

  drawRandomColor(x1, y1, x2, y2, c) {
    this.stroke("black")
    var segmentWeight = this.strokeW
    var segmentOffset = segmentWeight / 3
    this.strokeWeight(segmentWeight + 2)
    this.line(x1, y1, x2, y2)
    this.stroke(c)
    this.strokeWeight(segmentWeight)
    this.line(x1, y1, x2, y2)


    const angle = Math.atan2(y2 - y1, x2 - x1)
    const offsetAngle = angle + 90
    const flip = (x1 - x2) > (this.width / 80)

    const xOffsetByAngle = Math.cos(offsetAngle) * segmentOffset * (flip ? 1 : -1)
    const yOffsetByAngle = Math.sin(offsetAngle) * segmentOffset * (flip ? 1 : -1)
    this.stroke("rgba(255,255,255,0.5)")
    this.strokeWeight(segmentWeight / 3)
    this.line(x1 + xOffsetByAngle, y1 + yOffsetByAngle, x2 + xOffsetByAngle, y2 + yOffsetByAngle)

  }

  drawDebug(x1, y1, x2, y2, len, ang, i, c) {
    const l = this.allLines[i]
    this.stroke("grey")
    // this.stroke(c)
    var debugLineWeight = this.width / 50
    this.strokeWeight(debugLineWeight)
    this.line(x1, y1, x2, y2)
    this.stroke('rgb(0,255,0)')
    this.point(x1, y1)
    this.point(x2, y2)
    this.stroke('blue')
    this.strokeWeight(0)
    this.fill("blue")
    this.text(`${Math.floor(x1)}, ${Math.floor(y1)} `, x1 + 5, y1 - 5)


    for (var j = 0; j < l.failed.length; j++) {
      const previewX = l.failed[j].newX
      const previewY = l.failed[j].newY
      this.stroke(l.failed[j].randomColor)
      this.strokeWeight(debugLineWeight)
      this.line(x1, y1, previewX, previewY)
      this.strokeWeight(0)
      this.fill("blue")
      const halfX = x1 > previewX ? x1 - ((x1 - previewX) / 2) : previewX - ((previewX - x1) / 2)
      const halfY = y1 > previewY ? y1 - ((y1 - previewY) / 2) : previewY - ((previewY - y1) / 2)
      this.text(j + 1, halfX + 5, halfY);
      this.strokeWeight(debugLineWeight)
      this.stroke("red")
      this.point(previewX, previewY)
    }
    this.strokeWeight(0)
    this.fill("rgba(0,0,255,0.4)")
    this.arc(x2, y2, len, len, ang - this.angleDistanceMin, ang + this.angleDistanceMin);


  }

  drawHole(i, preloaded) {
    if (this.hideHole) return
    if (i == 0) {
      this.image(preloaded.hole, this.startingX - (this.strokeW / 4), this.startingY - (this.strokeW / 5), this.holeWidth, this.holeWidth);
    }
    if (!this.redrawBackground) {
      this.hideHole = true
    }
  }

  getSegmentCoordinates(i) {
    let l = this.allLines[i]
    let lastLine
    let offsetTilNextSegment = this.tweens == 0 ? 0 : this.totalLength % this.tweens
    if (!this.lastLine) {
      lastLine = {
        x1: this.startingX,
        y1: this.startingY,
        x2: this.startingX,
        y2: this.startingY
      }
      this.lastLine = lastLine

    } else if (i == 0) {
      lastLine = this.lastLine
    } else {
      lastLine = this.allLines[i - 1]
    }

    // normally we draw each line x1,y1 to x2,y2
    // x1,y1 is the end of the previous line
    // x2,y2 is the end of the current line
    const x1 = offsetTilNextSegment == 0 ? l.x1 : ((l.x1 - lastLine.x1) * (offsetTilNextSegment / this.tweens)) + lastLine.x1
    const y1 = offsetTilNextSegment == 0 ? l.y1 : ((l.y1 - lastLine.y1) * (offsetTilNextSegment / this.tweens)) + lastLine.y1
    const x2 = offsetTilNextSegment == 0 ? l.x2 : ((l.x2 - lastLine.x2) * (offsetTilNextSegment / this.tweens)) + lastLine.x2
    const y2 = offsetTilNextSegment == 0 ? l.y2 : ((l.y2 - lastLine.y2) * (offsetTilNextSegment / this.tweens)) + lastLine.y2

    // len is the distance between x1,y1 and x2,y2
    const len = this.dist(x1, y1, x2, y2)
    const ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    return { x1, y1, x2, y2, len, ang }
  }



  addLine() {

    // get the next segment
    let angResults
    switch (this.pattern) {
      case "circle":
        angResults = this.wanderInCircle()
        break
      case "star":
        angResults = this.wanderInStar()
        break
      case "square":
        angResults = this.wanderInSquare()
        break
      case "random":
        angResults = this.wander()
        break
      case "eight":
        angResults = this.wanderInEight()
        break
      case "bigEight":
        angResults = this.wanderInBigEight()
        break
      case "rotatingEight":
        angResults = this.wanderInRotatingEight()
        break
      case "heart":
        angResults = this.wanderInHeart()
        break
      case "randomLoop":
        angResults = this.wanderLoop()
        break
      default:
        throw new Error(`Unknown pattern: ${this.pattern} `)
    }
    if (!angResults) return
    // if there should be no new segment, return empty
    const ang = angResults.angle
    let x2, y2, len
    if (this.reachedHome) {
      x2 = angResults.x
      y2 = angResults.y
      len = angResults.len
    } else {
      let lenWithoutTips = this.maxLen - this.strokeW
      x2 = this.x + Math.cos(ang * Math.PI / 180) * lenWithoutTips
      y2 = this.y + Math.sin(ang * Math.PI / 180) * lenWithoutTips
      len = lenWithoutTips
    }

    const newLine = {
      x1: this.x,
      y1: this.y,
      x2: x2,
      y2: y2,
      ang: ang,
      len: len,
      failed: angResults.failed,
      maskedImage: null
    }


    this.allLines.push(newLine)
    this.previousAngle = ang
    this.x = x2
    this.y = y2
    if (this.allLines.length > this.maxNumberOfLines) {
      this.lastLine = this.allLines.shift()
      // this.allColors.shift()
    }


  }

  addAllLines(numOfLines = 50) {
    for (let i = 0; i < numOfLines; i++) {
      this.addLine()
      this.totalLength += this.tweens
    }
  }

  reset() {
    this.allLines = []
    this.wanderHome = undefined
    this.reachedHome = undefined
    this.totalLength = 0
    this.hideHead = false
    this.previousAngle = 0
    this.deletedSegment = undefined
    this.deletedColor = undefined
    this.justReset = undefined
  }

  wanderLoop() {
    const turningPoint = this.wanderLoopDuration
    const reachedHomeMargin = this.maxLen - this.strokeW
    const startingXOffset = this.startingX - (this.strokeW / 3)
    const startingYOffset = this.startingY - (this.strokeW / 3)
    const totalLength = this.totalLength / (this.tweens > 0 ? this.tweens : 1)
    if (totalLength < turningPoint && !this.wanderHome) {
      return this.wander()
    }
    this.wanderHome = true

    if (Math.abs(this.x - startingXOffset) < reachedHomeMargin && Math.abs(this.y - startingYOffset) < reachedHomeMargin) {
      this.reachedHome = true
    }

    if (this.reachedHome) {
      this.hideHead = true
    }

    const x = this.startingX
    const y = this.startingY
    var angleDelta = this.random(-this.angleDistanceMin / 2, this.angleDistanceMin / 2)
    const angle = Math.atan2(y - this.y, x - this.x) * 180 / Math.PI + angleDelta
    return { angle: angle, failed: [], x, y, tries: 1 }
  }

  wanderInStar() {
    const previousX = this.x
    const previousY = this.y
    const radius2 = this.width / 3

    const origin = this.width / 2

    const npoints = 5
    const fivePoints = []
    this.angleMode(this.RADIANS);
    for (let a = 0; a < this.TWO_PI; a += this.TWO_PI / npoints) {
      let sx = origin + Math.cos(a) * radius2;
      let sy = origin + Math.sin(a) * radius2;
      fivePoints.push({ x: sx, y: sy })
    }
    this.angleMode(this.DEGREES);

    const step = Math.floor(this.totalLength / this.tweens)
    const chunksPerSide = radius2 * 1.96 / (this.maxLen - this.strokeW)
    const leg = Math.floor(step / chunksPerSide) % npoints
    const skip = leg * 2 % npoints
    const target = fivePoints[skip]
    const rotateBy = 271
    this.angleMode(this.DEGREES);

    const results = this.rotateXY(this.width / 2, this.width / 2, target.x, target.y, rotateBy)

    const x = results[0]
    const y = results[1]

    // const c = [this.random(0, 255), this.random(0, 255), this.random(0, 255)]
    // this.stroke(c)
    // this.strokeWeight(10)
    // this.point(x, y)

    const angle = Math.atan2(y - previousY, x - previousX) * 180 / Math.PI;
    this.angleMode(this.DEGREES);
    return { x, y, tries: 0, failed: false, angle }
  }

  wanderInHeart() {

    const index = Math.floor(this.totalLength / this.tweens) % this.heartPattern.length
    const coord = this.heartPattern[index]
    const x = coord.x * this.width / 686
    const y = coord.y * this.width / 686
    // this.strokeWeight(10)
    // this.point(x, y)
    const previousX = this.x
    const previousY = this.y
    // const lineLength = this.maxLen

    // this.angleMode(this.RADIANS);

    // const a = (this.totalLength / (this.tweens * 4.25))// % (Math.PI * 2)
    // const r = height / 40;
    // const xOffset = this.width / 2
    // const yOffset = this.width / 2
    // const x = r * 16 * pow(sin(a), 3) + xOffset
    // const y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a)) + yOffset
    const angle = Math.atan2(y - previousY, x - previousX) * 180 / Math.PI;
    // this.strokeWeight(10)
    // this.fill("black")
    // this.stroke("black")
    // this.point(x, y)
    // this.angleMode(this.DEGREES);
    return { x, y, tries: 0, failed: false, angle }
  }

  wanderInRotatingEight() {
    const previousX = this.x
    const previousY = this.y
    let { x, y, tries, failed, angle } = this.wanderInEight()
    const rotateBy = this.totalLength / 3
    const results = this.rotateXY(this.width / 2, this.width / 2, x, y, rotateBy)
    x = results[0]
    y = results[1]
    angle = Math.atan2(y - previousY, x - previousX) * 180 / Math.PI;
    return { x, y, tries, failed, angle }
  }

  wanderInBigEight() {
    const previousX = this.x
    const previousY = this.y

    const stepOffset = 15

    this.angleMode(this.RADIANS);
    // const si = sin(frameCount / 50) * 80;
    // const co = cos(frameCount / 50);
    const size = this.width / 2.2
    const step = (this.totalLength + stepOffset) / ((this.maxLen / 19) * this.tweens)
    let x = Math.sin(step) * size
    let y = Math.cos(step) * Math.sin(step) * size
    const rotateBy = 55
    this.angleMode(this.DEGREES);
    const results = this.rotateXY(0, 0, x, y, rotateBy)

    const xOrigin = this.width / 1.87
    const yOrigin = this.width / 1.7
    x = results[0] + xOrigin
    y = results[1] + yOrigin

    if (!this.XTimer) {
      this.XTimer = x
      // console.time("x")
    } else if (Math.abs(this.XTimer - x) < 3) {
      // console.timeEnd("x")
    }

    const angle = Math.atan2(y - previousY, x - previousX) * 180 / Math.PI;
    // this.strokeWeight(10)
    // this.stroke("black")
    // this.point(x, y)
    return {
      x, y, tries: 0, failed: false, angle: angle
    }
  }

  rotateXY(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
  }

  wanderInEight() {
    const previousX = this.x
    const previousY = this.y

    this.angleMode(this.RADIANS);
    // const si = sin(frameCount / 50) * 80;
    // const co = cos(frameCount / 50);
    const size = this.width / 3.7
    const origin = this.width / 2
    const step = this.totalLength / ((this.maxLen / 29) * this.tweens)
    const x = Math.sin(step) * size + origin
    const y = Math.cos(step) * Math.sin(step) * size + origin
    const angle = Math.atan2(y - previousY, x - previousX) * 180 / Math.PI;
    this.angleMode(this.DEGREES);
    return { x, y, tries: 0, failed: false, angle }
  }

  wanderInSquare() {
    let previousX = this.x
    let previousY = this.y
    const lineLength = this.maxLen
    const width = this.width
    const margin = this.margin - this.maxLen / 2

    let angle = this.previousAngle
    switch (angle) {
      case 0:
        if (previousX + lineLength > width - margin) {
          angle = 90
        }
        break;
      case 90:
        if (previousY + lineLength > width - margin) {
          angle = 180

        }
        break;
      case 180:
        if (previousX - lineLength < margin) {
          angle = 270
        }
        break;
      case 270:
        if (previousY - lineLength < margin) {
          angle = 0
        }
        break;
      default:
        angle = 0
      // throw new Error(`invalid angle ${ angle } `)
    }
    let x, y
    switch (angle) {
      case 0:
        x = previousX + lineLength
        y = margin
        break;
      case 90:
        x = width - margin
        y = previousY + lineLength
        break;
      case 180:
        x = previousX - lineLength
        y = width - margin
        break;
      case 270:
        x = margin
        y = previousY - lineLength
        break;
    }
    // const angle = Math.atan2(y - previousY, x - previousX) * 180 / Math.PI;

    return { x, y, tries: 0, failed: false, angle: angle }
  }

  wanderInCircle() {
    const previousX = this.x
    const previousY = this.y

    this.angleMode(this.RADIANS);
    let chunkDivider
    // switch (this.style) {
    //   case "everythingMatches":
    //   case "everythingMatchesRounded":
    //   case "randomImage":
    //   case "randomImageRounded":
    //   case "skeleton":
    //     chunkDivider = this.maxLen / 7
    //     break;
    //   default:
    //     chunkDivider = this.maxLen / 3.6
    // }
    chunkDivider = this.maxLen / 7

    const chunks = 360 / chunkDivider

    const angleJump = ((Math.PI * 2) / chunks) * ((this.totalLength / this.tweens) % chunks)
    const r = this.width / 2 - this.margin
    var x = this.width / 2 + r * Math.cos(angleJump);
    var y = this.width / 2 + r * Math.sin(angleJump);
    const angle = Math.atan2(y - previousY, x - previousX) * 180 / Math.PI;
    this.angleMode(this.DEGREES);
    // this.strokeWeight(10)
    // this.stroke("black")
    // this.point(x, y)
    // this.strokeWeight(0)
    return { x, y, tries: 0, failed: false, angle }


    // var angleDelta = 15


    // // actually applying the change to the angle should also be randomly additional or subtractive
    // var angle = previousAngle + angleDelta
    // angle = newAngle < 0 ? 360 + newAngle : (newAngle > 360 ? newAngle % 360 : newAngle)

    // // check if the angle works with that distance
    // var newX = Math.floor(previousX + Math.cos(newAngle * Math.PI / 180) * (lineLength))
    // var newY = Math.floor(previousY + Math.sin(newAngle * Math.PI / 180) * (lineLength))
    // // if it does, return the new point
    // return { x: newX, y: newY, tries: 1, angle: newAngle, failed: [] }
  }

  // wander is the heart of the algorithm
  // it takes the previous line's end point and angle and returns a new angle
  // the new angle is within the maxDifferenceBetweenAngles of the previous angle
  // the new angle is also within the margin of the canvas
  // if the new angle doesn't work, it tries again, increasing until the worst case scenario which is 180 degrees
  // it's been optimized to find a solution 100% of the time in under 
  wander() {
    const previousX = this.x
    const previousY = this.y
    const previousAngle = this.previousAngle
    const lineLength = this.maxLen - this.strokeW
    const width = this.width
    const margin = this.margin
    const maxDifferenceBetweenAngles = this.angleDistanceMin

    // maxDifferenceBetweenAngles cannot be greater than 180
    if (maxDifferenceBetweenAngles > 180) throw new Error('maxDifferenceBetweenAngles cannot be greater than 180')

    // get a random amount to change the angle by
    var angleDelta = this.random(0, maxDifferenceBetweenAngles)
    // this ensures that the search for a working angle doesn't always start by adding to the angle (turning clockwise)
    if (angleDelta <= (maxDifferenceBetweenAngles / 2)) {
      angleDelta = angleDelta * -1
    }

    // this ensures that if the first solution doesn't work, the next one isn't always the first solution through addition (turn clockwise)
    var isOddAdditionalRandom = 1
    // if angleDelta is odd, then isOddAdditionalRandom will be -1
    if (angleDelta % 2 == 0) {
      isOddAdditionalRandom = -1
    }

    // keeping track of the failed attempts allows you to debug
    var failed = []
    // changeByAmount is the amount that the angle will be changed by each time. It should remain lower than maxDifferenceBetweenAngles
    var changeByAmount = 45//(maxDifferenceBetweenAngles) - 1
    var anglesInACircle = 360
    for (var i = 0; i < anglesInACircle / changeByAmount; i++) {
      // first try, i == 0 so isOdd is false
      // second try, i == 1 so isOdd is true
      // third try, i == 2 so isOdd is false
      // fourth try, i == 3 so isOdd is true
      var iIsOdd = i % 2 == 0 ? false : true

      // first try, addOrRemove should be 1
      // second try, addOrRemove should be -1
      // third try, addOrRemove should be 1
      // fourth try, addOrRemove should be -1
      var addOrRemove = iIsOdd ? -1 : 1

      // first try, i == 0 and timesTried should be 0
      // second try, i == 1 and timesTried should be 1
      // third try, i == 2 and timesTried should be 1
      // fourth try, i == 3 and timesTried should be 2
      var timesTried = Math.ceil(i / 2)

      // first try should be the angleDelta
      // second try should be the angleDelta + changeByAmount
      // third try should be the angleDelta - changeByAmount
      // fourth try should be the angleDelta + (2 * changeByAmount)
      var changeBy = angleDelta + (timesTried * changeByAmount) * -1 * addOrRemove

      // actually applying the change to the angle should also be randomly additional or subtractive
      var newAngle = previousAngle + (changeBy * isOddAdditionalRandom)
      newAngle = newAngle < 0 ? 360 + newAngle : (newAngle > 360 ? newAngle % 360 : newAngle)

      // check if the angle works with that distance
      var newX = Math.floor(previousX + Math.cos(newAngle * Math.PI / 180) * (lineLength))
      var newY = Math.floor(previousY + Math.sin(newAngle * Math.PI / 180) * (lineLength))
      // if it does, return the new point
      if (!outSideCanvas(newX, newY, this.width, this.margin, this.strokeW)) {
        return { x: newX, y: newY, tries: i + 1, angle: newAngle, failed }
      }

      // NOTE: only important for debug mode
      var a = Math.ceil(this.random(0, 255))
      var b = Math.ceil(this.random(0, 255))
      var c = Math.ceil(this.random(0, 255))
      var randomColor = `rgb(${a}, ${b}, ${c})`
      failed.push({ changeBy, newAngle, newX, newY, randomColor })
    }
    console.error({ previousX, previousY, previousAngle, maxDifferenceBetweenAngles, lineLength, width, margin })
    console.error({ failed })
    throw new Error(`Unable to find a new point from(${previousX}, ${previousY}, ${previousAngle})`)
  }

  random(min = 0, max = 1) {
    this.timesCalledRandom = typeof this.timesCalledRandom == 'undefined' ? 1 : this.timesCalledRandom + 1
    var foo = this.rng.nextInt(min, max)
    return foo
  }

  getStart() {
    let x, y, previousAngle
    const min = this.margin
    const max = this.width - (this.margin * 2)
    const center = this.width / 2
    const firstRandom = this.random(min, max)
    const secondRandom = this.random(min, max)
    const randomAngle = this.random(0, 360)
    switch (this.pattern) {
      case "circle":
        x = center + this.maxLen / 2
        y = min + (this.maxLen / 6)
        previousAngle = 0
        break;
      case "square":
        x = min
        y = min
        previousAngle = 0
        break;
      case "randomLoop":
      case "random":
        x = firstRandom
        y = secondRandom
        previousAngle = randomAngle
        break;
      case "rotatingEight":
      case "bigEight":
        x = min //+ (this.width / 20)
        y = min //+ (this.width / 10)
        previousAngle = 180
        break;
      case "eight":
        x = min
        y = min
        previousAngle = 180
        break;
      case "heart":
        x = center
        y = center
        previousAngle = 0
        break;
      case "star":
        x = 477.4068943575455
        y = 158.00478061959535
        previousAngle = 0
        break;
      default:
        throw new Error(`invalid pattern ${this.pattern} `)
    }
    return { x, y, previousAngle }
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
  }

  // https://editor.p5js.org/okwme/sketches/p9ly6SKjB
  setHeartPattern() {
    const heart = []
    let lastX = null
    let lastY = null
    for (let a = 0.6; a < 2 * Math.PI; a += 0.01) {
      const r = this.width / 48;
      const x = r * 16 * Math.pow(Math.sin(a), 3);
      const y = -r * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a));
      const distance = this.distance(lastX, lastY, x, y)
      const segment = this.maxLen - this.strokeW
      const marginOfError = 2
      if (lastX == null || Math.abs(distance - (segment)) < (marginOfError)) {
        lastX = x
        lastY = y
        heart.push({ x: x + this.width / 2, y: y + this.width / 2 })
      }
    }
    this.heartPattern = heart
  }

  populate() {

    const numHeads = 4//14
    const headColorVariations = 1//4
    const numSkeltonHeads = numHeads
    const numTails = numHeads
    const tailColorVariation = headColorVariations
    const numBodySegments = numHeads
    const bodySegmentColorVariation = 5
    const numSkeletonSegments = 4
    const skeletonColorVariations = 0//2

    const gifPatterns = 7
    const background_options = 4

    const randomColorFactor = 1 // randomColor segments will always be random, so we can decide how many
    const randomImageFactor = 1
    const debugFactor = 4 // debug segments will always be random

    const style_everythingMatches = numHeads * headColorVariations * background_options

    const style_everythingMatchesRounded = numHeads * headColorVariations * background_options

    const style_randomColor = numHeads * headColorVariations * randomColorFactor * background_options

    const style_debug = numHeads * headColorVariations * debugFactor * background_options

    const style_randomImage = numHeads * headColorVariations * randomImageFactor * background_options

    const style_randomImageRounded = numHeads * headColorVariations * randomImageFactor * background_options

    const style_skeleton = numHeads * skeletonColorVariations * background_options // * numSkeletonSegments

    const bodyVariations = (style_everythingMatches + style_skeleton + style_randomColor + style_debug + style_randomImage + style_randomImageRounded)

    // 'randomImage',
    // 'everythingMatches',
    // 'randomImageRounded',
    // 'everythingMatchesRounded',
    //  randomColor
    //  debug
    //  skeleton

    let arrayOfAll = []
    let style
    for (let head = 0; head < numHeads; head++) {
      for (let headColor = 0; headColor < headColorVariations; headColor++) {
        for (let background = 0; background < background_options; background++) {
          style = "everythingMatches"
          arrayOfAll.push({ style, head, headColor, background })

          style = "everythingMatchesRounded"
          arrayOfAll.push({ style, head, headColor, background })
        }

        style = "randomColor"
        for (let randomColor = 0; randomColor < randomColorFactor; randomColor++) {
          for (let background = 0; background < background_options; background++) {
            arrayOfAll.push({ style, head, headColor, background })
          }
        }

        style = "debug"
        for (let debug = 0; debug < debugFactor; debug++) {
          arrayOfAll.push({ style, head, headColor })
        }

        for (let randomImage = 0; randomImage < randomImageFactor; randomImage++) {
          for (let background = 0; background < background_options; background++) {
            style = "randomImage"
            arrayOfAll.push({ style, head, headColor, background })

            style = "randomImageRounded"
            arrayOfAll.push({ style, head, headColor, background })
          }
        }
      }

      style = "skeleton"
      for (let skeletonColor = 0; skeletonColor < skeletonColorVariations; skeletonColor++) {
        for (let background = 0; background < background_options; background++) {
          arrayOfAll.push({ style, head, skeletonColor, background })
        }
      }

    }
    arrayOfAll = this.shuffle(arrayOfAll)
    arrayOfAll.map((item, index) => {
      if (item.style == "debug") return
      if (backgroundsIndex[item.background].indexOf('gradient') > -1) {
        item.bgColors = this.setupBgColors(backgroundsIndex[item.background])
      } else {
        item.bgImage = this.random(0, this.totalBgs)
      }
    })
    return arrayOfAll
  }

  shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = this.random(0, currentIndex - 1)
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}



function outSideCanvas(x, y, width, margin, bottomMargin) {
  // note, this doesn't account for the margin of the bottom
  if (x < margin || x > width - margin || y < margin || y > width - bottomMargin) {
    return true
  }
  return false
}


function weightedAvgColor(a, b, w) {
  let x, y, z;
  w = w + (w - 0.5) * 0.45;  // Messed with the weight to get the color densities to match the image https://stackoverflow.com/questions/11482349/four-point-gradient-in-ios
  if (w > 1) w = 0.99;
  if (a[0] != b[0]) {
    x = a[0] + (b[0] - a[0]) * w;
  }
  else {
    x = a[0];
  }

  if (a[1] != b[1]) {
    y = a[1] + (b[1] - a[1]) * w;
  }
  else {
    y = a[1];
  }

  if (a[2] != b[2]) {
    z = a[2] + (b[2] - a[2]) * w;
  }
  else {
    z = a[2];
  }
  return [x, y, z]
}

async function loadFn(fn, content) {
  return Promise.resolve(fn(content))
}

const defaultHeadOffsets = {
  xFactor: 2,
  yFactor: 2.5
}

const headOffsets = {
  _1: {
    xFactor: 1.8,
    yFactor: 2.3
  },
  _2: {
    xFactor: 2.5,
    yFactor: 2.3
  },
  _3: {
    xFactor: 2.2,
    yFactor: 2.2
  },
  _4: {
    xFactor: 2.2,
    yFactor: 2.2
  },
  _5: {
    xFactor: 2.3,
    yFactor: 2.4
  },
  _6: {
    xFactor: 2.5,
    yFactor: 1.9
  },
  _7: {
    xFactor: 1.9,
    yFactor: 3
  },
  _8: {
    xFactor: 2,
    yFactor: 2
  },
  _9: {
    xFactor: 3.3,
    yFactor: 2.6
  }
}

const defaultTailOffsets = {
  xFactor: 2,
  yFactor: 0
}

const tailOffsets = {
  _1: {
    xFactor: 2.1,
    yFactor: 0.05
  },
  _3: {
    xFactor: 1.9,
    yFactor: 0.2
  },
  _4: {
    xFactor: 1.8,
    yFactor: -0.2
  },
  _5: {
    xFactor: 1.8,
    yFactor: 0
  },
  _6: {
    xFactor: 1.7,
    yFactor: 0.3
  },
  _7: {
    xFactor: 1.8,
    yFactor: 0.2
  }
}

function typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

const backgroundsIndex = [
  "gradient-high",
  "gradient-low",
  // "bw-gradient-high",
  "bw-gradient-low",
  "image"
]