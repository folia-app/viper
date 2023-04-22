import Prando from 'prando'
// import fs from 'fs'
let fs
export class Viper {
  constructor(overwriteOptions = {}) {
    const options = {
      source: "random-seed",
      setting: "server",
      logs: false, // false, true, "verbose"
      style: "randomColor"/*
      // style options
      // 1. maskClipRandom
      // 1. maskClipSame
      // 1. randomColor
      // 1. debug
      // 1. skeleton
      // 1. randomGreen*/,
      backgroundStyle: "fourGradient"/*
      // backgroundStyle options
      // 1. solid
      // 1. gradient
      // 1. fourGradient
      // 1. image*/,
      pattern: "eight"/*
      // pattern options
      // 1. random
      // 1. circle
      // 1. square
      // 1. eight 
      // 1. heart
      // 1. randomLoop */,
      width: 686,
      maxNumberOfLines: 20,
      maxLen: 686 / 12,
      strokeW: 686 / 12,
      headWidth: 686 / 12 * 2,
      margin: 686 / 12 * 2,
      angleDistanceMin: 60,
      fps: 35,
      tweens: 6,
      bgColor: "rgb(226,226,226)",
      hideHole: false,
      hideHead: false,
      hideTail: false,
      hideSnake: false,
      redrawBackground: true,
      wanderLoopDuration: 2,
      ...overwriteOptions
    }
    const {
      source, setting, logs, style, backgroundStyle, pattern, wanderLoopDuration,
      width, maxNumberOfLines, maxLen, strokeW, headWidth, margin, angleDistanceMin,
      fps, tweens, bgColor, hideHole, hideHead, hideTail, redrawBackground, hideSnake
    } = options
    this.logs = logs
    this.logs && console.log('constructor')
    this.logs == "verbose" && console.time("viper")

    this.source = source
    this.rng = new Prando(this.source);

    this.setting = setting
    if (this.setting == "server") {
      // so that webpack doesn't try to pack up fs for the browser
      fs = eval('require')('fs')
    }

    this.style = style
    this.backgroundStyle = backgroundStyle
    this.pattern = pattern
    this.width = width
    this.maxNumberOfLines = maxNumberOfLines
    this.maxLen = maxLen
    this.strokeW = strokeW
    this.headWidth = headWidth
    this.margin = margin
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
    this.totalBodies = 8
    this.totalHeadsTails = 7
    this.totalBgs = 3
    this.whichSegment = this.random(0, this.totalBodies)
    this.bodyOffset = this.random(0, this.totalBodies)
    this.headTailRandom = this.random(1, this.totalHeadsTails)

    this.headOffset = headOffsets.hasOwnProperty("_" + this.headTailRandom) ? headOffsets["_" + this.headTailRandom] : defaultHeadOffsets
    this.tailOffset = tailOffsets.hasOwnProperty("_" + this.headTailRandom) ? tailOffsets["_" + this.headTailRandom] : defaultTailOffsets
  }

  preload() {
    console.log('viper preload command (only browser)')
    try {
      this.logs == "verbose" && console.timeLog("viper", "preload")
      this.logs && console.log('preload')
      this.preloaded = {}
      this.preloaded.bgImg = window.loadImage('/bg/bg3_' + this.random(1, this.totalBgs) + '.png')
      this.preloaded.tail = window.loadImage('/tail/' + this.headTailRandom + '.png')
      this.preloaded.head = window.loadImage('/head/' + this.headTailRandom + '.png')
      this.preloaded.hole = window.loadImage('/holes/1.png')
      this.preloaded.bodies = []
      for (var i = 1; i <= this.totalBodies; i++) {
        this.preloaded.bodies.push(window.loadImage(`/body/${i}.png`))
      }
    } catch (preloadError) {
      console.log({ preloadError })
    }
  }

  getTailURLs() {
    return this.getHeadTailURLs(false)
  }
  getHeadURLs() {
    return this.getHeadTailURLs(true)
  }
  getHeadTailURLs(isHead) {
    const units = []
    for (let i = 1; i <= this.totalHeadsTails; i++) {
      let filename = process.cwd() + (isHead ? '/public/head/' : '/public/tail/') + i + '.png'
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
    const imgURL = process.cwd() + "/public" + img
    if (!fs.existsSync(imgURL)) {
      throw new Error('head/tail image not found: ' + imgURL)
    }
    return imgURL
  }

  getHoleURL() {
    if (!this.holeImg) {
      this.holeImg = '1.png'
    }
    const holeImgURL = process.cwd() + "/public/holes/" + this.holeImg
    if (!fs.existsSync(holeImgURL)) {
      throw new Error('hole image not found: ' + holeImgURL)
    }
    return holeImgURL
  }

  getBgURLs() {
    const bgs = []
    for (let i = 0; i < this.totalBgs; i++) {
      let filename = process.cwd() + '/public/bg/bg3_' + (i + 1) + '.png'
      if (!fs.existsSync(filename)) {
        throw new Error('background image not found: ' + filename)
      }
      bgs.push(filename)
    }
    return bgs
  }

  getBgImgURL() {
    if (!this.backgroundImg) {
      this.backgroundImg = 'bg3_' + this.random(1, 3) + '.png'
    }
    const backgroundImageURL = process.cwd() + "/public/bg/" + this.backgroundImg
    if (!fs.existsSync(backgroundImageURL)) {
      throw new Error('background image not found: ' + backgroundImageURL)
    }
    return backgroundImageURL
  }
  getBodiesURLs() {
    if (this.style !== "maskClipRandom" && this.style !== "maskClipSame") {
      return false
    }
    const bodies = []
    for (var i = 1; i <= this.totalBodies; i++) {
      const bodyURL = process.cwd() + `/public/body/${i}.png`
      if (!fs.existsSync(bodyURL)) {
        throw new Error('bodyURL image not found: ' + bodyURL)
      }
      bodies.push(bodyURL)
    }
    return bodies
  }

  setup(p) {
    this.logs == "verbose" && console.timeLog("viper", "setup")
    this.point = p ? p.point.bind(p) : window.point
    this.line = p ? p.line.bind(p) : window.line
    this.fill = p ? p.fill.bind(p) : window.fill
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

    const { x, y } = this.getStart()
    this.x = x
    this.startingX = x
    this.y = y
    this.startingY = y
    this.previousAngle = 0//Math.floor(this.random(0, 360))

    this.frameRate(this.fps);
    this.strokeWeight(this.strokeW);
    this.rectMode(this.CENTER)
    this.imageMode(this.CENTER);
    this.angleMode(this.DEGREES);
    this.strokeCap(this.ROUND);
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
      case "fourGradient":
        this.fourColorGradient()
        break;
      case "image":
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

  fourColorGradient() {
    // const resolution = this.width / 5
    const resolution = this.width / 20
    if (!this.savedBG) {
      const colors = [
        [this.random(0, 255), this.random(0, 255), this.random(0, 255)],
        [this.random(0, 255), this.random(0, 255), this.random(0, 255)],
        [this.random(0, 255), this.random(0, 255), this.random(0, 255)],
        [this.random(0, 255), this.random(0, 255), this.random(0, 255)]
      ];
      this.savedBG = this.createGraphics(this.width, this.width)
      for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
          let s = this.width / resolution;
          let wx = i * s / this.width
          let wy = j * s / this.width
          this.savedBG.noStroke()
          let c = weightedAvgColor(weightedAvgColor(colors[0], colors[1], wx), weightedAvgColor(colors[3], colors[2], wx), wy)
          this.savedBG.fill(c)
          this.savedBG.rect(i * s, j * s, s, s)
          // this.savedBG.stroke(c)
          // this.savedBG.strokeWeight(s * 2.9)
          // this.savedBG.point(i * s, j * s)
        }
      }
    }
    this.image(this.savedBG, this.width / 2, this.width / 2, this.width, this.width)
  }

  draw(preloaded) {
    // this.clear()
    this.logs == "verbose" && console.timeLog("viper", "draw")
    if (typeof preloaded === 'undefined') {
      preloaded = this.preloaded
    } else if (typeof this.bodies == "undefined") {
      this.bodies = []
      for (var i = 0; i < this.totalBodies; i++) {
        this.bodies.push(preloaded[`body_${i}`])
      }
      preloaded.bodies = this.bodies
    } else {
      preloaded.bodies = this.bodies
    }
    this.totalLength++
    if (this.setting == "server") {
      this.addAllLines()
    } else
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
    if (this.hideSnake) return
    let skippedDraw = 0
    for (var i = 0; i < this.allLines.length; i++) {
      var c = this.allColors[i]
      var { x1, y1, x2, y2, len, ang } = this.getSegmentCoordinates(i)

      this.drawHole(i, preloaded)

      const onTopOfEachOther = (Math.abs(x1 - x2) < this.maxLen / 10 && Math.abs(y1 - y2) < this.maxLen / 10)
      if (onTopOfEachOther && this.reachedHome) {
        skippedDraw++
        continue
      }

      if (this.style == "debug") {
        this.drawDebug(x1, y1, x2, y2, len, ang, i, c)
      } else {
        switch (this.style) {
          case ("maskClipRandom"):
            const index = this.allLines.length - i
            this.whichSegment = (index + this.bodyOffset) % preloaded.bodies.length
          case ("maskClipSame"):
            this.drawMaskClip(x1, y1, x2, y2, len, ang, c, preloaded, i)
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
    if (skippedDraw == this.allLines.length) {
      this.reset()
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
      const headWidth = this.strokeW * 2
      var calcHeadOffset = {
        x: headWidth / this.headOffset.xFactor,
        y: headWidth / this.headOffset.yFactor
      }
      if ((l.x1 - l.x2) > (this.width / 80)) {
        this.push()
        this.scale(-1, 1)
        // this.rect((-l.x2) + calcHeadOffset.x, l.y2 - calcHeadOffset.y, headWidth)
        this.image(preloaded.head, (-x2) + calcHeadOffset.x, y2 - calcHeadOffset.y, headWidth, headWidth);
        this.pop()
      } else {
        // rect(l.x2 + calcHeadOffset.x, l.y2 - calcHeadOffset.y, headWidth)
        this.image(preloaded.head, x2 + calcHeadOffset.x, y2 - calcHeadOffset.y, headWidth, headWidth);
      }

    }

  }

  drawTail(x1, y1, x2, y2, i, preloaded) {
    if (this.hideTail) return

    var tailLength = this.strokeW * 1.4
    var tailWidth = tailLength / 2
    var calcTailOffset = {
      x: tailLength / this.tailOffset.xFactor,
      y: tailWidth * this.tailOffset.yFactor
    }

    // var a = i == 0 && (this.totalLength >= this.maxNumberOfLines) && this.setting == "server"
    // var b = i == 1 && (this.totalLength > ((this.maxNumberOfLines) * this.tweens)) && this.setting == "browser"
    // if ((a) || (b)) {
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



  drawMaskClip(x1, y1, x2, y2, len, ang, c, preloaded, i) {
    const pic = preloaded.bodies[this.whichSegment]
    const flip = (x1 - x2) > (this.width / 80)
    var renderedID = this.whichSegment.toString()
    let imagePattern
    if (!this.renderedBodies[renderedID]) {
      var strokeMask = this.createGraphics(len + (this.strokeW * 2), this.strokeW);
      strokeMask.strokeWeight(this.strokeW)
      strokeMask.line(this.strokeW / 2, this.strokeW / 2, len + (this.strokeW * 1.5), this.strokeW / 2)

      imagePattern = this.createGraphics(len + (this.strokeW * 2), this.strokeW);
      imagePattern.background(c)
      // imagePatter n.textSize(50)
      // imagePattern.text(i, (len + (this.strokeW * 2)) / 2, this.strokeW)
      imagePattern.image(pic, 0, -this.strokeW / 2, len + (this.strokeW * 2), this.strokeW * 2)

      imagePattern.loadPixels()
      strokeMask.loadPixels()
      for (let j = 0; j < imagePattern.pixels.length; j += 4) {
        imagePattern.pixels[j + 3] = strokeMask.pixels[j + 3]
      }
      imagePattern.updatePixels()
      this.renderedBodies[renderedID] = imagePattern
    } else {
      imagePattern = this.renderedBodies[renderedID]
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

    const segmentWeight = this.strokeW / 1.75 // strokeW - ((allLines.length - 1 - i) * diff)
    this.stroke("black")
    this.strokeWeight(segmentWeight + (segmentWeight * 0.1))
    this.line(-len / 2, 0, len / 2, 0)

    this.image(imagePattern, 0, 0, len + segmentWeight, segmentWeight);
    this.pop()
    this.pop()
  }

  drawRandomColor(x1, y1, x2, y2, c) {
    this.stroke("black")
    var segmentWeight = this.strokeW / 1.75 // strokeW - ((allLines.length - 1 - i) * diff)
    this.strokeWeight(segmentWeight + 2)
    this.line(x1, y1, x2, y2)
    this.stroke(c)
    this.strokeWeight(segmentWeight)
    this.line(x1, y1, x2, y2)
  }

  drawDebug(x1, y1, x2, y2, len, ang, i, c) {
    const l = this.allLines[i]
    // this.stroke("black")
    this.stroke(c)
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
    // var a = false//(i == 0 && this.setting !== "browser")
    // var b = (i == 1 && this.totalLength > ((this.maxNumberOfLines) * this.tweens) && this.setting == "browser")
    if (i == 0) {
      var holeWidth = this.strokeW * 2
      this.image(preloaded.hole, this.startingX - (this.strokeW / 4), this.startingY - (this.strokeW / 5), holeWidth, holeWidth);
    }
  }

  getSegmentCoordinates(i) {
    let l = this.allLines[i]
    let x1, y1, x2, y2, len, ang
    if (this.setting == "browser") {
      let lastLine
      let offsetTilNextSegment = this.tweens == 0 ? 0 : this.totalLength % this.tweens
      if (i == 0 && this.allLines.length < this.maxNumberOfLines) {
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
      x1 = offsetTilNextSegment == 0 ? l.x1 : ((l.x1 - lastLine.x1) * (offsetTilNextSegment / this.tweens)) + lastLine.x1
      y1 = offsetTilNextSegment == 0 ? l.y1 : ((l.y1 - lastLine.y1) * (offsetTilNextSegment / this.tweens)) + lastLine.y1
      x2 = offsetTilNextSegment == 0 ? l.x2 : ((l.x2 - lastLine.x2) * (offsetTilNextSegment / this.tweens)) + lastLine.x2
      y2 = offsetTilNextSegment == 0 ? l.y2 : ((l.y2 - lastLine.y2) * (offsetTilNextSegment / this.tweens)) + lastLine.y2

      // len is the distance between x1,y1 and x2,y2
      len = this.dist(x1, y1, x2, y2)
      ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    } else {
      x1 = l.x1
      x2 = l.x2
      y1 = l.y1
      y2 = l.y2
      len = l.len
      ang = l.ang
    }
    return { x1, y1, x2, y2, len, ang }
  }



  addLine() {

    // get the next segment
    let angResults
    switch (this.pattern) {
      case "circle":
        angResults = this.wanderInCircle()
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
      case "heart":
        angResults = this.wanderInHeart()
        break
      case "randomLoop":
        angResults = this.wanderLoop()
        break
      default:
        throw new Error(`Unknown pattern: ${this.pattern}`)
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
      x2 = this.x + Math.cos(ang * Math.PI / 180) * this.maxLen
      y2 = this.y + Math.sin(ang * Math.PI / 180) * this.maxLen
      len = this.maxLen
    }
    const c = [this.random(0, 255), this.random(0, 255), this.random(0, 255)]

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
    this.allColors.unshift(c)
    this.previousAngle = ang
    this.x = x2
    this.y = y2
    if (this.allLines.length > this.maxNumberOfLines) {
      this.lastLine = this.allLines.shift()
      this.allColors.shift()
    }




  }

  addAllLines() {
    for (let i = 0; i < this.maxNumberOfLines; i++) {
      this.addLine()
      this.totalLength += this.setting == "browser" ? this.tweens : 1
    }
  }

  reset() {
    this.allLines = []
    this.allColors = []
    this.wanderHome = undefined
    this.reachedHome = undefined
    this.totalLength = 0
    this.hideHead = false
    this.previousAngle = 0
    this.deletedSegment = undefined
    this.deletedColor = undefined
  }

  wanderLoop() {
    const turningPoint = this.maxNumberOfLines * this.wanderLoopDuration
    const reachedHomeMargin = this.maxLen
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

  wanderInHeart() {

    const index = Math.floor(this.totalLength / this.tweens) % heartCoordsOnGridOf1000.length
    const coord = heartCoordsOnGridOf1000[index]
    const x = coord.x * this.width / 1000
    const y = coord.y * this.width / 1000

    const previousX = this.x
    const previousY = this.y
    const lineLength = this.maxLen

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

  wanderInEight() {
    const previousX = this.x
    const previousY = this.y

    this.angleMode(this.RADIANS);
    // const si = sin(frameCount / 50) * 80;
    // const co = cos(frameCount / 50);
    const var1 = this.width / 3.7
    const var2 = this.width / 2
    const step = this.totalLength / (3 * this.tweens)
    const x = Math.sin(step) * var1 + var2
    const y = Math.cos(step) * Math.sin(step) * var1 + var2
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
      // throw new Error(`invalid angle ${angle}`)
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
    const chunks = 24
    const angleJump = ((Math.PI * 2) / chunks) * ((this.totalLength / this.tweens) % chunks)
    const r = this.width / 2 - this.margin
    var x = this.width / 2 + r * cos(angleJump);
    var y = this.width / 2 + r * sin(angleJump);
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
    const lineLength = this.maxLen
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
      var randomColor = `rgb(${Math.ceil(this.random(0, 255))}, ${Math.ceil(this.random(0, 255))}, ${Math.ceil(this.random(0, 255))})`
      failed.push({ changeBy, newAngle, newX, newY, randomColor })
    }
    console.log({ previousX, previousY, previousAngle, maxDifferenceBetweenAngles, lineLength, width, margin })
    console.log({ failed })
    throw new Error(`Unable to find a new point from(${previousX}, ${previousY}, ${previousAngle})`)
  }

  random(min = 0, max = 1) {
    return this.rng.nextInt(min, max)
  }

  getStart() {
    let x, y
    const min = this.margin
    const max = this.width - this.margin
    switch (this.pattern) {
      case "circle":
        x = (this.width / 2) + this.maxLen / 2
        y = min + (this.maxLen / 6)
        break;
      case "square":
        x = min
        y = min
        break;
      case "randomLoop":
      case "random":
        x = this.random(min, max)
        y = this.random(min, max)
        break;
      case "eight":
        x = max / 2
        y = max / 2
        break;
      case "heart":
        x = max / 2
        y = max / 2
        break;
      default:
        throw new Error(`invalid pattern ${this.pattern}`)
    }
    return { x, y }
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
// https://editor.p5js.org/okwme/sketches/p9ly6SKjB
var heartCoordsOnGridOf1000 = [{ "x": 500, "y": 375 }, { "x": 523.6215940958725, "y": 305.13141528375945 }, { "x": 572.0079789306911, "y": 247.26569684075326 }, { "x": 647.6605092147418, "y": 208.09332400257904 }, { "x": 738.3292946363822, "y": 206.54268067284926 }, { "x": 823.863770119653, "y": 247.40906912170422 }, { "x": 882.792496237897, "y": 321.8589918695607 }, { "x": 899.4885417960356, "y": 413.907569914502 }, { "x": 869.4307380190571, "y": 508.68930539392323 }, { "x": 800.7307778675969, "y": 597.913282757173 }, { "x": 757.2814199462268, "y": 639.80309679362 }, { "x": 711.394784794539, "y": 680.0805586070702 }, { "x": 665.8675872141957, "y": 718.9358055202251 }, { "x": 585.7416455537127, "y": 792.184425900497 }, { "x": 531.2249829856402, "y": 856.1246003002016 }, { "x": 501.12415389378447, "y": 917.3086831005191 }, { "x": 465.337490018193, "y": 851.2784703970185 }, { "x": 408.37548528365113, "y": 786.3031054370841 }, { "x": 326.6165432076642, "y": 712.4978834831365 }, { "x": 280.8400458172563, "y": 673.4113568811111 }, { "x": 235.16496355380934, "y": 632.8784497609074 }, { "x": 192.40277506139398, "y": 590.6957720506871 }, { "x": 126.36252204530882, "y": 500.87130295101537 }, { "x": 100.09208385597799, "y": 405.8919135252606 }, { "x": 120.68953309840651, "y": 314.68562898625095 }, { "x": 182.5815379886182, "y": 242.48625917745932 }, { "x": 269.4056254702473, "y": 205.00446577834037 }, { "x": 359.5164365657932, "y": 210.11666206884473 }, { "x": 433.20083772887165, "y": 251.75600275956307 }, { "x": 479.0952455300467, "y": 310.01935469123 }]