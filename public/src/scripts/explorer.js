// locales
import Locales from './locales/locales';

// plugin
import Cookies from 'cookies-js';

let locale = Cookies.get('REITsLocale');

// mock data
let turnover = [
  [1467331200000, 95.89],
  [1467676800000, 94.99],
  [1467763200000, 95.53],
  [1467849600000, 95.94],
  [1467936000000, 96.68],
  [1468195200000, 96.98],
  [1468281600000, 97.42],
  [1468368000000, 96.87],
  [1468454400000, 98.79],
  [1468540800000, 98.78],
  [1468800000000, 99.83],
  [1468886400000, 99.87],
  [1468972800000, 99.96],
  [1469059200000, 99.43],
  [1469145600000, 98.66],
  [1469404800000, 97.34],
  [1469491200000, 96.67],
  [1469577600000, 102.95],
  [1469664000000, 104.34],
  [1469750400000, 104.21],
  [1470009600000, 106.05],
  [1470096000000, 104.48],
  [1470182400000, 105.79],
  [1470268800000, 105.87],
  [1470355200000, 107.48],
  [1470614400000, 108.37],
  [1470700800000, 108.81],
  [1470787200000, 108.00],
  [1470873600000, 107.93],
  [1470960000000, 108.18],
  [1471219200000, 109.48]
];

let chartsTurnover = new Highcharts.StockChart({
  chart: {
    renderTo: 'chartsTurnover'
  },
  rangeSelector: {
    enabled: false,
    inputEnabled: false
  },
  credits: {
    enabled: false
  },
  xAxis: {
    type: 'datetime', 
    labels: {
      formatter: function() {
        let vDate = new Date(this.value);
        return vDate.getFullYear() + "-" + (vDate.getMonth() + 1) + "-" + vDate.getDate();
      },
      align: 'center'
    }
  },
  tooltip: {
    formatter: function() {
      var s = Highcharts.dateFormat('%Y-%m-%d', this.x);
      $.each(this.points, function() {
        s += '<br/><b style="color: ' + this.series.color + '">' + this.series.name + ': </b><b>' + this.y + '</b>';
      });
      return s;
    }
  },
  series: [{
    name: Locales.explorer[locale].transaction,
    data: turnover,
    type: 'spline',
    tooltip: {
      valueDecimals: 2
    }
  }]
});
