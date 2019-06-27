import {html, LitElement} from 'lit-element';


export class PageMain extends LitElement {
	
	static get is() {
		return 'page-main';
	}
	
	render() {
		return html`
<style>
	:host {
		display: flex;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		
		--app-primary-color: #c97300;
		--app-primary-text-color: white;
		--app-secondary-color: #0081f5;
		--app-secondary-text-color: white;
	}
</style>

<main>
	Hey !!
</main>
`;
	}
}
