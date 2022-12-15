import React from "react";
import { store } from "../store/rootReducer";

export const getActivitiesNameById = (journeyActivities) => {
  try {
    const activitiesTerms = store.getState().journeys.activitiesTerms
    const activitiesNames = []
    const activities = journeyActivities.replace(/[^0-9,]/g, "").split(",")
    activities.forEach((id) => {
      activitiesNames.push(activitiesTerms[id].name)
    })
    return activitiesNames;
  } catch (err) {
    console.error("ERROR getActivitiesNameById:", journeyActivities, "error:", err)
  }
}

export const getSelectedActivitiesId = async (activitiesTerms) => {
  try {
    const selected = []
    for (const id in activitiesTerms) {
      if (activitiesTerms[id].isActive) {
        selected.push(id)
      }
    }

    const result = selected.length ? selected : Object.keys(activitiesTerms)
    return result
  } catch (err) {
    console.error("ERROR getSelectedActivitiesId:", activitiesTerms, "error:", err)
  }
}
