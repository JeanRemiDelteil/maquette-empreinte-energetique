import {NAVIGATE_TO} from './types';

/**
 * @param {Location} location
 * @return {{payload: *, type: string}}
 */
export const navigateTo = (location) => ({
	type: NAVIGATE_TO,
	payload: location,
});
