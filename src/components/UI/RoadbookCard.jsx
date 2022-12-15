import React from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { removeCartItem } from '../../api/axios';
import { setFilteringStatus, setJourneyDialogStatus, setRoadbook } from '../../store/actions/journeys';
import { store } from '../../store/rootReducer';
import { fetchRoadbookData, getJourneyInfoByJourneyVarId } from '../../utility/fetchRoadbook';
import ButtonIconCrossSVG from './svg/ButtonIconCrossSVG';
import ButtonIconViewSVG from './svg/ButtonIconViewSVG';

const RoadbookCard = ({ journey }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const journeyVarId = journey.relationships.purchased_entity.data.id
  const { journeyId, sku } = getJourneyInfoByJourneyVarId(journeyVarId)

  const removeJourneyToRoadBook = async (journey) => {
    try {
      // console.log("journey Remove");
      removeCartItem(journey)
      const updatedRoadbookData = await fetchRoadbookData()
      dispatch(setRoadbook(updatedRoadbookData))
      dispatch(setFilteringStatus(true))
    } catch (err) {
      console.error("ERROR removeJourneyToRoadBook: ", err)
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-3">
      <div className="mr-2 flex flex-col text-sm text-gray-600">
        <span>{journey.attributes.title}</span>
        <div className='flex text-gray-400 items-center'>
          <span>{sku}</span>
          <ButtonIconViewSVG
            onClick={() => dispatch(setJourneyDialogStatus(journeyId))}
          />
        </div>
      </div>
      <ButtonIconCrossSVG
        small={true}
        onClick={() => removeJourneyToRoadBook(journey)}
        text={t("Close panel")}
      />
    </div>
  );
};
export default RoadbookCard;
