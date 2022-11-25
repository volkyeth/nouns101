export const pixelatedClipPath = (pixelSize: number) => createClipPath([[0,2], [1,2], [1,1], [2,1],[2,0]],pixelSize);

type Point = [number, number]

type Quadrant = "top-left" | "top-right" | "bottom-right" | "bottom-left"
const quadrants : Quadrant[] = ["top-left" , "top-right" , "bottom-right" , "bottom-left"];

export const createClipPath = (topLeftCornerPoints: Point[], scale: number) => {
    const scaledTopLeftCornerPoints = topLeftCornerPoints.map(([x,y]) => ([x * scale, y * scale] as Point))

    return `polygon(${quadrants.map(quadrant => getPolygonPoints(scaledTopLeftCornerPoints, quadrant)).join(",")});`
}

const getPolygonPoints = (points: Point[], quadrant: Quadrant) => {
    return (quadrant !== "top-left" ? points.reverse() : points).map(([x, y]) => {
        switch (quadrant) {
            case "top-left":
                return `${x}px ${y}px`
            case "top-right":
                return `calc(100% - ${x}px) ${y}px`
            case "bottom-right":
                return `calc(100% - ${x}px) calc(100% - ${y}px)`
            case "bottom-left":
                return `${x}px calc(100% - ${y}px)`
        }
    }).join(",");
}
