import {BD_LOAD} from '../types';
import {baseDataLoaded, baseDataLoadFailed} from '../actions';


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
			}
			
			return next(action);
		};
	};
	
};
