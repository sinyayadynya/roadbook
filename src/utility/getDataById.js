import React from 'react'
import { store } from '../store/rootReducer'

export const getDateMonthById = (period) => {
    try {
        const daysTerms = store.getState().journeys.daysTerms
        const monthsTerms = store.getState().journeys.monthsTerms
        const start = `${daysTerms[period.start.day].name} ${monthsTerms[period.start.month].name}`
        const end = ` ${daysTerms[period.end.day].name} ${monthsTerms[period.end.month].name}`

        return `${start} - ${end} `
    } catch (err) {
        console.error("ERROR getDateMonthById:", period, "error:", err)
    }
}
