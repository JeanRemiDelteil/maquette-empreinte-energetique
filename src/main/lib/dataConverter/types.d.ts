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
