import React from "react";
import { store } from "../store/rootReducer";



export const getSelectedSeasonsId = async () => {
  try {
    const seasonsTerms = await store.getState().journeys.seasonsTerms
    const selectedSeasons = []
    Object.keys(seasonsTerms).forEach(id => {
      if (seasonsTerms[id].isActive) {
        selectedSeasons.push(id)
      }
    })
    return selectedSeasons
  } catch (err) {
    console.error("ERROR getSelectedSeasonsId:", err)
  }
}





export const getSeasonsNameById = (journeySeasons) => {
  try {
    const seasonsTerms = store.getState().journeys.seasonsTerms
    const seasonsNames = []

    return seasonsTerms[journeySeasons].name;
  } catch (err) {
    console.error("ERROR getSeasonsNameById:", journeySeasons, "error:", err)
  }
}