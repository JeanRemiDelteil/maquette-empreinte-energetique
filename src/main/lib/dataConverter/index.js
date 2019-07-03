import {actionsWeights} from './actionsWeights';


/**
 * @param {Data.Action[]} rawActions
 */
export function dataConverter(rawActions) {
	
	/**
	 * @type {Map<string, Data.Category>}
	 */
	const categories = new Map();
	
	// Aggregate by category
	rawActions.forEach(action => {
		!categories.has(action.category) && categories.set(action.category, {
			items: new Map(),
			value: 0,
		});
		
		const category = categories.get(action.category);
		!category.items.has(action.type) && category.items.set(action.type, 0);
		
		const actionWeight = getActionWeight(action);
		
		category.items.set(action.type, category.items.get(action.type) + actionWeight);
		category.value += actionWeight;
	});
	
	// Build the output
	const output = [];
	const drilldown = [];
	
	categories.forEach((category, key) => {
		output.push({
			name: key,
			drilldown: key,
			y: category.value,
		});
		
		drilldown.push({
			name: key,
			id: key,
			data: (items => {
				const arr = [];
				
				items.forEach((value, key) => {
					arr.push({
						name: key,
						y: value,
					});
				});
				
				return arr;
			})(category.items),
		});
	});
	
	return {
		main: output,
		drilldown: {series: drilldown},
	};
}


function getActionWeight({category, type, value}) {
	return ((actionsWeights[category] || {})[type] || (val => val || 0))(value);
}
