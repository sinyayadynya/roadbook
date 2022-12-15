import React from 'react'

export default function ButtonIconCrossSVG({ onClick, small = false, text }) {
    return small ?
        <button
            className="text-sm font-medium text-gray-400"
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
        </button> :
        <button type="button"
            onClick={onClick}
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-cinnamon-500">
            <span className="sr-only">{text}</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

}
