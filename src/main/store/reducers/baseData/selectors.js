export function selectBaseData(state = {}) {
	return (state.baseData || {}).data || {};
}

/**
 * @return {IConfigData}
 */
export function selectConfigData(state = {}) {
	return (state.baseData || {}).configData || {};
}
