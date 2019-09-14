import {EB_BALANCE_INPUT_ADD, EB_BALANCE_INPUT_DELETE} from '../types';
import {balance_addInputWithId} from '../actions';


/**
 * @param {IFirebaseDatabaseDriver} databaseDriver
 */
export const editBalanceMiddleware = ({databaseDriver}) => {
	
	/**
	 * @param {Store} store
	 */
	return ({dispatch, getState}) => {
		return (next) => (action) => {
			switch (action.type) {
				case EB_BALANCE_INPUT_ADD:
					let {id: idToAdd, input: inputToAdd} = action.payload;
					
					databaseDriver.push(`balances/${idToAdd}/inputs`, JSON.stringify(inputToAdd))
						.then(createdRef => {
							dispatch(balance_addInputWithId(inputToAdd, createdRef.key));
						});
					
					break;
				
				case EB_BALANCE_INPUT_DELETE:
					let {id: idToDelete, inputId: inputToDelete} = action.payload;
					
					// noinspection JSIgnoredPromiseFromCall
					databaseDriver.delete(`balances/${idToDelete}/inputs/${inputToDelete}`);
			}
			
			return next(action);
		};
	};
	
};
