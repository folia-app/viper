/*
// on click #sketch-holder, set stop to !stop
// box = document.getElementById('sketch-holder')
// box && box.addEventListener('click', () => {
//   stop = !stop
// })

var stop = false

var x, y, width, maxLen, strokeW, margin, buffer,
  angleDistanceMin, startPos, previousAng, maxNumberOfLines, animated,
  strokeStyle, totalLength = 0, allLines = [], allColors = [], presetLines = [], presetColors = [],
  img, dropShadowColor, dropShadowLoop, dropShadowOffset, bgColor, dontClearBG,
  headOffset, headOffsets, tailOffset, tailOffsets, debug, bg,
  totalHeads = 7, totalBodies = 8, totalTails = 7, totalBG = 3, totalPatterns = 8,
  tails = [], heads = [], bodies = [], bgs = [], patterns = [], whichSegment,
  head, tail, bgImg, makeMask, hole, tweens, bgGradientColors,
  imagePath = "", rotationMode,
  matchTail = true, firstSet = false, keepRunning


var createCoordinates = (p) => {

  var allPoints = [{ x: margin, y: margin }]
  startingX = margin
  startingY = margin
  x = startingX
  y = startingY
  worableArea = width - (margin * 2)
  for (var i = 0; i < width * 5; i += width / 10) {
    var odd = Math.floor(i / worableArea) % 2 == 0
    var x = odd ? i % worableArea : worableArea - (i % worableArea)
    var y = Math.floor(i / worableArea) * (width / 10)
    allPoints.push({ x: x + margin, y: y + margin })
    presetColors.push(color(randomNum(0, 255), randomNum(0, 255), randomNum(0, 255)))
  }
  allPoints.forEach((p, i) => {
    if (i > 0) {
      presetLines.push({
        x1: allPoints[i - 1].x,
        y1: allPoints[i - 1].y,
        x2: p.x,
        y2: p.y,
        len: distanceCalc(allPoints[i - 1].x, allPoints[i - 1].y, p.x, p.y)
      })
    }
  })
}

function distanceCalc(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function setParams(p) {
  console.log("setParams")
  if (p) {
    CENTER = p.CENTER
  }
  width = 343
  maxLen = width / 12
  strokeW = maxLen
  headWidth = strokeW * 2

  margin = headWidth
  maxNumberOfLines = 36
  angleDistanceMin = 60
  startPos = "random" // "bottom", "center", "random"
  strokeStyle = "random" // "randomGreen", "random", "gettingDarker", "none"
  fps = 35
  tweens = 6
  bgColor = "rgb(226,226,226)"
  try {
    rotationMode = CENTER
  } catch (e) {
    console.log({ "e-setParas": e })
  }
  debug = false
  animated = true
  makeLoop = false
  keepRunning = true
  dropShadowColor = "rgba(0, 0, 0, 0.008)"
  dropShadowOffset = {
    x: 15,
    y: 15
  }
  drawings = true
  includeShadow = false
  startingX = false //margin
  startingY = false // width - margin
  startingAng = false //135
  egg = false
  bg = "fourGradient" // "solid", "gradient", "image", "fourGradient"
  dropShadowLoop = bg == "solid" ? 20 : 50
  shouldSave = false
  taperEnd = false
  skipToEnd = false
  dontCross = false
  bodyOffset = randomNum(0, totalBodies)
  makeMask = true
  dontClearBG = false
  preset = false
  sameSegment = false
  headAsSegment = false
  // bodies = patterns

  // which Segment is random selection from allLines
  whichSegment = randomNum(0, bodies.length)
  if (bg == "fourGradient") {
    bgGradientColors = [[randomNum(0, 255), randomNum(0, 255), randomNum(0, 255)], [randomNum(0, 255), randomNum(0, 255), randomNum(0, 255)], [randomNum(0, 255), randomNum(0, 255), randomNum(0, 255)], [randomNum(0, 255), randomNum(0, 255), randomNum(0, 255)]];
  }
  buffer = -margin / 2//0 //- margin//width / 3
  // var increasing = true
  // var fpsHigh = 40
  // var fpsLow = 25
  // setInterval(() => {
  //   if (fps < fpsHigh && increasing) {
  //     fps += 1
  //   } else if (fps > fpsLow && !increasing) {
  //     fps -= 1
  //   }
  //   frameRate(fps)
  //   console.log({ fps })
  //   if (fps == fpsHigh) {
  //     increasing = false
  //   } else if (fps == fpsLow) {
  //     increasing = true
  //   }
  // }, 50)
}
function setup(p, preloaded) {
  console.log('wander-setup', { firstSet, headOffset, preloaded })
  if (!firstSet) {
    firstSet = true
    // return
  }
  setParams(p)
  configureCanvas(p)
  if (preset) {
    createCoordinates(p)
  }
  // img.mask(mask)
}

var defaultHeadOffsets = {
  xFactor: 2,
  yFactor: 2.5
}

headOffsets = {
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

var defaultTailOffsets = {
  xFactor: 2,
  yFactor: 0
}

tailOffsets = {
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

var bgFamilies = [
  9, // bg1 has 9 variations
  9, // bg2 has 9 variations
  3
]



async function nodePreload(p5) {
  console.log('nodePreload')
  var tailRandom = Math.ceil(Math.random() * totalTails)
  // console.log({ tailRandom })
  var headRandom;
  tail = await p5.loadImage(imagePath + `/tail/${tailRandom}.png`)
  if (tailRandom < 6 && matchTail) {
    headRandom = tailRandom
    head = await p5.loadImage(imagePath + `/head/${tailRandom}.png`)
  } else {
    headRandom = totalTails + Math.floor(Math.random() * (totalHeads - totalTails + 1))
    head = await p5.loadImage(imagePath + `/head/${headRandom}.png`)
  }
  headOffset = headOffsets.hasOwnProperty("_" + headRandom) ? headOffsets["_" + headRandom] : defaultHeadOffsets
  tailOffset = tailOffsets.hasOwnProperty("_" + tailRandom) ? tailOffsets["_" + tailRandom] : defaultTailOffsets
  var bgFamily = 3//Math.ceil(Math.random() * totalBG)
  var specificBG = Math.ceil(Math.random() * bgFamilies[bgFamily - 1])
  bgImg = await p5.loadImage(imagePath + `/bg/bg${bgFamily}_${specificBG}.png`)
  for (var i = 1; i <= totalBodies; i++) {
    bodies.push(await p5.loadImage(imagePath + `/body/${i}.png`))
  }
  for (var i = 1; i <= totalBG; i++) {
    bgs.push(await p5.loadImage(imagePath + `/bg/${i}.jpeg`)) // uses jpeg instead of png
  }
  for (var i = 1; i <= totalTails; i++) {
    tails.push(await p5.loadImage(imagePath + `/tail/${i}.png`))
  }
  for (var i = 1; i <= totalPatterns; i++) {
    patterns.push(await p5.loadImage(imagePath + `/pattern/${i}.jpg`)) // uses jpg
  }
  hole = await p5.loadImage(imagePath + "/holes/1.png")

  return {
    tail, head, bgImg, bodies, bgs, tails, patterns, hole
  }
}

function preload() {
  var tailRandom = Math.ceil(Math.random() * totalTails)
  // console.log({ tailRandom })
  var headRandom;
  tail = loadImage(imagePath + `/tail/${tailRandom}.png`)
  if (tailRandom < 6 && matchTail) {
    headRandom = tailRandom
    head = loadImage(imagePath + `/head/${tailRandom}.png`)
  } else {
    headRandom = totalTails + Math.floor(Math.random() * (totalHeads - totalTails + 1))
    head = loadImage(imagePath + `/head/${headRandom}.png`)
  }
  headOffset = headOffsets.hasOwnProperty("_" + headRandom) ? headOffsets["_" + headRandom] : defaultHeadOffsets
  tailOffset = tailOffsets.hasOwnProperty("_" + tailRandom) ? tailOffsets["_" + tailRandom] : defaultTailOffsets
  var bgFamily = 3//Math.ceil(Math.random() * totalBG)
  var specificBG = Math.ceil(Math.random() * bgFamilies[bgFamily - 1])
  bgImg = loadImage(imagePath + `/bg/bg${bgFamily}_${specificBG}.png`)
  for (var i = 1; i <= totalBodies; i++) {
    bodies.push(loadImage(imagePath + `/body/${i}.png`))
  }
  for (var i = 1; i <= totalBG; i++) {
    bgs.push(loadImage(imagePath + `/bg/${i}.jpeg`)) // uses jpeg instead of png
  }
  for (var i = 1; i <= totalTails; i++) {
    tails.push(loadImage(imagePath + `/tail/${i}.png`))
  }
  for (var i = 1; i <= totalPatterns; i++) {
    patterns.push(loadImage(imagePath + `/pattern/${i}.jpg`)) // uses jpg
  }
  hole = loadImage(imagePath + "/holes/1.png")
}

function configureCanvas(p) {
  console.log('configureCanvas')
  if (p) {
    frameRate = p.frameRate.bind(p)
    strokeWeight = p.strokeWeight.bind(p)
    rectMode = p.rectMode.bind(p)
    imageMode = p.imageMode.bind(p)
    angleMode = p.angleMode.bind(p)
    strokeCap = p.strokeCap.bind(p)
    DEGREES = p.DEGREES
    ROUND = p.ROUND
  }
  if (!p) {
    try {
      canvas = createCanvas(width, width);
      canvas.parent('sketch-holder');
    } catch (e) {
      console.log({ "e-configureCanvas-1": e })
    }
  }

  switch (startPos) {
    case "bottom":
      x = width / 2;
      y = width - (margin / 2);
      break;
    case "center":
      x = width / 2;
      y = width / 2;
      break;
    case "random":
      var boundary = width - (margin * 2)
      x = Math.floor(Math.random() * boundary) + margin
      y = Math.floor(Math.random() * boundary) + margin
  }
  if (startingAng) {
    previousAng = startingAng
  } else {
    startingAng = 0
  }

  if (startingX) {
    x = startingX
  } else {
    startingX = x
  }
  if (startingY) {
    y = startingY
  } else {
    startingY = y
  }
  try {
    frameRate(fps);
    strokeWeight(strokeW);
    rectMode(rotationMode)
    imageMode(rotationMode);
    angleMode(DEGREES);
    strokeCap(ROUND);
    addBackground(p)
  } catch (e) {
    console.log({ "e-configureCanvas-2": e })
  }
}


const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;

var savedBG = false
function fourColorGradient(colors, resolution, p) {
  if (p) {
    createGraphics = p.createGraphics.bind(p)
    image = p.image.bind(p)
  }
  if (!savedBG) {
    savedBG = createGraphics(width, width)
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        let s = width / resolution;
        let wx = i * s / width
        let wy = j * s / width
        savedBG.noStroke()
        savedBG.fill(weightedAvgColor(weightedAvgColor(colors[0], colors[1], wx), weightedAvgColor(colors[3], colors[2], wx), wy))
        savedBG.rect(i * s, j * s, s, s)
      }
    }
  }

  image(savedBG, width / 2, width / 2, width, width)
}

function setGradient(x, y, w, h, c1, c2, axis, p) {
  if (p) {
    noFill = p.noFill.bind(p)
    lerpColor = p.lerpColor.bind(p)
    map = p.map.bind(p)
    stroke = p.stroke.bind(p)
    line = p.line.bind(p)
  }
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function addBackground(p) {
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
  if (debug) {
    addCartesian(p)
  } else if (bg == "solid") {
    background(bgColor);
  } else if (bg == "fourGradient") {
    fourColorGradient(bgGradientColors, width, p)
  } else if (bg == "gradient") {
    b1 = color(255);
    b2 = color(0);
    setGradient(0, 0, width, height, b1, b2, Y_AXIS, p);
  } else if (bg == "image") {
    image(bgImg, width / 2, width / 2, width, width);
  } else {
    throw new Error(`Background type ${bg} not supported`)
  }
  // ellipse(width / 2, width / 2, width / 4, width / 3,)
  // scale(this.scalar);
  if (egg) {
    fill("rgb(249,229,188)")
    stroke("black")
    strokeWeight(2)
    var direction = totalLength % 12
    var tilt = totalLength % 6
    tilt -= 3
    tilt *= 5
    tilt = direction >= 6 ? tilt * -1 : tilt
    push()
    translate(width / 2, (width / 2) + 100);
    rotate(tilt)
    beginShape();
    vertex(0, -100);
    scale(2)
    bezierVertex(25, -100, 40, -65, 40, -40);
    bezierVertex(40, -15, 25, 0, 0, 0);
    bezierVertex(-25, 0, -40, -15, -40, -40);
    bezierVertex(-40, -65, -25, -100, 0, -100);
    endShape();
    pop()

    push()
    fill("black")
    translate(width / 2, (width / 2) + 100);
    rotate(tilt)
    star(0, -100, 25, 50, 5, p)
    pop()
  }

}

function star(x, y, radius1, radius2, npoints, p) {
  if (p) {
    angleMode = p.angleMode.bind(p)
    RADIANS = p.RADIANS
    beginShape = p.beginShape.bind(p)
    TWO_PI = p.TWO_PI
    cos = p.cos.bind(p)
    sin = p.sin.bind(p)
    vertex = p.vertex.bind(p)
    CLOSE = p.CLOSE
    DEGREES = p.DEGREES
  }
  angleMode(RADIANS);

  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  angleMode(DEGREES);
}
function addCartesian(p) {
  if (p) {
    background = p.background.bind(p)
    textSize = p.textSize.bind(p)
    strokeWeight = p.strokeWeight.bind(p)
    stroke = p.stroke.bind(p)
    line = p.line.bind(p)
    rectMode = p.rectMode.bind(p)
    CORNER = p.CORNER
    fill = p.fill.bind(p)
    rect = p.rect.bind(p)
    text = p.text.bind(p)
  }

  background(bgColor);
  // textSize(16);
  // strokeWeight(3)
  // stroke(0)
  // line(width / 2, 0, width / 2, width)
  // line(0, width / 2, width, width / 2)
  // strokeWeight(5)
  for (var i = 0; i < width; i += 100) {
    line(i, 0, i, width)
    stroke(11)
    strokeWeight(0)
    strokeWeight(1)
    line(0, i, width, i)
  }
  rectMode(CORNER)
  strokeWeight(0)
  fill('rgba(255,255,0,0.5)')
  rect(0, 0, width, -buffer)
  rect(0, -buffer, -buffer, width)
  rect(width - -buffer, -buffer, -buffer, width)
  rect(-buffer, width - -buffer, width - - buffer - - buffer, -buffer)

  rectMode(rotationMode)
  strokeWeight(1)


  // line(margin, margin, width - margin, margin)
  // line(width - margin, margin, width - margin, width)
  // line(width - margin, width, margin, width)
  // line(margin, width, margin, margin)


  stroke("green")
  for (var i = 0; i < 12; i++) {
    var cardinalX = (width / 2) + Math.cos(((i * 30)) * Math.PI / 180) * 225
    var cardinalY = (width / 2) + Math.sin(((i * 30)) * Math.PI / 180) * 225
    strokeWeight(0)
    fill("green")
    text(i * 30, cardinalX, cardinalY)
    strokeWeight(1)
    line(width / 2, width / 2, cardinalX, cardinalY)

  }

  stroke("red")
  fill("red")
  for (var i = 0; i < 8; i++) {
    var cardinalX = (width / 2) + Math.cos(((i * 45)) * Math.PI / 180) * (width / 2.5)
    var cardinalY = (width / 2) + Math.sin(((i * 45)) * Math.PI / 180) * (width / 2.5)
    strokeWeight(1)
    line(width / 2, width / 2, cardinalX, cardinalY)
    strokeWeight(0)
    text(i * (360 / 8), cardinalX, cardinalY)
  }

}

var saved = false
var printedDone = false
function draw(p, preloaded) {
  if (stop) return
  totalLength++
  if (!keepRunning) {
    if (totalLength > (maxNumberOfLines * (animated ? tweens : 1))) {
      if (makeLoop) {
        totalLength = 0
        allLines = []
        allColors = []

        x = startingX
        y = startingY
        previousAng = startingAng
        addBackground(p)
      }
      var datetime = new Date().toISOString().replace(/:/g, '-');
      if (!saved && shouldSave) {
        saved = true
        setTimeout(() => {
          saveCanvas(canvas, 'viper-' + datetime, 'jpg');
        }, 5000)
      }
      if (!printedDone) {
        console.log("Done at " + datetime)
        printedDone = true
      }
      return
    }
  }


  if ((totalLength % tweens == 1) || !animated) {
    addLine()
  }

  if (!dontClearBG) {
    addBackground(p)
  }
  // if (debug) {
  //   drawDebug()
  // }
  drawSegments(p, preloaded)
}
function setStrokeColor() {
  var c
  switch (strokeStyle) {
    case "random":
      c = [randomNum(0, 255), randomNum(0, 255), randomNum(0, 255)]
      break;
    case "gettingDarker":
      var percentageOfTotal255 = ((totalLength / maxNumberOfLines) * 255)
      c = [percentageOfTotal255, percentageOfTotal255, percentageOfTotal255]
      break;
    case "randomGreen":
      c = [0, randomNum(100, 200), 0]
      break;
    default:
      c = bgColor
  }
  return c
}

function getShadowWeight(i) {
  var foo = strokeW * (0.5) + (i * 1)
  return foo
}


function startDropShadow(i) {
  strokeCap(SQUARE);
  strokeWeight(getShadowWeight(i));
  stroke(dropShadowColor);
  strokeJoin(ROUND);
  beginShape();
}

function endDropShadow() {
  endShape();
  strokeCap(ROUND);
}

function addDropShadowTip(l) {
  for (var i = 1; i < dropShadowLoop; i++) {
    strokeWeight(0)
    fill(dropShadowColor)
    var diameter = getShadowWeight(i)
    arc(l.x1 + dropShadowOffset.x, l.y1 + dropShadowOffset.y, diameter, diameter, l.ang + 90, l.ang - 90);
    noFill()

    startDropShadow(i)
    vertex(l.x1 + dropShadowOffset.x, l.y1 + dropShadowOffset.y)
    vertex(((l.x1 + l.x2) / 2) + dropShadowOffset.x, ((l.y1 + l.y2) / 2) + dropShadowOffset.y);
    endShape();
  }
}

function addDropShadowEnd(l) {
  for (var i = 1; i < dropShadowLoop; i++) {

    startDropShadow(i)
    // strokeCap(ROUND);
    vertex(((l.x1 + l.x2) / 2) + dropShadowOffset.x, ((l.y1 + l.y2) / 2) + dropShadowOffset.y);
    vertex(l.x2 + dropShadowOffset.x, l.y2 + dropShadowOffset.y);
    endDropShadow()

    strokeWeight(0)
    fill(dropShadowColor)
    var diameter = getShadowWeight(i)
    arc(l.x2 + dropShadowOffset.x, l.y2 + dropShadowOffset.y, diameter, diameter, l.ang - 90, l.ang + 90);
    noFill()
  }
}

function addDropShadow2(l, l2) {
  for (var i = 0; i < dropShadowLoop; i++) {
    startDropShadow(i)

    vertex(((l.x1 + l.x2) / 2) + dropShadowOffset.x, ((l.y1 + l.y2) / 2) + dropShadowOffset.y);
    vertex(l.x2 + dropShadowOffset.x, l.y2 + dropShadowOffset.y);
    vertex(((l2.x1 + l2.x2) / 2) + dropShadowOffset.x, ((l2.y1 + l2.y2) / 2) + dropShadowOffset.y);

    endDropShadow()
  }
}

function addDropShadow(i, allLines) {
  var l = allLines[i]
  if (i == 0) {
    addDropShadowTip(l)
  }
  if (i != allLines.length - 1) {
    addDropShadow2(allLines[i], allLines[i + 1])
  }
  if (i == allLines.length - 1) {
    addDropShadowEnd(l)
  }
  // offset = 0
  // for (var i = 1; i < 30; i++) {
  //   console.log('dropShadowColor')
  //   stroke(dropShadowColor)
  //   strokeWeight(strokeW + i)
  //   line(l.x1 + offset, l.y1 + offset, l.x2 + offset, l.y2 + offset)
  // }

}

function drawDebug() {
  for (var i = 0; i < allLines.length; i++) {
    var l = allLines[i]

    try {
      strokeWeight(0)
      fill("rgba(0,0,255,0.4)")
      // arc(l.x1, l.y1, 40, 40, l.ang - angleDistanceMin, l.ang + angleDistanceMin);
    } catch (e) { }

    stroke("black")
    var debugLineWeight = width / 40
    strokeWeight(debugLineWeight)
    line(l.x1, l.y1, l.x2, l.y2)
    strokeWeight(width / 40)
    // stroke('rgb(0,255,0)')
    stroke('green')
    point(l.x1, l.y1)
    point(l.x2, l.y2)
    stroke('blue')
    strokeWeight(0)
    fill("blue")
    text(`${Math.floor(l.x1)}, ${Math.floor(l.y1)} `, l.x1 + 5, l.y1 - 5)


    for (var j = 0; j < l.failed.length; j++) {
      previewX = l.failed[j].newX
      previewY = l.failed[j].newY
      stroke(l.failed[j].randomColor)
      strokeWeight(debugLineWeight)
      line(l.x1, l.y1, previewX, previewY)
      strokeWeight(0)
      fill("blue")
      halfX = l.x1 > previewX ? l.x1 - ((l.x1 - previewX) / 2) : previewX - ((previewX - l.x1) / 2)
      halfY = l.y1 > previewY ? l.y1 - ((l.y1 - previewY) / 2) : previewY - ((previewY - l.y1) / 2)
      text(j + 1, halfX + 5, halfY);
      strokeWeight(width / 40)
      stroke("red")
      point(previewX, previewY)
    }
    try {
      strokeWeight(0)
      // fill("rgba(0,0,255,0.4)")
      // fill('green')
      arc(l.x2, l.y2, maxLen * 2, maxLen * 2, l.ang - angleDistanceMin, l.ang + angleDistanceMin);
    } catch (e) { }
  }
}

// function dist(x1, y1, x2, y2) {
//   return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
// }

var renderedBodies = {}

function drawSegments(p, preloaded) {
  if (p) {
    head = preloaded.preloaded.head
    tail = preloaded.preloaded.tail
    dist = p.dist.bind(p)
    image = p.image.bind(p)
    createGraphics = p.createGraphics.bind(p)
    push = p.push.bind(p)
    translate = p.translate.bind(p)
    rotate = p.rotate.bind(p)
    scale = p.scale.bind(p)
    stroke = p.stroke.bind(p)
    strokeWeight = p.strokeWeight.bind(p)
    line = p.line.bind(p)
    pop = p.pop.bind(p)
    point = p.point.bind(p)
    fill = p.fill.bind(p)
    text = p.text.bind(p)
    arc = p.arc.bind(p)
    noStroke = p.noStroke.bind(p)
    noFill = p.noFill.bind(p)
    rectMode = p.rectMode.bind(p)
    imageMode = p.imageMode.bind(p)
    CORNER = p.CORNER
  }
  for (var i = 0; i < allLines.length; i++) {
    if (i == 0 && allLines.length > maxNumberOfLines) {
      continue
    }
    // start new relative translation and rotation
    var l = allLines[i]
    var c = allColors[i]

    if (animated) {
      var offsetTilNextSegment = totalLength % tweens
      if (i == 0 && allLines.length <= maxNumberOfLines) {
        lastLine = {
          x1: startingX,
          y1: startingY,
          x2: startingX,
          y2: startingY
        }
      } else {
        lastLine = allLines[i - 1]
      }

      // console.log('lastLine')
      // console.log(`ll.x1: ${lastLine.x1}, ll.y1: ${lastLine.y1}, ll.x2: ${lastLine.x2}, ll.y2: ${lastLine.y2}`)

      // normally we draw each line x1,y1 to x2,y2
      // x1,y1 is the end of the previous line
      // x2,y2 is the end of the current line
      x1 = offsetTilNextSegment == 0 ? l.x1 : ((l.x1 - lastLine.x1) * (offsetTilNextSegment / tweens)) + lastLine.x1
      y1 = offsetTilNextSegment == 0 ? l.y1 : ((l.y1 - lastLine.y1) * (offsetTilNextSegment / tweens)) + lastLine.y1
      x2 = offsetTilNextSegment == 0 ? l.x2 : ((l.x2 - lastLine.x2) * (offsetTilNextSegment / tweens)) + lastLine.x2
      y2 = offsetTilNextSegment == 0 ? l.y2 : ((l.y2 - lastLine.y2) * (offsetTilNextSegment / tweens)) + lastLine.y2

      // len is the distance between x1,y1 and x2,y2
      len = dist(x1, y1, x2, y2)
      ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;


      // console.log(`tween line # ${offsetTilNextSegment} of ${tweens}`)
      // console.log(`x1: ${x1}, y1: ${y1}, x2: ${x2}, y2: ${y2}`)
      // point(x1, y1)
      // point(x2, y2)

      // if (i == allLines.length - 1) {
      //   x1 = x
      //   y1 = y
      // }
    } else {
      x1 = l.x1
      x2 = l.x2
      y1 = l.y1
      y2 = l.y2
      len = l.len
      ang = l.ang
    }




    if (includeShadow) {
      addDropShadow(i, allLines)
    }

    if (taperEnd) {
      var widthSteps = 1.5
      var changeEvery = Math.floor(allLines.length / widthSteps)
      var endWidth = strokeW / 1.5
      var currentWidth = (endWidth * (Math.ceil(i / changeEvery)))
      if (currentWidth <= 0) {
        currentWidth = endWidth
      }
    } else {
      currentWidth = strokeW
    }

    var a = (i == 0 && !debug && !animated)
    var b = (i == 0 && !debug && animated) || (i == 1 && totalLength > ((maxNumberOfLines) * tweens) && !debug && animated)
    if (a || b) {
      // draw the hole
      var holeWidth = currentWidth * 2

      // push()
      // tint(255, 127)
      image(hole, startingX - (currentWidth / 8), startingY - (currentWidth / 4), holeWidth, holeWidth);
      // pop()
    }


    if (i !== allLines.length - 1 || !headAsSegment) {
      if (drawings && !debug) {

        // get the index of the item in allLines as the opposite of the position in the array
        var index = allLines.length - i - 1
        whichSegment = sameSegment ? whichSegment : (index + bodyOffset) % bodies.length
        pic = bodies[whichSegment]
        var flip1 = (x1 - x2) > (width / 80)
        var flip2 = flip1

        if (!debug) {

          var imagePattern
          if (makeMask) {
            var renderedID = whichSegment
            if (!renderedBodies[renderedID]) {
              var strokeMask = createGraphics(len + (currentWidth * 2), currentWidth);
              strokeMask.strokeWeight(currentWidth)
              strokeMask.line(currentWidth / 2, currentWidth / 2, len + (currentWidth * 1.5), currentWidth / 2)


              imagePattern = createGraphics(len + (currentWidth * 2), currentWidth);
              imagePattern.background(c)
              // imagePattern.image(pic, 0, 0, len + (currentWidth * 2), currentWidth)
              imagePattern.image(pic, 0, -currentWidth / 2, len + (currentWidth * 2), currentWidth * 2)

              imagePattern.loadPixels()
              strokeMask.loadPixels()
              for (let j = 0; j < imagePattern.pixels.length; j += 4) {
                imagePattern.pixels[j + 3] = strokeMask.pixels[j + 3]
              }
              imagePattern.updatePixels()
              // console.log({ l })
              renderedBodies[renderedID] = imagePattern
              // l.maskedImage = imagePattern
              // allLines[i].maskedImage = imagePattern
              // console.log({ l })
            } else {
              imagePattern = renderedBodies[renderedID]
            }
          } else {
            imagePattern = pic
          }

          push()
          var xDist = Math.abs(x2 - x1)
          var yDist = Math.abs(y2 - y1)
          var fractionOfTotal = 1 / 2
          var p = {
            x: x1 + ((x2 < x1 ? -1 : 1) * xDist) * fractionOfTotal,
            y: y1 + ((y2 < y1 ? -1 : 1) * yDist) * fractionOfTotal
          }
          translate(p.x, p.y);
          rotate(ang)

          push()
          scale(flip1 ? -1 : 1, flip2 ? -1 : 1)
          // tint(segColor)
          // tint(c[0], c[1], c[2])
          var segmentWeight, addToLength
          if (makeMask) {
            segmentWeight = currentWidth / 1.75 // strokeW - ((allLines.length - 1 - i) * diff)
            stroke("black")
            strokeWeight(segmentWeight + (segmentWeight * 0.1))
            line(-len / 2, 0, len / 2, 0)
            addToLength = segmentWeight
          } else {
            segmentWeight = currentWidth / 1.2
            addToLength = segmentWeight / 2
          }
          // console.log(`segment is ${len + addToLength} x ${segmentWeight} pixels`)
          image(imagePattern, 0, 0, len + addToLength, segmentWeight);
          pop()


          // revert to original translation and rotation
          pop()
        }
      } else if (debug) {
        stroke("black")
        var debugLineWeight = width / 50

        strokeWeight(debugLineWeight)
        line(x1, y1, x2, y2)
        strokeWeight(debugLineWeight)
        stroke('rgb(0,255,0)')
        point(x1, y1)
        point(x2, y2)
        stroke('blue')
        strokeWeight(0)
        fill("blue")
        text(`${Math.floor(x1)}, ${Math.floor(y1)} `, x1 + 5, y1 - 5)


        for (var j = 0; j < l.failed.length; j++) {
          previewX = l.failed[j].newX
          previewY = l.failed[j].newY
          stroke(l.failed[j].randomColor)
          strokeWeight(debugLineWeight)
          line(x1, y1, previewX, previewY)
          strokeWeight(0)
          fill("blue")
          halfX = x1 > previewX ? x1 - ((x1 - previewX) / 2) : previewX - ((previewX - x1) / 2)
          halfY = y1 > previewY ? y1 - ((y1 - previewY) / 2) : previewY - ((previewY - y1) / 2)
          text(j + 1, halfX + 5, halfY);
          strokeWeight(debugLineWeight)
          stroke("red")
          point(previewX, previewY)
        }
        try {
          strokeWeight(0)
          fill("rgba(0,0,255,0.4)")
          arc(x2, y2, maxLen, maxLen, ang - angleDistanceMin, ang + angleDistanceMin);
        } catch (e) {
          console.log({ "e-drawSegments": e })
        }
      } else {
        stroke("black")
        var segmentWeight = strokeW / 1.75 // strokeW - ((allLines.length - 1 - i) * diff)
        strokeWeight(segmentWeight + 2)
        line(x1, y1, x2, y2)
        stroke(c)
        strokeWeight(segmentWeight)
        line(x1, y1, x2, y2)
      }
    }

    var tailLength = currentWidth * 1.4
    var tailWidth = tailLength / 2
    var calcTailOffset = {
      x: tailLength / tailOffset.xFactor,
      y: tailWidth * tailOffset.yFactor
    }

    // draw the tail
    var a = i == 0 && keepRunning && (totalLength > maxNumberOfLines) && !animated
    var b = i == 1 && keepRunning && (totalLength > ((maxNumberOfLines + 1) * tweens)) && animated
    // console.log({ i, keepRunning, totalLength, maxNumberOfLines, tweens })
    // console.log({ a, b })
    console.log({ a, b, x1, x2, width })
    // if ((a) || (b)) {
    //   if ((x1 - x2) > (width / 80)) {
    //     // if (x2 < x1) {//} && (x1 - x2) > margin) {
    //     // push()
    //     // scale(-1, 1)
    //     // var tailX = -x1 - calcTailOffset.x
    //     // var tailY = y1 - calcTailOffset.y
    //     // image(tail, tailX, tailY, tailLength, tailWidth);
    //     // pop()
    //   } else {

    //     // var tailX = x1 - calcTailOffset.x
    //     // var tailY = y1 - calcTailOffset.y
    //     // image(tail, tailX, tailY, tailLength, tailWidth);
    //   }
    // }


    // draw the head
    if (i == allLines.length - 1) {
      // stroke("rgba(255,0,0,0.1)")
      noStroke()
      fill("rgba(255,0,0,0.5)")
      // var headOffset = {
      //   xFactor: 2,
      //   yFactor: 2.5
      // }
      console.log({ rotationMode, headOffset, l, head })
      if (headAsSegment) {
        push()
        rectMode(CORNER);
        imageMode(CORNER);
        translate(x1, y1)
        rotate(ang)
        if ((x1 - x2) > (width / 80)) { // changes to left direction by minimum amount
          scale(1, -1)
        }
        headX = -5
        headY = 5
        image(head, headX, headY, headWidth, -headWidth)
        pop()
        rectMode(rotationMode);
        imageMode(rotationMode);
      } else {
        var calcHeadOffset = {
          x: headWidth / headOffset.xFactor,
          y: headWidth / headOffset.yFactor
        }
        if ((l.x1 - l.x2) > (width / 80)) {
          push()
          scale(-1, 1)
          // rect((-l.x2) + calcHeadOffset.x, l.y2 - calcHeadOffset.y, headWidth)
          image(head, (-x2) + calcHeadOffset.x, y2 - calcHeadOffset.y, headWidth, headWidth);
          pop()
        } else {
          // rect(l.x2 + calcHeadOffset.x, l.y2 - calcHeadOffset.y, headWidth)
          image(head, x2 + calcHeadOffset.x, y2 - calcHeadOffset.y, headWidth, headWidth);
        }
      }

    }

    // // draw the shaddow on the entrance of the egg
    // if (i == 0) {
    //   console.log('draw centershadow')
    //   for (var j = 0; j < dropShadowLoop * 2; j++) {
    //     stroke('rgba(0,0,0,0.2)')
    //     strokeWeight(j * 1.5)
    //     point(width / 2, width / 2)
    //   }
    // }
  }
}

// function drawMidLines() {
//   for (var i = 0; i < allLines.length; i++) {
//     var x1, y1, x2, y2
//     var l = allLines[i]
//     if (i == 0) {
//       x1 = l.x1
//       y1 = l.y1
//       x2 = (l.x1 + l.x2) / 2
//       y2 = (l.y1 + l.y2) / 2
//     } else {
//       var prevL = allLines[i - 1]
//       x1 = (prevL.x1 + prevL.x2) / 2
//       y1 = (prevL.y1 + prevL.y2) / 2

//       x2 = (l.x1 + l.x2) / 2
//       y2 = (l.y1 + l.y2) / 2
//     }
//     var c = allColors[i]
//     stroke("rgba(0, 0, 0, 1)")
//     strokeWeight(strokeW + 2)
//     line(x1, y1, x2, y2)
//     if (!debug) {
//       // stroke(c)
//       // strokeWeight(strokeW)
//       // line(x1, y1, x2, y2)
//     }

//   }
// }


function addLine() {
  if (presetLines.length > 0) {
    var l = presetLines.shift()
    allLines.push(l)
    allColors.unshift(setStrokeColor())
    return
  }
  if (!previousAng) {
    previousAng = Math.floor(Math.random() * 360)
  }
  var len = maxLen//pickLength()
  var angResults = wander(x, y, previousAng, angleDistanceMin, len, width, margin)
  var ang = angResults.angle

  x2 = x + Math.cos(ang * Math.PI / 180) * len
  y2 = y + Math.sin(ang * Math.PI / 180) * len
  c = setStrokeColor()

  var newLine = {
    x1: x,
    y1: y,
    x2: x2,
    y2: y2,
    ang: ang,
    len: len,
    failed: angResults.failed,
    maskedImage: false
  }
  allLines.push(newLine)
  allColors.unshift(c)

  var addToMax = animated ? 1 : 0

  if (allLines.length > maxNumberOfLines + addToMax) {
    allLines.shift()
    allColors.shift()
  }

  previousAng = ang
  x = x2
  y = y2
}



function sleep(millisecondsDuration) {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}
// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function intersects(a, b, c, d, p, q, r, s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};


// wander is the heart of the algorithm
// it takes the previous line's end point and angle and returns a new angle
// the new angle is within the maxDifferenceBetweenAngles of the previous angle
// the new angle is also within the margin of the canvas
// if the new angle doesn't work, it tries again, increasing until the worst case scenario which is 180 degrees
// it's been optimized to find a solution 100% of the time in under 
function wander(previousX, previousY, previousAngle, maxDifferenceBetweenAngles, lineLength, width, margin) {

  // maxDifferenceBetweenAngles cannot be greater than 180
  if (maxDifferenceBetweenAngles > 180) throw new Error('maxDifferenceBetweenAngles cannot be greater than 180')

  // get a random amount to change the angle by
  var angleDelta = Math.floor(Math.random() * maxDifferenceBetweenAngles)

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
    if (!outSideCanvas(newX, newY, width, margin)) {
      return { x: newX, y: newY, tries: i + 1, angle: newAngle, failed }
    }
    var randomColor = `rgb(${Math.ceil(randomNum(0, 255))}, ${Math.ceil(randomNum(0, 255))}, ${Math.ceil(randomNum(0, 255))})`
    failed.push({ changeBy, newAngle, newX, newY, randomColor })
  }
  console.log({ previousX, previousY, previousAngle, maxDifferenceBetweenAngles, lineLength, width, margin })
  console.log({ failed })
  throw new Error(`Unable to find a new point from(${previousX}, ${previousY}, ${previousAngle})`)
}

function outSideCanvas(x, y, width, margin) {
  // if (x < 0 || x > width || y < 0 || y > width) {//- margin) {
  // if (x < (margin / 2) || x > width - (margin / 2) || y < margin || y > width) {//- margin) {
  if (x < 0 - buffer || x > width + buffer || y < 0 - buffer || y > width + buffer) {//- margin) {
    return true
  }
  return false
}

function testAlgo() {
  totalTries = 0
  totalFailures = 0
  attempts = 1_000_000
  var testWidth = 800
  var testLineLength = testWidth / 10
  var testMargin = (testWidth / 10) * 1.55

  var testStartingX = testWidth - testMargin
  var testStartingY = testWidth - testMargin
  var testPreviousAngle = 45

  var maxTries = 0
  var tries = {}

  var testMaxDifferenceBetweenAngles = 30
  for (var i = 0; i < attempts; i++) {
    testStartingX = Math.floor(Math.random() * (testWidth - (testMargin * 2))) + testMargin
    testStartingY = Math.floor(Math.random() * (testWidth - (testMargin * 2))) + testMargin
    testPreviousAngle = Math.floor(Math.random() * 360)
    try {
      var results = wander(testStartingX, testStartingY, testPreviousAngle, testMaxDifferenceBetweenAngles, testLineLength, testWidth, testMargin)
      totalTries += results.tries
      tries[results.tries] = tries[results.tries] ? tries[results.tries] + 1 : 1
      if (results.tries > maxTries) maxTries = results.tries
    } catch (e) {
      totalFailures += 1
    }
  }
  // get the median
  var modeMax = 0
  var mode = 0
  for (var key in tries) {
    if (tries[key] > modeMax) {
      modeMax = tries[key]
      mode = key
    }
  }
  console.log(`----new algo-----`)
  console.log(`Max tries: ${maxTries}`)
  console.log(`Average tries: ${totalTries / attempts}`)
  console.log(`Mode: ${mode} (${tries[mode]} times)`)
  console.log(`Failures: ${totalFailures} (${Math.floor((totalFailures / attempts) * 100)}%)`)
}
// testAlgo()

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
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

module.exports = {
  setup, draw, nodePreload
}*/