import {EB_ADD_ACTION, EB_LOAD_BALANCE_FAILURE, EB_LOAD_BALANCE_SUCCESS} from './types';
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

function balance(state = {}, action) {
	switch (action.type) {
		case EB_LOAD_BALANCE_SUCCESS:
			return {
				id: action.payload.id,
				data: {
					...(action.payload.data || {}),
				},
			};
		
		case EB_LOAD_BALANCE_FAILURE:
			return {
				id: action.payload.id,
				error: action.payload.error,
			};
	}
	
	return state;
}


export const energyBalance = combineReducers({
	actions,
	balance,
});
