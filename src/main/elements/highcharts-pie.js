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
			},
			title: {
				text: this.title,
			},
			tooltip: {
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
			},
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
		display: block;
	}
</style>

<div id="chartRoot"></div>`;
	}
	
	//</editor-fold>
	
	
	get chart() {
		return this._chart;
	}
	
}


customElements.define('highcharts-pie', HighchartsPie);
