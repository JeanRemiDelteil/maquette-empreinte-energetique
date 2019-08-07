import {html, LitElement} from 'lit-element';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-button/paper-button';
import {LG_NEW_E_FOOTPRINT, LG_START} from '../lang/lang-fr';


export class PageNewBalance extends LitElement {
	
	static get is() {
		return 'page-new-balance';
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
		max-width: 50em;
		width: 80%;
		height: 30%;
		min-height: 8em;
		
		padding: 2em;
		
		display: flex;
		flex-direction: column;
    }
    .title {
        
    }
    .content{
        display: flex;
        flex: auto;
        
        width: 100%;
    }
    .btn-create {
        margin: auto;
        padding: 1em 2em;
    }
</style>

<paper-card class="card-new">
	<div class="title">${LG_NEW_E_FOOTPRINT}</div>
	
	<div class="content">
		<paper-button class="btn-create" @click="${this._onStart}">${LG_START}</paper-button>
	</div>
</paper-card>
`;
	}
	
	
	_onStart() {}
}
