interface IS_EBalance {
	id: string;
	inputs: IS_EBalance_Input[];
}

interface IS_EBalance_Input {
	id: string;
	data: IConsumptionRef;
}
