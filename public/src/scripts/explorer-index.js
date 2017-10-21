// plugin
import Cookies from 'cookies-js';

// utils
import Convert from './utils/convert';

// modules
import Alert from './modules/alert';

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

// 搜索按钮
$('#searchBtn').on('click', function() {
  if (!$(this).hasClass('disabled')) {
    var keyword = $('#keyword').val();
    if (keyword) {
      $.ajax({
        method: 'GET',
        url: '/explorer/search',
        cache: false,
        data: {
          key: keyword
        },
        beforeSend: function() {
          $(this).addClass('disabled');
        },
        success: function(res) {
          if (res.success) {
            var data = res.data;
            var hash = data.hash;

            switch(data.type) {
              case 1:
                // block
                location.href = '/explorer/block/' + hash;
                break;

              case 2:
                // tx
                location.href = '/explorer/tx/' + hash;
                break;

              case 3:
                // user
                location.href = '/explorer/user/' + hash;
                break;

              case 4:
                // company
                location.href = '/explorer/company/' + hash;
                break;

              default:
                Alert('没有找到相关信息', 5000);
                break;
            }
          } else {
            Alert(res.msg, 5000);
          }
        },
        error: function() {
          Alert('搜索失败，请稍后重试', 5000);
        },
        complete: function() {
          $(this).removeClass('disabled');
        }
      });
    }
  }
});
$('li a').removeClass('active');
$('.explorer').addClass('active');
