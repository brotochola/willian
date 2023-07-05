var record;
var linea = "";
var contadorTouch = 0;

var userGesture = [];
var gesture2 = [];
var dollar = new RD.DollarOne();
var canvasGesture = document.getElementById("canvasCreateJs");
var mousePos = { x: 0, y: 0 };
var lastPos = mousePos;
var stringArray = "";

//Agrega los gestos necesarios

// en vez de hacer arrays hacemos asi:
//cargamos 8 gestos iguales, por cada uno q queremos.
//8 porq la idea es que sean variantes del mismo, asi el programa es mas inteligente
//despues comparamos el primer caracter del gesto reconocido (el numero),
//con el numero de gesto q se pasó como referencia :)

let u11 = [
  [60, 264],
  [53, 275],
  [53, 284],
  [53, 293],
  [56, 305],
  [59, 308],
  [65, 312],
  [71, 314],
  [80, 313],
  [87, 310],
  [102, 293],
  [105, 288],
  [109, 273],
  [109, 271],
  [109, 261],
  [109, 260],
  [108, 257],
];

let u10 = [
  [194, 155],
  [194, 164],
  [194, 174],
  [198, 187],
  [204, 197],
  [211, 202],
  [216, 202],
  [223, 197],
  [233, 188],
  [239, 176],
  [244, 167],
  [247, 160],
  [248, 155],
  [248, 151],
];

let u9 = [
  [342, 109],
  [334, 124],
  [333, 143],
  [333, 149],
  [342, 163],
  [346, 168],
  [364, 174],
  [381, 169],
  [393, 159],
  [418, 134],
  [424, 122],
  [425, 119],
  [425, 117],
  [424, 117],
  [422, 117],
];

let u8 = [
  [178, 84],
  [175, 88],
  [171, 99],
  [169, 110],
  [169, 131],
  [177, 140],
  [179, 140],
  [183, 141],
  [215, 133],
  [226, 127],
  [234, 117],
  [238, 108],
  [240, 99],
  [240, 90],
  [240, 88],
  [240, 87],
];

let u7 = [
  [234, 162],
  [231, 169],
  [228, 180],
  [225, 192],
  [230, 234],
  [239, 242],
  [249, 248],
  [259, 250],
  [275, 246],
  [282, 239],
  [295, 211],
  [297, 204],
  [297, 186],
  [297, 185],
  [295, 185],
  [292, 185],
  [292, 187],
];

let u6 = [
  [522, 86],
  [514, 109],
  [514, 130],
  [519, 141],
  [524, 148],
  [529, 151],
  [533, 151],
  [540, 150],
  [551, 146],
  [560, 138],
  [566, 130],
  [571, 112],
  [571, 102],
  [569, 91],
  [565, 83],
  [562, 83],
  [560, 84],
];

let u5 = [
  [186, 285],
  [183, 294],
  [183, 301],
  [184, 308],
  [188, 314],
  [198, 319],
  [205, 319],
  [208, 319],
  [217, 319],
  [228, 312],
  [238, 300],
  [245, 276],
  [247, 265],
  [246, 260],
  [245, 259],
];

let u4 = [
  [475, 277],
  [469, 293],
  [468, 295],
  [468, 310],
  [471, 315],
  [479, 321],
  [488, 324],
  [505, 323],
  [510, 320],
  [523, 300],
  [525, 291],
  [527, 279],
  [525, 274],
  [524, 273],
  [521, 273],
  [519, 273],
];

let u3 = [
  [385, 167],
  [385, 171],
  [390, 189],
  [399, 195],
  [404, 195],
  [412, 192],
  [419, 182],
  [426, 171],
  [427, 166],
  [428, 162],
  [426, 162],
];

let u2 = [
  [263, 123],
  [260, 127],
  [256, 137],
  [254, 145],
  [257, 157],
  [263, 163],
  [266, 165],
  [272, 165],
  [280, 161],
  [290, 150],
  [296, 139],
  [299, 131],
  [300, 124],
  [300, 122],
  [299, 122],
  [298, 124],
];

let u1 = [
  [181, 86],
  [178, 89],
  [170, 101],
  [169, 107],
  [166, 118],
  [175, 144],
  [178, 145],
  [185, 145],
  [198, 143],
  [212, 132],
  [222, 112],
  [225, 103],
  [225, 98],
  [224, 98],
];

let u12 = [
  [532, 172],
  [510, 179],
  [500, 183],
  [471, 204],
  [463, 223],
  [463, 229],
  [467, 239],
  [470, 242],
  [482, 248],
  [488, 248],
  [508, 246],
  [513, 243],
];
let u13 = [
  [547, 174],
  [513, 179],
  [489, 188],
  [475, 203],
  [472, 210],
  [472, 231],
  [486, 241],
  [495, 243],
  [512, 239],
  [536, 223],
];
let u14 = [
  [98, 219],
  [92, 217],
  [71, 217],
  [59, 221],
  [55, 224],
  [54, 230],
  [69, 244],
  [92, 255],
];
let u15 = [
  [139, 213],
  [116, 215],
  [98, 220],
  [88, 226],
  [86, 228],
  [84, 238],
  [95, 256],
  [100, 261],
  [114, 269],
];
let u16 = [
  [146, 213],
  [141, 212],
  [114, 211],
  [100, 211],
  [59, 218],
  [48, 225],
  [55, 235],
  [90, 259],
  [102, 265],
];
let u17 = [
  [155, 213],
  [155, 213],
  [145, 211],
  [103, 207],
  [73, 210],
  [55, 217],
  [49, 226],
  [59, 240],
  [98, 272],
  [118, 279],
];
let u18 = [
  [152, 217],
  [152, 217],
  [152, 217],
  [141, 217],
  [110, 217],
  [83, 220],
  [76, 222],
  [62, 228],
  [60, 234],
  [62, 237],
  [92, 265],
  [110, 278],
];
let u19 = [
  [505, 208],
  [479, 215],
  [460, 232],
  [460, 236],
  [465, 249],
  [480, 256],
  [486, 257],
  [505, 255],
];

let sombre1 = [
  [293, 232],
  [294, 231],
  [295, 231],
  [305, 228],
  [307, 227],
  [315, 224],
  [316, 224],
  [320, 227],
  [320, 233],
  [320, 236],
  [320, 240],
  [320, 250],
  [319, 254],
  [316, 258],
  [314, 265],
  [312, 267],
  [310, 270],
  [305, 274],
  [302, 275],
  [300, 276],
  [292, 278],
];
let sombre2 = [
  [278, 240],
  [292, 236],
  [296, 235],
  [306, 232],
  [307, 232],
  [308, 232],
  [310, 232],
  [311, 232],
  [312, 232],
  [313, 233],
  [314, 236],
  [315, 237],
  [316, 240],
  [316, 242],
  [316, 246],
  [316, 250],
  [316, 260],
  [313, 263],
  [304, 274],
  [301, 276],
  [298, 279],
  [291, 283],
  [287, 284],
  [284, 286],
  [278, 287],
];
let sombre3 = [
  [315, 232],
  [319, 232],
  [328, 231],
  [332, 229],
  [336, 229],
  [346, 229],
  [351, 229],
  [358, 229],
  [359, 229],
  [362, 229],
  [364, 230],
  [365, 231],
  [365, 232],
  [366, 236],
  [367, 238],
  [367, 242],
  [367, 251],
  [367, 255],
  [364, 259],
  [358, 269],
  [356, 273],
  [351, 278],
  [342, 285],
  [337, 288],
  [333, 289],
];
let sombre4 = [
  [342, 217],
  [356, 215],
  [362, 215],
  [369, 214],
  [379, 214],
  [383, 214],
  [385, 214],
  [386, 214],
  [387, 215],
  [387, 217],
  [387, 225],
  [387, 230],
  [385, 236],
  [379, 248],
  [375, 254],
  [372, 260],
  [362, 271],
  [358, 276],
];
let sombre5 = [
  [350, 208],
  [352, 208],
  [356, 208],
  [364, 208],
  [368, 208],
  [370, 208],
  [375, 208],
  [376, 208],
  [377, 208],
  [379, 208],
  [380, 208],
  [381, 208],
  [381, 209],
  [381, 210],
  [381, 214],
  [381, 220],
  [378, 224],
  [374, 228],
  [361, 242],
];
let sombre6 = [
  [277, 188],
  [284, 188],
  [294, 188],
  [314, 184],
  [319, 183],
  [325, 182],
  [331, 180],
  [332, 180],
  [333, 179],
  [333, 180],
  [333, 181],
  [333, 183],
  [330, 193],
  [327, 198],
  [316, 211],
  [294, 226],
  [289, 230],
  [283, 233],
  [277, 235],
];

let sombre7 = [
  [99, 217],
  [103, 215],
  [110, 215],
  [119, 219],
  [122, 221],
  [126, 229],
  [126, 231],
  [124, 236],
  [122, 238],
  [107, 239],
];

let sombre8 = [
  [462, 153],
  [485, 154],
  [511, 172],
  [512, 175],
  [512, 184],
  [511, 186],
  [497, 198],
  [490, 201],
];

//let sombre9=[[409,149], [423,148], [428,149], [436,150], [439,151], [443,155], [443,157], [439,162], [435,166]]

let sombre10 = [
  [93, 192],
  [103, 191],
  [106, 191],
  [114, 192],
  [119, 192],
  [131, 196],
  [135, 198],
  [140, 204],
  [145, 216],
  [145, 221],
  [144, 223],
  [139, 225],
  [133, 226],
  [109, 225],
];

let sombre11 = [
  [90, 156],
  [97, 156],
  [107, 158],
  [117, 166],
  [122, 174],
  [124, 180],
  [126, 190],
  [125, 193],
  [122, 199],
  [111, 203],
  [105, 204],
];
//let sombre12=[[418,155], [441,152], [449,153], [469,167], [475,184], [466,198], [460,202]]

//let sombre13=[ [121,182], [127,182], [136,182], [140,182], [147,182], [150,183], [158,185], [160,186], [163,190], [164,193], [165,200], [165,203], [161,211], [157,216]]
let sombre14 = [
  [472, 147],
  [479, 147],
  [495, 151],
  [503, 154],
  [517, 170],
  [513, 190],
  [507, 198],
  [479, 219],
];

dollar.addGesture("u1", u1);
dollar.addGesture("u2", u2);
dollar.addGesture("u3", u3);
dollar.addGesture("u4", u4);
dollar.addGesture("u5", u5);
dollar.addGesture("u6", u6);
dollar.addGesture("u7", u7);
dollar.addGesture("u8", u8);
dollar.addGesture("u9", u9);
dollar.addGesture("u10", u10);
dollar.addGesture("u11", u11);
//dollar.addGesture("u12", u12);
dollar.addGesture("u13", u13);
dollar.addGesture("u14", u14);
//dollar.addGesture("u15", u15);
//dollar.addGesture("u16", u16);
dollar.addGesture("u17", u17);
dollar.addGesture("u18", u18);
dollar.addGesture("u19", u19);

dollar.addGesture("sombre1", sombre1);
dollar.addGesture("sombre2", sombre2);
dollar.addGesture("sombre3", sombre3);
dollar.addGesture("sombre4", sombre4);
dollar.addGesture("sombre5", sombre5);
dollar.addGesture("sombre6", sombre6);
dollar.addGesture("sombre7", sombre7);
//dollar.addGesture("sombre8", sombre8);
//dollar.addGesture("sombre9", sombre9);
dollar.addGesture("sombre10", sombre10);
//dollar.addGesture("sombre11", sombre11);
//dollar.addGesture("sombre12", sombre12);
//dollar.addGesture("sombre13", sombre13);
dollar.addGesture("sombre14", sombre14);

function mobileCheck() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

//////////////////

class UI {
  constructor() {
    this.tiempoMouseDown = 0;
    this.tiempoParaHacerGestos = 500;
    this.hizoGesto = false;

    this.shot = new librerias["lib_original"].shot();
    this.shot2 = new librerias["lib_original"].shot();
    //1920/window.outerWidth

    this.shot2.scaleX = this.shot2.scaleY =
      (50 * 1920) / window.outerWidth / 612;
    this.shot2.x = 1820;
    this.shot2.y = 980;
    this.shot.visible = false;
    this.shot2.visible = false;
    stage.addChild(this.shot);
    stage.addChild(this.shot2);
    this.t = this.shot.tiro;
    this.t2 = this.shot2.tiro;
    this.s = this.shot.sling;
    this.radioSling = this.s.nominalBounds.width / 2;

    if (mobileCheck()) {
      canvasGesture.onmousedown = (e) => {
        e.preventDefault();
      };
      canvasGesture.ontouchstart = (e) => {
        if (juegoW.hasOwnProperty("fps")) this.touchStart(e);
      };

      canvasGesture.ontouchmove = (e) => {
        if (juegoW.hasOwnProperty("fps")) this.touchMove(e);
      };
      canvasGesture.ontouchend = (e) => {
        if (juegoW.hasOwnProperty("fps")) this.touchEnd(e);
      };
    } else {
      canvasGesture.onmousedown = (e) => {
        this.touchStart(e);
      };
      canvasGesture.onmouseup = (e) => {
        if (juegoW.hasOwnProperty("fps")) this.touchEnd(e);
      };

      canvasGesture.onmousemove = (e) => {
        if (juegoW.hasOwnProperty("fps")) this.touchMove(e);
      };
    }
  } //constru

  pressMove(e) {
    if (juegoW.ganaste || juegoW.perdiste) return;

    let posXCanvas =
      Math.floor(
        (e.clientX * canvasGesture.width) / canvasGesture.offsetWidth
      ) / escalaStage;
    let posYCanvas =
      Math.floor(
        (e.clientY * canvasGesture.height) / canvasGesture.offsetHeight
      ) / escalaStage;

    this.t2.x = this.t.x = posXCanvas - this.shot.x;
    this.t2.y = this.t.y = posYCanvas - this.shot.y;

    this.distancia = dist(this.t.x, this.t.y, this.s.x, this.s.y);

    this.distanciaOrig = this.distancia;
    if (this.distancia > 300) this.distancia = 300;

    //   console.log(distanciaOrig)

    //FUERZA DEL TIRO CON RELACION AL STICK
    willian.tiro.fuerza = easeInOutQuad(this.distancia / 300) * 120; //0.0015 *distancia  * distancia

    let angulo = calcularAngulo(this.t.x, this.t.y, this.s.x, this.s.y);

    if (this.t.x > this.s.x && this.t.y > this.s.y) {
      willian.tiro.angulo = rad2deg(angulo) + 270;
    } else if (this.t.x > this.s.x && this.t.y < this.s.y) {
      willian.tiro.angulo = rad2deg(angulo) + 90;
    } else if (this.t.x < this.s.x && this.t.y < this.s.y) {
      willian.tiro.angulo = rad2deg(angulo) + 90;
    } else if (this.t.x < this.s.x && this.t.y > this.s.y) {
      willian.tiro.angulo = rad2deg(angulo) + 270;
    }

    //DEBUG:
    /*  let fx = -Math.floor(Math.cos(deg2rad(willian.tiro.angulo)) * willian.tiro.fuerza * willian.coefFuerza)
          let fy = Math.floor(Math.sin(deg2rad(willian.tiro.angulo)) * willian.tiro.fuerza * willian.coefFuerza)
              console.log(distancia, fx,fy)*/

    if (this.distanciaOrig > this.radioSling * 1.5) {
      willian.pressup();
      this.shot.visible = false;
    } else if (this.distanciaOrig > this.radioSling) {
      //console.log(rad2deg(angulo))
      let seno = Math.sin(angulo);
      let coseno = Math.cos(angulo);
      //S=O/H  C=A/H T=O/A

      //evito q se pase el cursor
      if (this.t.x > this.s.x && this.t.y > this.s.y) {
        this.t.x = seno * this.radioSling + this.s.x;
        this.t.y = coseno * this.radioSling + this.s.y;
      } else if (this.t.x > this.s.x && this.t.y < this.s.y) {
        this.t.x = -seno * this.radioSling + this.s.x;
        this.t.y = -coseno * this.radioSling + this.s.y;
      } else if (this.t.x < this.s.x && this.t.y < this.s.y) {
        this.t.x = -seno * this.radioSling + this.s.x;
        this.t.y = -coseno * this.radioSling + this.s.y;
      } else if (this.t.x < this.s.x && this.t.y > this.s.y) {
        this.t.x = seno * this.radioSling + this.s.x;
        this.t.y = coseno * this.radioSling + this.s.y;
      }
    } //si la distancia es mayor al radio

    //  if(willian.tienePelota) this.calcularTrayectoria();
  } //pressmove

  calcularTrayectoria() {
    // nivel.destellos.removeAllChildren()
    // console.log("### CALCULAR TRAYECTORIA")
    let startingPosition = pelota.getPos().Copy();
    //STARTING VELOCITY ES LO Q SALE DE LA UI, ES LA VELOCIDAD Q LE IMPRIMIRIA LA UI
    let startingVelocity = new b2Vec2(
      -Math.floor(
        Math.cos(deg2rad(willian.tiro.angulo)) *
          willian.tiro.fuerza *
          willian.coefFuerza
      ),
      Math.floor(
        Math.sin(deg2rad(willian.tiro.angulo)) *
          willian.tiro.fuerza *
          willian.coefFuerza
      )
    );

    startingVelocity.x = startingVelocity.x * pelota.coefFuerza; //+ pelota.cuerpo.m_linearVelocity.x
    startingVelocity.y = startingVelocity.y * pelota.coefFuerza;

    /////////////////
    let posTemp = startingPosition.Copy();

    //let t = 1 / 30;  /0,03333
    let t = 0.3; //esto es lo q pasa de tiempo en los steps

    /*
                 var destello = new librerias["lib_original"].destello();
                 destello.x =  posTemp.x 
                  destello.y =   posTemp.y 
                  destello.scaleX = destello.scaleY = 0.15;         
                  nivel.destellos.addChild(destello);
        
               
                 posTemp.x += startingVelocity.x
                 posTemp.y += startingVelocity.y
                 posTemp.y += juegoW.gravity.y
         */
    let pelotaYMasAlta = new b2Vec2(0, 9999); //aca me va a guardar la posicion mas alta a la q llego la pelota

    for (let n = 1; n < 60; n++) {
      let posTemp = pelota.getPos().Copy();
      let stepVelocity = startingVelocity.Copy();
      let stepGravity = juegoW.gravity.Copy();

      stepVelocity.Multiply(n * t);
      stepGravity.Multiply(t * t); // m/s/s
      posTemp.x += stepVelocity.x;
      posTemp.y += stepVelocity.y;

      stepGravity.Multiply(0.5 * (n * n + n));
      posTemp.y += stepGravity.y;
      //18.5
      //19.1203
      //17.8997
      var destello = new librerias["lib_original"].destello();
      destello.x = posTemp.x;
      destello.y = posTemp.y;
      destello.scaleX = destello.scaleY = 0.3;
      destello.alpha = 0.83;
      nivel.destellos.addChild(destello);

      if (posTemp.y < pelotaYMasAlta.y) pelotaYMasAlta = posTemp.Copy();

      if (posTemp.y > 850) {
        pelota.dondePegaria = posTemp.x;
        // console.log("----- La pelota pegaria en el piso en X=" + posTemp.x)
        break;
      }
    } //FOR

    /*
        
                 let shape = new createjs.Shape();
         
                shape.graphics.beginStroke("red").moveTo(startingPosition.x,startingPosition.y).quadraticCurveTo(pelotaYMasAlta.x, pelotaYMasAlta.y,startingPosition.x,startingPosition.y).setStrokeStyle(40, "round", "bevel", "round").endStroke();
                // nivel.destellos.linea.bezierCurveTo(startingPosition.x,startingPosition.y,pelotaYMasAlta.x,pelotaYMasAlta.y, pelota.dondePegaria,canvasHeight - juegoW.altoPiso - 130);
                 nivel.destellos.addChild( shape);*/
  } //cac trayectoria

  touchMove(e) {
    e.preventDefault();
    if (!this.pateando) return;

    var touch;
    if (mobileCheck()) {
      touch = e.touches[0];
    } else {
      touch = e;
    }

    if (Array.isArray(e.touches) && e.touches.length > 1) {
      this.finTouch();
      return;
    }

    this.pressMove(touch);

    /*   var mouseEvent = new MouseEvent("mousemove", {
               clientX: Math.floor(touch.clientX),
               clientY: Math.floor(touch.clientY)
           });
   */

    if (Date.now() - this.tiempoMouseDown < this.tiempoParaHacerGestos) {
      var touchPoint = getTouchPos(canvasGesture, touch);

      userGesture[contadorTouch] = new Array(
        Math.floor(touchPoint.x),
        Math.floor(touchPoint.y)
      );
      contadorTouch++;
      gesture2 = userGesture;
      this.gestoReconocido = dollar.recognize(userGesture);

      //  console.log(" GESTO RECONOCIDO: ", this.gestoReconocido);

      //aca reconocemos gestos
      if (this.gestoReconocido != null) {
        this.pateando = false;
        this.hizoGesto = true;
        this.t.x = this.t.y = 0;
        this.shot.visible = false;
        juegoW.velocidadNormal();
        userGesture = [];
        contadorTouch = 0; //sin esto mandaba varias veces el mismo gesto
        if (this.gestoReconocido.substr(0, 1) == "u") {
          console.log("## GAMBETA 360!!");
          if (
            willian.tieneLaPelota() == 1 &&
            willian.accion != "parado" &&
            usuario.habilidades.gambeta
          )
            willian.cambiarAccion("gambeta360");
        } else if (this.gestoReconocido.substr(0, 6) == "sombre") {
          console.log("## BICICLETA / SOMBRERITO");
          //  alert(willian.tieneLaPelota())
          if (willian.tieneLaPelota() == 1 && usuario.habilidades.sombrerito) {
            willian.colisionaConPelota = false;
            willian.cambiarAccion("bicicleta");
          }
        } /* else if (this.gestoReconocido.substr(0, 7) == "palitos") {
                    console.log(">> ABRIR EDITOR DE NIVELES")
                    juegoW.mostrarEditorNivel();
                }*/
      } else {
      } // GESTO RECONOCIDO
    } else {
      //ya se paso el tiempo de hacer gestos y vas a patear
    }

    //console.log(touchPoint.x);
    //   canvasGesture.dispatchEvent(mouseEvent);
    //con esto grabo gestos:
    linea +=
      "[" + Math.floor(touch.clientX) + "," + Math.floor(touch.clientY) + "], ";
  }

  finTouch() {
    audioW.frenar("slomo");
    gesture2 = [];
    contadorTouch = 0;
    this.shot2.visible = this.shot.visible = false;
    juegoW.velocidadNormal();
    this.t.x = this.t.y = 0;
    this.pateando = false;
  }
  touchStart(e) {
    e.preventDefault();
    if (juegoW.ganaste || juegoW.perdiste) return;

    //TENES Q TENER LA HABILIDAD PARA CABECEAR, Y DIRECTAMENTE HAGO Q NO TE DEJE APRETAR, NO SE PONE EL CURSOR
    if (!willian.estoyEnElPiso() && !usuario.habilidades.cabezazo) return;

    userGesture = [];
    this.tiempoMouseDown = Date.now();
    linea = "";
    mousePos = getTouchPos(canvasGesture, e);
    var touch;

    console.log(e);

    if (mobileCheck()) {
      touch = e.touches[0];
    } else {
      touch = e;
    }

    /*   var mouseEvent = new MouseEvent("mousedown", {
               clientX: Math.floor(touch.clientX),
               clientY: Math.floor(touch.clientY)
           });
           canvasGesture.dispatchEvent(mouseEvent);*/

    this.pateando = true;
    this.shot2.visible = this.shot.visible = true;
    this.shot.x =
      Math.floor(
        (touch.clientX * canvasGesture.width) / canvasGesture.offsetWidth
      ) / escalaStage;
    this.shot.y =
      Math.floor(
        (touch.clientY * canvasGesture.height) / canvasGesture.offsetHeight
      ) / escalaStage;

    juegoW.slowMo();
    willian.caraApuntando();
  } //touchstart

  touchEnd(e) {
    if (e != undefined) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.finTouch();

    if (Array.isArray(e.touches) && e.touches.length > 1) {
      return;
    }

    let stringArray = "";
    for (let c = 0; c < gesture2.length; c++) {
      stringArray += "[" + gesture2[c][0] + "," + gesture2[c][1] + "], ";
    }
    //    console.log(stringArray)

    //   console.log("GESTO RECONOCIDO, TOUCHEND: ", this.gestoReconocido);
    if (this.gestoReconocido == null) {
      willian.pressup();
    } else {
      this.gestoReconocido = null;
    }
  }

  tiempoMaximoDeSlowmo() {
    this.gestoReconocido = 1;
    this.touchEnd();
  }
} //clase UI

/////////

function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.clientX - rect.left,
    y: touchEvent.clientY - rect.top,
  };
}

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top,
  };
}
