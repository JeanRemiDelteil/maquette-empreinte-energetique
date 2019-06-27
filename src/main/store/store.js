import {applyMiddleware, compose, createStore} from 'redux';
import {connect as connectMixin} from 'pwa-helpers/connect-mixin';
import {reducers} from './reducers';


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
const middlewares = [];


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
