import {html, LitElement} from 'lit-element';


export class PageEditBalance extends LitElement {
	
	static get is() {
		return 'page-edit-balance';
	}
	
	static get properties() {
		return {
			id: {type: String},
		};
	}
	
	
	constructor() {
		super();
		
		this.id = '';
	}
	
	render() {
		return html`
<style>
	:host {
		display: flex;
		width: 100%;
		
		align-items: center;
		justify-content: center;
	}
	
	.card-new {

</style>

<main>EDIT: ${this.id}</main>
`;
	}
	
}
