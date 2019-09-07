import {BD_LOAD, BD_LOAD_FAILED, BD_LOADED, BD_STATE_EMPTY, BD_STATE_LOADED, BD_STATE_LOADING} from './types';
import {combineReducers} from 'redux';


export function data(state = [], action) {
	switch (action.type) {
		case BD_LOADED:
			return action.payload || [];
		
		case BD_LOAD_FAILED:
			return [];
	}
	
	return state;
}

export function state(state = BD_STATE_EMPTY, action) {
	switch (action.type) {
		case BD_LOAD:
			return BD_STATE_LOADING;
		
		case BD_LOADED:
			return BD_STATE_LOADED;
		
		case BD_LOAD_FAILED:
			console.error(action.payload);
			
			return BD_STATE_LOADED;
	}
	
	return state;
}


export const baseData = combineReducers({
	data,
	state,
});
