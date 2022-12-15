import React from "react"
import ContentLoader from "react-content-loader"

const JourneySkeleton = () => {
    const windowInnerWidth = window.innerWidth - 60
    let scale = 1
    let height = 200
    const scaleDistance = 0.7
    if (windowInnerWidth > 640) {
        scale = 2
        height = 270
    }
    const imageWidth = 96 * scale
    const paddingTop = 15 * scale + 4 * scale
    const color = "#f3f3f3"
    const skeleton = <ContentLoader
        speed={2}
        width={windowInnerWidth}
        height={height}
        viewBox={`0 0 ${windowInnerWidth} ${height}`}
        backgroundColor={color}
        foregroundColor="#ecebeb"
    >
        <rect x="0" y={paddingTop - 20 * scale} rx="3" ry="3" width={windowInnerWidth - 70} height={1} />

        <rect x="0" y={paddingTop} rx="3" ry="3" width={imageWidth} height={imageWidth} />
        <rect x={imageWidth + 38 + 2 * scale} y={paddingTop} rx="3" ry="3" width="100" height="14" />
        <rect x={imageWidth + 38 + 2 * scale} y={paddingTop + 22} rx="3" ry="3" width="190" height="14" />
        <rect x={imageWidth + 38 + 2 * scale} y={paddingTop + 44} rx="3" ry="3" width="100" height="14" />
        <rect x={imageWidth + 18 + 2 * scale} y={paddingTop + 70} rx="5" ry="5" width="100" height="20" />
        <rect x={imageWidth + 128 + 2 * scale} y={paddingTop + 70} rx="10" ry="10" width="100" height="20" />
        <rect x={imageWidth + 18 + 2 * scale} y={paddingTop + 30 * scale + 110} rx="3" ry="3" width="160" height="18" />

        <circle cx={imageWidth + 22 + 2 * scale} cy={paddingTop + 7} r={9 * scaleDistance} stroke={color} strokeWidth="2" />
        <rect x={imageWidth + 20.5 + 2 * scale} y={paddingTop + 5} rx="3" ry="3" width="3" height="50" />
        <circle cx={imageWidth + 22 + 2 * scale} cy={paddingTop + 52} r={9 * scaleDistance} stroke={color} strokeWidth="2" />
    </ContentLoader>
    return (
        <div className="bg-cotton-50" style={{ zIndex: 50, position: "absolute", display: "flex", flexDirection: "column" }}>
            {skeleton}
            {skeleton}
            {skeleton}
            {skeleton}
        </div>)
}

export default JourneySkeleton