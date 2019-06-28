import {ADD_ACTION} from './types';


/**
 * @param {string} action
 */
export const addAction = (action) => ({
	type: ADD_ACTION,
	payload: action,
});
