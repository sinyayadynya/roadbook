import React from "react"
import { isArray } from "lodash"
import { store } from "../store/rootReducer"
export const ActivitiesUIElements = ({ activities }) => {
    const activitiesTerms = store.getState().journeys.activitiesTerms

    const result = []
    if (isArray(activities)) {
        activities.map((item) => {
            result.push(
                <span key={item + 1} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">{activitiesTerms[item].name}</span>
            )
        })
    }
    else {
        result.push(
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">{activitiesTerms[activities].name}</span>
        )
    }
    return result
}