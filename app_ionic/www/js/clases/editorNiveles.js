var editor = null;
const jsonAmigo = { "cantDeVecesQHace":1,"accionCuandoLaPelotaLoPasa": "parado", "accionDpsDePegarle": "parado", "altura": 1.8,  "cara": { "boca": 1, "cejas": "cejas_willian","ojos": 0, "pelo": "johnny_bravo", "piel": 1 }, "empieza": "caminando", "fuerzaX": 160, "fuerzaY": -370, "nombre": "charly", "precision": 1, "queHaceCuandoLaRecupera": "caminando", "saltaParaPararla": false, "saltoMax": 150, "tiempoEsperaParaPasarselaAWillian": 0.6, "velMaxParaPararla": 500, "velocidadMax": 200, "x": 2600, "y": 750 };
const jsonEnemigo = { "_debug_opciones_queHaceCuandoLaRecupera": ["revienta", "lePegaAlRas", "lePegaParaArriba", "pegarleDespacitoParaAdelante", "lePegaParaAtrasDespacio", "correHaciaAdelanteConLaPelota", "seResbala", "laDomina"], "aQueDistanciaVeAWillian": 800, "accionDpsDePegarle": "parado", "altura": 1.8,  "cara": { "boca": 1, "cejas": "cejas_1", "ojos": 2, "pelo": "negro1", "piel": 1 }, "empieza": "caminando",  "flanqueableConGambeta360": true,  "nombre": "Chango", "queHaceCuandoLaRecupera": "revienta", "queHaceCuandoVeAWillian": "parado", "saltaAnteBarrida": false, "saltaAnteSombrerito": false, "saltaParaCabecear": false, "saltoMax": 150, "seBarreCuandoTieneAWillianA2m": true, "velocidadMax": 200, "x": 2000, "y": 750 };
const jsonCaja={
    "nombre":"",
    "ampY": 0,
    "fixed": false,
    "frecY": 0,
    "height": 50,
    "rotation": 0,
    "velAngular": 0,
    "width": 50,
    "x": 500,
    "preventRotation":false,
    "y": 300,
    "textura":"madera1",
    "density":0.3,
    "coef":0.4

}

const jsonMonstruo={
    x:500,
    y:850,
    width:800,
    height:600,
    vida:100,
    golpe:15

}


function agregarCaja(){
    if(!juegoW.nivel.hasOwnProperty("cajas")) juegoW.nivel.cajas=[]
   juegoW.nivel.cajas.push(jsonCaja)
    guardarNivelesRaw()
    ocultarEditorNivel()
    juegoW.restart()
   

    
}

function ocultarEditorNivel() {
    $("#jsoneditor, .listaDeNiveles").hide();
    //  let nivelDelEditor = editor.get();
    // if (!JuegoWillian.compararNiveles(this.nivel, nivelDelEditor)) {
    // this.nivel = nivelDelEditor
    //  this.restart();
    //  }

}
function mostrarEditorNivel() {
    $("#jsoneditor, .listaDeNiveles").show();

    if (editor == null || editor == undefined) {
        editor = new JSONEditor(document.getElementById("jsoneditor"), { mode: 'tree' });
    }
    editor.set(juegoW.nivel);

    /*  let lista = $($(".listaDeNiveles")[0]);
  
      for (let i = 0; i < niveles.length; i++) {
          lista.append("<a onclick='JuegoWillian.cargarNivel(" + i + ")'>" + niveles[i].nombre + "</a>")
      }*/

}

function agregarAmigo() {

    let mundo = prompt("agregar amigo en nivel q esta en el mundo numero (nro item del array):")
    let nivel = prompt("numero de nivel, numero del item del array, no el orden")
    if (mundo < 6 && mundo >= 0) {
        if (nivel > -1 && nivel < 10) {
            if(niveles[mundo][nivel].hasOwnProperty("amigos") == false) {
                niveles[mundo][nivel].amigos=[]
            }
            niveles[mundo][nivel].amigos.push(JSON.parse(JSON.stringify(jsonAmigo)));
        }
    }
    editor.set(niveles);

}
function agregarEnemigo() {

    let mundo = prompt("agregar enemigo en nivel q esta en el mundo numero (nro item del array):")
    let nivel = prompt("numero de nivel, numero del item del array, no el orden")
    if (mundo < 6 && mundo >= 0) {
        if (nivel > -1 && nivel < 10) {
            if(niveles[mundo][nivel].hasOwnProperty("enemigos") == false) {
                niveles[mundo][nivel].enemigos=[]
            }
            niveles[mundo][nivel].enemigos.push(JSON.parse(JSON.stringify(jsonEnemigo)));
        }
    }
    editor.set(niveles);

}

function borrarAmigo() {

    let mundo = prompt("mundo")
    let nivel = prompt("nivel")
    let e = prompt("numero de amigo")
    if (mundo < 6 && mundo >= 0) {
        if (nivel > -1 && nivel < 10) {
            if (e > -1 && e < niveles[mundo][nivel].amigos.length) niveles[mundo][nivel].amigos.splice(e, 1)

        }
    }
    editor.set(niveles);

}
function borrarEnemigo() {

    let mundo = prompt("mundo")
    let nivel = prompt("nivel")
    let e = prompt("numero de enemigo")
    if (mundo < 6 && mundo >= 0) {
        if (nivel > -1 && nivel < 10) {
            if (e > -1 && e < niveles[mundo][nivel].enemigos.length) niveles[mundo][nivel].enemigos.splice(e, 1)

        }
    }
    editor.set(niveles);

}
let jsonCargado;
function cargarJSON() {
    var inp = document.createElement('input');
    inp.type = "file";
    inp.accept = "*.json";
    inp.click();
    let reader = new FileReader();

    reader.onload = (e) => {
        jsonCargado = JSON.parse(e.target.result)
        let a = validarJSONSubido(jsonCargado);
        if(a==true){
            niveles=jsonCargado
            editor.set(niveles);
            alert("se cargo el json de niveles, chequea en el editor q este ok y dps dale guardar\n para probar los niveles cargados hay q volver a la seleccion de nivel")
        }   
    };


    $(inp).change((e) => {
        console.log(inp.files[0]);
        reader.readAsText(e.target.files[0])
    })


}

function validarJSONSubido(j) {
  
    if (!j.hasOwnProperty(0)) {
        return "no 0";
    }

    if (!j.hasOwnProperty(1)) {
        return  "no 1";
    }

    if (!j.hasOwnProperty(2)) {
        return  "no 2";
    }
    if (!j.hasOwnProperty(3)) {
        return  "no 3";
    }
    if (!j.hasOwnProperty(4)) {
        return  "no 4";
    }

    if (!(j[0].length == 9 && j[1].length == 9 && j[2].length == 9 && j[3].length == 9 && j[4].length == 9)) {
        return "cant de niveles mal"
    }
    for (let i = 0; i < 5; i++) {
        for (let m = 0; m < 9; m++) {
          
            
            let n = j[i][m]
            if (!(n.hasOwnProperty("estrella") && n.hasOwnProperty("willian") && n.hasOwnProperty("arquero") )) {
                return "el nivel "+i+"-"+m+" no itene estrella, willian, amigos y/o enemigos";
            }
        }
    }
    return true;



}

function bajarJSON(n) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(n));
    var dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "niveles.json");
    dlAnchorElem.click();
}