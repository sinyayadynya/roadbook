import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartApi, baseURL, getJourneyId } from '../../api/axios'
import { setFilteringStatus, setJourneyDialogStatus, setRoadbook, setSelectedDirections } from '../../store/actions/journeys'
import { store } from '../../store/rootReducer'
import { getPlacesNamesById } from '../../utility/checkSelectedDirections'
import { fetchRoadbookData } from '../../utility/fetchRoadbook'
import { ActivitiesUIElements } from '../ActivitiesUIElements'
import { SeasonsUIElements } from '../SeasonsUIElements'
import CheckRubberSVG from './svg/CheckRubberSVG'
import DistanceSVG from './svg/DistanceSVG'
import ButtonIconViewSVG from './svg/ButtonIconViewSVG'

import PlusSVG from './svg/Plus'
import { LoaderSmall } from './svg/LoaderSmall'
import { useTranslation } from 'react-i18next'

export default function JourneyCard({ journey }) {
    const dispatch = useDispatch();
    const isAddToRoadbook = useSelector((state) => state.journeys.journeys[journey.product_id].isAddToRoadbook)
    const [isAdding, setAdding] = useState(false)
    const { t, i18n } = useTranslation();



    const addItemToCart = async (journeyId) => {
        try {
            const journeyResponse = await getJourneyId(journeyId)
            // console.log("journeyResponse", journeyResponse)
            const varJourney = journeyResponse.data.relationships.variations.data[0]
            addToCartApi(varJourney).then(async (res) => {
                // console.log("Add item in cart response")
                const updatedRoadbookData = await fetchRoadbookData()
                dispatch(setRoadbook(updatedRoadbookData))
                dispatch(setFilteringStatus(true))
                dispatch(setSelectedDirections({ departure: journey.field_journey_arrival, arrival: [] }))
                setAdding(false)
            }).catch((err) => {
                console.error("Error Add to roadbook", err.message);
            })
        } catch (err) {
            console.error("ERROR addItemToCart", journeyId, "error:", err);
        }
    }

    const addToRoadbookHandler = (journeyId) => {
        setAdding(true)
        addItemToCart(journeyId)
    }

    return (
        <li key={journey.product_id} className="flex py-6 sm:py-10 w-full">
            <div className="relative flex-shrink-0">
                <CheckRubberSVG isShow={isAddToRoadbook} />
                <img
                    src={`${baseURL}${journey.field_media_images.replace("/", "")}`}
                    alt="Headline"
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
            </div>
            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9">

                    <div>
                        <div className='flex flex-row'>
                            <DistanceSVG scale={0.7} />
                            <div className='flex flex-col ml-2'>
                                <p className="text-sm font-medium text-gray-700">{getPlacesNamesById(journey.field_journey_departure)}</p>
                                <div className="mt-1 flex text-xs">
                                    <p className="text-gray-500">{journey.field_journey_distance}</p>
                                    <p className="ml-3 border-l border-gray-200 pl-3 text-gray-500">+{journey.field_journey_drop_positive} / -{journey.field_journey_drop_negative}</p>
                                </div>
                                <p className="mt-1 text-sm font-medium text-gray-700">{getPlacesNamesById(journey.field_journey_arrival)}</p>
                            </div>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
                            <SeasonsUIElements seasons={journey.field_journey_season} />
                            <ActivitiesUIElements activities={journey.field_journey_activities} />
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="absolute top-0 right-2">
                            <ButtonIconViewSVG
                                onClick={() => dispatch(setJourneyDialogStatus(journey.product_id))}
                            />
                        </div>
                    </div>
                </div>
                {isAdding ? <LoaderSmall text={t("Adding...")} /> :
                    <PlusSVG
                        onClick={() => addToRoadbookHandler(journey.product_id)}
                        text={t("Add to Roadbook")}
                    />}
            </div>
        </li>
    )
}




