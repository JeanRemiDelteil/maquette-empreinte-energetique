import {combineReducers} from 'redux';
import {router} from './router';
import {energyBalance} from './energyBalance';


/**
 * @return {Reducer}
 */
export const reducers = combineReducers({
	version: () => 0,
	router,
	energyBalance,
});
