/**
 * @type {BuildConfig}
 */
export default {
	outputFolder: 'build/src/dev',
	
	copy: [
		'src/firebase.json',
		'src/.firebaserc',
	],
	
	// changes here will need restarting watch to take effects
	// Patch the /src/main/config.json file
	config: {},
};
