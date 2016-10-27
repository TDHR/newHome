// locales
import Locales from './locales/locales';

// plugin
import Cookies from 'cookies-js';

let locale = Cookies.get('REITsLocale');

// banner 的背景
particlesJS("particlesJs", {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 600
      }
    },
    "color": {
      "value": "#fff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.3,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 120,
      "color": "#fff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    }
  },
  "retina_detect": true
});

// 获取换手率数据
$.ajax({
  method: 'GET',
  url: '/explorer/turnover',
  cache: false,
  success: function(res) {
    if (res.success) {
      if (res.data && res.data.length) {
        let turnover = res.data;
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
      }
    }
  }
});
