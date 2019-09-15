import {configInputData} from '../../config.json';


async function getRawData() {
	const [spsId, sheetName, range] = configInputData.path.split('!');
	
	return await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spsId}/values/${sheetName}!${range}?key=${configInputData.apiKey}`)
		.then(fetchRes => fetchRes.json())
		.then(data => {
			if (data.error) throw data.error;
			if (!data.values) throw {code: 0, message: 'No values found', status: 'NO_VALUES'};
			
			return data.values;
		})
		.catch(async err => {
			console.error(err);
			console.log('Fallback to static data');
			
			const module = await import('./baseData.json');
			
			return module.default;
		});
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
export const DEFAULT = '#Default#';

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
		ref = _addItemInCategory(ref, subCategory || DEFAULT, COEFS);
		
		
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
 * @param {IConsumptionRef} ref
 *
 * @return {IConsumptionRef}
 */
export function calculateConsumption(ref) {
	const coefMul = ref.coefs.reduce((acc, coef) => {
		acc *= coef.value;
		
		return acc;
	}, 1);
	
	return {
		...ref,
		values: {
			kW: ref.baseValues.baseKW * coefMul,
			CO2: ref.baseValues.baseCO2 * coefMul,
		},
	};
}
