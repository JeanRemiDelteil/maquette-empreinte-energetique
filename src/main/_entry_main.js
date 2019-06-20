import loadPolyfills from '@open-wc/polyfills-loader';


loadPolyfills()
	.then(() => import('./containers/app-main'));
