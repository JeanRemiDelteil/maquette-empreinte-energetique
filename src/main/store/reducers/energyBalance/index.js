import {EB_ADD_ACTION, EB_BALANCE_INPUT_ADD_WITH_ID, EB_BALANCE_INPUT_DELETE, EB_LOAD_BALANCE_FAILURE, EB_LOAD_BALANCE_SUCCESS} from './types';
import {combineReducers} from 'redux';


function actions(state = [], action) {
	// noinspection JSRedundantSwitchStatement
	switch (action.type) {
		case EB_ADD_ACTION:
			const balanceAction = action.payload;
			
			return [
				...state,
				
				balanceAction,
			];
		
	}
	
	return state;
}

const BALANCE_INITIAL = {
	id: '',
	inputs: [],
};


/**
 * @param {IS_EBalance} state
 * @param action
 */
function balance(state = BALANCE_INITIAL, action) {
	switch (action.type) {
		case EB_LOAD_BALANCE_SUCCESS:
			return {
				id: action.payload.id,
				inputs: [],
				...(action.payload.data || {}),
			};
		
		case EB_LOAD_BALANCE_FAILURE:
			return {
				id: action.payload.id,
				error: action.payload.error,
			};
		
		case EB_BALANCE_INPUT_ADD_WITH_ID:
			const inputToAdd = action.payload.input || '';
			const inputId = action.payload.inputId || '';
			if (!inputToAdd || !inputId) break;
			
			return {
				...state,
				inputs: [
					...state.inputs,
					{
						id: inputId,
						data: inputToAdd,
					},
				],
			};
		
		case EB_BALANCE_INPUT_DELETE:
			const idToDelete = action.payload.inputId || '';
			if (!idToDelete) break;
			
			return {
				...state,
				inputs: [
					...state.inputs.filter(input => input.id !== idToDelete),
				],
			};
	}
	
	return state;
}


export const energyBalance = combineReducers({
	actions,
	balance,
});
