import {html, LitElement} from 'lit-element';


export class Page404 extends LitElement {
	
	static get is() {
		return 'page-404';
	}
	
	render() {
		return html`
<div>
	404 not found ! <a href="/">Go home ?</a>
</div>`;
	}
	
}
