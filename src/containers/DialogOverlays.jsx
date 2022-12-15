import React from 'react'
import { useSelector } from 'react-redux'
import { HelpDialog } from './HelpDialog'
import { JourneyDialog } from './JourneyDialog'

export default function DialogOverlays() {
    const helpShow = useSelector((state) => state.journeys.isHelpDialogOpen)
    const journeyInfo = useSelector((state) => state.journeys.isJourneyDialogOpen)
    return (
        <>
            {journeyInfo && < JourneyDialog journeyInfo={journeyInfo} />}
            {helpShow && <HelpDialog />}

        </>
    )
}
