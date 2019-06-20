import {html, LitElement} from 'lit-element';


class AppMain extends LitElement {
	
	static get is() {
		return 'app-main';
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
	
</main>
`;
	}
}

customElements.define(AppMain.is, AppMain);
