var x, y, width, minLen, maxLen, strokeW, margin,
  limit, angleDistanceMin, startPos, previousAng,
  strokeStyle, totalLength = 0, allLines = [], allColors = [],
  img, dropShadowColor, dropShadowLoop, c, head1, head2,
  img2, img3, img4, head, bgImg, bgImg2, bg, fps, bgColor
function setParams() {
  head = Math.random() > 0.5 ? head1 : head2
  width = 500
  minLen = width / 6
  maxLen = minLen
  strokeW = 45 //minLen / 1
  margin = 50
  maxNumberOfLines = 16
  angleDistanceMin = 60
  startPos = "center"
  strokeStyle = "randomGreen"
  fps = 5
  bgColor = "white"//"rgb(249,229,188)"
  rotationMode = CENTER
  debug = false
  animated = false
  loop = false
  keepRunning = false
  dropShadowColor = "rgba(0, 0, 0, 0.008)"
  dropShadowLoop = 20
  drawings = true
  includeShadow = true
  startingX = false // 76.09
  startingY = false // 450t.75
  startingAng = false // 182
  egg = false
  bg = "image"
}
function setup(p, p5) {
  if (p5 !== undefined) {
    preload(p5)
  }
  if (p !== undefined) {
    createCanvas = p.createCanvas
    frameRate = p.frameRate
    strokeWeight = p.strokeWeight
    imageMode = p.imageMode
    angleMode = p.angleMode
    RADIANS = p.RADIANS
    TWO_PI = p.TWO_PI
    CLOSE = p.CLOSE
    DEGREES = p.DEGREES
    ROUND = p.ROUND
    SQUARE = p.SQUARE
    CORNER = p.CORNER
    stroke = p.stroke
    strokeWeight = p.strokeWeight
    strokeCap = p.strokeCap
    fill = p.fill
    background = p.background
    line = p.line
    random = p.random
    color = p.color
    image = p.image
    text = p.text
    textSize = p.textSize
    saveCanvas = p.saveCanvas
    strokeJoin = p.strokeJoin
    rotate = p.rotate
    translate = p.translate
    push = p.push
    pop = p.pop
    noStroke = p.noStroke
    noFill = p.noFill
    rectMode = p.rectMode
    rect = p.rect
    ellipse = p.ellipse
    ellipseMode = p.ellipseMode
    textFont = p.textFont
    textAlign = p.textAlign
    arc = p.arc
    noLoop = p.noLoop
    vertex = p.vertex
    beginShape = p.beginShape
    endShape = p.endShape
    curveVertex = p.curveVertex
    bezierVertex = p.bezierVertex
    bezier = p.bezier
    CENTER = p.CENTER
  }
  setParams()
  return configureCanvas()
}
function preload(p5) {
  if (p5 !== undefined) {
    loadImage = p5.loadImage
  }
  // img = loadImage('http://localhost:8888/assets/snake_body1.png')
  // img2 = loadImage('http://localhost:8888/assets/snake_body2.png')
  // img3 = loadImage('http://localhost:8888/assets/snake_body3.png')
  // img4 = loadImage('http://localhost:8888/assets/snake_body4.png')
  // head1 = loadImage('http://localhost:8888/assets/head.png')
  // head2 = loadImage('http://localhost:8888/assets/snake_head2.png')
  // bgImg = loadImage('http://localhost:8888/assets/bg1.jpeg')
  // bgImg2 = loadImage('http://localhost:8888/assets/bg2.jpeg')
}

function configureCanvas() {
  // c = createCanvas(width, width);
  // switch (startPos) {
  //   case "bottom":
  //     x = width / 2;
  //     y = width - (margin / 2);
  //     break;
  //   case "center":
  //     x = width / 2;
  //     y = width / 2;
  // }
  // if (startingAng) {
  //   previousAng = startingAng
  // } else {
  //   startingAng = 0
  // }
  // if (startingX) {
  //   x = startingX
  // } else {
  //   startingX = x
  // }
  // if (startingY) {
  //   y = startingY
  // } else {
  //   startingY = y
  // }
  // frameRate(fps);

  // strokeWeight(strokeW);
  // imageMode(rotationMode);
  // angleMode(DEGREES);
  // strokeCap(ROUND);
  // if (debug) {
  //   strokeW = 3
  // }
  // addBackground()
  // return c
}
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;

function setGradient(x, y, w, h, c1, c2, axis) {
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

function addBackground() {
  if (debug) {
    if (totalLength == 0) {
      addCartesian()
    }
  } else {
    if (bg == "solid") {
      background(bgColor);
    } else if (bg == "gradient") {
      b1 = color(255);
      b2 = color(0);
      setGradient(0, 0, width, height, b1, b2, Y_AXIS);
    } else if (bg == "image") {
      console.log('set image', width)
      image(bgImg2, width / 2, width / 2, width, width);
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
      star(0, -100, 25, 50, 5)
      pop()
    }

  }
}

function star(x, y, radius1, radius2, npoints) {
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
function addCartesian() {
  background(bgColor);
  textSize(16);
  strokeWeight(3)
  stroke(0)
  line(width / 2, 0, width / 2, width)
  line(0, width / 2, width, width / 2)
  strokeWeight(1)
  for (var i = 0; i < width; i += 50) {
    line(i, 0, i, width)
    stroke(11)
    strokeWeight(0)
    strokeWeight(1)
    line(0, i, width, i)
  }
  line(margin, margin, width - margin, margin)
  line(width - margin, margin, width - margin, width - margin)
  line(width - margin, width - margin, margin, width - margin)
  line(margin, width - margin, margin, margin)

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

  // stroke("red")
  // for (var i = 0; i < 8; i++) {
  //   var cardinalX = (width / 2) + Math.cos(((i * 45)) * Math.PI / 180) * 500
  //   var cardinalY = (width / 2) + Math.sin(((i * 45)) * Math.PI / 180) * 500
  //   line(width / 2, width / 2, cardinalX, cardinalY)
  // }

}


async function draw() {
  totalLength++
  if (!keepRunning) {
    if (totalLength > (maxNumberOfLines * (animated ? 2 : 1))) {
      if (loop) {
        totalLength = 0
        allLines = []
        allColors = []
        x = startingX
        y = startingY
        previousAng = startingAng
        addBackground()
      }
      return
    }
  }
  addBackground()
  // if totalLength is odd
  if (totalLength % 2 || !animated) {
    addLine()
    if (animated && !drawings) {
      drawMidLines()
    }
  } else {
    drawLines()
  }
  if (!animated) {
    if (!drawings) {
      drawLines()
    } else {
      // drawLines()
      drawImgs()
    }
  }
  // get date time as string
  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
  var date = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
  // draw date time in white
  fill(255);;
  noStroke();
  textSize(16);
  text(date, 10, 35);
  text(time, 10, 50);

  // save image
  saveCanvas(date + time, 'png');

}
function setStrokeColor() {
  var c
  switch (strokeStyle) {
    case "random":
      c = [random(255), random(255), random(255)]
      break;
    case "gettingDarker":
      var percentageOfTotal255 = ((totalLength / maxNumberOfLines) * 255)
      c = [percentageOfTotal255, percentageOfTotal255, percentageOfTotal255]
      break;
    case "randomGreen":
    default:
      c = [0, random(100, 200), 0]
      break;
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
    arc(l.x1, l.y1, diameter, diameter, l.ang + 90, l.ang - 90);
    noFill()

    startDropShadow(i)
    vertex(l.x1, l.y1)
    vertex((l.x1 + l.x2) / 2, (l.y1 + l.y2) / 2);
    endShape();
  }
}

function addDropShadowEnd(l) {
  for (var i = 1; i < dropShadowLoop; i++) {

    startDropShadow(i)
    // strokeCap(ROUND);
    vertex((l.x1 + l.x2) / 2, (l.y1 + l.y2) / 2);
    vertex(l.x2, l.y2)
    endDropShadow()

    strokeWeight(0)
    fill(dropShadowColor)
    var diameter = getShadowWeight(i)
    arc(l.x2, l.y2, diameter, diameter, l.ang - 90, l.ang + 90);
    noFill()
  }
}

function addDropShadow2(l, l2) {
  for (var i = 0; i < dropShadowLoop; i++) {
    startDropShadow(i)

    vertex((l.x1 + l.x2) / 2, (l.y1 + l.y2) / 2);
    vertex(l.x2, l.y2);
    vertex((l2.x1 + l2.x2) / 2, (l2.y1 + l2.y2) / 2);

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

function drawImgs() {
  for (var i = 0; i < allLines.length; i++) {
    // start new relative translation and rotation
    var l = allLines[i]
    if (includeShadow) {
      addDropShadow(i, allLines)
    }
    push()
    var xDist = Math.abs(l.x2 - l.x1)
    var yDist = Math.abs(l.y2 - l.y1)
    var fractionOfTotal = 1 / 2
    var p = {
      x: l.x1 + ((l.x2 < l.x1 ? -1 : 1) * xDist) * fractionOfTotal,
      y: l.y1 + ((l.y2 < l.y1 ? -1 : 1) * yDist) * fractionOfTotal
    }
    translate(p.x, p.y);
    rotate(l.ang)

    // get the index of the item in allLines as the opposite of the position in the array
    var index = allLines.length - i - 1
    var flip = index % 4
    switch (flip) {
      case 0:
        flip1 = true
        flip2 = true
        segColor = "red"
        pic = img
        break;
      case 1:
        flip1 = false
        flip2 = true
        segColor = "green"
        pic = img2
        break;
      case 2:
        flip1 = true
        flip2 = false
        segColor = "orange"
        pic = img4
        break;
      case 3:
        flip1 = false
        flip2 = false
        segColor = "yellow"
        pic = img3
        break;
    }
    push()
    scale(flip1 ? -1 : 1, flip2 ? -1 : 1)
    // tint(segColor)
    // tint(allColors[i][0], allColors[i][1], allColors[i][2])
    image(pic, 0, 0, l.len, strokeW);
    pop()


    // revert to original translation and rotation
    pop()

    // draw the head
    if (i == allLines.length - 1) {
      if (l.x2 < l.x1) {//} && (l.x1 - l.x2) > margin) {
        push()
        scale(-1, 1)
        image(head, -l.x2 + 30, l.y2 - 30, 70, 70);
        pop()
      } else {
        image(head, l.x2 + 30, l.y2 - 30, 70, 70);
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

function drawMidLines() {
  for (var i = 0; i < allLines.length; i++) {
    var x1, y1, x2, y2
    var l = allLines[i]
    if (i == 0) {
      x1 = l.x1
      y1 = l.y1
      x2 = (l.x1 + l.x2) / 2
      y2 = (l.y1 + l.y2) / 2
    } else {
      var prevL = allLines[i - 1]
      x1 = (prevL.x1 + prevL.x2) / 2
      y1 = (prevL.y1 + prevL.y2) / 2

      x2 = (l.x1 + l.x2) / 2
      y2 = (l.y1 + l.y2) / 2
    }
    var c = allColors[i]
    stroke("rgba(0, 0, 0, 1)")
    strokeWeight(strokeW + 2)
    line(x1, y1, x2, y2)
    if (!debug) {
      stroke(c)
      strokeWeight(strokeW)
      line(x1, y1, x2, y2)
    }

  }
}

function drawLines() {
  // var diff = Math.floor(strokeW / allLines.length)

  for (var i = 0; i < allLines.length; i++) {
    var l = allLines[i]
    var c = allColors[i]
    if (!debug) {
      addDropShadow(i, allLines)
    }
    stroke("black")
    // make segmentWeight a fraction of the length of allLines

    var segmentWeight = strokeW / 1.75 // strokeW - ((allLines.length - 1 - i) * diff)
    strokeWeight(segmentWeight + 2)
    line(l.x1, l.y1, l.x2, l.y2)
    if (!debug) {
      stroke(c)
      strokeWeight(segmentWeight)
      line(l.x1, l.y1, l.x2, l.y2)
    }
  }
}


function addLine() {
  var ang = pickAngle(x, y, angleDistanceMin)
  var len = pickLength()
  x2 = x + Math.cos(ang * Math.PI / 180) * len
  y2 = y + Math.sin(ang * Math.PI / 180) * len
  c = setStrokeColor()


  var newLine = {
    x1: x,
    y1: y,
    x2: x2,
    y2: y2,
    ang: ang,
    len: len
  }
  allLines.push(newLine)
  allColors.unshift(c)

  if (allLines.length > maxNumberOfLines) {
    allLines.shift()
    allColors.shift()
  }

  previousAng = ang
  x = x2
  y = y2
}

function pickLength() {
  return Math.ceil(random(minLen - 1, maxLen))
}

function pickAngle(x1, y1, _angleDistanceMin) {

  if (isNaN(_angleDistanceMin)) {
    _angleDistanceMin = 0
  } else if (_angleDistanceMin > 180) {
    _angleDistanceMin = 180
  }
  var startingAngle
  if (previousAng) {
    var delta = Math.ceil(random(-1 * _angleDistanceMin, _angleDistanceMin))
    if (debug) {
      console.log({ x1, y1, previousAng, _angleDistanceMin, delta })
    }
    var startingAngle = previousAng + delta
    if (startingAngle < 0) {
      startingAngle = 360 + startingAngle
    } else if (startingAngle > 360) {
      startingAngle = startingAngle - 360
    }
    if (debug) {
      strokeWeight(0)
      fill("rgba(0,0,255,0.2)")
      arc(x1, y1, 100, 100, previousAng - _angleDistanceMin, previousAng + _angleDistanceMin);
    }
    fill("black")

  } else {
    startingAngle = Math.ceil(random(0, 360))
  }

  // try to find an angle that is not too close to the previous one
  var foundAng = false

  // if the eventual angle (ang) is unacceptable, we will attempt to increase or decrease
  // the ang until an acceptable one is found  
  // increaseLoop determines whether we increase or decrease and has a 50/50 chance of being true or false
  var increaseLoop = startingAngle > 180
  if (debug) {
    var strokeColor = `rgb(${Math.ceil(random(0, 255))},${Math.ceil(random(0, 255))},${Math.ceil(random(0, 255))})`
  }
  let loopThroughResults1 = loopThroughAngles(x1, y1, previousAng, startingAngle, increaseLoop, _angleDistanceMin, strokeColor)
  if (debug) {
    console.log(`loopThroughResults1 ${loopThroughResults1.foundAng ? 'succeeded' : 'failed'} (ang = ${loopThroughResults1.ang})`)
  }
  if (!loopThroughResults1.foundAng) {
    increaseLoop = !increaseLoop
    loopThroughResults2 = loopThroughAngles(x1, y1, previousAng, startingAngle, increaseLoop, _angleDistanceMin, strokeColor)
    if (debug) {
      console.log(`loopThroughResults2 ${loopThroughResults2.foundAng ? 'succeeded' : 'failed'} (ang = ${loopThroughResults2.ang})`)
    }
    ang = loopThroughResults2.ang
    foundAng = loopThroughResults2.foundAng
  } else {
    ang = loopThroughResults1.ang
    foundAng = loopThroughResults1.foundAng
  }

  if (!foundAng) {
    if (parseInt(_angleDistanceMin) > 180) {
      console.log({ x, y, previousAng })
      loop = false
      throw new Error('INCREASED TO MAX AND STILL NO SUITABLE ANG')
    } else {
      // incrementBy should be increased maximum 3 times and on the last time equal 180 regardless of original angleDistanceMin
      var incrementBy = (180 - angleDistanceMin) / 3
      ang = pickAngle(x1, y1, (parseInt(_angleDistanceMin) + (incrementBy)))
    }
  }
  return ang
}
const ANGLE_CONST = Math.PI / 180
function loopThroughAngles(x1, y1, previousAng, startingAngle, increaseLoop, _angleDistanceMin, strokeColor) {
  const angleIncrement = 33;

  let ang = startingAngle;
  let foundAng = false;
  let incrementUntil;

  if (!isNaN(previousAng)) {
    incrementUntil = Math.ceil(getAngleDifference(previousAng - _angleDistanceMin, startingAngle) / angleIncrement);
  } else {
    incrementUntil = Math.ceil(180 / angleIncrement);
  }

  for (let i = 0; i <= incrementUntil; i++) {
    const isIncreasing = increaseLoop ? 1 : -1;
    ang = (startingAngle + i * angleIncrement * isIncreasing + 360) % 360;

    const previewX = x1 + Math.cos(ang * ANGLE_CONST) * maxLen;
    const previewY = y1 + Math.sin(ang * ANGLE_CONST) * maxLen;
    if (debug) {
      console.log(`attempt ang ${ang} by changing by ${i}`)
      strokeWeight(20)
      stroke('red')
      point(x1, y1)
      stroke('blue')
      strokeWeight(0)
      fill("blue")
      text(`${Math.floor(x1)}, ${Math.floor(y1)}`, x1 + 5, y1 - 5)
      stroke(strokeColor)
      strokeWeight(3)
      line(x1, y1, previewX, previewY)
      strokeWeight(0)
      fill("blue")
      halfX = x1 > previewX ? x1 - ((x1 - previewX) / 2) : previewX - ((previewX - x1) / 2)
      halfY = y1 > previewY ? y1 - ((y1 - previewY) / 2) : previewY - ((previewY - y1) / 2)
      text(k, halfX, halfY);
    }

    if (previewX > (width - margin) || previewX < (0 + margin) || previewY > (width - margin) || previewY < (0 + margin)) {
      if (debug) {
        console.log(`new point ${previewX},${previewY} is too close`)
      }
      continue;
    }

    if (previousAng !== undefined && !checkDistance(ang, previousAng, _angleDistanceMin)) {
      break;
    }

    foundAng = true;
    break;
  }

  return { foundAng, ang };
}


function getAngleDifference(ang1, ang2) {
  var distance = Math.abs(modulo(ang1, 360) - modulo(ang2, 360))
  distance = Math.min(distance, 360 - distance)
  return distance
}

function checkDistance(ang1, ang2, _angleDistanceMin) {
  var distance = getAngleDifference(ang1, ang2)
  if (debug) {
    console.log(`distance between ${ang1} and ${ang2} is ${distance} (min ${_angleDistanceMin})`)
  }
  return distance <= _angleDistanceMin
}

function modulo(x, y) {
  var xPrime = x;
  while (xPrime < 0) {
    xPrime += y; // ASSUMES y > 0
  }
  return xPrime % y;
}
// function sleep(millisecondsDuration) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, millisecondsDuration);
//   })
// }

// export preload, setup and draw
module.exports = { preload, setup, draw }