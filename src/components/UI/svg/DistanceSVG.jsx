import React from 'react'

export default function DistanceSVG({ color = 'gray-400', scale = 1 }) {

    return (
        <div className={`flex flex-col justify-between py-1 text-${color}`}>
            <svg width={20 * scale} height={20 * scale} viewBox={`0 0 ${20 * scale} ${20 * scale}`} strokeWidth="2" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx={10 * scale} cy={10 * scale} r={9 * scale} />
            </svg>
            <div className={`flex-1 w-2 ml-1.5 self-center border-l-2 border-dashed border-${color}`}></div>
            <svg width={20 * scale} height={20 * scale} viewBox={`0 0 ${20 * scale} ${20 * scale}`} strokeWidth="2" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx={10 * scale} cy={10 * scale} r={9 * scale} />
            </svg>
        </div>
    )
}




