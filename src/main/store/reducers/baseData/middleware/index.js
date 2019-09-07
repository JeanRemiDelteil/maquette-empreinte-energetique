import {loadBaseDataMiddleware} from './LoadBaseData';
import {getBaseData} from '../../../../lib/baseData';


const loadBaseData = loadBaseDataMiddleware({getBaseData});

export const baseDataMiddlewares = [
	loadBaseData,
];
