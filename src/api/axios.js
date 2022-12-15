import axios from 'axios';
import { HttpClient } from '@centarro/js-sdk'
import { v4 as uuidv4 } from "uuid";

import { getLocaleFromURL } from '../utility/localization';

export const baseURL = 'https://nomadsland.travel/';
export const api = axios.create({
  baseURL: 'https://nomadsland.travel/',
});

const locale = getLocaleFromURL();

const httpClient = new HttpClient(
  baseURL,
  `/${locale}`,
  getOrGenerateCartId(),
  localStorage.getItem('currentStoreId')
);

const httpClientJSON = new HttpClient(
  baseURL,
  '/jsonapi',
  getOrGenerateCartId(),
  localStorage.getItem('currentStoreId')
);

function getOrGenerateCartId() {
  var cartToken = localStorage.getItem('cartToken');
  if (!cartToken) {
    const token = uuidv4();
    localStorage.setItem('cartToken', token);
    cartToken = token;
  }
  return cartToken
}

export const getJourneys = async () => {
  try {
    const response = await api.get(`/${locale}/api/products/journey?_format=json`)

    return response.data
  } catch (err) {
    console.error("ERROR getJourneys: ", err)
  }
};

export const getJourneyParams = async (viewId) => {
  try {
    const response = await api.get(`/${locale}/api/products/journey/${viewId}`)
    // // console.log("response getJourneyParams", response.data[0])
    return response.data[0];
  } catch (err) {
    console.error("ERROR getJourneyParams: ", err)
  }
}

export const getJourneyId = async (id) => {
  try {

    const response = await httpClient.request(`/jsonapi/products/journey/${id}`,
      {
        includes: ["field_media_images", "field_media_images.field_media_image",
          "field_journey_departure", "field_journey_activities", "field_journey_arrival",

        ],
        fields: {
          "file--file": ["uri", "url"],
        },
      });
    // // console.log("response getJourneyId", response)
    return response;
  } catch (err) {
    console.error("ERROR getJourneyId: ", err)
  }
}


export const getPlaceDataAPI = async (placeData) => {
  try {
    const response = await api.get(`/${locale}/api/node/${placeData}`);
    return response.data;
  } catch (err) {
    console.error("ERROR getPlacesAPI: ", err)
  }
};



export const getRoadbookApi = async () => {
  try {
    const response = await httpClientJSON.getCart({

      'product--simple': ['path'],
      'product-variation--simple': ['product_id'],
      'product--journey': ['product_id'],
      'product-variation--journey': ['product_id'],
      fields: ['product-variation--journey', "field_journey_departure", "field_journey_arrival"]
    });
    // // console.log("getRoadbookApi", response)
    return response;
  } catch (err) {
    console.error("ERROR getRoadbookApi: ", err)
  }
}


export const addToCartApi = async (variation) => {
  try {
    const response = await httpClientJSON.addToCart(variation, 1, {
      'product--journey': ['product_id'],
      'product-variation--journey': ['product_id'],
    },
      ["order_id.order_items.purchased_entity.product_id"]
    )
    return response.data;
  } catch (err) {
    console.error("ERROR addToCartApi: ", err)
  }
}


export const removeCartItem = async (id) => {
  try {
    const response = await httpClientJSON.removeCartItem(id);
    // console.log("removeCardItem", response)
    return response;
  } catch (err) {
    console.error("ERROR removeCartItem: ", err)
  }
}

export const getCheckoutRoadbook = async (cartInfo) => {
  try {
    const response = await httpClientJSON.getCheckout(cartInfo);
    // console.log("getCheckoutRoadbook", response)
    return response;
  } catch (err) {
    console.error("ERROR getCheckoutRoadbook: ", err)
  }
}

export const getTaxonomyTerms = async (typeTerms) => {
  try {
    const result = await httpClientJSON.request(`/taxonomy_term/${typeTerms}`);
    // // console.log(typeTerms, result)
    return result
  } catch (err) {
    console.error("ERROR getTaxonomyTerm: ", typeTerms, err)
  }
}

