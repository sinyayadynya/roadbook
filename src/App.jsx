import React from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import ActivityFilters from "./components/ActivityFilters";
import SeasonFilters from "./components/SeasonsFilters";
import { useTranslation } from "react-i18next";
import "./utility/localization";
import Journeys from "./containers/Journeys";
import { useDispatch } from "react-redux";
import Roadbook from "./containers/Roadbook";
import { PlaceComboBox } from "./components/PlaceComboBox";
import ButtonToRoadbook from "./components/UI/svg/ButtonToRoadbook";
import { setHelpDialogStatus } from "./store/actions/journeys";
// import { HelpDialog } from "./containers/HelpDialog";
// const HelpDialog = React.lazy(() => import('./containers/HelpDialog'));
import { JourneyDialog } from "./containers/JourneyDialog";
import DialogOverlays from "./containers/DialogOverlays";

export const YEAR_ROUND_SEASON_ID = 3503;
export const DEFAULT_PLACE = "Bishkek";
export const HEIGHT_SCROLL_VIEW_JOURNEY = 500;


function App() {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  // console.log("RENDER APP")
  return (
    <div className="relative flex flex-col bg-cotton-50">
      <div className="flex flex-col py-4 bg-cotton-100 shadow-sm">
        <div className="mx-auto grid grid-cols-2 w-full max-w-7xl justify-between gap-12 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">

          <div className="flex flex-col justify-center text-4xl font-bold">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Roadbook</h1>
          </div>

          {/* <!-- Comboboxes --> */}
          <div className="flex flex-col col-span-2 justify-between w-full gap-8 order-3 sm:flex-row lg:order-2">
            {/* <!-- Departure filters --> */}
            <PlaceComboBox
              key="departure"
              labelComboBox={t("Departure")}
            />
            {/* <!-- Heroicon name: mini/arrow-long-right --> */}
            <span className="hidden sm:block sm:pt-8 text-cinnamon-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
              </svg>
            </span>
            {/* <!-- Arrival filters --> */}
            <PlaceComboBox
              key="arrival"
              labelComboBox={t("Arrival")}
            />
          </div>

          {/* <!-- Help button --> */}
          <div className="flex justify-end order-2 lg:order-3">
            <div className="flex flex-col justify-center">
              <button type="button"
                onClick={() => dispatch(setHelpDialogStatus(true))}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cinnamon-500 focus:ring-offset-2">
                {t("Help")}
                {/* <!-- Heroicon name: mini/envelope --> */}
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.171 4.146l1.947 2.466a3.514 3.514 0 011.764 0l1.947-2.466a6.52 6.52 0 00-5.658 0zm8.683 3.025l-2.466 1.947c.15.578.15 1.186 0 1.764l2.466 1.947a6.52 6.52 0 000-5.658zm-3.025 8.683l-1.947-2.466c-.578.15-1.186.15-1.764 0l-1.947 2.466a6.52 6.52 0 005.658 0zM4.146 12.83l2.466-1.947a3.514 3.514 0 010-1.764L4.146 7.171a6.52 6.52 0 000 5.658zM5.63 3.297a8.01 8.01 0 018.738 0 8.031 8.031 0 012.334 2.334 8.01 8.01 0 010 8.738 8.033 8.033 0 01-2.334 2.334 8.01 8.01 0 01-8.738 0 8.032 8.032 0 01-2.334-2.334 8.01 8.01 0 010-8.738A8.03 8.03 0 015.63 3.297zm5.198 4.882a2.008 2.008 0 00-2.243.407 1.994 1.994 0 00-.407 2.243 1.993 1.993 0 00.992.992 2.008 2.008 0 002.243-.407c.176-.175.31-.374.407-.585a2.008 2.008 0 00-.407-2.243 1.993 1.993 0 00-.585-.407z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
      <main>
        <div className="w-full max-w-7xl mx-auto space-y-8 px-4 pt-12 sm:px-6 lg:px-8">
          <div className='flex space-x-4'>
            <SeasonFilters />
          </div>
          <div className="flex flex-wrap gap-4">
            <ActivityFilters />
          </div>
          <div className="mx-auto  pb-24 sm:px-6 lg:max-w-7xl lg:px-8" >
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <ButtonToRoadbook text={t("View Roadbook")} />
              <Journeys />
              <Roadbook />
            </div>
          </div>
          <DialogOverlays />
        </div>
      </main>
    </div>)
}

export default App;
