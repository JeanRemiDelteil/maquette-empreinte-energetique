import {EB_BALANCE_INPUT_ADD, EB_BALANCE_INPUT_ADD_WITH_ID, EB_BALANCE_INPUT_DELETE, EB_CREATE, EB_LOAD_BALANCE, EB_LOAD_BALANCE_FAILURE, EB_LOAD_BALANCE_SUCCESS} from './types';


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

export const balance_addInput = (id, input) => ({
	type: EB_BALANCE_INPUT_ADD,
	payload: {
		id,
		input,
	},
});
export const balance_addInputWithId = (input, inputId) => ({
	type: EB_BALANCE_INPUT_ADD_WITH_ID,
	payload: {
		inputId,
		input,
	},
});
export const balance_deleteRef = (id, inputId) => ({
	type: EB_BALANCE_INPUT_DELETE,
	payload: {
		id,
		inputId,
	},
});
