import React from 'react'
import { getRoadbookApi } from '../api/axios'
import { store } from '../store/rootReducer'

export const updateJourneyStatusRoadbook = async (journeyVariationList) => {
    try {
        const journeys = await store.getState().journeys.journeys
        const journeyListId = []
        await journeyVariationList.forEach(journeyVariations => {
            journeyListId.push(journeyVariations.relationships.product_id.data.id)
        })
        Object.keys(journeys).forEach(id => {
            if (journeyListId.includes(id)) {
                journeys[id].isAddToRoadbook = true
            } else {
                journeys[id].isAddToRoadbook = false
            }
        })
        return journeys
    } catch (err) {
        console.error("ERROR updateJourneyStatusRoadbook", journeyVariationList, "error:", err)
    }
}

export const fetchRoadbookData = async () => {
    try {
        const response = await getRoadbookApi()
        // // console.log("Cart item response", response)

        let journeyVariation = []
        let newRoadbook = []
        if (response.included) {
            journeyVariation = await response.included.filter((r) =>
                r.type == "product-variation--journey"
            );
            newRoadbook = await response.included.filter((r) =>
                r.type !== "product-variation--journey"
            );
        }

        // console.log("journeyVariationList", journeyVariation)
        const updatedJourneys = await updateJourneyStatusRoadbook(journeyVariation)


        return { updatedJourneys, roadbook: newRoadbook }
    } catch (err) {
        console.error("ERROR fetchRoadbookData", err)
    }
}

export const getJourneyInfoByJourneyVarId = (journeyVarId) => {
    try {
        const journeys = store.getState().journeys.journeys
        let journeyId = ""
        let sku = ""
        Object.keys(journeys).forEach(id => {
            if (journeys[id].product_variation_id === journeyVarId) {
                journeyId = id
                sku = journeys[id].sku
            }
        })
        return { journeyId, sku }
    } catch (err) {
        console.error("ERROR getJourneyInfoByJourneyVarId", err)
    }
}
