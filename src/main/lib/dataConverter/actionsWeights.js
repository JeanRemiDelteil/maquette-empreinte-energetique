export const actionsWeights = {
	'Transport': {
		'Walking': kilometers => kilometers / 100 * 6.1109 * 1000,
		'Bicycle': kilometers => kilometers / 100 * 3.055 * 1000,
		'Volkswagen Polo': kilometers => kilometers / 100 * 36.11 * 1000,
		'Toyota Prius': kilometers => kilometers / 100 * 39.86 * 1000,
		'Tesla Model S': kilometers => kilometers / 100 * 17.25 * 1000,
		'Bugatti Veyron': kilometers => kilometers / 100 * 228.33 * 1000,
		'Train': kilometers => kilometers / 100 * 2.555 * 1000, // Japan - JR East Conventional Rail
		'Plane': kilometers => kilometers / 100 * 38.888 * 1000, // Average for planes in 1998
	},
	'HouseChore': {
		'Wash dishes': () => 1800,
		'Toaster': () => 100,
		'Light': wattsPerUse => wattsPerUse,
	},
};
