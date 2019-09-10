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

export const CATEGORY = 'CATEGORY';
export const COEFS = 'COEFS';

/**
 * @param {{}} input
 * @param {string} itemLabel
 * @param {string} itemType
 * @return {{}|*}
 * @private
 */
function _addItemInCategory(input, itemLabel, itemType) {
	let out;
	
	if (!input.values[itemLabel]) {
		out = input.values[itemLabel] = {};
	}
	else {
		return input.values[itemLabel];
	}
	
	out.type = itemType;
	out.label = itemLabel;
	itemType === CATEGORY && (out.values = {});
	
	return out;
}

function process(data = []) {
	/**
	 * @type {IBaseData}
	 */
	let output = {
		label: 'Activité',
		type: CATEGORY,
		values: {},
	};
	
	data.forEach(row => {
		let [activity, category, subCategory, baseKW, baseCO2, ...coefs] = row;
		
		let ref = _addItemInCategory(output, activity, CATEGORY);
		ref = _addItemInCategory(ref, category, CATEGORY);
		ref = _addItemInCategory(ref, subCategory || '#Default#', COEFS);
		
		
		ref.baseKW = baseKW;
		ref.baseCO2 = baseCO2;
		ref.coefs = [];
		
		// Get coefs
		while (coefs.length) {
			let label, values;
			[label, values, ...coefs] = coefs;
			
			if (!label) break;
			
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