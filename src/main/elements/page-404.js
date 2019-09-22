import {html, LitElement} from 'lit-element';
import {LG_NOTHING_HERE, LG_RETURN_HOME} from '../lang/lang-fr';


export class Page404 extends LitElement {
	
	static get is() {
		return 'page-404';
	}
	
	render() {
		return html`
<style>
	:host {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
</style>

<div>
	<div>${LG_NOTHING_HERE}</div>
	<a href="/">${LG_RETURN_HOME}</a>
</div>`;
	}
	
}
