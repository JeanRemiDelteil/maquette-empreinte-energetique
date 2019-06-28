import createDefaultConfig from '@open-wc/building-rollup/modern-and-legacy-config';
import commonjs from 'rollup-plugin-commonjs';
import rimraf from 'rimraf';
import runCmd from './plugin/rollup-plugin-run-command';
import {terser} from 'rollup-plugin-terser';
import jsonPlugin from 'rollup-plugin-json';
import virtualModule from './plugin/rollup-plugin-virtual-processed';
import copy from 'rollup-plugin-copy';

import configFromSource from '../src/main/config.json';


async function getRollUpConfig() {
	const serve = process.env['serve'] || false;
	const target = process.env['target'] || 'dev';
	const production = !process.env['ROLLUP_WATCH'];
	
	/**
	 * @type {BuildConfig}
	 */
	const config = await import(`./config/${target}_config.js`);
	const srcConfig = {
		...configFromSource,
		...config.config,
	};
	
	
	const rollUpConfigs = createDefaultConfig({
		input: './src/index.html',
		outputDir: `./${config.outputFolder}`,
	});
	
	// Pre build Clean up of the output folder
	await new Promise(res => rimraf(`./${config.outputFolder}/**`, res));
	
	
	return rollUpConfigs.map((rollUpConfig, index) => {
		
		const modernBuild = index === 0;
		
		return {
			...rollUpConfig,
			
			'plugins': [
				// Import config from build config
				virtualModule({
					'src/main/config.json': JSON.stringify(srcConfig),
				}),
				
				...rollUpConfig.plugins.filter(plugin => !/^terser$/.test(plugin.name)),
				
				// Resolve commonJS modules
				commonjs(),
				
				jsonPlugin({
					exclude: ['node_modules/**'],
					preferConst: true,
				}),
				
				// Only copy files for first build
				modernBuild && copy({
					targets: [
						{
							src: [
								'src/firebase.json',
								'src/.firebaserc',
							],
							dest: `./${config.outputFolder}`,
						},
					],
					copyOnce: true,
					verbose: true,
				}),
				
				// Minification
				production && terser({
					mangle: {
						properties: {
							regex: /^_/,
						},
					},
				}),
				
				serve && runCmd({
					cmd: `cd ./${config.outputFolder} && superstatic --port 5000 --host localhost`,
					runOnce: true,
				}),
			],
			
			'onwarn'(warning, rollupWarn) {
				// Shush CIRCULAR_DEPENDENCY for node_modules only
				if (warning.code === 'CIRCULAR_DEPENDENCY' && /^node_modules[\\/]/.test(warning['importer'])) return;
				
				rollupWarn(warning);
			},
		};
	});
}


// noinspection JSUnusedGlobalSymbols
export default getRollUpConfig();
