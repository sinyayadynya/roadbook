import React, { useEffect, useState } from "react";
import SeasonSkeleton from "./UI/SeasonSkeleton";
import { useSelector } from "react-redux";
import { YEAR_ROUND_SEASON_ID } from "../App";
import SeasonsComponent from "./UI/SeasonsComponent";
import { store } from "../store/rootReducer";


export default function SeasonFilters() {
  const filteredJourneys = useSelector((state) => state.journeys.filteredJourneys);
  const [seasonsFiltered, setSeasonsFiltered] = useState([])

  const getFilterData = async () => {
    try {
      const seasonsTerms = await store.getState().journeys.seasonsTerms

      const result = []
      for (const id in seasonsTerms) {
        if (Number(id) !== YEAR_ROUND_SEASON_ID) {
          result.push(<SeasonsComponent key={"SeasonsComponent" + id} seasonId={id} name={seasonsTerms[id].name} />)
        }
      }
      setSeasonsFiltered(result)
    } catch (err) {
      console.error("ERROR getFilterData:", err)
    }
  }

  useEffect(() => {
    getFilterData()
  }, [filteredJourneys])


  return seasonsFiltered.length ? seasonsFiltered : <SeasonSkeleton />
}