import {applyMiddleware, compose, createStore} from 'redux';
import {connect as connectMixin} from 'pwa-helpers/connect-mixin';
import {reducers} from './reducers';
import {eBalanceMiddlewares} from './reducers/energyBalance/middleware';
import {baseDataMiddlewares} from './reducers/baseData/middleware';


/**
 * Redux store enhancers
 *
 * @type {[]}
 */
let enhancers = [];

/**
 * Redux store middleWares
 *
 * @type {Middleware[]}
 */
const middlewares = [
	...eBalanceMiddlewares,
	...baseDataMiddlewares,
];


// Only active for dev
if (process.env.NODE_ENV === 'development') {
	const devToolsExtension = window['__REDUX_DEVTOOLS_EXTENSION__'];
	
	if (typeof devToolsExtension === 'function') {
		enhancers = [
			...enhancers,
			devToolsExtension(),
		];
	}
}


const composedEnhancers = compose(
	applyMiddleware(...middlewares),
	...enhancers,
);


/**
 * Create redux store
 *
 * @type {Store}
 */
export const store = createStore(reducers, composedEnhancers);


export const connect = (elementClass) => {
	Object.defineProperty(elementClass.prototype, 'store', {
		value: store,
	});
	
	return connectMixin(store)(elementClass);
};
