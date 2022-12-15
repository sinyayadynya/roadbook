
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { setFilteringStatus, setJourneyDialogStatus, setRoadbook, setSelectedDirections } from "../store/actions/journeys";
import { useDispatch, useSelector } from "react-redux";
import { addToCartApi, baseURL, getJourneyId, getJourneyParams } from "../api/axios";
import ButtonIconCrossSVG from "../components/UI/svg/ButtonIconCrossSVG";
import { getPlacesNamesById } from "../utility/checkSelectedDirections";
import { getActivitiesNameById } from "../utility/getJourneyActivities";
import { getSeasonsNameById } from "../utility/getJourneySeasons";
import { getDateMonthById } from "../utility/getDataById";
import { fetchRoadbookData } from "../utility/fetchRoadbook";
import ReactHtmlParser from 'react-html-parser';

export const JourneyDialog = ({ journeyInfo }) => {
    const dispatch = useDispatch();
    const [isAdding, setAdding] = useState(false)

    const [journeyParams, setJourneyParams] = useState(null)
    const { t, i18n } = useTranslation();

    const prepareParams = async (journey) => {
        try {
            const boat = {
                name: t('Boat'),
                distance: journey?.field_journey_boat_distance,
                time: journey?.field_journey_boat_time
            }
            const cycle = {
                name: t('Cycle riding'),
                distance: journey?.field_journey_cycle_distance,
                time: journey?.field_journey_cycle_time
            }
            const ride = {
                name: t('Horse riding time'),
                distance: journey?.field_journey_ride_distance,
                time: journey?.field_journey_ride_time
            }
            const ski = {
                name: t('Ski'),
                distance: journey?.field_journey_ski_distance,
                time: journey?.field_journey_ski_time
            }
            const transfer = {
                name: `${journey?.field_journey_type_transfer} ${t('transfer')}`,
                distance: journey?.field_journey_transfer_distance,
                time: journey?.field_journey_transfer_time,
            }
            const walk = {
                name: t('Walk'),
                distance: journey?.field_journey_walk_distance,
                time: journey?.field_journey_walk_time
            }
            const periodId = {
                start: {
                    day: journey?.field_journey_period_day_start,
                    month: journey?.field_journey_period_month_start
                },
                end: {
                    day: journey?.field_journey_period_day_end,
                    month: journey?.field_journey_period_month_end
                }
            }
            const params = { boat, cycle, ride, ski, transfer, walk }
            const resultJourneyInfo = {
                body: ReactHtmlParser(journey?.body),
                headline: journey?.field_headline,
                activities: getActivitiesNameById(journey?.field_journey_activities).join(", "),
                season: getSeasonsNameById(journey?.field_journey_season),
                params,
                image: journey?.field_media_images,
                period: getDateMonthById(periodId),
                arrival: journey?.field_journey_arrival,
                departure: journey?.field_journey_departure,
                journeyDistance: journey?.field_journey_distance,
                dropNegative: journey?.field_journey_drop_negative,
                dropPositive: journey?.field_journey_drop_positive,
                sku: journey?.sku,
                journeyId: journey?.product_id
            }
            return resultJourneyInfo
        } catch (err) {
            console.error("ERROR prepareParams:", err)
        }
    }



    const addItemToCart = async (journeyId) => {
        try {
            const journeyResponse = await getJourneyId(journeyId)
            // console.log("journeyResponse", journeyResponse)
            const varJourney = journeyResponse.data.relationships.variations.data[0]
            // console.log("varJourney DIALOG", varJourney)
            addToCartApi(varJourney).then(async (res) => {
                // console.log("Add item in cart response", res)
                const updatedRoadbookData = await fetchRoadbookData()
                dispatch(setRoadbook(updatedRoadbookData))
                dispatch(setFilteringStatus(true))
                dispatch(setSelectedDirections({ departure: journeyParams.arrival, arrival: [] }))
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
        dispatch(setJourneyDialogStatus(null))
    }


    const getJourneyParamsInfo = () => {
        try {
            const result = []
            for (const param in journeyParams.params) {
                const paramsInfo = journeyParams.params[param]
                if (paramsInfo.distance) {
                    result.push(
                        <div key={param + 1} className="sm:flex sm:px-6 sm:py-5">
                            <dt key={param + 2} className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">{paramsInfo.name}</dt>
                            <dd key={param + 3} className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">{paramsInfo.time} ({paramsInfo.distance})</dd>
                        </div>)
                }
            }
            return result
        } catch (err) {
            console.error("ERROR getJourneyParamsInfo:", err)
        }
    }
    const getJourneyInfo = async (journeyId) => {
        getJourneyParams(journeyId).then(async (res) => {
            const params = await prepareParams(res)
            // // console.log("params", params)
            setJourneyParams(params)
        }).catch((err) => {
            console.error("ERROR getJourneyInfo:", err.message)
        })
    }


    useLayoutEffect(() => {
        journeyInfo && setJourneyParams(null)
        journeyInfo && getJourneyInfo(journeyInfo)
    }, [journeyInfo])

    return journeyParams ? <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0"></div>

        <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">

                    <div className="pointer-events-auto w-screen max-w-2xl">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div className="px-4 py-6 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">{t("Journey")}</h2>
                                    <div className="ml-3 flex h-7 items-center">
                                        <ButtonIconCrossSVG
                                            onClick={() => dispatch(setJourneyDialogStatus(null))} />
                                    </div>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="pb-6">
                                    <div className="h-24 bg-cinnamon-700 sm:h-40 lg:h-48">
                                        <img
                                            className="h-24 w-full object-cover sm:h-40 lg:h-48"
                                            src={`${baseURL}${journeyParams.image.replace("/", "")}`}
                                            alt="" />
                                    </div>
                                    <div className="flow-root px-4 sm:flex sm:items-end sm:px-6">
                                        <div className="mt-6 sm:flex-1">
                                            <div>
                                                <div className="flex items-center">
                                                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{journeyParams?.headline}</h3>
                                                </div>
                                                <div className="flex space-x-2 text-sm text-gray-500">
                                                    <span>{getPlacesNamesById(journeyParams?.departure)}</span>
                                                    <span className="text-cinnamon-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                                            <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                    <span>{getPlacesNamesById(journeyParams?.arrival)}</span>
                                                </div>
                                            </div>
                                            <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                                                <button type="button"
                                                    onClick={() => addToRoadbookHandler(journeyParams.journeyId)}
                                                    className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-cinnamon-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cinnamon-700 focus:outline-none focus:ring-2 focus:ring-cinnamon-500 focus:ring-offset-2 sm:flex-1">Add to Roadbook
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-5 sm:px-0 sm:py-0">
                                    <dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                                        <div className="sm:flex sm:px-6 sm:py-5">
                                            <dt className="sr-only">{t("Description")}</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                {journeyParams?.body}
                                            </dd>
                                        </div>
                                        <div className="sm:flex sm:px-6 sm:py-5">
                                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">{t('Date range')}</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">{journeyParams?.period}</dd>
                                        </div>
                                        <div className="sm:flex sm:px-6 sm:py-5">
                                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">{t('Activities')}</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">{journeyParams?.activities}</dd>
                                        </div>
                                        <div className="sm:flex sm:px-6 sm:py-5">
                                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">{t('Total distance')}</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">{journeyParams?.journeyDistance}</dd>
                                        </div>
                                        {getJourneyParamsInfo()}

                                        <div className="sm:flex sm:px-6 sm:py-5">
                                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">{t('SKU')}</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">{journeyParams?.sku}</dd>
                                        </div>

                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> : null
}