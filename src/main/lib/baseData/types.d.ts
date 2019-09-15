declare type IBaseData = IBS_Category;


declare interface IBS_Category {
	type: 'CATEGORY';
	label: string;
	values: IBS_CategoryValues;
}

declare interface IBS_CategoryValues {
	[categoryName: string]: IBS_Category | IBS_Coefs;
}

declare interface IBS_Coefs {
	type: 'COEFS';
	label: string;
	baseKW: number;
	baseCO2: number;
	coefs: IBS_Coef[];
}

declare interface IBS_Coef {
	label: string
	values: IBS_Value[]
}

declare interface IBS_Value {
	label: string
	value: number
}

declare interface IBS_CoefValue {
	title: string
	label: string
	value: number
}


declare interface IConsumptionRef {
	activity: string;
	category: string;
	subCategory: string;
	baseValues: {
		baseKW: number;
		baseCO2: number;
	}
	coefs: IBS_CoefValue[]; // index of the selected values
	
	values?: IBSC_OutputValues;
}

declare interface IBSC_OutputValues {
	kW: number
	CO2: number
}
