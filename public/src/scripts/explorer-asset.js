// locales
import Locales from './locales/locales';

// plugin
import Cookies from 'cookies-js';

// utils
import Convert from './utils/convert';

let locale = Cookies.get('REITsLocale');

// banner 的背景
particlesJS("particlesJs", {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 400
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

// 为日期控件添加中文配置
$.fn.datetimepicker.dates['zh'] = {
  days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
  daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  today: "今天",
  suffix: [],
  meridiem: ["上午", "下午"]
};

/**
 * [渲染换手率统计图]
 */
function turnoverChart(chartData) {
  let chartsTurnover = new Highcharts.StockChart({
    chart: {
      renderTo: 'turnoverChart'
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
    yAxis: {
      labels: {
        formatter: function() {
          return this.value + '%';
        }
      }
    },
    tooltip: {
      formatter: function() {
        var s = Highcharts.dateFormat('%Y-%m-%d', this.x);
        $.each(this.points, function() {
          s += '<br/><b style="color: ' + this.series.color + '">' + this.series.name + ': </b><b>' + this.y.toFixed(8) + '%</b>';
        });
        return s;
      }
    },
    series: [{
      name: Locales.explorer[locale].transaction,
      data: chartData,
      type: 'spline',
      tooltip: {
        valueDecimals: 2
      }
    }]
  });
}

/**
 * [获取换手率数据]
 * @param  {[string]} begin [开始日期]
 * @param  {[string]} end [结束日期]
 */
function getTurnover(begin, end) {
  if (!begin || !end) {
    return false;
  }
  let href = location.href.split('/');
  $.ajax({
    method: 'GET',
    url: '/explorer/turnover',
    cache: false,
    data: {
      assetId: href[href.length - 1],
      beginDate: begin,
      endDate: end
    },
    success: function(res) {
      if (res.success) {
        if (res.data.list && res.data.list.length) {
          let turnover = res.data.list;
          let chartData = [];
          // 将数据转换为数组，处理 unix 时间戳
          for (var i = 0; i < turnover.length; i++) {
            let time = (+new Date(turnover[i].time)) + 28800000;
            chartData.push([time, turnover[i].rate]);
          }
          turnoverChart(chartData);
        }
      }
    }
  });
}

// 生成换手率的默认查询日期
let today = Convert.timestamp((new Date() * 1), 'ymd');
let ago = Convert.timestamp((new Date() * 1 - (1000 * 60 * 60 * 24 * 30)), 'ymd'); // 30天以前

$("#startDate").val(ago);
$("#endDate").val(today);

$("#startDate").datetimepicker({
  format: 'yyyy-mm-dd',
  language: locale,
  autoclose: true,
  minView: 2,
  todayHighlight: true,
  endDate: Convert.timestamp(new Date() * 1, 'ymd') // 今天
});
$("#endDate").datetimepicker({
  format: 'yyyy-mm-dd',
  language: locale,
  autoclose: true,
  minView: 2,
  todayHighlight: true,
  endDate: Convert.timestamp(new Date() * 1, 'ymd') // 不能晚于今天
});

getTurnover(ago, today);

// 为时间选择框绑定 change 事件
$("#startDate, #endDate").on('change', function() {
  getTurnover($("#startDate").val(), $("#endDate").val());
});

// 搜索框的提交事件
$('#searchForm').on('submit', function(e) {
  e.preventDefault();
  // TODO: 调用搜索接口，根据返回的数据生成跳转链接
});
