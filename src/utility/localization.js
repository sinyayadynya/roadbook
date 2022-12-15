import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Departure": "Departure",
          "Arrival": "Arrival",
          "OurJourneys":  "Our Journeys",
          "YourRoadbook": "Your Roadbook",
          "Optional": "Optional",
          "defaultPlace": "Bishkek",
          "NoJourneys": "No Matching Journeys",
          "Hiking": "Hiking",
          "Horse Riding": "Horse Riding",
          "Mountaineering": "Mountaineering",
          "Rafting": "Rafting",
          "Road Cycling": "Road Cycling",
          "Ski Touring": "Ski Touring",
          "Ski/Snowboarding": "Ski/Snowboarding",
          "Backcountry Skiing": "Backcountry Skiing",
          "Heliskiing": "Heliskiing",
          "Flight": "Flight",
          "Drive": "Drive",
          "Nomadic Lifestyle": "Nomadic Lifestyle",
          "Historical Sites": "Historical Sites",
          "Volunteering": "Volunteering",
          "Mountain Biking": "Mountain Biking",
          "Hunting": "Hunting",
          "Handicraft": "Handicraft",
          "Wildlife Watching": "Wildlife Watching",
          "Observing Flora": "Observing Flora",
          "Health and Wellness": "Health and Wellness",
          "Snowshoeing": "Snowshoeing",
          "Year-Round": "Year-round",
          "Summer": "Summer",
          "Winter": "Winter",
          "buildJourneyMsg": "Build your amazing and unique journey, in 3 easy steps. From the Roadbook page, choose the places you don't want to miss, the activities that are thrilling you and submit your Roadbook",
          "helpSearchPlace":"Search by Places, and/or select Activities",
          "helpChooseJourney":"Choose your Journeys, adding them to your Roadbook",
          "helpReview":"Review your Roadbook and submit it to our Travel Planner crew",
          "helpTitle":"Adding journey to your roadbook",
          "help":'help',
          "view":'view'
        },
      },
      es: {
        translation: {
          "Departure": "Salida",
          "Arrival": "Llegada",
          "OurJourneys":  "Nuestros viajes",
          "YourRoadbook": "Tu Roadbook",
          "Optional": "Opcional",
          "defaultPlace": "Biskek",
          "NoJourneys": "Sin viajes coincidentes",
          "Hiking": "Excursionismo",
          "Horse Riding": "Equitación",
          "Mountaineering": "Alpinismo",
          "Rafting": "Rafting",
          "Road Cycling": "Ciclismo de carretera",
          "Ski Touring": "Esquí de travesía",
          "Ski/Snowboarding": "Esquí/Snowboard",
          "Backcountry Skiing": "Esquí de travesía",
          "Heliskiing": "Heliesquí",
          "Flight": "Vuelo",
          "Drive": "Conducir",
          "Nomadic Lifestyle": "Estilo de vida nómada",
          "Historical Sites": "Sitios Históricos",
          "Volunteering": "Voluntariado",
          "Mountain Biking": "Ciclismo de montaña",
          "Hunting": "Caza",
          "Handicraft": "Artesanía",
          "Wildlife Watching": "Observación de vida silvestre",
          "Observing Flora": "Observación de la flora",
          "Health and Wellness": "Salud y Bienestar",
          "Snowshoeing": "Raquetas",
          "Year-Round": "Todo el año",
          "Summer": "Verano",
          "Winter": "Invierno",
          "buildJourneyMsg": "Construye tu increíble y único viaje en 3 sencillos pasos. Desde la página del Roadbook, elige los lugares que no te quieres perder, las actividades que te emocionan y envía tu Roadbook",
          "helpSearchPlace":"Buscar por Lugares y/o seleccionar Actividades",
          "helpChooseJourney":'Elige tus Trayectos, agregándolos a tu Roadbook',
          "helpReview":"Revise su Roadbook y envíelo a nuestro equipo de Travel Planner",
          "helpTitle":"Agregar viaje a su libro de ruta",
          "help":'ayuda',
          "view":'vista'
        },
      },
      fr: {
        translation: {
          "Departure": "Départ",
          "Arrival": "Arrivée",
          "OurJourneys":  "Nos voyages",
          "YourRoadbook": "Votre Roadbook",
          "Optional": "Optionnel",
          "defaultPlace": "Bichkek",
          "NoJourneys": "Pas de parcours correspondants",
          "Hiking": "Randonnée",
          "Horse Riding": "Équitation",
          "Mountaineering": "Alpinisme",
          "Rafting": "Rafting",
          "Road Cycling": "Cyclisme sur route",
          "Ski Touring": "Ski de randonnée",
          "Ski/Snowboarding": "Ski/Snowboard",
          "Backcountry Skiing": "Ski hors-piste",
          "Heliskiing": "Héliski",
          "Flight": "Vol",
          "Drive": "Conduire",
          "Nomadic Lifestyle": "Mode de vie nomade",
          "Historical Sites": "Sites historiques",
          "Volunteering": "Volontariat",
          "Mountain Biking": "Vtt",
          "Hunting": "Chasse",
          "Handicraft": "Artisanat",
          "Wildlife Watching": "Observation de la faune",
          "Observing Flora": "Observer la flore",
          "Health and Wellness": "Santé et bien-être",
          "Snowshoeing": "Raquette",
          "Year-Round": "Toute l’année",
          "Summer": "Été",
          "Winter": "Hiver",
          "buildJourneyMsg": "Construisez votre voyage incroyable et unique, en 3 étapes faciles. Depuis la page Roadbook, choisissez les lieux à ne pas manquer, les activités qui vous font vibrer et soumettez votre Roadbook",
          "helpSearchPlace":"Rechercher par lieux et/ou sélectionner des activités",
          "helpChooseJourney":'Choisissez vos Parcours, ajoutez-les à votre Roadbook',
          "helpReview":"Passez en revue votre Roadbook et soumettez-le à notre équipe Travel Planner",
          "helpTitle":"Ajouter un trajet à votre roadbook",
          "help":'aider',
          "view":'voir'
        },
      },
      ru: {
        translation: {
          "Departure": "Отъезд",
          "Arrival": "Прибытие",
          "OurJourneys":  "Наши путешествия",
          "YourRoadbook": "Твоя дорожная книга",
          "Optional": "Необязательно",
          "defaultPlace": "Бишкек",
          "NoJourneys": "Нет совпадающих поездок",
          "Hiking": "Пеший туризм",
          "Horse Riding": "Верховая езда",
          "Mountaineering": "Альпинизм",
          "Rafting": "Лесосплав",
          "Road Cycling": "Шоссейный велоспорт",
          "Ski Touring": "Ски-туринг",
          "Ski/Snowboarding": "Лыжи/Сноуборд",
          "Backcountry Skiing": "Бэккантри Катание на лыжах",
          "Heliskiing": "Хелиски",
          "Flight": "Рейс",
          "Drive": "Гнать",
          "Nomadic Lifestyle": "Кочевой образ жизни",
          "Historical Sites": "Исторические места",
          "Volunteering": "Волонтёрство",
          "Mountain Biking": "Катание на горных",
          "Hunting": "велосипедах",
          "Handicraft": "Охота",
          "Wildlife Watching": "Ремесло",
          "Observing Flora": "Наблюдение за дикой природой",
          "Health and Wellness": "Здоровье и хорошее",
          "Snowshoeing": "самочувствие",
          "Year-Round": "Круглогодично",
          "Summer": "Лето",
          "Winter": "Зима",
          "buildJourneyMsg":"Создайте свое удивительное и уникальное путешествие, выполнив 3 простых шага. На странице Roadbook выберите места, которые вы не хотите пропустить, мероприятия, которые вас волнуют, и отправьте свою Roadbook.",
          "helpSearchPlace":"Поиск по местам и/или выберите действия",
          "helpChooseJourney":'Выберите свои путешествия, добавив их в свою дорожную книгу',
          "helpReview":"Просмотрите свою дорожную книгу и отправьте ее нашей команде по планированию путешествий.",
          "helpTitle":"Добавление поездки в дорожную книгу",
          "help":'помощь',
          "view":'Посмотреть'
        },
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

  export default i18n;

  export const getLocaleFromURL = () => {
    let localisation = location.pathname;

    localisation = localisation.split("/")[1];
    if(["en", "es", "fr", "ru"].includes(localisation)){
        localisation = localisation
    } else {
        localisation = "en";
    }

    return localisation;
  }
