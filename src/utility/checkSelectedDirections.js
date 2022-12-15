import React from 'react'
import { isArray } from 'lodash'
import { store } from '../store/rootReducer'

export const checkSelectedArrival = async () => {
    try {
        const journeys = await store.getState().journeys.journeys
        const selectedDirection = await store.getState().journeys.selectedDirection
        if (isArray(selectedDirection.arrival) && !selectedDirection.arrival.length) {
            const availableArrival = []
            Object.keys(journeys).forEach(id => {
                const journeyDepartureId = journeys[id].field_journey_departure
                const journeyArrivalId = journeys[id].field_journey_arrival
                if (selectedDirection.departure === journeyDepartureId) {
                    availableArrival.push(journeyArrivalId)
                }
            })
            // // console.log("result", availableArrival)
            return availableArrival
        } else if (isArray(selectedDirection.arrival) && selectedDirection.arrival.length) {
            return selectedDirection.arrival
        } else {
            return [selectedDirection.arrival]
        }
    } catch (err) {
        console.error("ERROR checkSelectedArrival:", err)
    }
}


export const getPlacesNamesById = (placeId) => {
    try {
        const placesTerms = store.getState().journeys.placesTerms
        return placesTerms[placeId].name
    } catch (err) {
        console.error("ERROR getPlacesNamesById:", placeId, "error:", err)
    }
}

