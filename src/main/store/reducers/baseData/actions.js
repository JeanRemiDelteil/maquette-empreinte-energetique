import {BD_LOAD, BD_LOAD_FAILED, BD_LOADED} from './types';


export const baseDataLoad = () => ({type: BD_LOAD});

export const baseDataLoaded = (baseData) => ({
	type: BD_LOADED,
	payload: baseData,
});

export const baseDataLoadFailed = (error) => ({
	type: BD_LOAD_FAILED,
	payload: error,
});
