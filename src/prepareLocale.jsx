import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Bootstrap from './Bootstrap';
import { getLocaleFromURL } from './utility/localization';

export default function PrepareLocale() {
    const { t, i18n } = useTranslation();
    const locale = getLocaleFromURL();
    const [isReadyApp, setIsReadyApp] = useState(false)
    useEffect(() => {
        i18n.changeLanguage(locale).then(() => setIsReadyApp(true))
    }, [])
    // console.log("RENDER PrepareLocale")
    return isReadyApp && <Bootstrap />

}
