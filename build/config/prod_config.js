/**
 * @type {BuildConfig}
 */
module.exports = {
	outputFolder: 'build/src/prod',
	
	sourceMap: false,
	
	copy: [
		'src/firebase.json',
		'build/config/prod/.firebaserc',
	],
	
	// changes here will need restarting watch to take effects
	patchJson: {
		// Patch the /src/main/config.json file
		'src/main/config.json': {
			env: 'production',
		},
	},
};
