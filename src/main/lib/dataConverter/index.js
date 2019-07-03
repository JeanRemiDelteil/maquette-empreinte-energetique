/**
 * @param {Data.Action[]} rawActions
 *
 * @return {[]}
 */
export function dataConverter(rawActions) {
	
	/**
	 * @type {Map<string, []>}
	 */
	const categories = new Map();
	
	// Aggregate by category
	rawActions.forEach(action => {
		!categories.has(action.category) && categories.set(action.category, []);
		
		categories
			.get(action.category)
			.push({
				type: action.type,
				value: action.value,
			});
	});
	
	// Build the output
	const output = [];
	categories.forEach((types, key) => {
		output.push({
			name: key,
			y: types.reduce((acc, value) => acc + getActionWeight({
				category: key,
				...value,
			}), 0),
		});
	});
	
	console.log(output);
	
	return output;
}


function getActionWeight({category, type, value}) {
	return value;
}
