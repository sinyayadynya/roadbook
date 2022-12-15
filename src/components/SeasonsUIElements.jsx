import React from "react"
import { isArray } from "lodash"
import { store } from "../store/rootReducer"

export const SeasonsUIElements = ({ seasons = null }) => {
    try {
        const seasonsTerms = store.getState().journeys.seasonsTerms
        const result = []
        if (isArray(seasons)) {
            const result = []
            seasons.forEach((item) => {
                result.push(
                    <span key={item + 1} className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        <svg key={item + 2} className="mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                            <circle key={item + 3} cx="4" cy="4" r="3" />
                        </svg>
                        <p key={item + 4} className="whitespace-nowrap text-sm text-sky-700">{seasonsTerms[item].name}</p>
                    </span>)
            })
        }
        else if (seasons) {
            result.push(
                <span key={seasons + 1} className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    <svg key={seasons + 2} className="mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                        <circle key={seasons + 3} cx="4" cy="4" r="3" />
                    </svg>
                    <p key={seasons + 4} className="whitespace-nowrap text-sm text-sky-700">{seasonsTerms[seasons].name}</p>
                </span>)
        }
        return result
    } catch (err) {
        console.error("ERROR SeasonsUIElements:", seasons, "error:", err)
    }
}

