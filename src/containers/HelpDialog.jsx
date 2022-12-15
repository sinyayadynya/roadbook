
import React from "react";
import { useTranslation } from "react-i18next";
import { setHelpDialogStatus, setJourneyDialogStatus } from "../store/actions/journeys";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store/rootReducer";

export const HelpDialog = () => {
    const dispatch = useDispatch();
    const helpShow = useSelector((state) => state.journeys.isHelpDialogOpen)
    const { t, i18n } = useTranslation();


    return helpShow ? <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0"></div>

        <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

                    <div className="pointer-events-auto w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div className="bg-cinnamon-700 py-6 px-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-medium text-white" id="slide-over-title">{t("Help")}</h2>
                                    <div className="ml-3 flex h-7 items-center">
                                        <button type="button"
                                            onClick={() => dispatch(setHelpDialogStatus(false))}

                                            className="rounded-md bg-cinnamon-700 text-cinnamon-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                                            <span className="sr-only">{t("Close panel")}</span>
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <p className="text-sm text-cinnamon-300">
                                        This roadbook does not commit you to anything until we have defined the price and the final program with you.
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex-1 py-6 px-4 sm:px-6">
                                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Adding Journeys to your Roadbook</h3>
                                <p className="mt-3 text-lg text-gray-500">Build your amazing and unique journey, in 3 easy steps. From the Roadbook page, choose the places you don't want to miss, the activities that are thrilling you and submit your Roadbook.</p>

                                <dl className="mt-10 space-y-10">

                                    <div className="relative">
                                        <dt>
                                            <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-cinnamon-500 text-white">
                                                <svg className="h-8 w-8" x-description="Heroicon name: outline/globe-alt" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Search by Places, and/or select Activities</p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500">Select your place of departure and optionaly refine your selection by choosing your place of arrival, season and activities.</dd>
                                    </div>

                                    <div className="relative">
                                        <dt>
                                            <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-cinnamon-500 text-white">
                                                <svg className="h-8 w-8" x-description="Heroicon name: outline/scale" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Choose your Journeys, adding them to your Roadbook</p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500">Click on the 'eye' icon to get more details about a journey and on the 'Add to Roadbook' button to add it to your Roadbook. The departure place will automatically be updated to help you to choose your next day.</dd>
                                    </div>

                                    <div className="relative">
                                        <dt>
                                            <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-cinnamon-500 text-white">
                                                <svg className="h-8 w-8" x-description="Heroicon name: outline/bolt" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Review your Roadbook and submit it to our Travel Planner crew</p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500">When you are done bulding your dreamed tour, click on the 'Send your Roadbook' button and fill up your details. Then our team will inform you about the price and let you confirm your custom tour.</dd>
                                    </div>

                                </dl>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> : null
}