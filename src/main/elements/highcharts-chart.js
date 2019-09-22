import {html, LitElement} from 'lit-element';
import HighchartsLib from 'highcharts/es-modules/parts/Globals';
import 'highcharts/es-modules/parts/SvgRenderer';
import 'highcharts/es-modules/parts/Html';
import 'highcharts/es-modules/parts/Axis';
import 'highcharts/es-modules/parts/DateTimeAxis';
import 'highcharts/es-modules/parts/LogarithmicAxis';
import 'highcharts/es-modules/parts/PlotLineOrBand';
import 'highcharts/es-modules/parts/Tooltip';
import 'highcharts/es-modules/parts/Pointer';
import 'highcharts/es-modules/parts/TouchPointer';
import 'highcharts/es-modules/parts/MSPointer';
import 'highcharts/es-modules/parts/Legend';
import 'highcharts/es-modules/parts/Chart';
import 'highcharts/es-modules/parts/ScrollablePlotArea';
import 'highcharts/es-modules/parts/Stacking';
import 'highcharts/es-modules/parts/Dynamics';
import 'highcharts/es-modules/parts/DataLabels';
import 'highcharts/es-modules/modules/overlapping-datalabels.src';
import 'highcharts/es-modules/parts/Interaction';
import 'highcharts/es-modules/parts/Responsive';
import 'highcharts/es-modules/modules/drilldown.src';


export const Highcharts = HighchartsLib;

export class HighchartsChart extends LitElement {
	
	static get is() {
		return 'highcharts-chart';
	}
	
	// noinspection JSUnusedGlobalSymbols
	static get properties() {
		return {
			title: {type: String},
			type: {type: String},
			options: {type: Object},
		};
	}
	
	
	constructor() {
		super();
		
		this._chart = undefined;
		
		this.options = {};
		this.title = '';
		this.type = '';
	}
	
	firstUpdated(_changedProperties) {
		this._chartRoot = this.shadowRoot.querySelector('#chartRoot');
		
		console.log(this.options);
		
		this._chart = Highcharts.chart(this._chartRoot, {
			...this.options,
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: this.type,
				backgroundColor: 'transparent',
				style: {
					'fontFamily': `"Open Sans", Verdana, Arial, Helvetica, sans-serif`,
					'fontSize': '1em',
				},
				
				...(this.options.chart || {}),
				
				events: {
					drilldown: (event) => {
						this.dispatchEvent(new CustomEvent('chart-drilldown', {
							bubbles: true,
							composed: true,
							detail: event,
						}));
					},
					drillup: (event) => {
						this.dispatchEvent(new CustomEvent('chart-drillup', {
							bubbles: true,
							composed: true,
							detail: event,
						}));
					},
					
					...((this.options.chart || {}).events || {}),
				},
			},
			credits: {
				enabled: false,
				
				...(this.options.credits || {}),
			},
			title: {
				text: this.title,
				verticalAlign: 'bottom',
				style: {
					'fontSize': '1em',
				},
				
				...(this.options.title || {}),
			},
		});
		
		this.dispatchEvent(new CustomEvent('chart-ready', {
			composed: true,
			bubbles: true,
		}));
	}
	
	updated(changedProperties) {
		// if (!this._chart) return;
		
		changedProperties.forEach((oldValue, propName) => {
			switch (propName) {
				case 'title':
					this._chart.setTitle({text: this.title});
				
			}
		});
		
		this._chart.redraw();
	}
	
	//<editor-fold desc="# Renderer">
	
	render() {
		return html`
<style>
	:host {
		display: flex;
		
		font-size: 1.5em;
	}
</style>

<div id="chartRoot" style="width: 100%; height: 100%;"></div>`;
	}
	
	//</editor-fold>
	
	
	get chart() {
		return this._chart;
	}
	
}


customElements.define(HighchartsChart.is, HighchartsChart);
