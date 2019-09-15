export class Router {
	
	/**
	 * @param {Router.Route[]} routes
	 */
	constructor(routes) {
		/**
		 * @type {Router.Route[]}
		 * @private
		 */
		this._routes = routes || [];
		
		this._path = '';
		this._currentRouteOutput = '';
	}
	
	
	//<editor-fold desc="# Private methods">
	
	/**
	 * @param {Router.Route} route
	 * @param {string} path
	 *
	 * @private
	 */
	static _loadRoute(route, path) {
		return route.pattern.test(path);
	}
	
	/**
	 * @param module
	 * @private
	 */
	static _autoDefineLitElementClass(module) {
		Object.keys(module)
			.forEach(key => {
				const elemClass = module[key];
				if (!elemClass.is || !/^\w+(-\w+)+$/.test(elemClass.is)) return;
				
				customElements.define(module[key].is, module[key]);
			});
	}
	
	//</editor-fold>
	
	
	/**
	 * @param {string} path
	 */
	process(path) {
		if (path === this._path) return this._currentRouteOutput;
		this._path = path;
		
		for (let i = 0; i < this._routes.length; i++) {
			const route = this._routes[i];
			const loadRoute = Router._loadRoute(route, path);
			
			if (!loadRoute) continue;
			
			// Do lazy imports
			route.importLazy && route.importLazy()
				.then((module) => {
					delete route.importLazy;
					
					Router._autoDefineLitElementClass(module);
				});
			
			this._currentRouteOutput = route.load(route, path);
			return this._currentRouteOutput;
		}
		
		return '';
	}
	
	
}
