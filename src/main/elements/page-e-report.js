import {html, LitElement} from 'lit-element';
import 'highcharts/es-modules/parts/PieSeries';

import './highcharts-chart';
import {dataConverter} from '../lib/dataConverter';


export class PageEReport extends LitElement {
	
	static get is() {
		return 'page-e-report';
	}
	
	// noinspection JSUnusedGlobalSymbols
	static get properties() {
		return {
			actions: {type: Array},
		};
	}
	
	
	constructor() {
		super();
		
		this.actions = [];
		this.pieChart = null;
	}
	
	
	//<editor-fold desc="# Renderer">
	
	render() {
		return html`
<style>
	:host {
		display: block;
	}
</style>

<div>
	Energy balance
	
	<button @click="${this._onTakeTrain}">Take the train</button>
	<button @click="${this._onTakePlane}">Take the plane</button>
	<button @click="${this._onWashDishes}">Wash dishes</button>
	<button @click="${this._onToaster}">Grill some toasts</button>
	<button @click="${this._onLight}">Light the bulb</button>
	
	<div>
		<highcharts-chart
			id="pieChart"
			title="Actions"
			type="pie"
			
			@chart-ready="${this._onPieLoad}"
		></highcharts-chart>
	</div>
	
	<div>Actions</div>
	<div>
		${this._render_actionList(this.actions)}
	</div>
	
</div>`;
	}
	
	
	_render_actionList(actions) {
		if (!actions) return html``;
		
		return actions.map(action => html`<div>${JSON.stringify(action)}</div>`);
	}
	
	//</editor-fold>
	
	//<editor-fold desc="# LitElement lifecycle">
	
	firstUpdated(_changedProperties) {
		this.pieChart = this.shadowRoot.querySelector('#pieChart');
	}
	
	updated(changedProperties) {
		
		changedProperties.forEach((oldValue, propName) => {
			// noinspection JSRedundantSwitchStatement
			switch (propName) {
				case 'actions':
					this._onPropChanged_actions();
			}
		});
		
	}
	
	//</editor-fold>
	
	//<editor-fold desc="# Listeners">
	
	_onTakeTrain() {}
	
	_onTakePlane() {}
	
	_onWashDishes() {}
	
	_onToaster() {}
	
	_onLight() {}
	
	
	_onPieLoad() {
		// noinspection JSUnresolvedFunction
		this.pieChart.chart.addSeries({
			name: 'Actions',
			colorByPoint: true,
			data: [],
		});
		
		this.pieChart.chart.redraw();
	}
	
	//</editor-fold>
	
	
	_onPropChanged_actions() {
		if (!this.pieChart || !this.pieChart.chart) return;
		
		const {main, drilldown} = dataConverter(this.actions);
		
		this.pieChart.chart.drillUp();
		this.pieChart.chart.series[0].setData(main);
		this.pieChart.chart.drilldown.update(drilldown);
	}
	
	
}
