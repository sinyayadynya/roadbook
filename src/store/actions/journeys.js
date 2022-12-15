import { DEFAULT_PLACE } from "../../App";
import {
  SET_JOURNEYS,
  SET_LOADING_STATUS,
  SET_SELECTED_DIRECTIONS,
  SET_FILTERED_JOURNEYS,
  SET_PLACES, SET_SEASONS,
  SET_ACTIVITIES,
  SET_ROADBOOK,
  SET_JOURNEY_DIALOG_STATUS,
  SET_HELP_DIALOG_STATUS,
  SET_FILTERING_STATUS,
  SET_DURATIONS,
  SET_DAYS,
  SET_MONTHS,
} from "../actionTypes";
import { store } from "../rootReducer";

export function setJourneys(journeys) {
  return {
    type: SET_JOURNEYS,
    journeys
  };
}

export function setJourneysRoadbookStatus(journeys) {
  return {
    type: SET_JOURNEYS,
    journeys
  };
}

export function setFilteredJourneys(filteredJourneys) {
  return {
    type: SET_FILTERED_JOURNEYS,
    filteredJourneys
  };
}

const initDefaultDeparture = (placesTerms) => async (dispatch) => {
  try {
    const departureDirection = await store.getState().journeys.selectedDirection.departure

    let departureId = ""
    Object.keys(placesTerms).forEach(id => {
      if (placesTerms[id].name === DEFAULT_PLACE) {
        departureId = id
      }
    })

    if (!departureDirection) {
      dispatch(setSelectedDirections({ departure: departureId }))
    }
  } catch (err) {
    console.error("ERROR initDefaultDeparture:", placesTerms, "error:", err.message)
  }
}


export const setPlacesTerms = (placesTerms) => async (dispatch) => {
  dispatch(initDefaultDeparture(placesTerms))

  dispatch({
    type: SET_PLACES,
    placesTerms
  })
}

export function setSeasonsTerms(seasonsTerms) {
  return {
    type: SET_SEASONS,
    seasonsTerms
  };
}

export function setActivitiesTerms(activitiesTerms) {
  return {
    type: SET_ACTIVITIES,
    activitiesTerms
  };
}

export function setDurationsTerms(durationsTerms) {
  return {
    type: SET_DURATIONS,
    durationsTerms
  };
}
export function setDaysTerms(daysTerms) {
  return {
    type: SET_DAYS,
    daysTerms
  };
}
export function setMonthsTerms(monthsTerms) {
  return {
    type: SET_MONTHS,
    monthsTerms
  };
}




export const setRoadbook = ({ updatedJourneys, roadbook }) => async (dispatch) => {
  try {
    updatedJourneys && dispatch(setJourneys(updatedJourneys))
    dispatch({
      type: SET_ROADBOOK,
      roadbook
    })
  } catch (err) {
    console.error("ERROR setRoadbook:", updatedJourneys, roadbook, "error:", err.message)
  }
}


export function setSelectedDirections(selectedDirection) {
  return {
    type: SET_SELECTED_DIRECTIONS,
    selectedDirection
  };
}


export function setJourneyDialogStatus(status) {
  return {
    type: SET_JOURNEY_DIALOG_STATUS,
    status
  };
}

export function setHelpDialogStatus(status) {
  return {
    type: SET_HELP_DIALOG_STATUS,
    status
  };
}

export function setLoadingStatus(status) {
  return {
    type: SET_LOADING_STATUS,
    status
  };
}

export function setFilteringStatus(status) {
  return {
    type: SET_FILTERING_STATUS,
    status
  };
}


