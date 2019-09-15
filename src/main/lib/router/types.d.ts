declare namespace Router {
	
	interface Route {
		name: string
		pattern: RegExp
		
		load(route: Route, path: string): string
		
		importLazy(): Promise<void>
	}
	
}
