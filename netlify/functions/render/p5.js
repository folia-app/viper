var x, y, width, minLen, maxLen, strokeW, margin,
  limit, angleDistanceMin, startPos, previousAng,
  strokeStyle, totalLength = 0, allLines = [], allColors = []
Error
function setParams() {
  width = 512
  minLen = width / 10
  maxLen = minLen
  strokeW = 20//minLen / 1
  margin = strokeW
  maxNumberOfLines = 100
  angleDistanceMin = 60
  startPos = "bottom"
  strokeStyle = "random"
  fps = 10
  bgColor = 255
}
function setup() {
  setParams()
  configureCanvas()
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
  strokeWeight(strokeW);
}

function draw() {
  totalLength++
  if (totalLength > maxNumberOfLines) {
    return
  }
  addLine()
  background(bgColor);
  drawLines()
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

function addDropShadow(l) {
  offset = 10
  for (var i = 1; i < 30; i++) {
    c = `rgba(0, 0, 0, 0.008)`
    stroke(c)
    strokeWeight(strokeW + i)
    line(l.x1 + offset, l.y1 + offset, l.x2 + offset, l.y2 + offset)
  }


}

function drawLines() {
  for (var i = 0; i < allLines.length; i++) {
    var l = allLines[i]
    var c = allColors[i]

    if (i == 0) {
      addDropShadow(l)
    }
    if (i != allLines.length - 1) {
      addDropShadow(allLines[i + 1])
    }

    stroke("rgba(0, 0, 0, 1)")
    strokeWeight(strokeW + 2)
    line(l.x1, l.y1, l.x2, l.y2)

    stroke(c)
    strokeWeight(strokeW)
    line(l.x1, l.y1, l.x2, l.y2)
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

  // for (var i = allLines.length; i > 0; i--) {
  //   if (i == 1) {
  //     allLines[0].color = color
  //   } else {
  //     allLines[i - 1].color = allLines[i - 2].color
  //   }
  // }

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
  }
  if (previousAng) {
    var delta = Math.ceil(random(-1 * _angleDistanceMin, _angleDistanceMin))
    var startingAngle = previousAng + delta
    if (startingAngle < 0) {
      startingAngle = 360 + startingAngle
    } else if (startingAngle > 360) {
      startingAngle = startingAngle - 360
    }
  } else {
    startingAngleMin = 0
    startingAngleMax = 360
    startingAngle = Math.ceil(random(startingAngleMin, startingAngleMax))
  }

  // try to find an angle that is not too close to the previous one
  var foundAng = false

  // if the angle is unacceptable, alternate trying to find a new one by increasing the angle or decreasing it
  // increaseLoop is 50/50 true or false
  var increaseLoop = startingAngle > 180
  // if the angle should be increased, make sure the loop starts at 0 and increases to 360
  // make sure the conditional checks if the angle is less than 360
  var j, counter, conditional
  if (increaseLoop) {
    j = 0
    counter = function (i) {
      i++
      return i
    }
    conditional = function (i) {
      return i < 360
    }
  } else {
    // if the angle should be decreased, make sure the loop starts at 360 and decreases to 0
    // make sure the conditional checks if the angle is greater than 0
    j = 360
    counter = function (i) {
      i--
      return i
    }
    conditional = function (i) {
      return i > 0
    }
  }
  for (var i = j; conditional(i); i = counter(i)) {
    ang = (startingAngle + i) % 360
    // get the new position assuming maxLen is used
    var previewX = x1 + Math.cos(ang * Math.PI / 180) * (maxLen)
    var previewY = y1 + Math.sin(ang * Math.PI / 180) * (maxLen)

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
      continue
    }
    // if there are no previous directions to compare it with, use this one
    if (previousAng == undefined) {
      foundAng = true
      break
    }

    var isWithinDistance = checkDistance(ang, previousAng, _angleDistanceMin)
    if (isWithinDistance) {
      foundAng = true
      break
    }
  }
  if (!foundAng) {
    if (parseInt(_angleDistanceMin) >= 180) {
      console.log('INCREASED TO MAX AND STILL NO SUITABLE ANG')
      return ang
    } else {
      ang = pickAngle(x1, y1, (parseInt(_angleDistanceMin) + 10))
    }
  }
  return ang
}

function checkDistance(ang1, ang2, _angleDistanceMin) {
  var distance = Math.abs(modulo(ang1, 360) - modulo(ang2, 360))
  distance = Math.min(distance, 360 - distance)
  return distance < _angleDistanceMin
}

function modulo(x, y) {
  var xPrime = x;
  while (xPrime < 0) {
    xPrime += y; // ASSUMES y > 0
  }
  return xPrime % y;
}