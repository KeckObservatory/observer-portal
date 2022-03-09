// provider.js

import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios'
import { handleResponse, handleError } from './response';
import URLS_CONFIG from "../urls_config.live.json";

// const LOCAL_HOST = URLS_CONFIG.LOCAL_HOST;
const LOCAL_HOST = 'https://' + window.location.hostname;

const BASE_URL = {
    telSched: URLS_CONFIG.TELSCHED_API,
    proposal: URLS_CONFIG.PROPOSAL_API,
    koarti:  URLS_CONFIG.KOARTI_API,
    metrics:  URLS_CONFIG.METRICS_API
}

/** @param {string} resource */
const getAll = (resource, api_type) => {

    return axios
        .get(`${LOCAL_HOST}${BASE_URL[api_type]}${resource}`)
        .then(handleResponse)
        .catch(handleError);
};

export const apiProvider = {
    getAll,
};
