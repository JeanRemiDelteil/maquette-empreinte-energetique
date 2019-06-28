import {env} from './config.json';


window['process'] = {
	'env': {
		'NODE_ENV': env,
	},
};
