import React from 'react'

export default function PlusSVG({ onClick, text }) {
    return (
        <button
            className="group mt-4 flex space-x-2 text-sm text-gray-700 hover:text-gray-900"
            onClick={onClick}
        >
            <svg className="h-5 w-5 flex-shrink-0 text-cinnamon-500 group-hover:text-cinnamon-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            <span>{text}</span>
        </button>
    )
}
