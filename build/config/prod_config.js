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
			firebaseConfig: {
				apiKey: "AIzaSyAHBU0tDjI2N8nlivaTezG5JAAdotX1Usk",
				authDomain: "empreinte-energie.firebaseapp.com",
				databaseURL: "https://empreinte-energie.firebaseio.com",
				projectId: "empreinte-energie",
				appId: "1:1025624645904:web:d97fc6d3d3030053424595",
			},
			configInputData: {
				"path": "1lcNwVMs0xgJOpy1xIxAfeNNrPndzWcevbUG258HmQHU!Inputs!A3:M",
				"apiKey": "AIzaSyDRi-RwhxcYjIeCRpjPcB89e1EVQdYxr_s",
			},
		},
	},
};
