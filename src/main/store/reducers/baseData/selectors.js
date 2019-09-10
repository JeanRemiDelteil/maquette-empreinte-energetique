export function selectBaseData(state = {}) {
	return (state.baseData || {}).data || {};
}
