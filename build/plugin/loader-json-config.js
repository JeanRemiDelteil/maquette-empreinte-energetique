/**
 * @param {string} path
 * @param {{}} patch
 */
async function patchJSON(path, patch) {
	const originalData = await import(`../${path}`);
	
	return {
		...originalData,
		...patch,
	};
}

/**
 * @param {Object<string, {}>} patches
 */
export async function patchJSONs(patches) {
	const res = {};
	
	for (const path of Object.keys(patches)) {
		res[path] = JSON.stringify(await patchJSON(path, patches[path]));
	}
	
	return res;
}
