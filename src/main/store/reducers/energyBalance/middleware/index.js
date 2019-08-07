import {newBalanceMiddleware} from './NewBalanceMiddleware';
import {firebaseDatabaseDriver} from '../../../../lib/firebaseAPI';
import {navigateTo} from '../../router/actions';


const newEnergyBalance = newBalanceMiddleware({
	databaseDriver: firebaseDatabaseDriver,
	navigateTo,
});


export const eBalanceMiddlewares = [
	newEnergyBalance,
];
