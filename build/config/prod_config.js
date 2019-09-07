/**
 * @type {BuildConfig}
 */
module.exports = {
	outputFolder: 'build/src/prod',
	
	sourceMap: false,
	
	// changes here will need restarting watch to take effects
	// Patch the /src/main/config.json file
	config: {
		env: 'production',
	},
};
