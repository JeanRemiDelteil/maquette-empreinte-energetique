async function getRawData() {
	const module = await import('./baseData.json');
	
	return module.default;
}


/**
 * Read values string and separates each components
 *
 * @param {string} values
 * @return {IBS_Value[]}
 */
function processValues(values) {
	let operator;
	values = values.trim();
	
	[, operator = '*', values = ''] = /^([/*])?\(?(.+?)\)?$/.exec(values) || [];
	
	const operation = ({
		'*': val => val,
		'/': val => 1 / val,
	})[operator] || (val => val);
	
	return values.split(';')
		.map(value => {
			const [label, val] = value.split('=');
			
			return {
				label,
				value: operation(val === undefined ? +label : val),
			};
		});
}

function process(data = []) {
	/**
	 * @type {IBaseData}
	 */
	let output = {};
	
	data.forEach(row => {
		let [activity, category, subCategory, baseKW, baseCO2, ...coefs] = row;
		
		let ref = output;
		ref = (ref[activity] = ref[activity] || {});
		ref = (ref[category] = ref[category] || {});
		
		subCategory = subCategory || '#Default#';
		ref = (ref[subCategory] = ref[subCategory] || {});
		
		ref.baseKW = baseKW;
		ref.baseCO2 = baseCO2;
		ref.coefs = [];
		
		// Get coefs
		while (coefs.length) {
			let label, values;
			[label, values, ...coefs] = coefs;
			
			ref.coefs.push({
				label,
				values: processValues(values),
			});
		}
	});
	
	return output;
}


/**
 * @return {Promise<IBaseData>}
 */
export async function getBaseData() {
	const rawData = await getRawData();
	
	return process(rawData);
}


/**
 * @param {IBaseData} baseData
 * @param {IConsumptionRef} ref
 *
 * @return {IConsumptionRef}
 */
export function calculateConsumption(baseData, ref) {
	const root = baseData[ref.activity][ref.category][ref.subCategory];
	const coefMul = root.coefs.reduce((acc, coef, index) => {
		acc *= coef.values[ref.coefsValueIndex[index]];
		
		return acc;
	}, 1);
	
	return {
		...ref,
		calculatedValue: {
			kW: root.baseKW * coefMul,
			CO2: root.baseKW * coefMul,
		},
	};
}
