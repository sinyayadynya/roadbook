import _, { result } from "lodash";
import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { YEAR_ROUND_SEASON_ID } from "../../App";
import { setFilteringStatus, setSeasonsTerms } from "../../store/actions/journeys";
import { store } from "../../store/rootReducer";

const SeasonsComponent = ({ seasonId, name }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const isActiveSeasons = useSelector((state) => state.journeys.seasonsTerms)
    const isActive = isActiveSeasons[seasonId]?.isActive

    const disabledColor = "inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-400";
    const colorSeason = name === "Summer" ? "text-red-800 bg-red-100" : "text-blue-800 bg-blue-100"
    const activeColor = `inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium ${colorSeason}`

    const disabledPointColor = "-ml-0.5 mr-1.5 h-2 w-2 text-gray-400";
    const pointColor = name === "Summer" ? "text-red-400" : "text-blue-400"
    const activePointColor = `-ml-0.5 mr-1.5 h-2 w-2 ${pointColor}`


    const toggleSeasonFilter = async (id) => {
        try {
            const isFiltering = await store.getState().journeys.isFiltering
            if (isFiltering) {
                return
            }
            const result = await store.getState().journeys.seasonsTerms
            const seasonsTerms = await _.cloneDeep(result)
            const status = !isActive
            seasonsTerms[id].isActive = status
            const activesFilter = []
            const disActivesFilter = []
            for (seasonId in seasonsTerms) {
                if (seasonId !== YEAR_ROUND_SEASON_ID || seasonId !== id) {
                    seasonsTerms[seasonId].isActive && activesFilter.push(seasonId)
                    !seasonsTerms[seasonId].isActive && disActivesFilter.push(seasonId)
                }
            }
            activesFilter.length <= 1 && disActivesFilter.forEach((seasonId) => {
                seasonsTerms[seasonId].isActive = true
            })
            seasonsTerms[id].isActive = status

            dispatch(setFilteringStatus(true))
            dispatch(setSeasonsTerms(seasonsTerms))
        } catch (err) {
            console.error("ERROR toggleSeasonFilter", err)
        }
    }

    // // console.log("RENDER season Component")

    return (
        <button
            onClick={() => toggleSeasonFilter(seasonId)}
            className={`${isActive ? activeColor : disabledColor}`}>
            <svg className={`${isActive ? activePointColor : disabledPointColor}`} fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
            </svg>
            {t(name)}
        </button>
    )
}

export default memo(SeasonsComponent)