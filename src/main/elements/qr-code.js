import {html, LitElement} from 'lit-element';
import QRCode from 'qrcode/build/qrcode.min';


export class QrCode extends LitElement {
	
	static get is() {
		return 'qr-code';
	}
	
	static get properties() {
		return {
			url: {type: String},
		};
	}
	
	constructor() {
		super();
		
		this.url = '';
	}
	
	
	render() {
		return html`
<style>
	:host {
		display: flex;
	}
	#content {
		display: flex;
		width: 100%;
		height: 100%;
	}
	#content > svg {
		display: block;
		margin: auto;
		height: 100%;
		
		/* Bad fix for Safari */
		min-width: 200px;
	}
</style>

<main id="content"></main>
`;
	}
	
	firstUpdated(_changedProperties) {
		this._domContent = this.shadowRoot.querySelector('#content');
		
		this.buildQR(this.url);
	}
	
	
	set url(url) {
		this._url = url;
		
		this.buildQR(url);
	}
	
	get url() {
		return this._url;
	}
	
	
	/**
	 * @param {string} url
	 */
	async buildQR(url) {
		if (!this._domContent || !url) return;
		
		this._domContent.innerHTML = await QRCode.toString(url);
	}
	
}

customElements.define(QrCode.is, QrCode);
