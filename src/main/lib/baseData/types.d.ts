declare interface IBaseData {
	[activity: string]: IBS_Activity
}

declare interface IBS_Activity {
	[activity: string]: IBS_Category
}

declare interface IBS_Category {
	[activity: string]: IBS_SubCategory
}

declare interface IBS_SubCategory {
	baseKW: number
	baseCO2: number
	coefs: IBS_Coef[]
}

declare interface IBS_Coef {
	label: string
	values: IBS_Value[]
}

declare interface IBS_Value {
	label: string
	value: number
}


declare interface IConsumptionRef {
	activity: string
	category: string
	subCategory: string
	coefsValueIndex: number[] // index of the selected values
	
	calculatedValue?: IBSC_calculatedValue
}

declare interface IBSC_calculatedValue {
	kW: number
	CO2: number
}
