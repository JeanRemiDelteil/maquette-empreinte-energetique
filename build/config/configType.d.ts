declare interface BuildConfig {
	outputFolder: string;
	
	sourceMap: boolean;
	
	copy: string[];
	
	patchJson: { [path: string]: {} };
}
