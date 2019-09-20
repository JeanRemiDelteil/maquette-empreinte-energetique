import {html, LitElement} from 'lit-element';
import Highcharts from 'highcharts/es-modules/parts/Globals';
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
import 'highcharts/es-modules/parts/PieSeries';
import 'highcharts/es-modules/parts/DataLabels';
import 'highcharts/es-modules/modules/overlapping-datalabels.src';
import 'highcharts/es-modules/parts/Interaction';
import 'highcharts/es-modules/parts/Responsive';
import 'highcharts/es-modules/modules/drilldown.src';


export class HighchartsPie extends LitElement {
	
	static get is() {
		return 'highcharts-pie';
	}
	
	// noinspection JSUnusedGlobalSymbols
	static get properties() {
		return {
			title: {type: String},
		};
	}
	
	
	constructor() {
		super();
		
		this._chart = undefined;
		
		this.title = '';
	}
	
	firstUpdated(_changedProperties) {
		this._chartRoot = this.shadowRoot.querySelector('#chartRoot');
		
		this._chart = Highcharts.chart(this._chartRoot, {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
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
				},
				backgroundColor: 'transparent',
				style: {
					'fontFamily': `"Open Sans", Verdana, Arial, Helvetica, sans-serif`,
					'fontSize': '1em',
				},
			},
			credits: {
				enabled: false,
			},
			title: {
				text: this.title,
				verticalAlign: 'bottom',
				style: {
					'fontSize': '1em',
				},
			},
			/*tooltip: {
			 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
			 },
			 plotOptions: {
			 pie: {
			 allowPointSelect: true,
			 cursor: 'pointer',
			 dataLabels: {
			 enabled: true,
			 format: '<b>{point.name}</b>: {point.percentage:.1f} %',
			 style: {
			 color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
			 },
			 },
			 },
			 },*/
		});
		
		this.dispatchEvent(new CustomEvent('pie-ready', {
			composed: true,
			bubbles: true,
		}));
	}
	
	updated(changedProperties) {
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


customElements.define('highcharts-pie', HighchartsPie);
