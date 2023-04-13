import Prando from 'prando'
// import fs from 'fs'
let fs
export class Viper {
  constructor(source = "random-seed", setting = "server") {
    this.logs = false // false, true, "verbose"


    this.logs && console.log('constructor')
    this.logs == "verbose" && console.time("viper")

    this.source = source
    this.rng = new Prando(this.source);

    this.setting = setting

    if (this.setting === "browser") {

    } else if (this.setting == "server") {
      fs = eval('require')('fs')
    }

    this.style = "maskClipRandom"
    // style options
    // 1. maskClipRandom
    // 1. maskClipSame
    // 1. randomColor
    // 1. debug
    // 1. skeleton
    // 1. randomGreen

    this.backgroundStyle = "fourGradient"
    // backgroundStyle options
    // 1. solid
    // 1. gradient
    // 1. fourGradient
    // 1. image

    this.width = 686//343
    this.maxNumberOfLines = 36
    this.maxLen = this.width / 12
    this.strokeW = this.maxLen
    this.headWidth = this.strokeW * 2
    this.margin = this.headWidth
    this.angleDistanceMin = 60
    this.startPos = "random" // TODO: remove?
    this.strokeStyle = "random" // TODO: remove?
    this.fps = 35
    this.tweens = 6
    this.bgColor = "rgb(226,226,226)"
    this.rotationMode = "center"
    this.bgColor = "rgb(226,226,226)"
    this.allLines = []
    this.allColors = []
    this.totalLength = 0
    this.renderedBodies = {}
    this.totalBodies = 8
    this.totalHeadsTails = 7
    this.whichSegment = this.random(0, this.totalBodies)
    this.bodyOffset = this.random(0, this.totalBodies)
    this.headTailRandom = this.random(1, this.totalHeadsTails)

    this.headOffset = headOffsets.hasOwnProperty("_" + this.headTailRandom) ? headOffsets["_" + this.headTailRandom] : defaultHeadOffsets
    this.tailOffset = tailOffsets.hasOwnProperty("_" + this.headTailRandom) ? tailOffsets["_" + this.headTailRandom] : defaultTailOffsets
  }

  preload() {
    this.logs == "verbose" && console.timeLog("viper", "preload")
    this.logs && console.log('preload')
    this.preloaded = {}

    this.preloaded.tail = loadImage('/tail/' + this.headTailRandom + '.png')
    this.preloaded.head = loadImage('/head/' + this.headTailRandom + '.png')
    this.preloaded.hole = loadImage('/holes/1.png')
    this.preloaded.bodies = []
    for (var i = 1; i <= this.totalBodies; i++) {
      this.preloaded.bodies.push(loadImage(`/body/${i}.png`))
    }


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
    if (this.style == "debug") {
      return
    }
    if (!this.holeImg) {
      this.holeImg = '1.png'
    }
    const holeImgURL = process.cwd() + "/public/holes/" + this.holeImg
    if (!fs.existsSync(holeImgURL)) {
      throw new Error('hole image not found: ' + holeImgURL)
    }
    return holeImgURL
  }

  getBgImgURL() {
    if (this.backgroundStyle !== "image") {
      return
    }
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
      return
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
    this.ROUND = p ? p.ROUND : window.ROUND
    this.createCanvas = p ? p.createCanvas.bind(p) : window.createCanvas
    this.createGraphics = p ? p.createGraphics.bind(p) : window.createGraphics
    this.dist = p ? p.dist.bind(p) : window.dist
    this.pop = p ? p.pop.bind(p) : window.pop
    this.push = p ? p.push.bind(p) : window.push
    this.translate = p ? p.translate.bind(p) : window.translate
    this.rotate = p ? p.rotate.bind(p) : window.rotate
    this.scale = p ? p.scale.bind(p) : window.scale
    this.noStroke = p ? p.noStroke.bind(p) : window.noStroke

    this.canvas = this.createCanvas(this.width, this.width)
    if (typeof document !== "undefined") {
      this.canvas.parent('sketch-holder')
    }

    const { x, y } = this.getStart()
    this.x = x
    this.startingX = x
    this.y = y
    this.startingY = y
    this.previousAngle = Math.floor(this.random(0, 360))

    this.frameRate(this.fps);
    this.strokeWeight(this.strokeW);
    this.rectMode(this.rotationMode)
    this.imageMode(this.rotationMode);
    this.angleMode(this.DEGREES);
    this.strokeCap(this.ROUND);
  }

  drawCartesian() {

    this.background(this.bgColor);
    for (var i = 0; i < this.width; i += 100) {
      this.strokeWeight(1)
      this.line(i, 0, i, this.width)
      this.line(0, i, this.width, i)
    }

    this.rectMode(this.CORNER)
    this.strokeWeight(0)
    this.fill('rgba(255,255,0,0.5)')
    this.rect(0, 0, this.width, this.margin)
    this.rect(0, this.margin, this.margin, this.width)
    this.rect(this.width - this.margin, this.margin, this.margin, this.width)
    this.rect(this.margin, this.width - this.margin, this.width - this.margin - this.margin, this.margin)

    this.rectMode(this.rotationMode)
    this.strokeWeight(1)


    // line(margin, margin, this.width - margin, margin)
    // line(this.width - margin, margin, this.width - margin, this.width)
    // line(this.width - margin, this.width, margin, this.width)
    // line(margin, this.width, margin, margin)


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
    const resolution = this.width / 5
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
    this.logs == "verbose" && console.timeLog("viper", "draw")
    if (typeof preloaded === 'undefined') {
      preloaded = this.preloaded
    }
    this.totalLength++
    if (this.setting == "server") {
      this.addAllLines()
    } else if (this.totalLength % this.tweens == 1) {
      this.addLine()
    }
    this.logs == "verbose" && console.timeLog("viper", "addLine")
    this.drawBackground(preloaded)
    this.logs == "verbose" && console.timeLog("viper", "drawBackground")
    this.drawSegments(preloaded)
    this.logs == "verbose" && console.timeLog("viper", "drawSegments")
  }

  drawSegments(preloaded) {
    for (var i = 0; i < this.allLines.length; i++) {
      // this is to prevent trying to draw one last segment that starts from startingX and startingY
      if (this.setting == "browser" && i == 0 && this.allLines.length >= this.maxNumberOfLines + 1) {
        continue
      }
      // start new relative translation and rotation
      // var l = this.allLines[i]
      var c = this.allColors[i]
      const { x1, y1, x2, y2, len, ang } = this.getSegmentCoordinates(i)

      this.drawHole(i, preloaded)
      if (this.style == "debug") {
        this.drawDebug(x1, y1, x2, y2, len, ang, i)
      } else {
        switch (this.style) {
          case ("maskClipRandom"):
            const index = this.allLines.length - i - 1
            this.whichSegment = (index + this.bodyOffset) % preloaded.bodies.length
          case ("maskClipSame"):
            this.drawMaskClip(x1, y1, x2, y2, len, ang, c, preloaded)
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

      // draw the tail
      this.drawTail(x1, y1, x2, y2, i, preloaded)

      // draw the head
      this.drawHead(x1, y1, x2, y2, i, preloaded)

    }
  }

  drawHead(x1, y1, x2, y2, i, preloaded) {
    if (i == this.allLines.length - 1) {
      const l = this.allLines[i]
      // stroke("rgba(255,0,0,0.1)")
      this.noStroke()
      this.fill("rgba(255,0,0,0.5)")
      // var headOffset = {
      //   xFactor: 2,
      //   yFactor: 2.5
      // }
      // console.log({ rotationMode, headOffset, l, head })
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

    var tailLength = this.strokeW * 1.4
    var tailWidth = tailLength / 2
    var calcTailOffset = {
      x: tailLength / this.tailOffset.xFactor,
      y: tailWidth * this.tailOffset.yFactor
    }

    var a = i == 0 && (this.totalLength >= this.maxNumberOfLines) && this.setting == "server"
    var b = i == 1 && (this.totalLength > ((this.maxNumberOfLines + 1) * this.tweens)) && this.setting == "browser"
    if ((a) || (b)) {
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



  drawMaskClip(x1, y1, x2, y2, len, ang, c, preloaded) {
    const pic = preloaded.bodies[this.whichSegment]
    const flip = (x1 - x2) > (this.width / 80)
    var renderedID = this.whichSegment
    let imagePattern
    if (!this.renderedBodies[renderedID]) {
      var strokeMask = this.createGraphics(len + (this.strokeW * 2), this.strokeW);
      strokeMask.strokeWeight(this.strokeW)
      strokeMask.line(this.strokeW / 2, this.strokeW / 2, len + (this.strokeW * 1.5), this.strokeW / 2)

      imagePattern = this.createGraphics(len + (this.strokeW * 2), this.strokeW);
      imagePattern.background(c)
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

  drawDebug(x1, y1, x2, y2, len, ang, i) {
    const l = this.allLines[i]
    this.stroke("black")
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
    var a = (i == 0 && this.style !== "debug" && this.setting !== "browser")
    var b = (i == 0 && this.style !== "debug" && this.setting == "browser")
      ||
      (i == 1 && this.totalLength > ((this.maxNumberOfLines) * this.tweens) && this.style !== "debug" && this.setting == "browser")
    if (a || b) {
      var holeWidth = this.strokeW * 2
      this.image(preloaded.hole, this.startingX - (this.strokeW / 4), this.startingY - (this.strokeW / 2), holeWidth, holeWidth);
    }
  }

  getSegmentCoordinates(i) {
    const l = this.allLines[i]
    let x1, y1, x2, y2, len, ang
    if (this.setting == "browser") {
      let lastLine
      let offsetTilNextSegment = this.totalLength % this.tweens
      if (i == 0) {
        lastLine = {
          x1: this.startingX,
          y1: this.startingY,
          x2: this.startingX,
          y2: this.startingY
        }
      } else {
        lastLine = this.allLines[i - 1]
      }

      // console.log('lastLine')
      // console.log(`ll.x1: ${lastLine.x1}, ll.y1: ${lastLine.y1}, ll.x2: ${lastLine.x2}, ll.y2: ${lastLine.y2}`)

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
    const angResults = this.wander()
    const ang = angResults.angle

    const x2 = this.x + Math.cos(ang * Math.PI / 180) * this.maxLen
    const y2 = this.y + Math.sin(ang * Math.PI / 180) * this.maxLen
    const c = [this.random(0, 255), this.random(0, 255), this.random(0, 255)]

    const newLine = {
      x1: this.x,
      y1: this.y,
      x2: x2,
      y2: y2,
      ang: ang,
      len: this.maxLen,
      failed: angResults.failed,
      maskedImage: null
    }
    this.allLines.push(newLine)
    this.allColors.unshift(c)

    if (this.allLines.length > this.maxNumberOfLines + 1) {
      this.allLines.shift()
      this.allColors.shift()
    }

    this.previousAngle = ang
    this.x = x2
    this.y = y2
  }

  addAllLines() {
    for (let i = 0; i < this.maxNumberOfLines; i++) {
      this.addLine()
      this.totalLength++
    }
  }

  random(min = 0, max = 1) {
    return this.rng.nextInt(min, max)
  }

  getStart() {
    const min = this.margin
    const max = this.width - this.margin
    const x = this.random(min, max)
    const y = this.random(min, max)
    return { x, y }
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
      if (!outSideCanvas(newX, newY, this.width, this.margin)) {
        return { x: newX, y: newY, tries: i + 1, angle: newAngle, failed }
      }
      var randomColor = `rgb(${Math.ceil(this.random(0, 255))}, ${Math.ceil(this.random(0, 255))}, ${Math.ceil(this.random(0, 255))})`
      failed.push({ changeBy, newAngle, newX, newY, randomColor })
    }
    console.log({ previousX, previousY, previousAngle, maxDifferenceBetweenAngles, lineLength, width, margin })
    console.log({ failed })
    throw new Error(`Unable to find a new point from(${previousX}, ${previousY}, ${previousAngle})`)
  }

}

function outSideCanvas(x, y, width, margin) {
  // note, this doesn't account for the margin of the bottom
  if (x < margin || x > width - margin || y < margin || y > width) {
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

// if(typeof exports === 'undefined'){
//   var exports = this['sampleModule'] = {};
// }

