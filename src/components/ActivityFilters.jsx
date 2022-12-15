import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivitiesTerms } from "../store/actions/journeys";
import { store } from "../store/rootReducer";
import ActivitiesComponent from "./UI/ActivitiesComponent";
import ActivitySkeleton from "./UI/ActivitySkeleton";

export default function ActivityFilters() {
  const dispatch = useDispatch();
  const filteredJourneys = useSelector((state) => state.journeys.filteredJourneys);
  const [activitiesFiltered, setActivitiesFiltered] = useState([])

  const getFilterData = async (newActivitiesStatus) => {
    try {
      const result = []
      for (const id in newActivitiesStatus) {
        if (!newActivitiesStatus[id].isDisabled) {
          result.push(<ActivitiesComponent key={"ActivitiesComponent" + id} activityId={id} name={newActivitiesStatus[id].name} />)
        }
      }
      setActivitiesFiltered(result)
    } catch (err) {
      console.error("ERROR getFilterData:", newActivitiesStatus, "error:", err)
    }
  }



  const updateStatusActivitiesFilers = async () => {
    try {
      const activities = await store.getState().journeys.activitiesTerms
      const activitiesTerms = await _.cloneDeep(activities)
      Object.keys(activitiesTerms).forEach(itemId => {
        let isMatchFiltered = false
        for (const id in filteredJourneys) {
          const journeyActivities = filteredJourneys[id].field_journey_activities
          if ((journeyActivities).includes((itemId))) {
            isMatchFiltered = true
            break
          }
        }
        if (isMatchFiltered) {
          activitiesTerms[itemId].isDisabled = false
        } else {
          activitiesTerms[itemId].isDisabled = true
        }
      })
      dispatch(setActivitiesTerms(activitiesTerms))
      getFilterData(activitiesTerms)
    } catch (err) {
      console.error("ERROR updateStatusActivitiesFilers:", err)
    }
  }



  useEffect(() => {
    updateStatusActivitiesFilers()
  }, [filteredJourneys])

  // // console.log("RENDER ActivityFilters")

  return activitiesFiltered.length ? activitiesFiltered : <ActivitySkeleton />
}


