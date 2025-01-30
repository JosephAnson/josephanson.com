import { computeControlPoints } from './bezier-spline'

interface InitData {
  height: number
  width: number
  segmentCount: number
  layerCount: number
  variance: number
}

interface Point {
  x: number
  y: number
}

function generatePoints(
  width: number,
  height: number,
  segmentCount: number,
  layerCount: number,
  variance: number,
): Point[][] {
  const cellWidth = width / segmentCount
  const cellHeight = height / layerCount
  const moveLimitX = cellWidth * variance * 0.5
  const moveLimitY = cellHeight * variance

  const points: Point[][] = []
  let layerIdx = 1

  let y = moveLimitY

  while (layerIdx < layerCount) {
    const pointsPerLayer = []
    pointsPerLayer.push({
      x: 0,
      y: Math.floor(y),
    })

    for (let x = cellWidth; x < width; x += cellWidth) {
      // @anup: this decides whether a segment is crest or trough
      const varietalY = y - moveLimitY / 2 + Math.random() * moveLimitY
      const varietalX = x - moveLimitX / 2 + Math.random() * moveLimitX

      pointsPerLayer.push({
        x: Math.floor(varietalX),
        y: Math.floor(varietalY),
      })
    }

    pointsPerLayer.push({
      x: width,
      y: Math.floor(y),
    })

    points.push(pointsPerLayer)
    y += cellHeight
    layerIdx += 1
  }
  return points
}

function generateClosedPath(
  curvePoints: Point[],
  leftCornerPoint: Point,
  rightCornerPoint: Point,
  animationPoints: Point[][],
) {
  const xPoints = curvePoints.map(p => p.x)
  const yPoints = curvePoints.map(p => p.y)
  const xControlPoints = computeControlPoints(xPoints)
  const yControlPoints = computeControlPoints(yPoints)

  // Start the path from the left bottom corner
  let path = `M ${leftCornerPoint.x},${leftCornerPoint.y} `

  // Initial line to the first point
  path += `L ${xPoints[0]},${yPoints[0]} `

  // Creating the Bézier curve for the rest of the points
  for (let i = 0; i < xPoints.length - 1; i++)
    path += `C ${xControlPoints.p1[i]},${yControlPoints.p1[i]} ${xControlPoints.p2[i]},${yControlPoints.p2[i]} ${xPoints[i + 1]},${yPoints[i + 1]} `

  // Closing the path back to the right bottom corner and then to the left bottom corner
  path += `L ${rightCornerPoint.x},${rightCornerPoint.y} L ${leftCornerPoint.x},${leftCornerPoint.y} Z`

  // Handle the animated path, if applicable
  const animatedPaths = animationPoints.map((points) => {
    const aniXPoints = points.map(p => p.x)
    const aniYPoints = points.map(p => p.y)
    const aniXControlPoints = computeControlPoints(aniXPoints)
    const aniYControlPoints = computeControlPoints(aniYPoints)

    let animatedPath = `M ${leftCornerPoint.x},${leftCornerPoint.y} L ${aniXPoints[0]},${aniYPoints[0]} `

    for (let i = 0; i < aniXPoints.length - 1; i++)
      animatedPath += `C ${aniXControlPoints.p1[i]},${aniYControlPoints.p1[i]} ${aniXControlPoints.p2[i]},${aniYControlPoints.p2[i]} ${aniXPoints[i + 1]},${aniYPoints[i + 1]} `

    animatedPath += `L ${rightCornerPoint.x},${rightCornerPoint.y} L ${leftCornerPoint.x},${leftCornerPoint.y} Z`
    return animatedPath
  })

  return {
    d: path,
    animatedPath: animatedPaths,
  }
}

export class Wavery {
  private properties: InitData
  private points: Point[][]
  private aniPoints: Point[][][]

  constructor(properties: InitData) {
    this.properties = properties
    this.points = generatePoints(
      this.properties.width,
      this.properties.height,
      this.properties.segmentCount,
      this.properties.layerCount,
      this.properties.variance,
    )

    this.aniPoints = Array.from({ length: 12 }, () =>
      generatePoints(
        this.properties.width,
        this.properties.height,
        this.properties.segmentCount,
        this.properties.layerCount,
        this.properties.variance,
      ))
  }

  generateSvg() {
    return this.points.map((pointLayer, i) =>
      generateClosedPath(
        pointLayer,
        { x: 0, y: this.properties.height },
        { x: this.properties.width, y: this.properties.height },
        this.aniPoints.map(aniPoint => aniPoint[i]),
      ),
    )
  }
}

export function waveInit(data: InitData) {
  const wavery = new Wavery(data)
  return wavery.generateSvg()
}
