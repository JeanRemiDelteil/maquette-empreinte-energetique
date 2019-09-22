/*!
 * Original code from:
 * Copyright Marc J. Schmidt. See the LICENSE file at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 * 
 * Modified for JS module use, removes all JQuery or third party library stuff
 */


// Only used for the dirty checking, so the event callback count is limited to max 1 call per fps per sensor.
// In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
// would generate too many unnecessary events.
const requestAnimationFrame = window.requestAnimationFrame ||
                              window['mozRequestAnimationFrame'] ||
                              window['webkitRequestAnimationFrame'] ||
                              function (fn) {
	                              return window.setTimeout(fn, 20);
                              };


class EventQueue {
	
	constructor() {
		this.queue = [];
	}
	
	
	add(event) {
		this.queue.push(event);
	}
	
	call() {
		for (let i = 0, len = this.queue.length; i < len; i++) {
			this.queue[i].call();
		}
	}
	
	remove(event) {
		let newQueue = [];
		for (let i = 0, len = this.queue.length; i < len; i++) {
			if (this.queue[i] === event) continue;
			newQueue.push(this.queue[i]);
		}
		this.queue = newQueue;
	}
	
	length() {
		return this.queue.length;
	}
}


/**
 * Class for HTMLElement dimension change detection.
 */
class ResizeSensor {
	
	/**
	 * @param {HTMLElement | Element} element
	 * @param {Function} [onResize]
	 */
	constructor(element, onResize) {
		this._element = element;
		
		/**
		 * @type {EventQueue}
		 */
		this._resizedAttached = null;
		
		/**
		 * @type {HTMLElement}
		 */
		this._domSensor = null;
		
		this._attachSensor = this._attachSensor.bind(this);
		this._reset = this._reset.bind(this);
		this._onScroll = this._onScroll.bind(this);
		this._onResized = this._onResized.bind(this);
		this._dirtyCheckScrollState = this._dirtyCheckScrollState.bind(this);
		
		onResize && this.attach(onResize);
	}
	
	
	_attachSensor() {
		let domSensor = document.createElement('div');
		this._domSensor = domSensor;
		
		domSensor.className = 'resize-sensor';
		const style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
		const styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';
		
		domSensor.style.cssText = style;
		domSensor.innerHTML =
			`<div class="resize-sensor-expand" style="${style}"><div style="${styleChild}"></div></div>
<div class="resize-sensor-shrink" style="${style}"><div style="${styleChild} width: 200%; height: 200%"></div></div>`;
		
		this._element.appendChild(domSensor);
		
		if (domSensor.offsetParent !== this._element) {
			this._element.style.position = 'relative';
		}
		
		this._rafId = null;
		this._dirty = null;
		this._newWidth = null;
		this._newHeight = null;
		this._scrollStateInterval = null;
		
		this._expand = domSensor.children[0];
		this._expandChild = this._expand.childNodes[0];
		this._shrink = domSensor.children[1];
		
		this._lastWidth = this._element.offsetWidth;
		this._lastHeight = this._element.offsetHeight;
		
		
		this._expand.addEventListener('scroll', this._onScroll);
		this._shrink.addEventListener('scroll', this._onScroll);
		
		// Fix for custom Elements
		requestAnimationFrame(this._reset);
		
		// Fix for initial hidden element, dirtyCheck will stop once scroll event fired once.
		this._scrollStateInterval = setInterval(this._dirtyCheckScrollState, 20);
	}
	
	_reset() {
		this._expandChild.style.width = '100000px';
		this._expandChild.style.height = '100000px';
		
		this._expand.scrollLeft = 100000;
		this._expand.scrollTop = 100000;
		
		this._shrink.scrollLeft = 100000;
		this._shrink.scrollTop = 100000;
	}
	
	_dirtyCheckScrollState() {
		this._expand.scrollLeft === 0 && this._reset();
	}
	
	_onResized() {
		this._rafId = 0;
		
		if (!this._dirty) return;
		
		this._lastWidth = this._newWidth;
		this._lastHeight = this._newHeight;
		
		this._resizedAttached && this._resizedAttached.call();
	}
	
	_onScroll() {
		clearInterval(this._scrollStateInterval);
		
		this._newWidth = this._element.offsetWidth;
		this._newHeight = this._element.offsetHeight;
		this._dirty = this._newWidth !== this._lastWidth || this._newHeight !== this._lastHeight;
		
		if (this._dirty && !this._rafId) {
			this._rafId = requestAnimationFrame(this._onResized);
		}
		
		this._reset();
	}
	
	
	/**
	 * Attach a resize callBack
	 *
	 * @param {function} onResize
	 */
	attach(onResize) {
		!this._resizedAttached && (this._resizedAttached = new EventQueue());
		this._resizedAttached.add(onResize);
		
		// The following throws an error in IE11 with webpack in development mode. Works fine in production !
		!this._domSensor && this._attachSensor();
	}
	
	/**
	 * Detach given onResize
	 * Completely removes ResizeSensor if no more Callbacks
	 *
	 * @param {function} onResize
	 */
	detach(onResize) {
		if (!this._element) return;
		
		// remove callback from queue
		if (this._resizedAttached && typeof onResize === "function") {
			this._resizedAttached.remove(onResize);
			
			if (this._resizedAttached.length()) return;
			this._resizedAttached = null;
		}
		
		// No more sensor? quit
		if (!this._domSensor) return;
		
		// Remove sensor in case last callback was removed
		if (this._element.contains(this._domSensor)) {
			this._element.removeChild(this._domSensor);
		}
		this._domSensor = null;
	}
}


export default ResizeSensor;
