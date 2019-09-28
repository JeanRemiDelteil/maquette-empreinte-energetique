/**
 * @type {BuildConfig}
 */
module.exports = {
	outputFolder: 'build/src/dev',
	
	copy: [
		'src/firebase.json',
		'src/.firebaserc',
	],
	
	// changes here will need restarting watch to take effects
	// Patch the /src/main/config.json file
	patchJson: {
		// Patch the /src/main/config.json file
		'src/main/config.json': {
			env: 'production',
		},
	},
};
