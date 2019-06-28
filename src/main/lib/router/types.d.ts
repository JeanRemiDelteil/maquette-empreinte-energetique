declare namespace Router {
	
	interface Route {
		name: string
		pattern: RegExp
		
		load(): string
		
		importLazy(): Promise<void>
	}
	
}
