import {NAVIGATE_TO} from './types';

/**
 * @param {Location} location
 */
export const navigateTo = (location) => ({
	type: NAVIGATE_TO,
	payload: location,
});
