var x, y, width, minLen, maxLen, strokeW, margin,
  limit, angleDistanceMin, startPos, previousAng,
  strokeStyle, totalLength = 0, allLines = [], allColors = [],
  img
Error
function setParams() {
  width = 500
  minLen = width / 5
  maxLen = minLen
  strokeW = 25 //minLen / 1
  margin = strokeW
  maxNumberOfLines = 50
  angleDistanceMin = 60
  startPos = "center"
  strokeStyle = "random"
  fps = 10
  bgColor = 255
  rotationMode = CENTER
  debug = false
  animated = false
}
function setup() {
  setParams()
  configureCanvas()
}
function preload() {
  img = loadImage('http://localhost:8888/assets/snake_body1.png');
  // img = loadImage('http://localhost:8888/assets/black-semi-opaque.png');
  // img = loadImage('http://localhost:8888/assets/rounded.png');
}

function configureCanvas() {
  createCanvas(width, width);
  switch (startPos) {
    case "bottom":
      x = width / 2;
      y = width - (margin / 2);
      break;
    case "center":
      x = width / 2;
      y = width / 2;
  }
  frameRate(fps);
  background(bgColor);
  addCartesian()
  strokeWeight(strokeW);
  imageMode(rotationMode);
  angleMode(DEGREES);
  strokeCap(ROUND);
  if (debug) {
    strokeW = 3
  }

}
function addCartesian() {
  if (debug) {
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
      // text(i, i, (width / 2) + 5)
      // text(i, (width / 2) + 5, i)
      strokeWeight(1)
      line(0, i, width, i)
    }
    // change color to green
    // stroke(0, 255, 0)
    // draw lines around the margin

    line(margin, margin, width - margin, margin)
    line(width - margin, margin, width - margin, width - margin)
    line(width - margin, width - margin, margin, width - margin)
    line(margin, width - margin, margin, margin)


    // strokeWeight(2)

    // stroke("green")
    // for (var i = 0; i < 12; i++) {
    //   var cardinalX = (width / 2) + Math.cos(((i * 30)) * Math.PI / 180) * 500
    //   var cardinalY = (width / 2) + Math.sin(((i * 30)) * Math.PI / 180) * 500
    //   line(width / 2, width / 2, cardinalX, cardinalY)
    // }

    // stroke("red")
    // for (var i = 0; i < 8; i++) {
    //   var cardinalX = (width / 2) + Math.cos(((i * 45)) * Math.PI / 180) * 500
    //   var cardinalY = (width / 2) + Math.sin(((i * 45)) * Math.PI / 180) * 500
    //   line(width / 2, width / 2, cardinalX, cardinalY)
    // }

  }
}


async function draw() {
  totalLength++
  if (totalLength > (maxNumberOfLines * (animated ? 2 : 1))) {
    return
  }
  if (!debug) {
    background(bgColor);
    addCartesian()
  }
  // if totalLength is odd
  if (totalLength % 2 || !animated) {
    addLine()
    if (animated) {
      drawMidLines()
    }
  } else {
    drawLines()
  }
  if (!animated) {
    drawLines()
  }
  // await sleep((60 / fps) * 1000)
  // drawImgs()
}
function setStrokeColor() {
  var color
  switch (strokeStyle) {
    case "random":
      color = [random(255), random(255), random(255)]
      break;
    case "gettingDarker":
      var percentageOfTotal255 = ((totalLength / maxNumberOfLines) * 255)
      color = [percentageOfTotal255, percentageOfTotal255, percentageOfTotal255]
      break;
    case "randomGreen":
    default:
      color = [0, random(100, 200), 0]
      break;
  }
  return color
}

function getShadowWeight(i) {
  return (strokeW * 1.25) + (i * 1)
}
var dropShadowColor = "rgba(0, 0, 0, 0.008)"
var dropShadowLoop = 20


function startDropShadow(i) {
  // noFill();
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

function addDropShadow(l) {
  offset = 0
  for (var i = 1; i < 30; i++) {
    stroke(dropShadowColor)
    strokeWeight(strokeW + i)
    line(l.x1 + offset, l.y1 + offset, l.x2 + offset, l.y2 + offset)
  }


}

function drawImgs() {
  for (var i = 0; i < allLines.length; i++) {
    // start new relative translation and rotation
    var l = allLines[i]
    addDropShadow(l)

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
    off = 0
    image(img, -off, 0, minLen + (off * 2), strokeW + off);
    // revert to original translation and rotation
    pop()
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
    // if (!debug) {
    //   if (i == 0) {
    //     addDropShadowTip(l)
    //     // addDropShadow(l)
    //   }
    //   if (i != allLines.length - 1) {
    //     // addDropShadow(allLines[i + 1])
    //     addDropShadow2(allLines[i], allLines[i + 1])
    //   }
    //   if (i == allLines.length - 1) {
    //     addDropShadowEnd(l)
    //   }
    // }
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
  for (var i = 0; i < allLines.length; i++) {
    var l = allLines[i]
    var c = allColors[i]
    if (!debug) {
      if (i == 0) {
        addDropShadowTip(l)
        // addDropShadow(l)
      }
      if (i != allLines.length - 1) {
        // addDropShadow(allLines[i + 1])
        addDropShadow2(allLines[i], allLines[i + 1])
      }
      if (i == allLines.length - 1) {
        addDropShadowEnd(l)
      }
    }
    stroke("rgba(0, 0, 0, 1)")
    strokeWeight(strokeW + 2)
    line(l.x1, l.y1, l.x2, l.y2)
    if (!debug) {
      stroke(c)
      strokeWeight(strokeW)
      line(l.x1, l.y1, l.x2, l.y2)
    }
  }
}


function addLine() {
  var ang = pickAngle(x, y, angleDistanceMin)
  var len = pickLength()
  x2 = x + Math.cos(ang * Math.PI / 180) * len
  y2 = y + Math.sin(ang * Math.PI / 180) * len
  color = setStrokeColor()


  var newLine = {
    x1: x,
    y1: y,
    x2: x2,
    y2: y2,
    ang: ang,
    len: len
  }
  allLines.push(newLine)
  allColors.unshift(color)

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

  let loopThroughResults1 = loopThroughAngles(x1, y1, previousAng, startingAngle, increaseLoop, _angleDistanceMin)
  if (debug) {
    console.log(`loopThroughResults1 ${loopThroughResults1.foundAng ? 'succeeded' : 'failed'} (ang = ${loopThroughResults1.ang})`)
  }
  if (!loopThroughResults1.foundAng) {
    increaseLoop = !increaseLoop
    loopThroughResults2 = loopThroughAngles(x1, y1, previousAng, startingAngle, increaseLoop, _angleDistanceMin)
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
    if (parseInt(_angleDistanceMin) >= 180) {
      console.log('INCREASED TO MAX AND STILL NO SUITABLE ANG')
      return ang
    } else {
      ang = pickAngle(x1, y1, (parseInt(_angleDistanceMin) + 45))
    }
  }
  return ang
}

function loopThroughAngles(x1, y1, previousAng, startingAngle, increaseLoop, _angleDistanceMin) {



  var ang
  var foundAng = false
  if (debug) {
    var strokeColor = `rgb(${Math.ceil(random(0, 255))},${Math.ceil(random(0, 255))},${Math.ceil(random(0, 255))})`
  }

  var k = 0

  var incrementUntil = 180
  if (!isNaN(previousAng)) {
    if (increaseLoop) {
      incrementUntil = getAngleDifference(startingAngle, previousAng + _angleDistanceMin)
    } else {
      incrementUntil = getAngleDifference(previousAng - _angleDistanceMin, startingAngle)
    }
    console.log(`when ${increaseLoop ? 'incrementing, add' : 'decrementing, remove'} ${incrementBy} to/from ${startingAngle} until ${incrementUntil} have been ${increaseLoop ? 'added' : 'removed'}}`)
  } else {
    console.log(`first angle attempt is ${startingAngle}`)
  }
  var incrementBy = Math.ceil((_angleDistanceMin) / 3)

  for (var i = 0; i < incrementUntil; i += incrementBy) {
    k++
    if (k > 6) {
      console.log({ k })
      throw new Error("too many attempts")
    }
    if (increaseLoop) {
      ang = (startingAngle + i) % 360
    } else {
      ang = (startingAngle - i)
      if (ang < 0) {
        ang = 360 + ang
      }
    }

    console.log(`attempt ang ${ang} by changing by ${i}`)

    // get the new position assuming maxLen is used
    var previewX = x1 + Math.cos(ang * Math.PI / 180) * (maxLen)
    var previewY = y1 + Math.sin(ang * Math.PI / 180) * (maxLen)
    if (debug) {
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
      text(k, halfX + 15, halfY + 15);
    }
    // if the new position is outside the canvas plus some margin, skip this angle
    if (
      previewX > (width - (margin))
      ||
      previewX < (0 + (margin))
      ||
      previewY > (width - (margin))
      ||
      previewY < (0 + (margin))
    ) {
      console.log('new point too close')
      continue
    }
    // if there are no previous directions to compare it with, use this one
    if (previousAng == undefined) {
      foundAng = true
      break
    }

    var isWithinDistance = checkDistance(ang, previousAng, _angleDistanceMin)
    if (!isWithinDistance) {
      break
    }

    foundAng = true
    break
  }
  return { foundAng, ang }
}

function getAngleDifference(ang1, ang2) {
  var distance = Math.abs(modulo(ang1, 360) - modulo(ang2, 360))
  distance = Math.min(distance, 360 - distance)
  return distance
}

function checkDistance(ang1, ang2, _angleDistanceMin) {
  var distance = getAngleDifference(ang1, ang2)
  console.log(`distance between ${ang1} and ${ang2} is ${distance} (min ${_angleDistanceMin})`)
  return distance <= _angleDistanceMin
}

function modulo(x, y) {
  var xPrime = x;
  while (xPrime < 0) {
    xPrime += y; // ASSUMES y > 0
  }
  return xPrime % y;
}
function sleep(millisecondsDuration) {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}