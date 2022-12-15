import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import App from './App'
import { initData } from './initData';
import { setActivitiesTerms, setDaysTerms, setDurationsTerms, setFilteringStatus, setJourneys, setLoadingStatus, setMonthsTerms, setPlacesTerms, setSeasonsTerms } from './store/actions/journeys';
import { store } from './store/rootReducer';

export default function Bootstrap() {
    const dispatch = useDispatch();
    const daysTerms = useSelector((state) => state.journeys.daysTerms);

    const fetchData = async () => {
        dispatch(setLoadingStatus(true))

        const time1 = new Date().getTime()
        const { journeys, places, seasons, activities, durations, days, months } = await initData()
        const time2 = new Date().getTime()

        // console.log("TIME initData", (time2 - time1) / 1000)
        dispatch(setJourneys(journeys))
        dispatch(setPlacesTerms(places))
        dispatch(setActivitiesTerms(activities))
        dispatch(setSeasonsTerms(seasons))

        dispatch(setDurationsTerms(durations))
        dispatch(setMonthsTerms(months))
        dispatch(setDaysTerms(days))
    }

    useEffect(() => {
        dispatch(setFilteringStatus(true))
    }, [daysTerms])

    useEffect(() => {
        const isLoading = store.getState().journeys.isLoading
        if (!isLoading) {
            localStorage.setItem('currentStoreId', '6fcf3677-2cd6-4a87-a6cf-6dacc4bb9277');
            fetchData()
        }
    }, []);
    // console.log("RENDER Bootstrap")

    return daysTerms && <App />
}
