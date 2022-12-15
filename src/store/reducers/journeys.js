import {
  SET_ACTIVITIES,
  SET_HELP_DIALOG_STATUS,
  SET_JOURNEYS,
  SET_JOURNEY_DIALOG_STATUS,
  SET_LOADING_STATUS, SET_PLACES,
  SET_SEASONS,
  SET_SELECTED_DIRECTIONS,
  SET_FILTERED_JOURNEYS,
  SET_FILTERING_STATUS,
  SET_ROADBOOK,
  SET_DURATIONS,
  SET_MONTHS,
  SET_DAYS,
} from "../actionTypes";

const initialState = {
  placesTerms: {},
  seasonsTerms: {},
  activitiesTerms: {},
  durationsTerms: {},
  daysTerms: null,
  monthsTerms: {},

  journeys: null,

  selectedDirection: {
    departure: "1",
    arrival: [],
  },
  filteredJourneys: {},
  roadbook: [],


  isLoading: false,
  isFiltering: false,

  isJourneyDialogOpen: false,
  isHelpDialogOpen: false,
};

const handlers = {
  [SET_JOURNEYS]: (state, action) => ({
    ...state,
    journeys: action.journeys,
  }),

  [SET_FILTERED_JOURNEYS]: (state, action) => ({
    ...state,
    filteredJourneys: action.filteredJourneys,
  }),

  [SET_PLACES]: (state, action) => ({
    ...state,
    placesTerms: action.placesTerms,
  }),

  [SET_SEASONS]: (state, action) => ({
    ...state,
    seasonsTerms: action.seasonsTerms,
  }),

  [SET_ACTIVITIES]: (state, action) => ({
    ...state,
    activitiesTerms: action.activitiesTerms,
  }),

  [SET_DURATIONS]: (state, action) => ({
    ...state,
    durationsTerms: action.durationsTerms,
  }),

  [SET_DAYS]: (state, action) => ({
    ...state,
    daysTerms: action.daysTerms,
  }),

  [SET_MONTHS]: (state, action) => ({
    ...state,
    monthsTerms: action.monthsTerms,
  }),

  [SET_ROADBOOK]: (state, action) => ({
    ...state,
    roadbook: action.roadbook,
  }),

  [SET_SELECTED_DIRECTIONS]: (state, action) => ({
    ...state,
    selectedDirection: { ...state.selectedDirection, ...action.selectedDirection },
  }),


  [SET_JOURNEY_DIALOG_STATUS]: (state, action) => ({
    ...state,
    isJourneyDialogOpen: action.status,
  }),

  [SET_HELP_DIALOG_STATUS]: (state, action) => ({
    ...state,
    isHelpDialogOpen: action.status,
  }),

  [SET_LOADING_STATUS]: (state, action) => ({
    ...state,
    isLoading: action.status,
  }),

  [SET_FILTERING_STATUS]: (state, action) => ({
    ...state,
    isFiltering: action.status,
  }),



  DEFAULT: (state) => state,
};

export const journeysReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
