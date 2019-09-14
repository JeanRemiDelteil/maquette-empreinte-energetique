import {EB_CREATE, EB_LOAD_BALANCE} from '../types';
import {balanceLoaded, balanceLoadFailed, loadBalance} from '../actions';
import {NAVIGATE_TO} from '../../router/types';


/**
 * @param {IFirebaseDatabaseDriver} databaseDriver
 * @param navigateTo
 */
export const newBalanceMiddleware = ({databaseDriver, navigateTo}) => {
	
	/**
	 * @param {Store} store
	 */
	return ({dispatch, getState}) => {
		return (next) => (action) => {
			switch (action.type) {
				case EB_CREATE:
					databaseDriver.push('balances')
						.then(createdRef => {
							window.history.pushState({}, '', `/empreinte-energie/${createdRef.key}/modifier`);
							dispatch(navigateTo(window.location));
						});
					
					break;
				
				case NAVIGATE_TO:
					const pathName = action.payload.pathname;
					const [, id] = /^\/empreinte-energie\/([^/]+)\/modifier$/.exec(pathName) || [];
					
					if (!id) break;
					
					dispatch(loadBalance(id));
					
					break;
				
				case EB_LOAD_BALANCE:
					const balanceId = action.payload;
					if (!balanceId) break;
					
					databaseDriver.read(`balances/${balanceId}`)
						.then(snap => {
							const data = snap.val() || {};
							const inputs = data['inputs'] || {};
							
							dispatch(balanceLoaded(balanceId, {
								inputs: Object.keys(inputs).map((key => ({
									id: key,
									data: JSON.parse(inputs[key]),
								}))),
							}));
						})
						.catch(err => {
							dispatch(balanceLoadFailed(balanceId, err));
						});
					
					break;
			}
			
			return next(action);
		};
	};
	
};
