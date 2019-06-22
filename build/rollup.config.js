import createDefaultConfig from '@open-wc/building-rollup/modern-and-legacy-config';
import commonjs from 'rollup-plugin-commonjs';
import rimraf from 'rimraf';
import runCmd from './plugin/rollup-plugin-run-command';


async function getRollUpConfig() {
	const serve = process.env['serve'] || false;
	const target = process.env['target'] || 'dev';
	const config = await import(`./config/${target}_config.js`);
	
	const rollUpConfigs = createDefaultConfig({
		input: './src/index.html',
		outputDir: `./${config.outputFolder}`,
	});
	
	// Pre build Clean up of the output folder
	await new Promise(res => rimraf(`./${config.outputFolder}/**`, res));
	
	
	return rollUpConfigs.map(rollUpConfig => ({
		...rollUpConfig,
		
		plugins: [
			...rollUpConfig.plugins,
			
			commonjs(),
			
			...serve ? [
				runCmd({
					cmd: `http-server ./build/src/dev/`,
					runOnce: true,
				}),
			] : [],
		],
		
		'onwarn'(warning, rollupWarn) {
			// Shush CIRCULAR_DEPENDENCY for node_modules only
			if (warning.code === 'CIRCULAR_DEPENDENCY' && /^node_modules[\\/]/.test(warning['importer'])) return;
			
			rollupWarn(warning);
		},
	}));
}


// noinspection JSUnusedGlobalSymbols
export default getRollUpConfig();
