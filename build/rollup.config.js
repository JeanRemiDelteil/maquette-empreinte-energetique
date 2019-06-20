import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import del from 'rollup-plugin-delete';


/**
 * @return {Promise<BuildConfig>}
 */
async function getConfig() {
	const target = process.env['target'] || 'dev';
	
	return await import(`./config/${target}_config.js`);
}


/**
 * @param {BuildConfig} config
 */
function getPrepBuild(config) {
	return {
		plugins: [
			del({
				targets: `./${config.outputFolder}/`,
			}),
		],
	};
}


/**
 * @param {BuildConfig} config
 */
async function getRollUpConfig(config) {
	return {
		input: 'src/main/_entry_main.js',
		output: {
			dir: `./${config.outputFolder}/`,
			format: 'esm',
		},
		
		plugins: [
			resolve(),
			commonjs(),
		],
		
		'onwarn'(warning, rollupWarn) {
			// Shush CIRCULAR_DEPENDENCY for node_modules only
			if (warning.code === 'CIRCULAR_DEPENDENCY' && /^node_modules[\\/]/.test(warning['importer'])) return;
			
			rollupWarn(warning);
		},
	};
}


// noinspection JSUnusedGlobalSymbols
export default getConfig()
	.then(config => Promise.all([
		getPrepBuild(config),
		//getRollUpConfig(config),
	]));
