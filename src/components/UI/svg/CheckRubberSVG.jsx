import React from 'react'

export default function CheckRubberSVG({ isShow }) {
    return isShow &&
        <>
            <div className="absolute top-0 right-0 inline-block w-11 overflow-hidden rounded-tr-md">
                <div className="h-16 origin-top-left -rotate-45 transform bg-green-600"></div>
            </div>
            <div className="absolute top-1 right-0.5 w-5 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
            </div>

        </>
}
