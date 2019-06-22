import child_process from 'child_process';

let runOnceGlobal = false;

function runCommand(cmd) {
	const child = child_process.exec(cmd);
	
	child.stdout.pipe(process.stdout);
}


/**
 * @param {{}} options
 * @param {string} options.cmd
 * @param {boolean | 'global' | 'config'} [options.runOnce]
 */
export default function (options) {
	let runOnceConfig = false;
	
	return {
		name: 'run-command',
		
		'writeBundle'() {
			if ((options.runOnce === 'config' && !runOnceConfig) || (options.runOnce && options.runOnce !== 'config' && !runOnceGlobal)) {
				runCommand(options.cmd);
			}
			
			runOnceGlobal = true;
			runOnceConfig = true;
		},
	};
}
