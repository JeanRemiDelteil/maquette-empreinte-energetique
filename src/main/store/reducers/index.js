import {combineReducers} from 'redux';
import {router} from './router';


/**
 * @return {Reducer}
 */
export const reducers = combineReducers({
	version: () => 0,
	router,
});
