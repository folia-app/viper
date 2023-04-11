var Prando = require('prando');

class Viper {
  constructor(source = "random-seed", setting) {
    this.source = source

    this.rng = new Prando(this.source);

    this.setting = setting

    if (this.setting === "browser") {

    } else if (this.setting == "server") {

    }

    this.style = "maskClipRandom"
    // style options
    // 1. maskClipRandom
    // 1. maskClipSame
    // 1. randomColor
    // 1. debug
    // 1. skeleton
    // 1. randomGreen

    this.width = 343
    this.maxNumberOfLines = 36
    this.maxLen = this.width / 12
    this.strokeW = this.maxLen
    this.margin = this.strokeW
    this.headWidth = this.strokeW * 2
    this.angleDistanceMin = 60
    this.startPos = "random" // TODO: remove?
    this.strokeStyle = "random" // TODO: remove?
    this.fps = 35
    this.tweens = 6
    this.bgColor = "rgb(226,226,226)"
    this.rotationMode = "center"
    this.bg = "fourGradient" // "solid", "gradient", "fourGradient", "image"
  }

  setup(p) {
    if (p) {
      frameRate = p.frameRate.bind(p)
      strokeWeight = p.strokeWeight.bind(p)
      rectMode = p.rectMode.bind(p)
      imageMode = p.imageMode.bind(p)
      angleMode = p.angleMode.bind(p)
      strokeCap = p.strokeCap.bind(p)
      DEGREES = p.DEGREES
      ROUND = p.ROUND
    } else {
      this.canvas = createCanvas(this.width, this.width)
      this.canvas.parent('sketch-holder')
    }
    const { x, y } = this.getStart()
    this.x = x
    this.y = y

    frameRate(fps);
    strokeWeight(strokeW);
    rectMode(rotationMode)
    imageMode(rotationMode);
    angleMode(DEGREES);
    strokeCap(ROUND);
  }

  drawBackground(p) {
    if (p) {
      image = p.image.bind(p)
      background = p.background.bind(p)
      color = p.color.bind(p)
      fill = p.fill.bind(p)
      stroke = p.stroke.bind(p)
      strokeWeight = p.strokeWeight.bind(p)
      push = p.push.bind(p)
      translate = p.translate.bind(p)
      rotate = p.rotate.bind(p)
      beginShape = p.beginShape.bind(p)
      vertex = p.vertex.bind(p)
      scale = p.scale.bind(p)
      bezierVertex = p.bezierVertex.bind(p)
      endShape = p.endShape.bind(p)
      pop = p.pop.bind(p)
    }
    switch (this.style) {
      case "maskClipRandom":
        break;
      case "maskClipSame":
        break;
      case "randomColor":
        break;
      case "debug":
        break;
      case "skeleton":
        break;
      case "randomGreen":
        break;
      default:
        throw new Error('Unknown style: ' + this.style);
    }
  }

  draw(p, preloaded) {
  }


  random(min = 0, max = 1) {
    return this.rng.nextInt(min, max);
  }

  getStart() {
    x = Math.floor(this.random(this.margin, this.width - this.margin))
    y = Math.floor(this.random(this.margin, this.width - this.margin))
    return { x, y }
  }
}

export default Viper