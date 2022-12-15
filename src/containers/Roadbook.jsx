import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import ListPage from '../components/ListPage';
import { YEAR_ROUND_SEASON_ID } from '../App';
import { baseURL, getRoadbookApi, getCheckoutRoadbook } from '../api/axios';
import { fetchRoadbookData } from '../utility/fetchRoadbook';
import { setFilteringStatus, setRoadbook } from '../store/actions/journeys';


export default function Roadbook() {
    const dispatch = useDispatch();
    const roadbook = useSelector((state) => state.journeys.roadbook);
    const { t, i18n } = useTranslation();


    const getRoadbook = async () => {
        try {
            const updatedRoadbookData = await fetchRoadbookData()
            dispatch(setRoadbook(updatedRoadbookData))
            dispatch(setFilteringStatus(true))
        } catch (err) {
            console.error("ERROR getRoadbook", err)
        }
    }


    const checkOutHandler = () => {
        // console.log("checkOut...")
        const cartToken = localStorage.getItem('cartToken');
        getRoadbookApi().then(async (res) => {
            const checkout = await getCheckoutRoadbook(res.cart)
            location.href = `${baseURL}checkout/${checkout.cart.id}?cartToken=${cartToken}`
        }).catch((err) => console.error("ERROR checkOut:", err))
    }

    useEffect(() => {
        getRoadbook()
    }, [])

    return (
        <section id="roadbook" aria-labelledby="roadbook-heading" className="mt-16 w-full rounded-lg bg-cotton-100 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 id="roadbook-heading" className="text-lg font-medium text-gray-900">Your Roadbook</h2>
            <div className="mt-6 space-y-2">
                <ListPage
                    searchResults={roadbook}
                    cartType='roadbook'
                    noDataMessage={t("NoJourneys")}
                />
                {!!roadbook.length && <>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <dt className="text-base font-medium text-gray-900">Duration</dt>
                        <dd className="text-base font-medium text-gray-900">{roadbook?.length} days</dd>
                    </div>
                    <button
                        className="focus:ring-cinammon-500 w-full rounded-md border border-transparent bg-cinnamon-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-cinnamon-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50"
                        onClick={checkOutHandler}>{t("send your Roadbook")}
                    </button>
                </>}
            </div>
        </section>
    )
}
