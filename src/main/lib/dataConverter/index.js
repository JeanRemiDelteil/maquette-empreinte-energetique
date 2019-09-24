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


/**
 * @param {Array<IS_EBalance_Input>} inputs
 * @param {Array<string>} aggregateBy
 *
 * @return {IP_Aggregates}
 */
export function processAggregates(inputs, aggregateBy) {
	
	/**
	 * @type {IP_Aggregates}
	 */
	const root = {
		/**
		 * @type {Map<IP_Aggregates>}
		 */
		items: new Map(),
		/**
		 * @type {IBSC_OutputValues}
		 */
		values: null,
	};
	
	/**
	 * @type {Array<Array<IP_Aggregates>>}
	 */
	const levels = [
		[root],
		...aggregateBy.map(() => []),
	];
	
	// Build aggregation tree
	inputs.forEach(({id, data}) => {
		let aggregateIn = root.items;
		
		aggregateBy.forEach((prop, index) => {
			const category = data[prop];
			
			// Init new category item
			if (!aggregateIn.has(category)) {
				const newItemMap = {
					items: new Map(),
					values: null,
				};
				
				aggregateIn.set(category, newItemMap);
				
				// remember all Maps to quickly process them later
				levels[index + 1].push(newItemMap);
			}
			
			aggregateIn = aggregateIn.get(category).items;
		});
		
		aggregateIn.set(id, data);
	});
	
	// Calculate every levels value, starting leaves to root
	levels
		.reverse()
		.forEach(aggregates => aggregates
			.forEach(aggregate => {
					aggregate.values = {
						kW: 0,
						CO2: 0,
					};
					
					aggregate.items.forEach((item => {
						aggregate.values.CO2 += item.values.CO2;
						aggregate.values.kW += item.values.kW;
					}));
				},
			),
		);
	
	return root;
}

/**
 * @param {IP_Aggregates} aggregates
 * @param {Array<string>} path
 * @param {boolean} drillDown
 */
export function getSeriesData(aggregates, path, {useDrillDown = true} = {}) {
	let startAggregate = aggregates;
	
	// Find series by path
	path.forEach(categoryName => {
		startAggregate = startAggregate.items.get(categoryName);
		
		if (!startAggregate) throw 'No Category found';
	});
	
	
	// Build the output
	const output = {
		kW: [],
		CO2: [],
	};
	const drilldown = {
		kW: [],
		indexKW: {},
		CO2: [],
		indexCO2: {},
	};
	
	/**
	 * @param {Map} items
	 * @param {string} propName
	 */
	function getDrillDownValue(items, propName) {
		const arr = [];
		
		items.forEach((value, key) => {
			arr.push({
				name: key,
				y: value.values[propName],
			});
		});
		
		return arr;
	}
	
	if (useDrillDown) {
		startAggregate.items.forEach((category, key) => {
			output.kW.push({
				name: key,
				drilldown: key,
				y: category.values.kW,
			});
			output.CO2.push({
				name: key,
				drilldown: key,
				y: category.values.CO2,
			});
			
			drilldown.kW.push(drilldown.indexKW[key] = {
				name: key,
				id: key,
				data: getDrillDownValue(category.items, 'kW'),
			});
			drilldown.CO2.push(drilldown.indexCO2[key] = {
				name: key,
				id: key,
				data: getDrillDownValue(category.items, 'CO2'),
			});
		});
		
		return {
			kW: {
				main: output.kW,
				drilldown: {
					series: drilldown.kW,
					index: drilldown.indexKW,
				},
			},
			CO2: {
				main: output.CO2,
				drilldown: {
					series: drilldown.CO2,
					index: drilldown.indexCO2,
				},
			},
		};
	}
	
	startAggregate.items.forEach((category, key) => {
		output.kW.push({
			name: key,
			y: category.values.kW,
		});
		output.CO2.push({
			name: key,
			y: category.values.CO2,
		});
	});
	
	return {
		kW: {
			main: output.kW,
		},
		CO2: {
			main: output.CO2,
		},
	};
}
