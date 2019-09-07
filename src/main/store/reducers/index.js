import {combineReducers} from 'redux';
import {router} from './router';
import {energyBalance} from './energyBalance';
import {baseData} from './baseData';


/**
 * @return {Reducer}
 */
export const reducers = combineReducers({
	version: () => 0,
	router,
	energyBalance,
	baseData,
});
