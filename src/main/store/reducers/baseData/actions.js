import {BD_CONFIG_LOAD, BD_CONFIG_LOAD_FAILED, BD_CONFIG_LOADED, BD_LOAD, BD_LOAD_FAILED, BD_LOADED} from './types';


export const baseDataLoad = () => ({type: BD_LOAD});

export const baseDataLoaded = (baseData) => ({
	type: BD_LOADED,
	payload: baseData,
});

export const baseDataLoadFailed = (error) => ({
	type: BD_LOAD_FAILED,
	payload: error,
});


export const baseDataConfigLoad = () => ({type: BD_CONFIG_LOAD});

export const baseDataConfigLoaded = (configData) => ({
	type: BD_CONFIG_LOADED,
	payload: configData,
});

export const baseDataConfigLoadFailed = (error) => ({
	type: BD_CONFIG_LOAD_FAILED,
	payload: error,
});
