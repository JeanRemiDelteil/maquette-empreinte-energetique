declare namespace IEvents {
	
	interface Drilldown {
		category: number;
		originalEvent: Event;
		point: {
			options: {
				drilldown: string;
			}
		};
		points: {}[];
		seriesOptions: {};
	}
	
}


