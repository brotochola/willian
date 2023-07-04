console.log("funciones comunes");

var usuario = {};

function dist(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function fullscreen(el) {
  console.log("fullscreen");

  if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
  } else {
    el.mozRequestFullScreen();
  }
}

var fl = Math.floor;

function catetoOpuesto(ady, hip) {
  return Math.sqrt(hip * hip - ady * ady);
}

function rad2deg(r) {
  return r / 0.017453292519943295;
}
function deg2rad(c) {
  return c * 0.017453292519943295;
}

function porcentaje(min, max, val) {
  let dif = max - min;
  let posSinMin = val - min;
  let porc = (posSinMin * 100) / dif;

  return porc;
}

function mapear(prc, min, max) {
  let total = max - min;
  return (prc * total) / 100 + min;
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

function calcularAngulo(x1, y1, x2, y2) {
  return Math.atan((x2 - x1) / (y2 - y1));
}

function capitalizeFirstLetter(str) {
  var strRta;
  try {
    strRta = str.charAt(0).toUpperCase() + str.slice(1);
  } catch (e) {
    strRta = str;
  }
  return strRta;
}

function redireccionar(url) {
  $("html").addClass("negro");
  setTimeout(function () {
    window.location.href = url;
  }, 350);
}

function Comparator(a, b) {
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  return 0;
}

function duplicarObj(obj) {
  return Object.create(obj);
}

//////////////////////////////

//precarga de cosas

function onPauseFired(e) {
  e.preventDefault();
  console.log("#### la app se minimizo");
  window.plugins.NativeAudio.stop("bgJuego");
  window.plugins.NativeAudio.stop("musicaMenu");
  navigator.app.exitApp();
}

function onDeviceReady() {
  console.log("#### device ready");

  try {
    AndroidFullScreen.immersiveMode();
    screen.orientation.lock("landscape");
    StatusBar.hide(); //saco el footer de android, q tiene algunos telefonos
    // ionic.Platform.fullScreen();
    StatusBar.overlaysWebView(true);
  } catch (e) {
    console.log(e);
  }

  try {
    // navigator.geolocation.getCurrentPosition(function(e) {
    //     usuario.latitud = e.coords.latitude
    //     usuario.longitud = e.coords.longitude
    // });
  } catch (e) {
    console.log(e);
  }
} //device ready

function masMenos(val, porcentaje) {
  return (
    val +
    (Math.random() * val * porcentaje) / 100 -
    (0.5 * val * porcentaje) / 100
  );
}

function randomEntre(n1, n2) {
  return n1 + Math.random() * (n2 - n1);
}

function agregarPunto(txt) {
  if (txt.substr(txt.length - 1, 1) != ".") {
    txt = txt + ".";
  }
  rta = txt.charAt(0).toUpperCase() + txt.slice(1);
  //console.log(rta)
  return rta;
}

//extiendo createjs
createjs.DisplayObject.prototype.getName = function () {
  if (!this.nameCache) {
    var parent = this.parent;
    var keys = Object.keys(parent);
    var len = keys.length;
    while (--len) {
      if (parent[keys[len]] === this) {
        this.nameCache = keys[len];
        break;
      }
    }
  }
  return this.nameCache;
};

/*
// con esto hago que cada console.log tambien guarde en una variable de texto
elem=document.createElement("div");
elem.id="consola"
elem.cuando=0;
elem.addEventListener("touchstart" ,function(){
  elem.cuando=(new Date()).valueOf();
});
elem.addEventListener("touchend" ,function(){
  if( (new Date()).valueOf() - elem.cuando > 2000) elem.style.display="none";
});

setTimeout(function(){
  document.body.appendChild(elem);
},3000)


var consola="LOG DE LA CONSOLA \n";
if (typeof console  != "undefined") 
    if (typeof console.log != 'undefined')
        console.olog = console.log;
    else
        console.olog = function() {};

console.log = function(message) {
    console.olog(message);
    consola+=">> "+message+"<br>"
  try{  $("#consola").html(consola)}catch(e){}
};

console.error = console.debug = console.info =  console.log
*/
///////////////////////////////////////////////////
