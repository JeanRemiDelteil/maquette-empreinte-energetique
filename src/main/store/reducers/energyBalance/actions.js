import {EB_ADD_ACTION, EB_BALANCE_INPUT_ADD, EB_CREATE, EB_LOAD_BALANCE, EB_LOAD_BALANCE_FAILURE, EB_LOAD_BALANCE_SUCCESS} from './types';


/**
 * @param {string} action
 */
export const addAction = (action) => ({
	type: EB_ADD_ACTION,
	payload: {...action},
});


export const create = () => ({
	type: EB_CREATE,
	payload: {},
});


export const loadBalance = (id) => ({
	type: EB_LOAD_BALANCE,
	payload: id,
});

export const balanceLoaded = (id, data) => ({
	type: EB_LOAD_BALANCE_SUCCESS,
	payload: {
		id,
		data,
	},
});
export const balanceLoadFailed = (id, error) => ({
	type: EB_LOAD_BALANCE_FAILURE,
	payload: {
		id,
		error,
	},
});

export const balance_addInput = (input) => ({
	type: EB_BALANCE_INPUT_ADD,
	payload: {
		input,
	},
});
