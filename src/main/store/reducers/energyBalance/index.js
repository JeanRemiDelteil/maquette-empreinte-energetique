import {ADD_ACTION} from './types';
import {combineReducers} from 'redux';


function actions(state = [], action) {
	// noinspection JSRedundantSwitchStatement
	switch (action.type) {
		case ADD_ACTION:
			const balanceAction = action.payload;
			
			return [
				...state,
				
				balanceAction,
			];
		
	}
	
	return state;
}


export const energyBalance = combineReducers({
	actions,
});
