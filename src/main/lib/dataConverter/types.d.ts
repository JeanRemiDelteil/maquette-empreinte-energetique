declare namespace Data {
	
	interface Action {
		category: string
		type: string
		value: number
	}
	
	interface Category {
		items: Map<string, number>
		value: number
	}
	
}


interface IP_Aggregates {
	items: Map<string, IP_Aggregates>;
	values: IBSC_OutputValues;
}
