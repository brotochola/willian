///////////////////////////////// DEBUG //////////////

/*let consoLog="";
console.log=function(e){
    //console.log(e);
    consoLog+="\n"+e
 }*/

//////////////////////////////////////////////////////

console.log("general.js");
var usuario;
var ITERACIONES_POS = 4;
var ITERACIONES_VEL = 8;
var CONST_TIMESTEP = 3.8;
var terminoVideoIntro = false;
var cancha;
var stage,
  nivel,
  anim_container,
  dom_overlay_container,
  fnStartAnimation,
  loader;
var todo;
var bg;
var world;
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;
var arco;
var perdiste = 0;
var mc;
var arquero;
var contrincantes;
var cajas = [];
var amigos;
var monstruo;
var willian;
var timerUltimoFrame;
var pelota;
var musicas = [];
var images;
var listener;
var cantJuegos = 0; //no puede ser mas de 1
var interfaz;
var canvasBOX2D;
var canvas;
var fps = 30;
var audioW;
var velFondo = -1;
var escalaStage = null;

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

var ratio = window.devicePixelRatio || 1;

var iphoneX = false;
if (
  (iOS &&
    window.screen.width * ratio == 1125 &&
    window.screen.height * ratio === 2436) ||
  (window.screen.height * ratio == 1125 && window.screen.width * ratio === 2436)
)
  iphoneX = true;

// iPhone model checks.
function getiPhoneModel() {
  // Create a canvas element which can be used to retrieve information about the GPU.
  var canvas = document.createElement("canvas");
  if (canvas) {
    var context =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (context) {
      var info = context.getExtension("WEBGL_debug_renderer_info");
      if (info) {
        var renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
      }
    }
  }

  // iPhone X
  if (
    (window.screen.height / window.screen.width == 812 / 375 ||
      window.screen.height / window.screen.width == 375 / 812) &&
    window.devicePixelRatio == 3
  ) {
    return "iPhone X";
    // iPhone 6+/6s+/7+ and 8+
  } else if (
    (window.screen.height / window.screen.width == 736 / 414 ||
      window.screen.height / window.screen.width == 414 / 736) &&
    window.devicePixelRatio == 3
  ) {
    switch (renderer) {
      default:
        return "iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus";
      case "Apple A8 GPU":
        return "iPhone 6 Plus";
      case "Apple A9 GPU":
        return "iPhone 6s Plus";
      case "Apple A10 GPU":
        return "iPhone 7 Plus";
      case "Apple A11 GPU":
        return "iPhone 8 Plus";
    }
    // iPhone 6+/6s+/7+ and 8+ in zoom mode
  } else if (
    (window.screen.height / window.screen.width == 667 / 375 ||
      window.screen.height / window.screen.width == 375 / 667) &&
    window.devicePixelRatio == 3
  ) {
    switch (renderer) {
      default:
        return "iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus (display zoom)";
      case "Apple A8 GPU":
        return "iPhone 6 Plus (display zoom)";
      case "Apple A9 GPU":
        return "iPhone 6s Plus (display zoom)";
      case "Apple A10 GPU":
        return "iPhone 7 Plus (display zoom)";
      case "Apple A11 GPU":
        return "iPhone 8 Plus (display zoom)";
    }
    // iPhone 6/6s/7 and 8
  } else if (
    (window.screen.height / window.screen.width == 667 / 375 ||
      window.screen.height / window.screen.width == 375 / 667) &&
    window.devicePixelRatio == 2
  ) {
    switch (renderer) {
      default:
        return "iPhone 6, 6s, 7 or 8";
      case "Apple A8 GPU":
        return "iPhone 6";
      case "Apple A9 GPU":
        return "iPhone 6s";
      case "Apple A10 GPU":
        return "iPhone 7";
      case "Apple A11 GPU":
        return "iPhone 8";
    }
    // iPhone 5/5C/5s/SE or 6/6s/7 and 8 in zoom mode
  } else if (
    window.screen.height / window.screen.width == 1.775 &&
    window.devicePixelRatio == 2
  ) {
    switch (renderer) {
      default:
        return "iPhone 5, 5C, 5S, SE or 6, 6s, 7 and 8 (display zoom)";
      case "PowerVR SGX 543":
        return "iPhone 5 or 5c";
      case "Apple A7 GPU":
        return "iPhone 5s";
      case "Apple A8 GPU":
        return "iPhone 6 (display zoom)";
      case "Apple A9 GPU":
        return "iPhone SE or 6s (display zoom)";
      case "Apple A10 GPU":
        return "iPhone 7 (display zoom)";
      case "Apple A11 GPU":
        return "iPhone 8 (display zoom)";
    }
    // iPhone 4/4s
  } else if (
    window.screen.height / window.screen.width == 1.5 &&
    window.devicePixelRatio == 2
  ) {
    switch (renderer) {
      default:
        return "iPhone 4 or 4s";
      case "PowerVR SGX 535":
        return "iPhone 4";
      case "PowerVR SGX 543":
        return "iPhone 4s";
    }
    // iPhone 1/3G/3GS
  } else if (
    window.screen.height / window.screen.width == 1.5 &&
    window.devicePixelRatio == 1
  ) {
    switch (renderer) {
      default:
        return "iPhone 1, 3G or 3GS";
      case "ALP0298C05":
        return "iPhone 3GS";
      case "S5L8900":
        return "iPhone 1, 3G";
    }
  } else {
    return "Not an iPhone";
  }
}

try {
  navigator.connection.saveData = false;
} catch (e) {}

var debug = getQueryVariable("debug");

var juegoW;
var nivelesLoaded = 0;
var bodyLoad = 0;
var mainMenu;
var lib, comp, libFondo, tribunaAtras, tempCanvas;
//comp = AdobeAn.getComposition("488C9EF001CF2B41ACC91C2B621B821F");
//lib = comp.getLibrary();

var canvasWidth = 1920; //document.getElementById("canvasCreateJs").width
var canvasHeight = 1080; //document.getElementById("canvasCreateJs").height

var cielo;
var escalaSpriteSheet = 0.5;
function isIpadPro() {
  var ratio = window.devicePixelRatio || 1;
  var screen = {
    width: window.screen.width * ratio,
    height: window.screen.height * ratio,
  };
  return (
    (screen.width === 2048 && screen.height === 2732) ||
    (screen.width === 2732 && screen.height === 2048) ||
    (screen.width === 1536 && screen.height === 2048) ||
    (screen.width === 2048 && screen.height === 1536)
  );
}

function crearCanvas() {
  let iphoneMod = getiPhoneModel();

  let ram = navigator.deviceMemory;
  if (ram == undefined && iOS == true) ram = 3;
  let coef = 1;
  if (ram >= 3) {
    coef = 2;
  } else if (ram < 3 && ram > 1) {
    coef = 1.5;
  } else if (ram <= 1) {
    coef = 1;
  }

  canvas = document.createElement("canvas");
  canvas.id = "canvasCreateJs";
  if (iphoneX == true) {
    canvas.width = 1920;
    canvas.height = 1080;
  } else {
    canvas.width = window.outerWidth * coef;
    canvas.height = window.outerHeight * coef;
  }

  let relacAspecto = (canvas.width / canvas.height).toFixed(2);
  if (relacAspecto > 1.78) {
    canvas.width = canvas.height * 1.77777;
  } else if (relacAspecto < 1.78) {
    canvas.height = canvas.width / 1.777777;
  }
  if (canvas.width > 1920 || canvas.height > 1080) {
    canvas.width = 1920;
    canvas.height = 1080;
  } else if (canvas.width == 0 || canvas.height == 0) {
    console.warn("POR ALGUN MOTIVO EL CANVAS ESTABA DE 0x0");
    canvas.width = 1920;
    canvas.height = 1080;
  }

  if (iOS) {
    if (iphoneX == true) {
      escalaSpriteSheet = 1;
    } else if (
      iphoneMod == "iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus" ||
      iphoneMod == "iPhone 6 Plus" ||
      iphoneMod == "iPhone 6s Plus" ||
      iphoneMod == "iPhone 7 Plus" ||
      iphoneMod == "iPhone 8 Plus"
    ) {
      escalaSpriteSheet = 1;
      canvas.width = 1440;
      canvas.height = 810;
    } else if (isIpadPro()) {
      //CON ESTO DETECTO SI ES PIAD COPADO O NO
      escalaSpriteSheet = 0.5;
      if (navigator.hasOwnProperty("maxTouchPoints")) {
        if (navigator.maxTouchPoints > 1) escalaSpriteSheet = 1;
      }

      canvas.width = 1920;
      canvas.height = 1080;
    }
  } else {
    //ios

    if (canvas.width < 1280) {
      escalaSpriteSheet = 0.3;
    } else if (canvas.width >= 1280 && canvas.width < 1600) {
      escalaSpriteSheet = 0.5;
    } else if (canvas.width >= 1600) {
      escalaSpriteSheet = 1;
    }
  }

  console.warn(
    "iOS=" +
      iOS +
      ", iphoneX:" +
      iphoneX +
      "es ipad pro=" +
      isIpadPro() +
      ", iphone Model: " +
      getiPhoneModel() +
      ", CANVAS: " +
      canvas.width +
      " x " +
      canvas.height +
      ", outer width: " +
      window.outerWidth +
      ", device pixel ratio:" +
      devicePixelRatio +
      ", ram: " +
      ram +
      " escala spritesheets: " +
      escalaSpriteSheet
  );

  $("body").append(canvas);
}

crearCanvas();

function drawVideo(v, c, w, h) {
  v = $("video#fondo")[0];
  // if (v.paused || v.ended || v == undefined) {
  //  console.log("el video no existia mas")
  //  return false;
  //  }
  c.drawImage(v, 0, 0, w, h);
  setTimeout(() => {
    drawVideo(v, c, w, h);
  }, 41);
}

function handleFileLoad(evt, comp) {
  var images = comp.getImages();
  if (evt && evt.item.type == "image") {
    images[evt.item.id] = evt.result;
  }
}

var mobile = false;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  mobile = true;
}
/*
function handleComplete(evt, comp) {
    console.log("handle complete!")
    var ss = comp.getSpriteSheet();
    var ssMetadata = lib.ssMetadata;

    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;
    for (var i = 0; i < ssMetadata.length; i++) {
        let img=document.createElement("img");
        img.src="images/"+ssMetadata[i].name+".png";
        //let img=queue.getResult(ssMetadata[i].name)
        ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [img], "frames": ssMetadata[i].frames })
    }
    console.log(ss)
    //STAGEGL ES DE CREATEJS V1.0.0, NO SE SI SEA MEJOR O NO
    //EN CELU ANDA MEJOR STAGEGL
   // stage = new createjs.Stage(canvas);
   
    stage = new createjs.StageGL(canvas, { antialias: true, transparent:true});
    escalaStage= stage.scaleX=stage.scaleY=canvasWidth/1920

    //stage.enableMouseOver(1);

    stage.setClearColor("#95C42C")

    canvasWidth = canvasBOX2D.width
    canvasHeight = canvasBOX2D.height

    console.log("canvas " + canvasWidth + ", " + canvasHeight)
    mainMenu = new MainMenu();


}*/

function init() {
  console.log("INIT");
  images = images || {};

  createjs.Ticker.setFPS(fps);
  createjs.Ticker.useRAF = true;
  createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
  createjs.Ticker.framerate = fps;

  if (iOS) createjs.Touch.enable(stage);
  else createjs.Touch.enable(stage, true, false); //multitouch, y allowdefault

  /*
        loader = new createjs.LoadQueue(false);
        loader.addEventListener("fileload", (e) => { handleFileLoad(e, comp) });
        loader.addEventListener("complete", (e) => { handleComplete(e, comp) });
        loader.loadManifest(lib.properties.manifest);*/
  canvas = document.getElementById("canvasCreateJs");
  canvasBOX2D = document.getElementById("canvasBox2d");
  stage = new createjs.StageGL(canvas, { antialias: true, transparent: true });
  escalaStage =
    stage.scaleX =
    stage.scaleY =
      document.getElementById("canvasCreateJs").width / 1920;
  console.log("ESCALA STAGE " + escalaStage);
  stage.setClearColor("#95C42C");

  stage.enableMouseOver(10);

  document.getElementById("fondo").poster = "img/poster.jpg";

  new traerComp("lib_original", "willian.js", "lib_original", (e) => {
    //CARGA LA LIB ORIGINAL, DONDE ESTA EL MAIN MENU.
    //Y EN EL MAIN MENU CARGA LAS DEMAS LIBRERIAS Y CUANDO ESTAN TODAS LAS LISTA LE PONE EL LISTENER AL BOTON
    mainMenu = new MainMenu();
  });
} //init

var composiciones = {};
var librerias = {};

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}
function buscarNivelPorNumeroDeMundoYOrden(m, o) {
  if (o.toString().substr(0, 4) == "loco") {
    for (let i = 0; i < niveles.locos[m].length; i++) {
      if (niveles.locos[m][i].orden == o) {
        return i;
      }
    }
  } else {
    for (let i = 0; i < niveles[m].length; i++) {
      if (niveles[m][i].orden == o) {
        //  console.log("MUNDO " + (this.mundo + 1) + ", nivel " + o + ", q es el item numero " + i);
        return i;
      }
    }
  }
  //console.log("MUNDO " + (this.mundo + 1) + ", nivel " + o + ", no se encontro");

  return -1;
}

function mundoNivel2Nivel(m, o) {
  if (o.substr(0, 4) == "loco") {
    for (let i = 0; i < niveles.locos[m].length; i++) {
      if (niveles.locos[m][i].orden == o) {
        return niveles.locos[m][i];
      }
    }
  } else {
    for (let i = 0; i < niveles[m].length; i++) {
      if (niveles[m][i].orden == o) {
        //  console.log("MUNDO " + (this.mundo + 1) + ", nivel " + o + ", q es el item numero " + i);
        return niveles[m][i];
      }
    }
  }
  //console.log("MUNDO " + (this.mundo + 1) + ", nivel " + o + ", no se encontro");

  return -1;
}
function esApp() {
  return window.hasOwnProperty("cordova");
}
function mostrarLoading() {
  $("#loading").show();
}
function ocultarLoading() {
  $("#loading").hide();
}
function bodyOnLoad() {
  bodyLoad = 1;
  if (!esApp()) lowLag.init();

  //cuando minimizas la app se calla
  document.addEventListener("backbutton", () => {}, false);
  document.addEventListener(
    "menubutton",
    () => {
      try {
        audioW.frenarTodo();
      } catch (e) {}
    },
    false
  );
  document.addEventListener(
    "pause",
    () => {
      try {
        audioW.frenarTodo();
      } catch (e) {}
    },
    false
  );

  if (!esApp()) {
    //si no tiene cordova ejecuta esto en docready
    funcDeviceReady();
  } else {
    if (iOS) {
      setTimeout(() => {
        console.log("estas en ios, esperando 5s");
        funcDeviceReady();
      }, 5000);
    }
  }
}

function chequearSiVideoCargo() {
  let v = $("video#fondo")[0];
  if (!v.hasOwnProperty("error")) return;
  if (!v.error.hasOwnProperty("code")) return;
  if (v.error.code > -99) {
    console.log(v.error);
    setTimeout(() => {
      let s = v.src;
      v.src = "";
      v.src = s;
      //chequearSiVideoCargo()
    }, 100);
  }
}

function siSeCargaUnNivelDesdeLaUrl() {
  let m = getQueryVariable("m");
  let n = getQueryVariable("n");

  if (n != false && m != false && m > 0 && n.length > 0) {
    init();

    $("seccion#mainmenu").hide();
    traerComp.traerFondosArqueroYCabeza(() => {
      new traerComp("lib_original", "willian.js", "lib_original", (e) => {
        mainMenu.sacar();
        console.log("CARGANDO NIVEL " + m + " NIVEL " + n);
        pantallaSeleccionNiveles = new SeleccionNiveles(m);
        pantallaSeleccionNiveles.arrancarNivel(n);
      });
    });

    return true;
  }
  return false;
}

function funcDeviceReady() {
  console.log(">>> DEVICE READY");
  usuario = new Usuario(); //dentro del constructor pasa todo
  audioW = new AudioWillian();

  //DISPARO EL AUDIO DE INTRO
  if (!iOS && esApp()) {
    window.plugins.NativeAudio.preloadComplex(
      "pix",
      "audio/pix.mp3",
      1,
      1,
      0,
      () => {},
      function (msg) {},
      function (msg) {}
    );
    window.plugins.NativeAudio.play("pix");
  }

  //CARGO NIVELES DE PREPO PARA TESTEAR:

  if (siSeCargaUnNivelDesdeLaUrl()) return;

  ////SI ESTA TODONORMAL Y NO SE CARGO UN NIVEL DESDE LA URL

  //  $("video#fondo")[0].src = "img/fondo_brasil.mp4"

  //poner logo:
  //  let videoTutorial = $("video#tutorial")[0]
  // videoTutorial.src = "img/pix.mp4";
  // $(videoTutorial).show();

  //cuando el video puede reproducirse se va el loading
  /*  videoTutorial.oncanplaythrough = () => {
          console.log("!!video can play through")
          ocultarLoading()
      }*/

  if (esApp()) {
    //PONE EN FULLSCREEN
    if (!iOS)
      AndroidFullScreen.immersiveMode(
        (e) => {},
        (e) => console.log(e)
      );
    //TRAIGO EL USUARIO CON UUID
  } //if cordova

  //SI EN LA URL TIENE INDICADO Q SAQUE LOS NIVELES DE FIREBASE:
  if (getQueryVariable("firebase") != false) {
    $("#botonMenu").show();
    $("#botonpausa").show();
  } else {
    $("#botonMenu").hide();
    $("#botonpausa").hide();
  }

  if (iOS) {
    setTimeout(() => {
      console.log("OCULTANDO IMG LOGO");
      $("#imgPix").hide();
      terminoVideoIntro = true;
      evaluarFinVideoIntro();
    }, 2500);
  } else {
    setTimeout(chequearSiVideoCargo, 400);
  }

  document.getElementById("canvasCreateJs").onclick = function () {
    if (location.hostname == "pixeloide.com") {
      $("body")[0].webkitRequestFullScreen(); //Chrome
    } else {
      //  console.log("no full screen")
    }
  };

  init();
}

function evaluarFinVideoIntro() {
  console.log(" evaluar fin video intro ", terminoVideoIntro);
  if (terminoVideoIntro == false) return;
  let videoTutorial = $("video#tutorial");

  //alert(consoLog)
  if (mainMenu instanceof Object) {
    if (mainMenu.hasOwnProperty("cjs")) {
      if (mainMenu.cjs.hasOwnProperty("children")) {
        if (mainMenu.cjs.children.length > 0) {
          mainMenu.ponerListenersABotones();
          //alert("ok")
          videoTutorial.hide();
          videoTutorial.src = "";
          objetoIntervalo = null;
          videoTutorial.off();
          console.log("quitandole listener al video intro");

          return;
        }
      }
    }
  } else {
    //  console.log("..... PROBANDO...")
  }

  setTimeout(evaluarFinVideoIntro, 300);
}

function ponerCanvasSegunDebug() {
  if (debug == 1) {
    document.getElementById("canvasCreateJs").style.display = "none";
    document.getElementById("canvasBox2d").style.display = "block";
  } else if (debug == 2) {
    document.getElementById("canvasCreateJs").style.display = "block";
    document.getElementById("canvasBox2d").style.display = "block";
    document.getElementById("canvasBox2d").style.opacity = "1";
    document.getElementById("canvasCreateJs").style.opacity = "0.1";

    //document.getElementById("canvasCreateJs").style.zIndex = "99"
    document.getElementById("canvasBox2d").style.position =
      document.getElementById("canvasCreateJs").style.position = "fixed";
  }
}

function antesQueTodo() {
  console.log("ANTES QUE TODO");

  if (iOS) {
    document.getElementById("tutorial").src = "";
    document.getElementById("tutorial").style.display = "none";
    document.getElementById("imgPix").style.display = "block";
    $("video#tutorial").off();
  } else {
    $("video#tutorial")[0].style.backgroundImage =
      "url(" + $("img#loading")[0].src + ")";
    $("video#tutorial").on("ended", () => {
      console.log(" >>>>>>>> termino video pix");
      terminoVideoIntro = true;
      evaluarFinVideoIntro();
    });
  }
}

antesQueTodo();

document.addEventListener("deviceready", funcDeviceReady, false);
