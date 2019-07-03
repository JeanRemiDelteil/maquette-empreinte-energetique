import {html, LitElement} from 'lit-element';
import Highcharts from 'highcharts/es-modules/parts/Globals.js';
import 'highcharts/es-modules/parts/SvgRenderer.js';
import 'highcharts/es-modules/parts/Html.js';
import 'highcharts/es-modules/parts/Axis.js';
import 'highcharts/es-modules/parts/DateTimeAxis.js';
import 'highcharts/es-modules/parts/LogarithmicAxis.js';
import 'highcharts/es-modules/parts/PlotLineOrBand.js';
import 'highcharts/es-modules/parts/Tooltip.js';
import 'highcharts/es-modules/parts/Pointer.js';
import 'highcharts/es-modules/parts/TouchPointer.js';
import 'highcharts/es-modules/parts/MSPointer.js';
import 'highcharts/es-modules/parts/Legend.js';
import 'highcharts/es-modules/parts/Chart.js';
import 'highcharts/es-modules/parts/ScrollablePlotArea.js';
import 'highcharts/es-modules/parts/Stacking.js';
import 'highcharts/es-modules/parts/Dynamics.js';
import 'highcharts/es-modules/parts/PieSeries.js';
import 'highcharts/es-modules/parts/DataLabels.js';
import 'highcharts/es-modules/modules/overlapping-datalabels.src.js';
import 'highcharts/es-modules/parts/Interaction.js';
import 'highcharts/es-modules/parts/Responsive.js';


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
