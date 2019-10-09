import {BD_CONFIG_LOAD, BD_LOAD} from '../types';
import {baseDataConfigLoaded, baseDataConfigLoadFailed, baseDataLoaded, baseDataLoadFailed} from '../actions';
import {getConfigData} from '../../../../lib/baseData';


export const loadBaseDataMiddleware = ({getBaseData}) => {
	
	/**
	 * @param {Store} store
	 */
	return ({dispatch, getState}) => {
		return (next) => (action) => {
			switch (action.type) {
				case BD_LOAD:
					getBaseData()
						.then(baseData => {
							dispatch(baseDataLoaded(baseData));
						})
						.catch(err => {
							dispatch(baseDataLoadFailed(err));
						});
					
					break;
				
				case BD_CONFIG_LOAD:
					getConfigData()
						.then(configData => {
							dispatch(baseDataConfigLoaded(configData));
						})
						.catch(err => {
							dispatch(baseDataConfigLoadFailed(err));
						});
					
					break;
			}
			
			return next(action);
		};
	};
	
};
