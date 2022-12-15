
import React from "react";
import RoadbookCard from "./UI/RoadbookCard";
import JourneyCard from "./UI/JourneyCard";
import { setFilteringStatus } from "../store/actions/journeys";
import { store } from "../store/rootReducer";
import { useDispatch } from "react-redux";


const ListPage = ({ searchResults, cartType = "journey", noDataMessage, title = "" }) => {
  const dispatch = useDispatch();
  const results = []
  for (const id in searchResults) {
    const journey = searchResults[id]
    if (cartType === "journey") {
      results.push(
        <JourneyCard key={`Card-${id}-counter`} journey={journey} />
      )
    }
    else if (cartType === "roadbook") {
      results.push(<RoadbookCard key={`RoadbookCard-${journey.id}`} journey={journey} />)
    }
  }

  const content = results.length > 0 ? (
    results
  ) : null;
  const checkFilteringStatus = async () => {
    const isFiltering = await store.getState().journeys.isFiltering
    isFiltering && dispatch(setFilteringStatus(false))
  }
  checkFilteringStatus()
  return content
};

export default ListPage;
