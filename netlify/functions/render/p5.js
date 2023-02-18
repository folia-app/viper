function setup() {
  width = 400
  margin = 20
  minLen = width / 10
  maxLen = minLen
  strokeW = width / 15
  limit = 35
  infiniteEdges = false
  searchAttempts = 200
  createCanvas(width, width);

  //start in middle of screen
  x = width / 2;
  y = width - minLen;

  maxPreviousDirs = 1
  previousDirs = []
  //make the simulation faster
  frameRate(10);
  background(220);
  totalLength = 0
  line(width / 2, 0, width / 2, width)
  line(0, width / 2, width, width / 2)
  line(0, 0, width, width)
  line(0, width, width, 0)
  start1 = random(0, 255)
  start2 = random(0, 255)
  start3 = random(0, 255)
}


function draw() {
  totalLength++
  if (totalLength > limit) {
    return
  }
  strokeWeight(strokeW);
  stroke(random(0, 255), random(0, 255), random(0, 255));
  var percentageOfTotal255 = ((totalLength / limit) * 255)
  // stroke(
  //   (start1 - percentageOfTotal255),
  //   (start2 - percentageOfTotal255),
  //   (start3 - percentageOfTotal255),
  // );
  // randomXY()
  randomVector()
}


function randomVector() {
  // pick a direction
  // make sure it's not too close to the previous direction
  // if the wall is nearby, allow it to go closer to previous direction
  // pick a length
  // calculate the x,y of the new point
  // draw the line
  let { ang, L, x2, y2 } = pickDir(x, y, previousDirs)
  // console.log({ ang, L, x2, y2 })
  line(x, y, x2, y2)
  x = x2
  y = y2
}

function pickDir(x1, y1, previousDirs) {
  // console.log({ previousDirs })
  var emergencyLimit = 10000
  var numberOfTries = 10000
  var reduceBy = 0
  var foundAng = false
  while (!foundAng) {
    emergencyLimit -= 1
    if (emergencyLimit < 0) {
      console.log('emergency limit reached')
      break
    }
    // ang = Math.ceil(random(0, 8)) * 45
    ang = Math.ceil(random(0, 360))

    var previewX = x1 + Math.cos(ang * Math.PI / 180) * (maxLen)
    var previewY = y1 + Math.sin(ang * Math.PI / 180) * (maxLen)
    if (
      previewX > (width - (maxLen))
      ||
      previewX < (0 + (maxLen))
      ||
      previewY > (width - (maxLen))
      ||
      previewY < (0 + (maxLen))
    ) {
      continue
    }

    if (previousDirs.length == 0) {
      foundAng = true
      break
    }
    if (previousDirs.length - reduceBy < 0) {
      console.log('emergency limit reached')
      break
    }
    for (var i = 0; i < previousDirs.length; i++) {
      var previousDir = previousDirs[i]
      // var invertedPreviousDir = (previousDir + 180) % 360
      var distance = Math.abs(modulo(previousDir, 360) - modulo(ang, 360))
      distance = Math.min(distance, 360 - distance)


      if (distance < 60) {
        // console.log(`distance between ${previousDir} and ${ang} is ${distance} which is less than 90`)
        foundAng = true
        break
      }
    }
    if (!foundAng) {
      numberOfTries -= 1
      if (numberOfTries < 0) {
        console.log(`previousDirs are ${previousDirs.toString()}`)
        console.log(`ang is ${ang} and distance is ${distance} which is more than 90`)
        numberOfTries = 5
        reduceBy += 1
      }
    }
  }
  // console.log(`found ang is ${ang}`)
  // console.log(`distance between ${previousDir} and ${ang} is ${distance}`)

  previousDirs.push(ang)
  // console.log(previousDirs.toString())
  if (previousDirs.length > maxPreviousDirs) {
    previousDirs.shift()
  }



  L = Math.ceil(random(minLen - 1, maxLen))
  x2 = x1 + Math.cos(ang * Math.PI / 180) * L
  y2 = y1 + Math.sin(ang * Math.PI / 180) * L

  if (x2 > width) {
    x2 = width
  } else if (x2 < 0) {
    x2 = 0
  }
  if (y2 > width) {
    y2 = width
  } else if (y2 < 0) {
    y2 = 0
  }
  return { ang, L, x2, y2 }
}



function randomXY() {

  let foundNextMove = false
  let preventInfLoop = 0
  var newX, newY, minEdge, maxEdge
  while (!foundNextMove) {

    preventInfLoop += 1
    if (preventInfLoop > searchAttempts) {
      console.log("infinite loop reached")
      foundNextMove = true
    }

    //randomly move
    var [newX, minEdge, maxEdge] = getNext(x)
    if (minEdge || maxEdge && !infiniteEdges) {
      continue
    }
    var [newY, minEdge, maxEdge] = getNext(y)
    if (minEdge || maxEdge && !infiniteEdges) {
      continue
    }
    // don't let the both deltas be 0
    if (Math.abs(newX - x) < minLen && Math.abs(newY - y) < minLen) {
      // console.log('skip this one?')
      // continue
    }
    rad = getRad(x, y, newX, newY)
    console.log({ rad })
    deg = getDeg(rad)
    console.log({ deg })
    // console.log({ rad })
    // console.log({ deg })
    // console.log({ previousDirs })
    var notTooClose = true
    for (var i = 0; i < previousDirs.length; i++) {
      console.log(`actual previous dir is ${previousDirs[i]}`)
      var previousDir = previousDirs[i]
      var invertedPreviousDir = (previousDir + 180) % 360
      console.log('invertedPreviousDir is ' + invertedPreviousDir)
      var distance = Math.abs(modulo(previousDir, 360) - modulo(deg, 360))
      console.log(`new direction is ${deg}`)
      distance = Math.min(distance, 360 - distance)
      console.log(`distance between ${invertedPreviousDir} and ${deg} is ${distance}`)
      if (distance > 90) {
        notTooClose = false
      }
    }
    if (notTooClose) {
      previousDirs.push(deg)
      if (previousDirs.length > 3) {
        previousDirs.shift()
      }
      foundNextMove = notTooClose
    }
    console.log('after awhile')

  }


  //draw the point
  line(x, y, newX, newY);

  if (infiniteEdges) {
    if (newX == 0) {
      newX = width
    } else if (newX == width) {
      newX = 0
    }
    if (newY == 0) {
      newY = width
    } else if (newY == width) {
      newY = 0
    }
  }

  x = newX
  y = newY
}

function getNext(prev) {
  let nextNeg = random(-1, 1) < 0
  let next = prev + ((nextNeg ? -1 : 1) * Math.ceil(random(-1, maxLen)))

  let min = false
  let max = false

  //prevent going off left or right
  if (next < 0) {
    next = 0;
    min = true
  }
  if (next > width) {
    next = width;
    max = true
  }
  return [next, min, max]
}

function modulo(x, y) {
  var xPrime = x;
  while (xPrime < 0) {
    xPrime += y; // ASSUMES y > 0
  }
  return xPrime % y;
}

function radToCompass(num) {
  const inc = Math.PI / 4
  const val = Math.floor((num / inc) + 0.5)
  const arr = ["NN", "NE", "EE", "SE", "SS", "SW", "WW", "NW"]
  return arr[(val % 8)]
}

function getRad(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1)
}

function getDeg(rad) {
  return rad * 180 / Math.PI + 180
}

function getDir(x1, y1, x2, y2) {
  const radian = Math.atan2(y2 - y1, x2 - x1);
  return radToCompass(radian)
  const degree = (radian * 180) / Math.PI;
  console.log({ degree })
  const direction = Math.round(degree / 45);
  console.log({ direction })
  switch (direction) {
    case 0:
      return 'E';
    case 1:
      return 'SE';
    case 2:
      return 'S';
    case 3:
      return 'SW';
    case 4:
      return 'W';
    case -4:
      return 'W';
    case -3:
      return 'NW';
    case -2:
      return 'N';
    case -1:
      return 'NE';
    default:
      throw new Error(`Unknown direction ${direction}`)
  }
}