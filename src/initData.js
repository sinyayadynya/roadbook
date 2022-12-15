import React from 'react'
import { getJourneys, getPlaceDataAPI, getTaxonomyTerms } from './api/axios';


const fetchJourneys = async () => {
    const journeys = {}
    await getJourneys().then(async (res) => {
        await Promise.all(res.map((journey) => {
            const id = journey.product_id
            const activities = journey.field_journey_activities.replace(/[^0-9,]/g, "").split(",")
            journey.field_journey_activities = activities
            journey.field_journey_arrival = journey.field_journey_arrival
            journey.field_journey_departure = journey.field_journey_departure
            journey.field_journey_season = journey.field_journey_season
            journey.field_media_images = journey.field_media_images.split(",")[0]
            journey["isAddToRoadbook"] = false
            journeys[id] = journey
        }))
    }).catch(err => {
        console.error("ERROR fetchJourneys: ", err.message)
    })
    const result = {}
    result["journeys"] = journeys
    return result
}

const fetchPlaceData = async (placeData) => {
    const resultPlacesData = {}
    await getPlaceDataAPI(placeData).then(async (response) => {
        await Promise.all(response.map((place) => {
            const id = place.id
            const name = place.name
            const region = place.region
            resultPlacesData[id] = { id, name, region }
        }))
    }).catch(err => {
        console.error("ERROR fetchPlaceData: ", err.message)
    })
    const result = {}
    result[placeData] = resultPlacesData
    return result
}

const fetchTaxonomy = async (terms, typeSpecialObj = false) => {
    const termsData = {}
    await getTaxonomyTerms(terms).then((res) => {
        termsData[terms] = {}
        res.data.map((item) => {
            const id = item.attributes.drupal_internal__tid
            const name = item.attributes.name
            if (typeSpecialObj, terms === "journey_seasons") {
                termsData[terms][id] = { name, isActive: true, isDisabled: false }
            } else if (typeSpecialObj) {
                termsData[terms][id] = { name, isActive: false, isDisabled: false }
            }
            else {
                termsData[terms][id] = { name }
            }
        })
    }).catch(err => {
        console.error(`ERROR getTaxonomyTerms(${terms}): `, err.message)
    })
    const result = {}
    result[terms] = termsData[terms]
    return result
}

const combinePlacesData = async (places, skiBases) => {
    const result = { ...places, ...skiBases }
    return result
}

export const initData = async () => {
    const journeysData = fetchJourneys()
    const placesData = fetchPlaceData("place");
    const skiBasesData = fetchPlaceData("skibase");
    const activitiesData = fetchTaxonomy("activities", true)
    const journey_seasonsData = fetchTaxonomy("journey_seasons", true)
    const durationsData = fetchTaxonomy("duration")
    const daysData = fetchTaxonomy("days")
    const monthsData = fetchTaxonomy("months")

    const syncRequestData = [
        journeysData,
        placesData,
        skiBasesData,
        activitiesData,
        journey_seasonsData,
        durationsData, daysData, monthsData]

    const result = await Promise.all(syncRequestData)
    const resultToObj = Object.assign(...result)
    const combinePlaces = await combinePlacesData(resultToObj.place, resultToObj.skibase)
    const resultInit = {
        journeys: resultToObj.journeys,
        places: combinePlaces,
        activities: resultToObj.activities,
        seasons: resultToObj.journey_seasons,
        durations: resultToObj.duration,
        days: resultToObj.days,
        months: resultToObj.months,
    }
    // console.log("RENDER initData")
    return resultInit
}
