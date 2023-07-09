
import Prando from 'prando'
const { extractBiteId, reverseLookup } = require('../bin/utils')

// import them so webpack bundles them as base64 
// in the file and no external loads are necessary
import hole from '../public/holes/1.png'

import head1 from '../public/head/1.png'
import head2 from '../public/head/2.png'
import head3 from '../public/head/3.png'
import head4 from '../public/head/4.png'
import head5 from '../public/head/5.png'
import head6 from '../public/head/6.png'
import head7 from '../public/head/7.png'
import head8 from '../public/head/8.png'
import head9 from '../public/head/9.png'
import head10 from '../public/head/10.png'
import head11 from '../public/head/11.png'
import head12 from '../public/head/12.png'
import head13 from '../public/head/13.png'
import head14 from '../public/head/14.png'
import head15 from '../public/head/15.png'
import head16 from '../public/head/16.png'
import head17 from '../public/head/17.png'
import head18 from '../public/head/18.png'
import head19 from '../public/head/19.png'
import head20 from '../public/head/20.png'
import head21 from '../public/head/21.png'
import head22 from '../public/head/22.png'
import head23 from '../public/head/23.png'
import head24 from '../public/head/24.png'
import head25 from '../public/head/25.png'
import head26 from '../public/head/26.png'
// big heads
import head27 from '../public/big-head/1.png'
import head28 from '../public/big-head/2.png'
import head29 from '../public/big-head/3.png'
import head30 from '../public/big-head/4.png'
import head31 from '../public/big-head/5.png'

const heads = [head1, head2, head3, head4, head5, head6, head7, head8, head9, head10, head11, head12, head13, head14, head15, head16, head17, head18, head19, head20, head21, head22, head23, head24, head25, head26,
  head27, head28, head29, head30, head31]

import tail1 from '../public/tail/1.png'
import tail2 from '../public/tail/2.png'
import tail3 from '../public/tail/3.png'
import tail4 from '../public/tail/4.png'
import tail5 from '../public/tail/5.png'
import tail6 from '../public/tail/6.png'
import tail7 from '../public/tail/7.png'
import tail8 from '../public/tail/8.png'
import tail9 from '../public/tail/9.png'
import tail10 from '../public/tail/10.png'
import tail11 from '../public/tail/11.png'
import tail12 from '../public/tail/12.png'
import tail13 from '../public/tail/13.png'
import tail14 from '../public/tail/14.png'
import tail15 from '../public/tail/15.png'
import tail16 from '../public/tail/16.png'
import tail17 from '../public/tail/17.png'
import tail18 from '../public/tail/18.png'
import tail19 from '../public/tail/19.png'
import tail20 from '../public/tail/20.png'
import tail21 from '../public/tail/21.png'
import tail22 from '../public/tail/22.png'
import tail23 from '../public/tail/23.png'
import tail24 from '../public/tail/24.png'
import tail25 from '../public/tail/25.png'
import tail26 from '../public/tail/26.png'
// for big heads
import tail27 from '../public/tail/27.png'
import tail28 from '../public/tail/28.png'
import tail29 from '../public/tail/29.png'
import tail30 from '../public/tail/30.png'
import tail31 from '../public/tail/31.png'

const tails = [tail1, tail2, tail3, tail4, tail5, tail6, tail7, tail8, tail9, tail10, tail11, tail12, tail13, tail14, tail15, tail16, tail17, tail18, tail19, tail20, tail21, tail22, tail23, tail24, tail25, tail26,
  tail27, tail28, tail29, tail30, tail31]

import body1 from '../public/body/resized/1.png'
import body2 from '../public/body/resized/2.png'
import body3 from '../public/body/resized/3.png'
import body4 from '../public/body/resized/4.png'
import body5 from '../public/body/resized/5.png'
import body6 from '../public/body/resized/6.png'
import body7 from '../public/body/resized/7.png'
import body8 from '../public/body/resized/8.png'
import body9 from '../public/body/resized/9.png'
import body10 from '../public/body/resized/10.png'
import body11 from '../public/body/resized/11.png'
import body12 from '../public/body/resized/12.png'
import body13 from '../public/body/resized/13.png'
import body14 from '../public/body/resized/14.png'
import body15 from '../public/body/resized/15.png'
import body16 from '../public/body/resized/16.png'
import body17 from '../public/body/resized/17.png'
import body18 from '../public/body/resized/18.png'
import body19 from '../public/body/resized/19.png'
import body20 from '../public/body/resized/20.png'
import body21 from '../public/body/resized/21.png'
import body22 from '../public/body/resized/22.png'
import body23 from '../public/body/resized/23.png'
import body24 from '../public/body/resized/24.png'
import body25 from '../public/body/resized/25.png'
import body26 from '../public/body/resized/26.png'
const bodies = [body1, body2, body3, body4, body5, body6, body7, body8, body9, body10, body11, body12, body13, body14, body15, body16, body17, body18, body19, body20, body21, body22, body23, body24, body25, body26]

import skeletonhead1 from '../public/skeleton-head/1.png'
import skeletonhead2 from '../public/skeleton-head/2.png'
import skeletonhead3 from '../public/skeleton-head/3.png'
import skeletonhead4 from '../public/skeleton-head/4.png'
import skeletonhead5 from '../public/skeleton-head/5.png'
import skeletonhead6 from '../public/skeleton-head/6.png'
import skeletonhead7 from '../public/skeleton-head/7.png'
import skeletonhead8 from '../public/skeleton-head/8.png'
import skeletonhead9 from '../public/skeleton-head/9.png'
import skeletonhead10 from '../public/skeleton-head/10.png'
import skeletonhead11 from '../public/skeleton-head/11.png'
import skeletonhead12 from '../public/skeleton-head/12.png'
import skeletonhead13 from '../public/skeleton-head/13.png'
import skeletonhead14 from '../public/skeleton-head/14.png'
import skeletonhead15 from '../public/skeleton-head/15.png'
import skeletonhead16 from '../public/skeleton-head/16.png'
import skeletonhead17 from '../public/skeleton-head/17.png'
import skeletonhead18 from '../public/skeleton-head/18.png'
import skeletonhead19 from '../public/skeleton-head/19.png'
import skeletonhead20 from '../public/skeleton-head/20.png'
import skeletonhead21 from '../public/skeleton-head/21.png'
import skeletonhead22 from '../public/skeleton-head/22.png'
import skeletonhead23 from '../public/skeleton-head/23.png'
import skeletonhead24 from '../public/skeleton-head/24.png'
import skeletonhead25 from '../public/skeleton-head/25.png'
import skeletonhead26 from '../public/skeleton-head/26.png'
const skeletonheads = [skeletonhead1, skeletonhead2, skeletonhead3, skeletonhead4, skeletonhead5, skeletonhead6, skeletonhead7, skeletonhead8, skeletonhead9, skeletonhead10, skeletonhead11, skeletonhead12, skeletonhead13, skeletonhead14, skeletonhead15, skeletonhead16, skeletonhead17, skeletonhead18, skeletonhead19, skeletonhead20, skeletonhead21, skeletonhead22, skeletonhead23, skeletonhead24, skeletonhead25, skeletonhead26]

import skeletonbody from '../public/skeleton-body/1.png'
import skeletonbodyGlow from '../public/skeleton-body/2.png'

import skeletontail from '../public/skeleton-tail/1.png'
import skeletontailGlow from '../public/skeleton-tail/2.png'

import lovehead1 from '../public/love-head/1.png'
import lovehead2 from '../public/love-head/2.png'
import lovehead3 from '../public/love-head/3.png'
import lovehead4 from '../public/love-head/4.png'
import lovehead5 from '../public/love-head/5.png'
import lovehead6 from '../public/love-head/6.png'
import lovehead7 from '../public/love-head/7.png'
import lovehead8 from '../public/love-head/8.png'
import lovehead9 from '../public/love-head/9.png'
import lovehead10 from '../public/love-head/10.png'
import lovehead11 from '../public/love-head/11.png'
import lovehead12 from '../public/love-head/12.png'
import lovehead13 from '../public/love-head/13.png'
const loveheads = [lovehead1, lovehead2, lovehead3, lovehead4, lovehead5, lovehead6, lovehead7, lovehead8, lovehead9, lovehead10, lovehead11, lovehead12, lovehead13]

import lovebody from '../public/love-body/1.png'
import lovetail from '../public/love-tail/1.png'

// import comicSans from '../public/ComicSansMSBold.ttf'

// import bgImg1 from '../public/bg/1.jpeg'
// import bgImg2 from '../public/bg/2.jpeg'
// import bgImg3 from '../public/bg/3.jpeg'
// import bgImg4 from '../public/bg/4.jpeg'
// import bgImg5 from '../public/bg/5.jpeg'
// import bgImg6 from '../public/bg/6.jpeg'
// import bgImg7 from '../public/bg/7.jpeg'
// import bgImg8 from '../public/bg/8.jpeg'
// import bgImg9 from '../public/bg/9.jpeg'
// const bgImgs = [bgImg1, bgImg2, bgImg3, bgImg4, bgImg5, bgImg6, bgImg7, bgImg8, bgImg9]


let fs, path
export class Viper {
  constructor(overwriteOptions = {}) {
    const options = {
      seed: null,
      tokenId: null,
      setting: "server",
      logs: false, // false, true, "verbose"
      style: null,
      backgroundStyle: null/*
      // backgroundStyle options
      // 1. solid
      // 1. gradient-high
      // 1. gradient-low
      // 1. bw-gradient-high
      // 1. bw-gradient-low
      // 1. text
      */,
      pattern: null/*
      // pattern options
      // 1. random
      // 1. circle
      // 1. square
      // 1. eight 
      // 1. bigEight
      // 1. rotatingEight
      // 1. heart
      // 1. randomLoop */,
      changeOnTarget: false,
      div: null,
      bittenBy: null,
      width: 686,
      maxNumberOfLines: null,
      maxLen: null,
      strokeW: null,
      headWidth: null,
      tailLength: null,
      holeWidth: null,
      margin: null,
      angleDistanceMin: 60,
      fps: 35,
      tweens: 8,
      bgColor: "rgb(240,240,240)",
      hideHole: false,
      hideHead: false,
      hideTail: false,
      hideSnake: false,
      redrawBackground: true,
      wanderLoopDuration: 20,
      segmentsBeforeGifRevertsToLoop: 25,
      dither: false,
      ...overwriteOptions
    }
    let {
      segmentsBeforeGifRevertsToLoop, seed,
      changeOnTarget, div, tokenId, bittenBy, setting, logs, style, backgroundStyle, pattern, wanderLoopDuration,
      width, maxNumberOfLines, maxLen, strokeW, headWidth, tailLength, holeWidth, margin, angleDistanceMin,
      fps, tweens, bgColor, hideHole, hideHead, hideTail, redrawBackground, hideSnake, dither
    } = options

    this.logs = logs
    this.log('constructor')
    this.logs && console.time("viper")
    this.totalBodies = 26
    this.totalHeads = 26
    this.totalTails = this.totalHeads
    this.totalBgs = 8
    this.changeOnTarget = changeOnTarget
    this.div = div || 'sketch-holder'
    this.segmentsBeforeGifRevertsToLoop = segmentsBeforeGifRevertsToLoop

    seed = seed || "viper bite invites embrace"
    this.rng = new Prando(seed)
    this.allVipers = this.populate()


    this.setting = setting
    if (this.setting == "server") {
      // so that webpack doesn't try to pack up fs for the browser
      fs = eval('require')('fs')
      path = eval('require')('path')
    }

    // tokenId is 1-indexed
    this.tokenId = tokenId || Math.ceil(Math.random() * this.allVipers.length)
    if (this.tokenId > this.allVipers.length) {
      let { length, originalTokenId, senderAddress } = extractBiteId(this.tokenId);
      this.tokenId = originalTokenId.toNumber()
      bittenBy = ""
      this.bittenByAddress = senderAddress.toHexString()
      // get ens name of address bittenBy
      reverseLookup(this.bittenByAddress).then((bittenBy) => {
        if (bittenBy) {
          this.bittenBy = bittenBy
        } else {
          this.bittenBy = this.bittenByAddress
        }
      })
      maxNumberOfLines = length.toNumber()
    }
    this.bittenBy = bittenBy
    if (this.bittenBy !== null) {
      backgroundStyle = "text"
      tweens = 2
    }

    this.setTokenId(this.tokenId)

    this.style = style || this.me.style
    this.backgroundStyle = backgroundStyle || this.me.background
    this.pattern = pattern || this.me.pattern


    this.width = width
    this.maxNumberOfLines = maxNumberOfLines == null ? (this.tokenId % 100) + 2 : (maxNumberOfLines > 100 ? 100 : maxNumberOfLines) + 1
    this.wanderLoopDuration = wanderLoopDuration

    if (this.maxNumberOfLines > this.segmentsBeforeGifRevertsToLoop && this.setting == "server") {
      this.pattern = 'random'
    }
    this.maxLen = maxLen || this.width * 0.14577259 // 100
    this.strokeLen =
      this.strokeW = strokeW || this.width * 0.0728863 // 50
    this.holeWidth = holeWidth || this.width * 0.20116618 // 138
    this.headWidth = headWidth || this.width * 0.17492711 // 120
    this.tailLength = tailLength || this.width * 0.17492711 // 100
    this.margin = margin || this.width * 0.1//20116618 // 138
    this.angleDistanceMin = angleDistanceMin
    this.fps = fps
    this.tweens = tweens
    this.bgColor = bgColor
    this.hideHole = hideHole
    this.hideHead = hideHead
    this.hideTail = hideTail
    this.redrawBackground = redrawBackground
    this.hideSnake = hideSnake

    this.allLines = []
    this.totalLength = 0
    this.renderedBodies = {}


    this.setHeartPattern()

    this.logs == "verbose" && console.timeLog("viper", "end constructor")
  }

  log() {
    this.logs && console.log(...arguments)
  }

  tailOffset() {
    const totalUniqueBodies = 13
    let tailIndex = this.me.style !== "skeleton" ? (this.me.head % totalUniqueBodies) + 1 : 14
    if (this.me.style == "love") {
      tailIndex = 12
    }
    return tailOffsets.hasOwnProperty("_" + tailIndex) ? tailOffsets["_" + tailIndex] : defaultTailOffsets
  }

  headOffset() {
    const totalUniqueBodies = 13
    let headIndex
    if (this.me.head >= this.totalBodies) {
      // big head
      headIndex = this.me.head + 1
    } else if (this.me.style !== "skeleton") {
      headIndex = (this.me.head % totalUniqueBodies) + 1
    } else {
      headIndex = (this.me.head % totalUniqueBodies) + 14
    }

    // const headIndex = this.me.style !== "skeleton" ? (this.me.head % totalUniqueBodies) + 1 : (this.me.head % totalUniqueBodies) + 14

    return headOffsets.hasOwnProperty("_" + headIndex) ? headOffsets["_" + headIndex] : defaultHeadOffsets
  }

  setTokenId(tokenId, keepPattern = false) {
    this.tokenId = parseInt(tokenId)
    const tokenIdIndex = this.tokenId - 1
    this.me = this.allVipers[tokenIdIndex]

    this.setColors()

    this.style = this.me.style
    this.backgroundStyle = this.me.background
    this.pattern = keepPattern ? this.pattern : this.me.pattern
    this.whichSegment = this.me.style.indexOf("Matches") > -1 ? this.me.head : 0
    this.bodyOffset = this.me.style.indexOf("random") > -1 ? this.me.bodyOffset : 0
    this.headRandom = this.me.head + 1
    this.tailRandom = this.headRandom

    this.savedBG = null

    this.log(`Viper population: ${this.allVipers.length} vipers`)
    this.log(`Hello viper #${this.tokenId}!`, this.me)
  }

  iterateTokenId() {
    const tokenId = this.tokenId + 1
    if (this.maxNumberOfLines === 16) {
      this.tweens = 3
    } else if (this.maxNumberOfLines === 56) {
      this.pattern = 'circle'
      if (!this.iterateInterval) {
        this.iterateInterval = setInterval(() => {
          this.iterateTokenId()
        }, 200)
      } else {
        this.circleChanges = this.circleChanges || 0
        this.circleChanges++
      }
      if (this.circleChanges > 19) {
        this.maxNumberOfLines++
        this.wanderLoopDuration = 160
        this.pattern = 'randomLoop'
        this.tweens = 5
        setTimeout(() => {
          clearInterval(this.iterateInterval)
          this.iterateInterval = setInterval(() => {
            this.iterateTokenId()
          }, 1000)
        }, 1000)
      }
    }

    if (this.justReset) {
      this.setTokenId(1)
      this.tweens = 99
      return
    }


    let length = this.maxNumberOfLines - 1
    this.setTokenId(tokenId, true)
    if (this.pattern == "star") {
      length = this.maxNumberOfLines + 2
      this.maxNumberOfLines = length
      this.allLines = this.allLines.slice(0, length + 1)
      this.addLine()
      this.totalLines += this.tweens
    }
  }

  setColors() {
    this.localRNG = new Prando(this.me.tokenId)
    this.allColors = []
    for (let i = 0; i < 100 + 1; i++) {
      const c = [this.random(0, 255, this.localRNG), this.random(0, 255, this.localRNG), this.random(0, 255, this.localRNG)]
      this.allColors.push(c)
    }
  }

  endLog() {
    this.logs && console.timeEnd("viper")
  }


  tail() {
    let tailIndex = this.tailRandom - 1
    let tails
    if (this.me.style == "skeleton") {
      tailIndex = this.me.skeletonColor
      tails = this.preloaded.skeleton.tails
    } else if (this.me.style == "love") {
      tailIndex = 0
      tails = [this.preloaded.love.tail]
    } else {
      tails = this.preloaded.tails
    }
    if (tails.length < tailIndex + 1) throw new Error(`tail at index ${tailIndex} not found, maybe not yet loaded`)
    return tails[tailIndex]
  }

  head() {
    let headIndex = this.me.head
    let heads
    if (this.me.style == "skeleton") {
      const total = this.totalBodies / 2
      const mod = headIndex % total
      headIndex = this.me.skeletonColor == 0 ? mod : mod + total
      heads = this.preloaded.skeleton.heads
    } else if (this.me.style == "love") {
      heads = this.preloaded.love.heads
    } else {
      heads = this.preloaded.heads
    }
    if (heads.length < this.headRandom) throw new Error(`head at index ${headIndex} not found, maybe not yet loaded`)
    return heads[headIndex]
  }

  // bgImg() {
  //   const bgIndex = this.me.bgImage - 1
  //   const bgImgs = this.preloaded.bgImgs
  //   if (bgImgs.length < this.me.bgImage) throw new Error(`bgImg at index ${bgIndex} not found, maybe not yet loaded`)
  //   return bgImgs[bgIndex]
  // }

  async die() {
    this.remove()
  }

  async preload() {
    try {
      this.logs == "verbose" && console.timeLog("viper", "preload")
      this.log('preload')

      this.preloaded = {
        hole, //bgImgs: [],
        love: {
          body: null, heads: [], tail: null
        },
        bodies: [], heads: [], tails: [], skeleton: {
          bodies: [], heads: [], tails: []
        }
      }
      this.preloaded.hole = await this.loadImage(hole)

      // for (let i = 1; i <= bgImgs.length; i++) {
      //   const loadedImage = await this.loadImage(bgImgs[i - 1])
      //   this.preloaded.bgImgs.push(loadedImage)
      // }

      for (let i = 1; i <= bodies.length; i++) {
        const body = bodies[i - 1]
        const loadedImage = await this.loadImage(body)
        this.preloaded.bodies.push(loadedImage)
      }

      for (let i = 1; i <= heads.length; i++) {
        const head = heads[i - 1]
        const loadedImage = await this.loadImage(head)
        this.preloaded.heads.push(loadedImage)
      }

      for (let i = 1; i <= tails.length; i++) {
        const tail = tails[i - 1]
        const loadedImage = await this.loadImage(tail)
        this.preloaded.tails.push(loadedImage)
      }


      for (let i = 1; i <= skeletonheads.length; i++) {
        const head = skeletonheads[i - 1]
        const loadedImage = await this.loadImage(head)
        this.preloaded.skeleton.heads.push(loadedImage)
      }

      this.preloaded.skeleton.tails.push(await this.loadImage(skeletontail))
      this.preloaded.skeleton.tails.push(await this.loadImage(skeletontailGlow))

      this.preloaded.skeleton.bodies.push(await this.loadImage(skeletonbody))
      this.preloaded.skeleton.bodies.push(await this.loadImage(skeletonbodyGlow))

      this.preloaded.love.body = await this.loadImage(lovebody)
      this.preloaded.love.tail = await this.loadImage(lovetail)
      for (let i = 0; i < loveheads.length; i++) {
        const head = loveheads[i]
        const loadedImage = await this.loadImage(head)
        this.preloaded.love.heads.push(loadedImage)
      }

      // this.preloaded.font = await this.loadFont(comicSans)

    } catch (preloadError) {
      console.error({ preloadError })
    }
    this.drawBackground()
  }

  async setup(p) {
    this.logs == "verbose" && console.timeLog("viper", "setup")
    this.textAlign = p ? p.textAlign.bind(p) : window.textAlign
    this.loadImage = p ? p.loadImage.bind(p) : window.loadImage
    this.remove = p ? p.remove.bind(p) : window.remove
    this.point = p ? p.point.bind(p) : window.point
    this.line = p ? p.line.bind(p) : window.line
    this.fill = p ? p.fill.bind(p) : window.fill
    this.loadFont = p ? p.loadFont.bind(p) : window.loadFont
    this.textFont = p ? p.textFont.bind(p) : window.textFont
    this.textSize = p ? p.textSize.bind(p) : window.textSize
    this.text = p ? p.text.bind(p) : window.text
    this.arc = p ? p.arc.bind(p) : window.arc
    this.rect = p ? p.rect.bind(p) : window.rect
    this.stroke = p ? p.stroke.bind(p) : window.stroke
    this.frameRate = p ? p.frameRate.bind(p) : window.frameRate
    this.noFill = p ? p.noFill.bind(p) : window.noFill
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
      this.canvas.parent(this.div)
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
  }

  drawCartesian() {

    this.background(this.bgColor);
    const center = this.width / 2

    this.strokeWeight(32)
    this.textSize(32)

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
      var cardinalX = (this.width / 2) + Math.cos(((i * 30)) * Math.PI / 180) * 355
      var cardinalY = (this.width / 2) + Math.sin(((i * 30)) * Math.PI / 180) * 355
      this.strokeWeight(0)
      this.fill("green")
      this.text(i * 30, cardinalX, cardinalY)
      this.strokeWeight(1)
      this.line(this.width / 2, this.width / 2, cardinalX, cardinalY)

    }

    this.stroke("red")
    this.fill("red")
    for (var i = 0; i < 8; i++) {
      var cardinalX = (this.width / 2) + Math.cos(((i * 45)) * Math.PI / 180) * 280
      var cardinalY = (this.width / 2) + Math.sin(((i * 45)) * Math.PI / 180) * 280
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


  drawBackground(overlayText = false) {
    if (this.style == "debug" && this.backgroundStyle !== "text") {
      this.drawCartesian()

    } else {
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
          this.backgroundText(overlayText)
          break;
        // case "image":
        //   this.image(
        //     this.bgImg(),
        //     this.width / 2,
        //     this.width / 2,
        //     this.width,
        //     this.width
        //   )
        //   break;
        case "gradient":
          throw new Error("Simple gradient not transferred from old code")
          break;
        default:
          throw new Error('Unknown backgroundStyle: ' + this.backgroundStyle);
      }
    }

  }

  backgroundText(overlayText = false) {
    this.redrawBackground = false
    if (!overlayText) {
      this.backgroundStyle = this.me.background
      this.drawBackground()
      this.backgroundStyle = "text"
    }

    this.fill("white")
    this.textFont(this.preloaded.font || "Comic Sans MS")
    this.stroke("black")
    this.strokeWeight(32)
    this.textSize(64)
    const address = this.bittenBy || ""
    const text = ("Viper  Bite   by            ").toUpperCase() + address
    const textArray = text.split("")

    const rows = 7
    const cols = 7
    const chunk = this.width / rows
    this.textAlign(this.CENTER)
    const offset = 0
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!textArray[i * rows + j]) continue
        this.text(textArray[i * rows + j], (j + 1) * chunk - (chunk / 2) + offset, (i + 1) * chunk - (chunk / 3) + offset + 5)
      }
    }
  }

  setupBgColors(item) {
    const style = item.background
    let bgColors
    const a = this.random(0, 255)
    const b = this.random(0, 255)
    const c = this.random(0, 255)
    const d = this.random(0, 255)
    if (item.style == "love") {
      const a = this.random(200, 255)
      const b = this.random(200, 255)
      const c = this.random(200, 255)
      const d = this.random(200, 255)
      const whiteCorner = this.random(0, 3)
      const whiteCornerB = this.random(0, 3)
      const white = [255, 150, 150]
      bgColors = [
        whiteCorner == 0 ? white : whiteCornerB == 0 ? white : [a, 0, 0],
        whiteCorner == 1 ? white : whiteCornerB == 1 ? white : [b, 0, 0],
        whiteCorner == 2 ? white : whiteCornerB == 2 ? white : [c, 0, 0],
        whiteCorner == 3 ? white : whiteCornerB == 3 ? white : [d, 0, 0],
      ]
    } else {
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
    }

    if (item.style == "skeleton") {
      // bgColors = [[a, a, a], [b, b, b], [c, c, c], [d, d, d]]
      const getSkeletonColor = () => {
        const a = this.random(0, 100)
        const b = this.random(0, 100)
        const c = this.random(0, 100)
        return [a, b, c]
      }
      bgColors = [
        getSkeletonColor(),
        getSkeletonColor(),
        getSkeletonColor(),
        getSkeletonColor(),
      ]
    }
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

        // if (this.dither) {
        //   // options with defaults (not required)
        //   var opts = {
        //     colors: 128,             // desired palette size
        //     // method: 2,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
        //     // boxSize: [64, 64],        // subregion dims (if method = 2)
        //     // boxPxls: 2,              // min-population threshold (if method = 2)
        //     // initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
        //     // minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
        //     // dithKern: null,          // dithering kernel name, see available kernels in docs below
        //     // dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
        //     // dithSerp: false,         // enable serpentine pattern dithering
        //     // palette: [],             // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
        //     // reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
        //     // useCache: true,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
        //     // cacheFreq: 10,           // min color occurance count needed to qualify for caching
        //     // colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
        //   };

        //   const q = new RgbQuant(opts);
        //   q.sample(bgCanvas.canvas);
        //   // const pal = q.palette(true);
        //   const idxi8 = q.reduce(bgCanvas.canvas, 1, 'Burkes', true);
        //   const ctx = bgCanvas.canvas.getContext("2d")
        //   var imgd = ctx.createImageData(bgCanvas.canvas.width, bgCanvas.canvas.width);
        //   var data = imgd.data;
        //   for (var i = 0, len = data.length; i < len; ++i)
        //     data[i] = idxi8[i];
        //   ctx.putImageData(imgd, 0, 0);
        // }
        this.savedBG = bgCanvas
      }

      this.image(this.savedBG, this.width / 2, this.width / 2, this.width, this.width)
    } catch (e) {
      console.error(e)
      this.savedBG = this.createGraphics(this.width, this.width)
    }
  }

  draw() {
    this.logs == "verbose" && console.timeLog("viper", "draw")
    this.totalLength++
    if (this.tweens == 0 || this.totalLength % this.tweens == 1) {
      this.addLine()
    }
    this.logs == "verbose" && console.timeLog("viper", "addLine")

    this.redrawBackground && this.drawBackground()
    this.logs == "verbose" && console.timeLog("viper", "drawBackground")
    this.drawSegments()
    this.logs == "verbose" && console.timeLog("viper", "drawSegments")

    if (this.backgroundStyle == "text") {
      this.drawBackground(true)
    }
  }

  drawSegments() {
    let skippedDraw = 0
    for (var i = 0; i < this.allLines.length; i++) {
      var c = this.allColors[this.allLines.length - i - 1]
      if (this.me.style == "randomSegment" || this.me.style == "randomColor") {
        this.whichSegment = (i + this.bodyOffset) % (this.me.style == "randomSegment" ? this.totalBodies : this.allColors.length)
      }
      var { x1, y1, x2, y2, len, ang, originalLine } = this.getSegmentCoordinates(i)

      this.drawHole(i)

      const onTopOfEachOther = (Math.abs(x1 - x2) < this.maxLen / 10 && Math.abs(y1 - y2) < this.maxLen / 10)
      if (onTopOfEachOther && this.reachedHome) {
        skippedDraw++
        continue
      }

      if (!this.hideSnake) {
        if (i == 0 && this.allLines.length >= this.maxNumberOfLines && this.totalLength > this.maxNumberOfLines * this.tweens) {
          // tail segment
          var { x1, y1, x2, y2, len, ang, originalLine } = this.getSegmentCoordinates(0)
          this.drawImageSegment(x1, y1, x2, y2, len, ang, c, 0)
          continue
        } else if (i == 0) continue
        if (this.style == "debug") {
          this.drawDebug(x1, y1, x2, y2, len, ang, i, c, originalLine)
        } else {
          switch (this.style) {
            case ("randomImage"):
              const index = this.allLines.length - i
              this.whichSegment = (index + this.bodyOffset) % this.preloaded.bodies.length
              this.drawImageSegment(x1, y1, x2, y2, len, ang, c, i)
              break;
            case ("mismatched"):
              this.whichSegment = this.me.body
              this.drawImageSegment(x1, y1, x2, y2, len, ang, c, i)
              break;
            case ("love"):
            case ("everythingMatches"):
            case ("skeleton"):
              this.drawImageSegment(x1, y1, x2, y2, len, ang, c, i)
              break;
            case ("randomColor"):
              this.drawRandomColor(x1, y1, x2, y2, c)
              break;
            default:
              throw new Error('Unknown style: ' + this.style);
          }
        }
      }
    }

    var { x1, y1, x2, y2, len, ang } = this.getSegmentCoordinates(this.allLines.length - 1)
    // head segment
    this.drawHead(x1, y1, x2, y2, this.allLines.length - 1)

    if (skippedDraw == this.allLines.length && !this.justReset) {
      this.justReset = true
      setTimeout(() => this.reset(), 3000)
    }
  }

  drawHead(x1, y1, x2, y2, i) {
    if (this.hideHead) return
    if (i == this.allLines.length - 1) {
      const l = this.allLines[i]
      this.noStroke()
      this.fill("rgba(255,0,0,0.5)")

      const headOffset = this.headOffset()
      const xFactor = this.me.style == "randomColor" && headOffset.jellyX || headOffset.xFactor
      const yFactor = this.me.style == "randomColor" && headOffset.jellyY || headOffset.yFactor

      let headWidth = this.headWidth
      if (this.me.head > (this.totalBodies - 1)) {
        headWidth = this.headWidth * 2
      }

      var calcHeadOffset = {
        x: headWidth / xFactor,
        y: headWidth / yFactor
      }

      const head = this.head()

      if ((l.x1 - l.x2) > (this.width / 80)) {
        this.push()
        this.scale(-1, 1)
        this.image(head, (-x2) + calcHeadOffset.x, y2 - calcHeadOffset.y, headWidth, headWidth);
        this.pop()
      } else {
        this.image(head, x2 + calcHeadOffset.x, y2 - calcHeadOffset.y, headWidth, headWidth);
      }
    }
  }

  drawImageSegment(x1, y1, x2, y2, len, ang, c, i, mask = false) {

    let pic
    if (this.me.style == "skeleton") {
      pic = this.preloaded.skeleton.bodies[this.me.skeletonColor]
    } else if (this.me.style == "love") {
      pic = this.preloaded.love.body
    } else {
      pic = this.preloaded.bodies[this.whichSegment]
    }
    // drawTail()
    if (i == 0 && !this.hideTail) {
      pic = this.tail()
    } else if (this.hideTail) {
      return
    }
    if (!pic) {
      console.error({ bodies: this.preloaded.bodies })
      throw new Error(`No image for segment ${this.whichSegment}`)
    }
    const flip = x1 - x2 > 10

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
    this.scale(flip ? 1 : 1, flip ? -1 : 1)

    var startingX = 0, startingY = 0

    // offset drawTail
    if (i == 0) {
      var tailLength = this.tailLength
      var tailWidth = tailLength / 2

      const tailOffset = this.tailOffset()
      const xFactor = this.me.style == "randomColor" && tailOffset.jellyX || tailOffset.xFactor
      const yFactor = this.me.style == "randomColor" && tailOffset.jellyY || tailOffset.yFactor

      var calcTailOffset = {
        x: tailLength * xFactor,
        y: tailWidth * yFactor
      }
      startingX = 0 - calcTailOffset.x
      startingY = 0 - calcTailOffset.y
    }

    try {
      this.image(pic, startingX, startingY, len + this.strokeW / 2, this.strokeW);
    } catch (e) {
      console.error(this.preloads.bodies)
      console.error(`failed to load image ${this.whichSegment} `, { e })
    }
    this.pop()
    this.pop()
  }

  drawRandomColor(x1, y1, x2, y2, c) {
    this.stroke("rgba(0,0,0,1)")
    var segmentWeight = this.strokeW / 1.14
    var segmentOffset = segmentWeight / 3
    this.strokeWeight(segmentWeight + 2)
    this.line(x1, y1, x2, y2)

    // c = `rgba(${c.join(",")},0.1)`

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

  drawDebug(x1, y1, x2, y2, len, ang, i, c, originalLine) {
    const l = this.allLines[i]
    this.stroke("blue")
    var debugLineWeight = this.width / 100
    this.strokeWeight(debugLineWeight)
    this.line(x1, y1, x2, y2)
    this.stroke('rgb(0,255,0)')
    this.point(x1, y1)
    this.point(x2, y2)
    this.stroke('blue')
    this.strokeWeight(0)
    this.fill("blue")
    this.text(`${Math.floor(x1)}, ${Math.floor(y1)} `, x1 + 5, y1 - 5)

    this.strokeWeight(0)
    this.fill("rgba(0,0,0,0.5)")
    this.arc(originalLine.x2, originalLine.y2, this.maxLen, this.maxLen, originalLine.ang - this.angleDistanceMin, originalLine.ang + this.angleDistanceMin);

    for (var j = 0; j < l.failed.length; j++) {
      const previewX = l.failed[j].newX
      const previewY = l.failed[j].newY
      this.stroke(l.failed[j].randomColor)
      this.strokeWeight(debugLineWeight / 1.5)
      this.line(originalLine.x1, originalLine.y1, previewX, previewY)
      this.strokeWeight(0)
      this.fill("blue")
      const halfX = x1 > previewX ? x1 - ((x1 - previewX) / 2) : previewX - ((previewX - x1) / 2)
      const halfY = y1 > previewY ? y1 - ((y1 - previewY) / 2) : previewY - ((previewY - y1) / 2)
      this.text(j + 1, halfX + 5, halfY);
      this.strokeWeight(debugLineWeight)
      this.stroke("red")
      this.point(previewX, previewY)
    }


  }

  drawHole(i) {
    if (this.hideHole) return
    if (i == 0) {
      this.image(this.preloaded.hole, this.startingX - (this.strokeW / 4), this.startingY - (this.strokeW / 5), this.holeWidth, this.holeWidth);
    }
    if (!this.redrawBackground) {
      this.hideHole = true
    }
  }

  getSegmentCoordinates(i) {
    let l = this.allLines[i]
    const originalLine = l
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

    return { x1, y1, x2, y2, len, ang, originalLine }
  }

  seconds() {
    let seconds = 3
    switch (this.pattern) {
      case 'bigEight':
        seconds = 5.11428571 // ok
        break
      case 'eight':
        seconds = 3.52857143 // ok
        break
      case 'circle':
        seconds = 0.4875 * this.tweens // = 3.9 @ 8 tweens // ok
        break
      case 'square':
        seconds = 5.48571428 // ok
        break
      case 'heart':
        seconds = 4.5 // ok
        break
      case 'randomLoop': // ok
        seconds = 2 + (((this.wanderLoopDuration * this.tweens) / this.fps))
        seconds += (this.maxNumberOfLines * this.tweens) / this.fps
        // NOTE: len = 1 => 
        // 7.02857143 seconds
        // len = 20 => 
        // 10.28571429 seconds
        break
      case 'star': // ok
        seconds = 6.85714285
        break
      case 'random':
        seconds = 6
        break
      default:
        throw new Error(
          `seconds() not implemented for pattern ${this.pattern}`
        )
    }
    return seconds
  }

  addLine() {
    // get the next segment
    let angResults
    switch (this.pattern) {
      case "circle":
        angResults = this.wanderInCircle()
        break
      case "star":
        angResults = this.wanderInShape(this.wanderInStar())
        break
      case "square":
        angResults = this.wanderInShape(this.wanderInSquare())
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
      let lenWithoutTips = this.maxLen - this.strokeW / 2
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
    }
  }

  addAllLines(numOfLines = 50) {
    for (let i = 0; i < numOfLines * 2; i++) {
      this.addLine()
      this.totalLength += this.tweens
    }
  }

  reset() {
    this.allLines = []
    this.totalLength = 0
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
    var angleDelta = this.random(-this.angleDistanceMin / 2, this.angleDistanceMin / 2, this.localRNG)
    const angle = Math.atan2(y - this.y, x - this.x) * 180 / Math.PI + angleDelta
    return { angle: angle, failed: [], x, y, tries: 1 }
  }

  wanderInShape(shape = []) {
    if (shape.length === 0) {
      throw new Error(`shape array is empty`)
    }
    let previousX, previousY
    try {
      previousX = this.x
      previousY = this.y
    } catch (e) {
      console.error(`this.x or this.y doesn't exist`)
      throw new Error(e)
    }
    this.lastTargetIndex = this.lastTargetIndex || 0
    if (this.lastTargetIndex >= shape.length) {
      this.lastTargetIndex = 0
    }

    let target = shape[this.lastTargetIndex]

    const previousTarget = shape[(this.lastTargetIndex - 1 + shape.length) % shape.length]
    const midWay = { x: (previousTarget.x + target.x) / 2, y: (previousTarget.y + target.y) / 2 }
    const distToMidWay = this.dist(previousX, previousY, midWay.x, midWay.y)
    const untilChangeFast = 30
    if (this.allLines.length > untilChangeFast && distToMidWay < this.maxLen / 2 && this.changeOnTarget && !this.hitMid) {
      this.hitMid = true
      this.iterateTokenId()
    }

    const distToTarget = this.dist(previousX, previousY, target.x, target.y)
    if (distToTarget < this.maxLen / 2) {
      this.lastTargetIndex = (this.lastTargetIndex + 1) % shape.length
      if (this.changeOnTarget) {
        this.iterateTokenId()
        this.hitMid = false
      }
    }
    target = shape[this.lastTargetIndex]
    const angle = Math.atan2(target.y - previousY, target.x - previousX) * 180 / Math.PI;
    return { x: target.x, y: target.y, tries: 0, failed: false, angle }
  }

  wanderInStar() {
    const radius2 = this.width / 3
    const origin = this.width / 2

    const npoints = 5
    let fivePoints = []
    const rotateBy = 271
    for (let a = 0; a < this.TWO_PI; a += this.TWO_PI / npoints) {
      this.angleMode(this.RADIANS);
      let sx = origin + Math.cos(a) * radius2;
      let sy = origin + Math.sin(a) * radius2;
      this.angleMode(this.DEGREES);
      const results = rotateXY(origin, origin, sx, sy, rotateBy)
      fivePoints.push({ x: results[0], y: results[1] })
    }
    // fivePoints = [a, b, c, d, e]
    // needsToBe = [a, c, e, b, d]
    fivePoints = [fivePoints[0], fivePoints[2], fivePoints[4], fivePoints[1], fivePoints[3]]
    return fivePoints
  }

  wanderInHeart() {

    const index = Math.floor(this.totalLength / this.tweens) % this.heartPattern.length
    const coord = this.heartPattern[index]
    const x = coord.x * this.width / 686
    const y = coord.y * this.width / 686
    const previousX = this.x
    const previousY = this.y
    const angle = Math.atan2(y - previousY, x - previousX) * 180 / Math.PI;
    return { x, y, tries: 0, failed: false, angle }
  }

  wanderInRotatingEight() {
    const previousX = this.x
    const previousY = this.y
    let { x, y, tries, failed, angle } = this.wanderInEight()
    const rotateBy = this.totalLength / 3
    const results = rotateXY(this.width / 2, this.width / 2, x, y, rotateBy)
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
    const step = (this.totalLength + stepOffset) / (((this.maxLen + this.strokeW / 2) / 35) * this.tweens)
    let x = Math.sin(step) * size
    let y = Math.cos(step) * Math.sin(step) * size
    const rotateBy = 55
    this.angleMode(this.DEGREES);
    const results = rotateXY(0, 0, x, y, rotateBy)

    const xOrigin = this.width / 1.9
    const yOrigin = this.width / 1.7
    x = results[0] + xOrigin
    y = results[1] + yOrigin

    const angle = Math.atan2(y - previousY, x - previousX) * 180 / Math.PI;
    return {
      x, y, tries: 0, failed: false, angle: angle
    }
  }

  wanderInEight() {
    const previousX = this.x
    const previousY = this.y

    this.angleMode(this.RADIANS);
    // const si = sin(frameCount / 50) * 80;
    // const co = cos(frameCount / 50);
    const size = this.width / 3.5
    const origin = this.width / 2
    const step = this.totalLength / (((this.maxLen - this.strokeW / 2) / 30) * this.tweens)
    const x = Math.sin(step) * size + origin
    const y = Math.cos(step) * Math.sin(step) * size + origin
    const angle = Math.atan2(y - previousY, x - previousX) * 180 / Math.PI;
    this.angleMode(this.DEGREES);
    return { x, y, tries: 0, failed: false, angle }
  }

  wanderInSquare() {
    const margin = this.headWidth
    const square = [
      { x: margin, y: margin },
      { x: this.width - margin, y: margin },
      { x: this.width - margin, y: this.width - margin },
      { x: margin, y: this.width - margin },
    ]
    return square
  }

  wanderInCircle() {
    const previousX = this.x
    const previousY = this.y

    this.angleMode(this.RADIANS);
    let chunkDivider
    chunkDivider = (this.maxLen + this.strokeW / 2) / 6

    const chunks = 360 / chunkDivider


    const angleJump = ((Math.PI * 2) / chunks) * ((this.totalLength / this.tweens) % chunks)
    const r = this.width / 2 - this.margin
    var x = this.width / 2 + r * Math.cos(angleJump);
    var y = this.width / 2 + r * Math.sin(angleJump);
    const angle = Math.atan2(y - previousY, x - previousX) * 180 / Math.PI;
    this.angleMode(this.DEGREES);
    return { x, y, tries: 0, failed: false, angle }
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
    const lineLength = this.maxLen // - this.strokeW
    const width = this.width
    const margin = this.margin
    const maxDifferenceBetweenAngles = this.angleDistanceMin

    // maxDifferenceBetweenAngles cannot be greater than 180
    if (maxDifferenceBetweenAngles > 180) throw new Error('maxDifferenceBetweenAngles cannot be greater than 180')

    // get a random amount to change the angle by
    var angleDelta = this.random(0, maxDifferenceBetweenAngles, this.localRNG || this.rng)
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

  random(min = 0, max = 1, rng = this.rng) {
    this.timesCalledRandom = typeof this.timesCalledRandom == 'undefined' ? 1 : this.timesCalledRandom + 1
    var foo = rng.nextInt(min, max)
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
        x = this.headWidth
        y = x
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
        x = min
        y = min
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
    for (let a = 0.5; a < 2 * Math.PI; a += 0.005) {
      const r = this.width / 46;
      const x = r * 16 * Math.pow(Math.sin(a), 3);
      const y = -r * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a));
      const distance = this.distance(lastX, lastY, x, y)
      const segment = this.maxLen - (this.strokeW / 2)
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

    const numHeads = this.totalBodies//14
    const headColorVariations = 1//4
    const numSkeltonHeads = numHeads
    const numTails = numHeads
    const tailColorVariation = headColorVariations
    const numBodySegments = numHeads
    const bodySegmentColorVariation = 5
    const numSkeletonSegments = 4
    const skeletonColorVariations = 1

    // const gifPatterns = 7
    const background_options = backgroundsIndex.length

    const randomColorFactor = 1 // randomColor segments will always be random, so we can decide how many
    const randomImageFactor = 1
    const debugFactor = 1 // debug segments will always be random

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
    let half = numHeads / 2
    let style
    for (let head = 0; head < numHeads; head++) {
      for (let headColor = 0; headColor < headColorVariations; headColor++) {
        for (let backgroundIndex = 0; backgroundIndex < background_options; backgroundIndex++) {
          const background = backgroundsIndex[backgroundIndex]
          style = "everythingMatches"
          arrayOfAll.push({ style, head, headColor, background })

          // style = "everythingMatchesRounded"
          // arrayOfAll.push({ style, head, headColor, background })
        }

        style = "mismatched"
        for (let body = 0; body < numHeads; body++) {
          for (let backgroundIndex = 0; backgroundIndex < background_options; backgroundIndex++) {
            if ((head < half && body > half) || head > half && body < half) continue
            if (head == body) continue
            const background = backgroundsIndex[backgroundIndex]
            arrayOfAll.push({ style, head, headColor, background, body })
          }
        }

        style = "randomColor"
        for (let randomColor = 0; randomColor < randomColorFactor; randomColor++) {
          for (let backgroundIndex = 0; backgroundIndex < background_options; backgroundIndex++) {
            const background = backgroundsIndex[backgroundIndex]
            const bodyOffset = this.random(0, bodyVariations - 1)
            arrayOfAll.push({ style, head, headColor, background, bodyOffset })
          }
        }

        style = "debug"
        for (let debug = 0; debug < debugFactor; debug++) {
          arrayOfAll.push({ style, head, headColor })
        }

        for (let randomImage = 0; randomImage < randomImageFactor; randomImage++) {
          for (let backgroundIndex = 0; backgroundIndex < background_options; backgroundIndex++) {
            const background = backgroundsIndex[backgroundIndex]
            style = "randomImage"
            const bodyOffset = this.random(0, bodyVariations - 1)
            arrayOfAll.push({ style, head, headColor, background, bodyOffset })

            // style = "randomImageRounded"
            // arrayOfAll.push({ style, head, headColor, background })
          }
        }
      }
      style = "skeleton"
      let skeletonColor = 0
      // for (let skeletonColor = 0; skeletonColor < skeletonColorVariations; skeletonColor++) {
      for (let backgroundIndex = 0; backgroundIndex < background_options; backgroundIndex++) {
        const background = backgroundsIndex[backgroundIndex]
        if (head >= half) {
          skeletonColor = 1
        } else {
          skeletonColor = 0
        }
        arrayOfAll.push({ style, head, skeletonColor, background })
      }
      // }
    }

    arrayOfAll = this.shuffle(arrayOfAll)



    for (let i = 0; i < 5; i++) {
      arrayOfAll.push({
        style: 'randomColor',
        head: 26 + i,
        background: backgroundsIndex[0],
      })
    }

    for (let i = 0; i < 13; i++) {
      arrayOfAll.push({
        style: 'love',
        head: i,
        background: backgroundsIndex[0],
      })
    }

    arrayOfAll.map((item, index) => {
      item.tokenId = index + 1
      if (item.style == "debug") {
        item.pattern = "randomLoop"
      } else if (item.head >= numHeads) {
        item.pattern = "heart" // big heads have heart pattern
      } else if (item.style == "love") {
        item.pattern = "heart"
      } else {
        item.pattern = gifPatterns[this.random(0, gifPatterns.length - 1)]
      }

      if (item.style == "debug") return
      if (item.background.indexOf('gradient') > -1) {
        item.bgColors = this.setupBgColors(item)
      }
    })

    // need to mix in the last 18 to the rest of the group but keep track so the pre-generated gifs can be rearranged correctly
    for (let i = 18; i > 0; i--) {
      const pos = 486 - i
      const item = arrayOfAll[pos]
      const newPos = this.random(0, 485)
      const removed = arrayOfAll.splice(newPos, 1, item)
      arrayOfAll.splice(pos, 1, removed[0])

      const oldID = arrayOfAll[pos].tokenId
      const newId = arrayOfAll[newPos].tokenId
      arrayOfAll[pos].tokenId = newId
      arrayOfAll[newPos].tokenId = oldID
      // const newPosName = (newPos + 1).toString().padStart(4, '0')
      // const posName = (pos + 1).toString().padStart(4, '0')
    }

    // make a copy of names
    const namesCopy = [...names]
    const shuffledNames = this.shuffle(namesCopy)
    arrayOfAll.map((item, index) => {
      let prefix = ""
      switch (item.style) {
        case "skeleton":
          prefix = "Dead "
          break
        case "love":
          prefix = "Pretty "
          break
      }
      if (item.head >= numHeads) {
        prefix = "Big "
      }
      // capitalize first letter of name
      const name = prefix + shuffledNames[index].charAt(0).toUpperCase() + shuffledNames[index].slice(1)
      item.name = name
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

  headBase() {
    return headBase
  }

  styles() {
    return styles
  }

  patterns() {
    return patterns
  }

  mood() {
    return mood
  }

}

function rotateXY(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
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

const defaultHeadOffsets = {
  xFactor: 3.5,
  yFactor: 2.2
}

const headOffsets = {
  _1: {
    xFactor: 3.5,
    yFactor: 2.3,
    jellyX: 3
  },
  _2: {
    xFactor: 2.5,
    yFactor: 3.2,
    jellyX: 2.5,
    jellyY: 3.6
  },
  _3: {
    xFactor: 3.5,
    yFactor: 2.5,
    jellyX: 2.8,
    jellyY: 2.3
  },
  _4: {
    xFactor: 2.2,
    jellyX: 1.9,
    yFactor: 3
  },
  _5: {
    xFactor: 3,
    jellyX: 2,
    yFactor: 2.3
  },
  _6: {
    xFactor: 2.8,
    yFactor: 2.5,
    jellyX: 2.3
  },
  _7: {
    xFactor: 2.8,
    yFactor: 3
  },
  _8: {
    xFactor: 2.3,
    yFactor: 3.1,
    jellyX: 2
  },
  _9: {
    xFactor: 3,
    yFactor: 2.5,
    jellyX: 2.5
  },
  _10: {
    xFactor: 2.5,
    yFactor: 3,
    jellyX: 2.1,
    jellyY: 3.1
  },
  _11: {
    xFactor: 3,
    yFactor: 3.1,
    jellyX: 2.5,
    jellyY: 2.8
  },
  _12: {
    xFactor: 2.6,
    yFactor: 2.6,
    jellyX: 2.2,
  },
  _13: {
    xFactor: 3.5,
    yFactor: 3.5,
    jellyY: 4
  },
  // skeletons come after this
  _14: { // head 0
    xFactor: 3.5,
    yFactor: 2.3,
  },
  _15: { // head 1
    xFactor: 2.5,
    yFactor: 3.2,
  },
  _16: { // head 2
    xFactor: 3.5,
    yFactor: 2.5,
  },
  _17: { // head 3
    xFactor: 2.5,
    yFactor: 3
  },
  _18: { // head 4
    xFactor: 3,
    yFactor: 2.6
  },
  _19: { // head 5
    xFactor: 2.8,
    yFactor: 2.5,
  },
  _20: { // head 6
    xFactor: 2.8,
    yFactor: 3
  },
  _21: { // head 7
    xFactor: 2.5,
    yFactor: 3.5,
  },
  _22: { // head 8
    xFactor: 3,
    yFactor: 2.8,
  },
  _23: { // head 9
    xFactor: 2.5,
    yFactor: 3,
  },
  _24: { // head 10
    xFactor: 3,
    yFactor: 3,
  },
  _25: { // head 11
    xFactor: 2.9,
    yFactor: 2.9,
  },
  _26: { // head 12
    xFactor: 3.2,
    yFactor: 3.3,
  },
  // big heads
  _27: {
    xFactor: 2.5,
    yFactor: 2.8,
  },
  _28: {
    xFactor: 3.5,
    yFactor: 2.4,
  },
  _29: {
    xFactor: 2.6,
    yFactor: 3,
  },
  _30: {
    xFactor: 2.6,
    yFactor: 2.5,
  },
  _31: {
    xFactor: 2.6,
    yFactor: 3,
  },
}

const defaultTailOffsets = {
  xFactor: 0.1,
  yFactor: 0.1
}
// larger x factor means closer into the body
const tailOffsets = {
  _1: {
    xFactor: 0.1,
    yFactor: 0.1,
    jellyX: 0.2,
  },
  _2: {
    xFactor: 0.05,
    yFactor: 0.25,
    jellyX: 0.1,
    jellyY: 0.1
  },
  _3: {
    xFactor: 0.1,
    yFactor: 0.1,
    jellyX: 0,
    jellyY: -0.01
  },
  _4: {
    xFactor: 0.1,
    yFactor: 0
  },
  _5: {
    xFactor: 0.1,
    yFactor: -0.1
  },
  _6: {
    xFactor: 0,
    yFactor: 0.1,
    jellyX: 0.1
  },
  _7: {
    xFactor: 0.1,
    yFactor: 0
  },
  _8: {
    xFactor: 0.1,
    yFactor: 0
  },
  _9: {
    xFactor: 0.1,
    yFactor: 0.13
  },
  _10: {
    xFactor: 0.1,
    yFactor: 0
  },
  _11: {
    xFactor: 0.1,
    yFactor: -0.1
  },
  _12: {
    xFactor: 0.1,
    yFactor: 0.1,
    jellyX: 0.15
  },
  _13: {
    xFactor: 0.1,
    yFactor: 0.1,
    jellyX: 0.15
  },
  // skeleton tail
  _14: {
    xFactor: 0.1,
    yFactor: 0,
  }
}

const gifPatterns = [
  'bigEight', // Big Eight
  'eight',
  'circle',
  'square',
  'heart',
  'randomLoop', // Random Loop
  'star'
]

const patterns = {}
patterns[gifPatterns[0]] = "Big Eight"
patterns[gifPatterns[1]] = "Eight"
patterns[gifPatterns[2]] = "Circle"
patterns[gifPatterns[3]] = "Square"
patterns[gifPatterns[4]] = "Heart"
patterns[gifPatterns[5]] = "Random Loop"
patterns[gifPatterns[6]] = "Star"

const styles = {
  "everythingMatches": 'Matching',
  "mismatched": 'Mismatched',
  "randomColor": 'Jelly Bean',
  "debug": 'Debug',
  "randomImage": 'Mixed Mismatched',
  "lover-486": 'Lover',
  "skeleton": 'Skeleton',
  "big-head": 'Big Head'
}


// special attributes
// 486 (in korean characters) / /or lover-mode
// big-head-mode
// skeleton-mode


const backgroundsIndex = [
  // "gradient-high",
  "gradient-low",
  // "bw-gradient-high",
  // "bw-gradient-low",
  // "image"
]

const mood = [
  'Ambitious',
  'Derpy',
  'Skeptical',
  'Empty',
  'Oblivious',
  'Blissful',
  'Revolutionary',
  'Confrontational',
  'Assured',
  'Cracked',
  'Precocious',
  'Sleazy',
  'Sassy'
]

const headBase = [
  'Eel',
  'Ee',
  'Sahm',
  'Sah',
  'Oh',
  'Yook',
  'Chil',
  'Pahl',
  'Goo',
  'Sib',
  'Sib-Eel',
  'Sib-Ee',
  'Sib-Sahm',
  'Sib-Sah',
  'Sib-Oh',
  'Sib-Yook',
  'Sib-Chil',
  'Sib-Pahl',
  'Sib-Goo',
  'Ee-Sib',
  'Ee-Sib-Eel',
  'Ee-Sib-Ee',
  'Ee-Sib-Sahm',
  'Ee-Sib-Sah',
  'Ee-Sib-Oh',
  'Ee-Sib-Yook',
]

const names = ['balter', 'babber', 'badder', 'baffer', 'backer', 'barmer', 'barner', 'banner', 'bammer', 'bapper', 'batter', 'belter', 'bebber', 'beffer', 'becker', 'bermer', 'berner', 'bemmer', 'bepper', 'better', 'bilter', 'bibber', 'bidder', 'biffer', 'bicker', 'biller', 'birmer', 'birner', 'binner', 'bimmer', 'bipper', 'bolter', 'bobber', 'bodder', 'boffer', 'bocker', 'bormer', 'borner', 'bommer', 'bopper', 'botter', 'bulter', 'bubber', 'budder', 'buffer', 'buller', 'burmer', 'burner', 'bunner', 'bupper', 'butter', 'chalter', 'chabber', 'chadder', 'chacker', 'challer', 'charmer', 'charner', 'channer', 'chammer', 'chapper', 'chatter', 'chelter', 'chebber', 'chedder', 'cheffer', 'checker', 'cheller', 'chermer', 'cherner', 'chenner', 'chemmer', 'chepper', 'chetter', 'chibber', 'chidder', 'chiffer', 'chicker', 'chiller', 'chirmer', 'chirner', 'chinner', 'chimmer', 'chipper', 'chitter', 'cholter', 'chobber', 'chodder', 'choffer', 'choller', 'chormer', 'chorner', 'chonner', 'chommer', 'chopper', 'chulter', 'chudder', 'chuller', 'churmer', 'churner', 'chunner', 'chummer', 'chupper', 'dalter', 'dadder', 'daffer', 'darner', 'danner', 'dammer', 'datter', 'delter', 'debber', 'dedder', 'deffer', 'deller', 'dermer', 'derner', 'denner', 'demmer', 'depper', 'detter', 'dilter', 'dibber', 'differ', 'diller', 'dirmer', 'dirner', 'dinner', 'dimmer', 'dipper', 'ditter', 'dolter', 'dobber', 'dodder', 'doffer', 'docker', 'doller', 'dormer', 'dorner', 'donner', 'dopper', 'dotter', 'dulter', 'dubber', 'dudder', 'duffer', 'ducker', 'duller', 'durmer', 'durner', 'dummer', 'dupper', 'dutter', 'falter', 'fadder', 'faffer', 'faller', 'farmer', 'farner', 'fanner', 'fammer', 'felter', 'febber', 'fedder', 'feffer', 'feller', 'fermer', 'ferner', 'fenner', 'femmer', 'fepper', 'fetter', 'filter', 'fidder', 'fiffer', 'firner', 'finner', 'fimmer', 'fipper', 'folter', 'fobber', 'foffer', 'foller', 'former', 'forner', 'fonner', 'fommer', 'fopper', 'fulter', 'fubber', 'fudder', 'fuller', 'furmer', 'furner', 'funner', 'fummer', 'futter', 'galter', 'gabber', 'gadder', 'gaffer', 'galler', 'garmer', 'garner', 'ganner', 'gammer', 'gatter', 'gelter', 'gebber', 'gedder', 'geffer', 'gecker', 'geller', 'germer', 'gerner', 'genner', 'gemmer', 'gepper', 'gilter', 'gibber', 'giffer', 'giller', 'girmer', 'girner', 'ginner', 'gimmer', 'gipper', 'golter', 'gobber', 'goffer', 'gocker', 'goller', 'gormer', 'gorner', 'gommer', 'gopper', 'gulter', 'gubber', 'gudder', 'guffer', 'gucker', 'guller', 'gurmer', 'gurner', 'gummer', 'gupper', 'halter', 'habber', 'hadder', 'haffer', 'hacker', 'haller', 'harner', 'hanner', 'hammer', 'happer', 'hatter', 'helter', 'hebber', 'hedder', 'heffer', 'hecker', 'heller', 'hermer', 'herner', 'henner', 'hemmer', 'hepper', 'hetter', 'hilter', 'hibber', 'hiffer', 'hicker', 'hiller', 'hirmer', 'hirner', 'hinner', 'himmer', 'hipper', 'holter', 'hobber', 'hodder', 'hoffer', 'hocker', 'holler', 'hormer', 'honner', 'hopper', 'hulter', 'hubber', 'hudder', 'huffer', 'huller', 'hurmer', 'hurner', 'hunner', 'hupper', 'hutter', 'jalter', 'jabber', 'jadder', 'jaffer', 'jaller', 'jarmer', 'jarner', 'janner', 'jammer', 'jatter', 'jelter', 'jebber', 'jedder', 'jeffer', 'jecker', 'jeller', 'jermer', 'jerner', 'jenner', 'jemmer', 'jepper', 'jetter', 'jibber', 'jidder', 'jiffer', 'jiller', 'jirmer', 'jirner', 'jinner', 'jimmer', 'jitter', 'jolter', 'jobber', 'jodder', 'joffer', 'joller', 'jormer', 'jorner', 'jonner', 'jommer', 'jopper', 'jotter', 'julter', 'jubber', 'judder', 'juffer', 'jucker', 'juller', 'jurmer', 'jurner', 'junner', 'jummer', 'jupper', 'jutter', 'kalter', 'kabber', 'kadder', 'kaffer', 'kaller', 'karmer', 'karner', 'kanner', 'kammer', 'kapper', 'katter', 'kelter', 'kebber', 'kedder', 'keffer', 'keller', 'kermer', 'kerner', 'kenner', 'kemmer', 'kepper', 'ketter', 'kibber', 'kiffer', 'kirmer', 'kirner', 'kinner', 'kimmer', 'kipper', 'kolter', 'kobber', 'kodder', 'koffer', 'koller', 'kormer', 'korner', 'konner', 'kommer', 'kopper', 'kotter', 'kulter', 'kubber', 'kudder', 'kuffer', 'kuller', 'kurmer', 'kurner', 'kunner', 'kupper', 'kutter', 'lalter', 'labber', 'ladder', 'laffer', 'lacker', 'laller', 'larmer', 'larner', 'lanner', 'lammer', 'lapper', 'latter', 'lebber', 'ledder', 'leffer', 'leller', 'lermer', 'lerner', 'lenner', 'lemmer', 'lepper', 'letter', 'lilter', 'libber', 'lidder', 'liffer', 'liller', 'lirmer', 'lirner', 'linner', 'limmer', 'lipper', 'lolter', 'lobber', 'lodder', 'loffer', 'loller', 'lormer', 'lorner', 'lonner', 'lommer', 'lopper', 'lotter', 'lulter', 'ludder', 'luffer', 'lucker', 'luller', 'lurmer', 'lurner', 'lunner', 'lummer', 'lupper', 'lutter', 'malter', 'madder', 'maffer', 'macker', 'maller', 'marmer', 'marner', 'manner', 'mammer', 'mapper', 'matter', 'melter', 'mebber', 'medder', 'meffer', 'mecker', 'meller', 'mermer', 'merner', 'memmer', 'mepper', 'metter', 'milter', 'mibber', 'midder', 'miller', 'mirmer', 'mirner', 'minner', 'mimmer', 'mipper', 'mitter', 'molter', 'modder', 'moffer', 'mocker', 'moller', 'mormer', 'morner', 'monner', 'mopper', 'motter', 'multer', 'mubber', 'mudder', 'muller', 'murmer', 'murner', 'munner', 'mupper', 'mutter', 'nalter', 'nabber', 'naffer', 'naller', 'narmer', 'narner', 'nanner', 'nammer', 'napper', 'nelter', 'neller', 'nermer', 'nerner', 'nemmer', 'nepper', 'netter', 'nilter', 'niller', 'nirmer', 'nirner', 'nolter', 'noller', 'normer', 'norner', 'nommer', 'nopper', 'nulter', 'nuffer', 'nuller', 'nurmer', 'nurner', 'nummer', 'nupper', 'palter', 'pabber', 'padder', 'paffer', 'paller', 'parmer', 'parner', 'panner', 'pammer', 'papper', 'patter', 'pebber', 'pedder', 'peffer', 'peller', 'permer', 'perner', 'penner', 'pemmer', 'pepper', 'pidder', 'piffer', 'piller', 'pirmer', 'pirner', 'pinner', 'pimmer', 'pipper', 'pitter', 'polter', 'pobber', 'podder', 'poller', 'pormer', 'ponner', 'pommer', 'popper', 'potter', 'pulter', 'pubber', 'puffer', 'purmer', 'purner', 'punner', 'pummer', 'pupper', 'putter', 'ralter', 'rabber', 'radder', 'raffer', 'racker', 'raller', 'rarmer', 'rarner', 'ranner', 'relter', 'rebber', 'redder', 'reffer', 'recker', 'reller', 'rermer', 'rerner', 'renner', 'remmer', 'repper', 'retter', 'rilter', 'riffer', 'ricker', 'riller', 'rinner', 'ritter', 'rolter', 'roffer', 'roller', 'rormer', 'rorner', 'ronner', 'rommer', 'ropper', 'rotter', 'rulter', 'rudder', 'ruller', 'rurmer', 'rurner', 'runner', 'rummer', 'rutter', 'salter', 'sabber', 'sadder', 'saffer', 'saller', 'sarmer', 'sarner', 'sanner', 'sammer', 'sapper', 'satter', 'selter', 'sebber', 'sedder', 'seffer', 'seller', 'sermer', 'serner', 'senner', 'semmer', 'sepper', 'setter', 'silter', 'sibber', 'sidder', 'siffer', 'siller', 'sirmer', 'sirner', 'simmer', 'sipper', 'sitter', 'solter', 'sobber', 'socker', 'soller', 'sormer', 'sorner', 'sonner', 'sommer', 'sotter', 'sulter', 'subber', 'sudder', 'suller', 'surmer', 'surner', 'sunner', 'summer', 'supper', 'sutter', 'shalter', 'shabber', 'shadder', 'shaffer', 'shacker', 'shaller', 'sharmer', 'sharner', 'shanner', 'shammer', 'shapper', 'shatter', 'shelter', 'shebber', 'shedder', 'sheffer', 'shecker', 'sheller', 'shermer', 'sherner', 'shenner', 'shemmer', 'shepper', 'shilter', 'shibber', 'shiffer', 'shicker', 'shiller', 'shirmer', 'shirner', 'shinner', 'shimmer', 'shipper', 'sholter', 'shobber', 'shodder', 'shoffer', 'sholler', 'shormer', 'shorner', 'shonner', 'shommer', 'shopper', 'shulter', 'shubber', 'shuller', 'shurmer', 'shurner', 'shunner', 'shummer', 'shupper', 'shutter', 'talter', 'tabber', 'tadder', 'taffer', 'tacker', 'taller', 'tarmer', 'tarner', 'tanner', 'tammer', 'tapper', 'tatter', 'telter', 'tebber', 'tedder', 'teffer', 'tecker', 'teller', 'termer', 'terner', 'tenner', 'temmer', 'tepper', 'tetter', 'tilter', 'tibber', 'tidder', 'tiffer', 'ticker', 'tiller', 'tirmer', 'tirner', 'tinner', 'timmer', 'tolter', 'tobber', 'todder', 'toffer', 'tocker', 'toller', 'tormer', 'torner', 'tonner', 'tommer', 'topper', 'totter', 'tulter', 'tubber', 'tudder', 'tuffer', 'tuller', 'turmer', 'turner', 'tunner', 'tummer', 'tupper', 'tutter', 'valter', 'vabber', 'vadder', 'vaffer', 'vacker', 'valler', 'varmer', 'varner', 'vanner', 'vammer', 'vapper', 'velter', 'vebber', 'vedder', 'veffer', 'vecker', 'veller', 'vermer', 'verner', 'venner', 'vemmer', 'vepper', 'vetter', 'vilter', 'vibber', 'vidder', 'viffer', 'vicker', 'viller', 'virmer', 'virner', 'vinner', 'vimmer', 'vipper', 'vitter', 'volter', 'vobber', 'vodder', 'voffer', 'voller', 'vormer', 'vorner', 'vonner', 'vommer', 'vopper', 'votter', 'vulter', 'vubber', 'vudder', 'vuffer', 'vuller', 'vurmer', 'vurner', 'vunner', 'vummer', 'vupper', 'vutter', 'walter', 'wabber', 'wadder', 'waffer', 'waller', 'warner', 'wanner', 'wammer', 'wapper', 'webber', 'wedder', 'weffer', 'wecker', 'weller', 'wermer', 'werner', 'wenner', 'wemmer', 'wepper', 'wilter', 'wibber', 'wiffer', 'wicker', 'willer', 'wirmer', 'wirner', 'winner', 'wimmer', 'wipper', 'witter', 'wolter', 'wobber', 'wodder', 'woffer', 'wocker', 'woller', 'wormer', 'worner', 'wonner', 'wommer', 'wopper', 'wotter', 'wulter', 'wubber', 'wudder', 'wuffer', 'wucker', 'wuller', 'wurmer', 'wurner', 'wunner', 'wummer', 'wupper', 'wutter', 'yalter', 'yabber', 'yadder', 'yaffer', 'yacker', 'yaller', 'yarmer', 'yarner', 'yanner', 'yammer', 'yapper', 'yatter', 'yelter', 'yebber', 'yedder', 'yeffer', 'yecker', 'yeller', 'yermer', 'yerner', 'yenner', 'yemmer', 'yepper', 'yetter', 'yilter', 'yibber', 'yidder', 'yicker', 'yiller', 'yirmer', 'yirner', 'yinner', 'yimmer', 'yipper', 'yitter', 'yolter', 'yobber', 'yodder', 'yoffer', 'yocker', 'yoller', 'yormer', 'yorner', 'yonner', 'yommer', 'yopper', 'yotter', 'yulter', 'yubber', 'yudder', 'yuffer', 'yucker', 'yuller', 'yurmer', 'yurner', 'yunner', 'yummer', 'yupper', 'yutter'];