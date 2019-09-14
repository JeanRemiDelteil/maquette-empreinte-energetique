import {newBalanceMiddleware} from './NewBalanceMiddleware';
import {editBalanceMiddleware} from './EditBalanceMiddleware';
import {firebaseDatabaseDriver} from '../../../../lib/firebaseAPI';
import {navigateTo} from '../../router/actions';


const newEnergyBalance = newBalanceMiddleware({
	databaseDriver: firebaseDatabaseDriver,
	navigateTo,
});

const editEnergyBalance = editBalanceMiddleware({
	databaseDriver: firebaseDatabaseDriver,
});


export const eBalanceMiddlewares = [
	newEnergyBalance,
	editEnergyBalance,
];
