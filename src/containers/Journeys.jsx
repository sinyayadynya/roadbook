import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import ListPage from '../components/ListPage';
import { setActivitiesTerms, setFilteredJourneys, setLoadingStatus } from '../store/actions/journeys';
import { HEIGHT_SCROLL_VIEW_JOURNEY, YEAR_ROUND_SEASON_ID } from '../App';
import { store } from '../store/rootReducer';
import JourneySkeleton from '../components/UI/JourneySkeleton';
import { getSelectedSeasonsId } from '../utility/getJourneySeasons';
import { getSelectedActivitiesId } from '../utility/getJourneyActivities';
import { checkSelectedArrival } from '../utility/checkSelectedDirections';

export default function Journeys() {
    const dispatch = useDispatch();
    const isFiltering = useSelector((state) => state.journeys.isFiltering);


    const [filtered, setFiltered] = useState({ count: 0, resultJourney: null });

    const getResultJourney = async (journeys, filteredJourneyId) => {
        try {
            const result = {}
            await Promise.all(filteredJourneyId.map(id => {
                result[id] = journeys[id]
            }))
            return result
        } catch (err) {
            console.error("ERROR getResultJourney:", err)
        }
    }

    const resetActivities = async () => {
        try {
            const activitiesTerms = await store.getState().journeys.activitiesTerms
            const resetActivities = {}
            Object.keys(activitiesTerms).forEach(id => {
                resetActivities[id] = {
                    name: activitiesTerms[id].name,
                    isActive: false,
                    isDisabled: false,
                }
            }
            )
            dispatch(setActivitiesTerms(resetActivities))
        } catch (err) {
            // console.log("ERROR resetActivities:", err)
        }

    }

    const getFilteredJourney = async ({ timeStart, departureDirection, selectedArrival, selectedSeasonsListId, selectedActivitiesListId }) => {
        try {
            const journeys = await store.getState().journeys.journeys

            const filteredJourneyId = []

            Object.keys(journeys).forEach(id => {
                const journeyDepartureId = journeys[id].field_journey_departure
                const journeyArrivalId = journeys[id].field_journey_arrival
                const journeySeasonsId = journeys[id].field_journey_season
                const journeyActivitiesListId = journeys[id].field_journey_activities

                const matchDeparture = journeyDepartureId === departureDirection
                const matchArrival = selectedArrival.includes(journeyArrivalId)
                const matchSeasons = selectedSeasonsListId.includes(journeySeasonsId)
                const matchActivities = _.intersection(selectedActivitiesListId, journeyActivitiesListId).length

                if (matchDeparture && matchArrival && matchSeasons && matchActivities) {
                    filteredJourneyId.push(id)
                }
            })
            if (!filteredJourneyId.length && Object.keys(journeys).length) {
                // console.log("reset------")
                await resetActivities()
                // prepareMatchingData()
                return
            }
            const resultJourney = await getResultJourney(journeys, filteredJourneyId)
            dispatch(setFilteredJourneys(resultJourney))

            const timeFinish = new Date().getTime()
            // // console.log("TIME FilteredJourney", (timeFinish - timeStart) / 1000, filteredJourneyId.length)

            setFiltered({ count: filteredJourneyId.length, resultJourney })
            dispatch(setLoadingStatus(false))
        } catch (err) {
            console.error("ERROR getFilteredJourney:", err)
        }
    }


    const prepareMatchingData = async () => {
        try {
            const timeStart = new Date().getTime()
            const activitiesTerms = await store.getState().journeys.activitiesTerms
            const departureDirection = await store.getState().journeys.selectedDirection.departure
            const selectedArrival = await checkSelectedArrival()
            const selectedSeasonsListId = await getSelectedSeasonsId()
            const selectedActivitiesListId = await getSelectedActivitiesId(activitiesTerms)

            const result = { timeStart, departureDirection, selectedArrival, selectedSeasonsListId, selectedActivitiesListId }
            // console.log("prepareMatchingData")
            getFilteredJourney(result)
        } catch (err) {
            console.error("ERROR prepareMatchingData:", err)
        }
    }


    useEffect(() => {
        isFiltering && prepareMatchingData()
    }, [isFiltering]);
    // console.log("RENDER JOurney")

    return (<>
        <div className='lg:col-span-7 w-full pr-2.5 h-screen overflow-x-hidden overflow-y-scroll border-t border-b border-gray-200'
        >
            <section aria-labelledby="journeys-heading" className="">
                <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                    {isFiltering && <JourneySkeleton />}
                    {filtered && <ListPage
                        searchResults={filtered.count && filtered.resultJourney}
                        action="add"
                        noDataMessage={"NoJourneys"}
                    />}
                </ul>
            </section>
        </div>
    </>
    )
}
