import _ from "lodash";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setActivitiesTerms, setFilteringStatus } from "../../store/actions/journeys";
import { store } from "../../store/rootReducer";

const ActivitiesComponent = ({ activityId, name }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const isActive = useSelector((state) => state.journeys.activitiesTerms[activityId].isActive)


    const selectedClass = isActive ? "text-gray-800" : "text-gray-400";


    const toggleActivityFilter = async (id) => {
        try {
            const isFiltering = await store.getState().journeys.isFiltering
            if (isFiltering) {
                return
            }
            const result = await store.getState().journeys.activitiesTerms
            const activitiesTerms = await _.cloneDeep(result)
            const status = !isActive
            activitiesTerms[id].isActive = status

            dispatch(setFilteringStatus(true))
            dispatch(setActivitiesTerms(activitiesTerms))
        } catch (err) {
            console.error("ERROR toggleActivityFilter:", id, "error:", err)
        }
    }


    return (
        <button
            onClick={() => toggleActivityFilter(activityId)}
            className={`inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium ${selectedClass}`}>
            {t(name)}
        </button>
    )
}

export default memo(ActivitiesComponent)