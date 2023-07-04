// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCD7R5gCil7ki_3fHcR3lvXNk7mS6QdZwo",
  authDomain: "willian-2be7a.firebaseapp.com",
  databaseURL: "https://willian-2be7a.firebaseio.com",
  projectId: "willian-2be7a",
  storageBucket: "",
  messagingSenderId: "649866398651",
  appId: "1:649866398651:web:3d5a3d11dc2ce8e4"
};
let db
let ref
// Initialize Firebase
if(navigator.onLine){
  firebase.initializeApp(firebaseConfig);
   db = firebase.database();
   ref = db.ref()
  }
if(niveles==undefined) var niveles = []

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
          return pair[1];
      }
  }
  return (false);
}
function traerNiveles(cb) {
  if (getQueryVariable("firebase")) {
    console.warn("CARGANDO NIVELES DE FIREBASE...")

    ref.child("niveles").once("value", function (snapshot) {
      let n = snapshot.val()

      niveles = n
      if (cb != null && cb != undefined) {
        console.warn("NIVELES CARGADOS DE FIREBASE")
        cb(); //callback
      }
      ref.off("value");
    }, function (error) {
      console.log("Error: " + error.code);
    })
  } else {
    console.warn("CARGANDO NIVELES DESDE JSON LOCAL...")
  


  }



}

function traerUsuario(cb) {
  ref.child("usuarios").child(device.uuid).once("value", (snapshot) => {
    let n = snapshot.val();
    cb(n)
  }, function (error) {
    console.log("Error: " + error.code);
  })

}
function guardarUsuario() {

  db.ref('usuarios/' + device.uuid).set(usuario, () => { });
}

function agregarCamisetasATodosLosNiveles() {
  for (let i = 0; i < 5; i++) {


    let n = niveles[i];
    n.camisetaContrincantes = "brasil"
    n.camisetaWillian = "corinthians"



  }

}

function agregarTiempoParaNivel() {

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {

      let n = niveles[i][j];



      n.tiempoObjetivo = 3


    }

  }

}

function quitarCamisetas() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {

      let n = niveles[i][j];
      console.log(n)
      try {
        for (let m = 0; m < n.amigos.length; m++) {
          if (n.amigos[m].hasOwnProperty("camiseta")) delete n.amigos[m].camiseta
        }
      } catch (e) { }

      try {
        for (let m = 0; m < n.enemigos.length; m++) {
          if (n.enemigos[m].hasOwnProperty("camiseta")) delete n.enemigos[m].camiseta
        }
      } catch (e) { }

      if (n.willian.hasOwnProperty("camiseta")) delete n.willian.camiseta;



    }

  }

}

function agregarCantVecesSirvenLosAmigos() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {

      let n = niveles[i][j];

      try {
        for (let m = 0; m < n.amigos.length; m++) {
          n.amigos[m].cantDeVecesQHace = 1;
        }
      } catch (e) { }



    }

  }

}

function quitarOneTwo() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {

      let n = niveles[i][j];
      console.log(n)
      try {
        for (let m = 0; m < n.enemigos.length; m++) {
          if (n.enemigos[m].hasOwnProperty("flanqueableConOneTwo")) delete n.enemigos[m].flanqueableConOneTwo
          if (n.enemigos[m].hasOwnProperty("flanqueableConGambeta1")) delete n.enemigos[m].flanqueableConGambeta1
          if (n.enemigos[m].hasOwnProperty("flanqueableConGambeta2")) delete n.enemigos[m].flanqueableConGambeta2
          if (n.enemigos[m].hasOwnProperty("leGanaAWillianCabeceando")) delete n.enemigos[m].leGanaAWillianCabeceando

        }
      } catch (e) { }





    }

  }

}
function agregarEnemigosYAmigos() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {

      let n = niveles[i][j];
      if (!n.hasOwnProperty("amigos")) n.amigos = [];
      if (!n.hasOwnProperty("enemigos")) n.enemigos = [];

      /* db.ref('niveles['+i+']['+k+']').set({
           n
       }, ()=>{});*/


    }
  }

}


function agregarAccionDpsDePegarle() {
  for (let i = 0; i < 5; i++) {


    let n = niveles[i];
    if (n.hasOwnProperty("enemigos")) {
      for (let m = 0; m < n.enemigos.length; m++) {
        let contri = n.enemigos[m];
        console.log(contri)
        contri.accionDpsDePegarle = "parado";
      }
    }

    if (n.hasOwnProperty("amigos")) {
      for (let x = 0; x < n.amigos.length; x++) {
        let am = n.amigos[x];
        am.accionDpsDePegarle = "parado";
      }
    }

    db.ref('niveles/' + n.key).set({
      n
    }, () => { });


  }

}



function quitarFlequillos() {
  for (let i = 0; i < 5; i++) {


    let n = niveles[i];
    if (n.hasOwnProperty("enemigos")) {
      for (let m = 0; m < n.enemigos.length; m++) {
        let contri = n.enemigos[m];

        try { delete contri.cara.flequillo } catch (e) { }
      }
    }

    if (n.hasOwnProperty("amigos")) {
      for (let x = 0; x < n.amigos.length; x++) {
        let am = n.amigos[x];
        try { delete am.cara.flequillo } catch (e) { }
      }
    }
    /*
        db.ref('niveles/' + n.key).set({
          n
        }, () => { });
    */

  }

}


function randomInt(n) {
  return Math.floor(Math.random() * (n + 1));
}

function caraRandom(cara) {
  cara.piel = cara.boca = randomInt(1)
  cara.pelo = randomInt(14);
  let cejasr = randomInt(3);
  if (cejasr == 3) cejas = "cejas_willian"
  else cejas = "cejas_" + (cejasr + 1);
  cara.cejas = cejas;
  cara.pelo = randomInt(15);
  //cara.piel = randomInt(1)
  return cara;
}
function ponerleaQVelDejaDeColisionarLaPelota() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {

      let n = niveles[i][j];
      n.pelota.aQueVelocidadDejaDeColisionar = 700
    }

  }

}


function ponerlesNaricesRandomATodos() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {

      let n = niveles[i][j];

      n.arquero.cara.nariz = Math.floor(Math.random() * 3)

      if (!n.hasOwnProperty("amigos")) n.amigos = []
      for (let m = 0; m < n.amigos.length; m++) {
        n.amigos[m].cara.nariz = Math.floor(Math.random() * 3)
      }



      if (!n.hasOwnProperty("enemigos")) n.enemigos = []
      for (let m = 0; m < n.enemigos.length; m++) {
        n.enemigos[m].cara.nariz = Math.floor(Math.random() * 3)

      }

    }
  }
}
function ponerleCaraRandomATodos() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {

      let n = niveles[i][j];
      caraRandom(n.arquero.cara);

      if (!n.hasOwnProperty("amigos")) n.amigos = []
      for (let m = 0; m < n.amigos.length; m++) {
        caraRandom(n.amigos[m].cara);
      }


      if (!n.hasOwnProperty("enemigos")) n.enemigos = []

      for (let m = 0; m < n.enemigos.length; m++) {
        caraRandom(n.enemigos[m].cara)
      }
    }
  }

}

function ponerCamisetasRivales() {

  niveles[0][0].camisetaContrincantes = "flamengo"
  niveles[0][1].camisetaContrincantes = "flamengo"
  niveles[0][2].camisetaContrincantes = "flamengo"
  niveles[0][3].camisetaContrincantes = "gremio"
  niveles[0][4].camisetaContrincantes = "gremio"
  niveles[0][5].camisetaContrincantes = "gremio"
  niveles[0][6].camisetaContrincantes = "saopaulo"
  niveles[0][7].camisetaContrincantes = "saopaulo"
  niveles[0][8].camisetaContrincantes = "saopaulo"


  niveles[1][0].camisetaContrincantes = "argentina"
  niveles[1][1].camisetaContrincantes = "argentina"
  niveles[1][2].camisetaContrincantes = "argentina"
  niveles[1][3].camisetaContrincantes = "venezuela"
  niveles[1][4].camisetaContrincantes = "venezuela"
  niveles[1][5].camisetaContrincantes = "venezuela"
  niveles[1][6].camisetaContrincantes = "uruguay"
  niveles[1][7].camisetaContrincantes = "uruguay"
  niveles[1][8].camisetaContrincantes = "uruguay"

  //ucrania
  niveles[2][0].camisetaContrincantes = "metalist"
  niveles[2][1].camisetaContrincantes = "metalist"
  niveles[2][2].camisetaContrincantes = "dinamo"
  niveles[2][3].camisetaContrincantes = "dinamo"
  niveles[2][4].camisetaContrincantes = "dinamo"
  niveles[2][5].camisetaContrincantes = "dnipro"
  niveles[2][6].camisetaContrincantes = "dnipro"
  niveles[2][7].camisetaContrincantes = "tavriya"
  niveles[2][8].camisetaContrincantes = "tavriya"

  //inglaterra
  niveles[3][0].camisetaContrincantes = "city"
  niveles[3][1].camisetaContrincantes = "city"
  niveles[3][2].camisetaContrincantes = "manchester"
  niveles[3][3].camisetaContrincantes = "manchester"
  niveles[3][4].camisetaContrincantes = "arsenal"
  niveles[3][5].camisetaContrincantes = "arsenal"
  niveles[3][6].camisetaContrincantes = "tottenham"
  niveles[3][7].camisetaContrincantes = "tottenham"
  niveles[3][8].camisetaContrincantes = "tottenham"


  //brasil mundial
  niveles[4][0].camisetaContrincantes = "peru"
  niveles[4][1].camisetaContrincantes = "peru"
  niveles[4][2].camisetaContrincantes = "peru"
  niveles[4][3].camisetaContrincantes = "paraguay"
  niveles[4][4].camisetaContrincantes = "paraguay"
  niveles[4][5].camisetaContrincantes = "paraguay"
  niveles[4][6].camisetaContrincantes = "uruguay"
  niveles[4][7].camisetaContrincantes = "uruguay"
  niveles[4][8].camisetaContrincantes = "uruguay"

  niveles.locos[0][0].camisetaContrincantes = "uruguay"
  niveles.locos[0][1].camisetaContrincantes = "argentina"
  niveles.locos[0][2].camisetaContrincantes = "peru"

  niveles.locos[1][0].camisetaContrincantes = "saopaulo"
  niveles.locos[1][1].camisetaContrincantes = "gremio"
  niveles.locos[1][2].camisetaContrincantes = "flamengo"

  niveles.locos[2][0].camisetaContrincantes = "dinamo"
  niveles.locos[2][1].camisetaContrincantes = "dnipro"
  niveles.locos[2][2].camisetaContrincantes = "tavriya"

  niveles.locos[3][0].camisetaContrincantes = "manchester"
  niveles.locos[3][1].camisetaContrincantes = "arsenal"
  niveles.locos[3][2].camisetaContrincantes = "city"

  niveles.locos[4][0].camisetaContrincantes = "venezuela"
  niveles.locos[4][1].camisetaContrincantes = "argentina"
  niveles.locos[4][2].camisetaContrincantes = "uruguay"

}

function ponerCamisetasYPelosComoVan() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {

      let n = niveles[i][j];
      console.log(n)

      if (i == 0) {
        n.camisetaWillian = "corinthians";
        n.willian.cara.pelo = "willian_pelo1"
      } else if (i == 1) {
        n.camisetaWillian = "brasil";
        n.willian.cara.pelo = "willian3"
      } else if (i == 2) {
        n.camisetaWillian = "shakhtar";
        n.willian.cara.pelo = "willian_trencitas"

      } else if (i == 3) {
        n.camisetaWillian = "chelsea";
        n.willian.cara.pelo = "willian2"
      } else if (i == 4) {
        n.camisetaWillian = "brasil";
        n.willian.cara.pelo = "willian"
      }



    }
  }

}
function agregarAccionesArqueroANivelesLocos() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {

      let n = niveles.locos[i][j];
      n.arquero.fuerzaX = -50
      n.arquero.fuerzaY = -50
      n.arquero.saltaAnteSombrerito = true
      n.arquero.flanqueableConGambeta360 = false

    }
  }

  guardarNivelesRaw()

}

function agregarAccionesArquero() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {

      let n = niveles[i][j];
      //  n.arquero.fuerzaX = -50
      // n.arquero.fuerzaY = -50
      n.arquero.saltaAnteSombrerito = true
      n.arquero.flanqueableConGambeta360 = false

    }
  }

  guardarNivelesRaw()

}

function borrarCamisetaRival() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 9; j++) {
      let n = niveles[i][j];
      delete n.camisetaRival

    }
  }

  guardarNivelesRaw()

}

function ponerLocoEnOrden() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      let n = niveles.locos[i][j];
      let c = (j + 1);
      n.orden = "loco" + c.toString()

    }
  }

}

function guardarNivelesRaw() {


  //"ELSE"
  db.ref('/niveles').set(niveles, () => {
    alert("guardo ok")
  });


}

let gnr = guardarNivelesRaw;

function guardarNiveles() {


  // niveles = 
  if (juegoW.nivel.orden.toString().substr(0, 4) == "loco") {
    let numero = parseInt(juegoW.nivel.orden.toString().substr(4, 1)) - 1;



    // console.log(niv)
    // alert(juegoW.nivel.orden + "; " + numero)


    let niv = niveles["locos"][juegoW.nivel.mundo - 1][numero] = editor.get()


    db.ref('/niveles/locos').child(juegoW.nivel.mundo - 1).child(numero).set(niv, () => {

      juegoW.recargarNivelActualDesdeElArray();
      alert("se guardo ok y se va a resetear el nivel")

    });


  } else {

    let niv = niveles[juegoW.nivel.mundo - 1][juegoW.buscarNivelEnArray()] = editor.get()



    db.ref('/niveles').child(juegoW.nivel.mundo - 1).child(juegoW.buscarNivelEnArray()).set(niv, () => {
      traerNiveles(
        () => {
          juegoW.recargarNivelActualDesdeElArray();
        }
      )
    });
  }
  // JuegoWillian.cargarNivel(n);
  $("#jsoneditor").hide();
  ocultarEditorNivel()
}


function ponerTexturaEnCajas() {
  for (let i = 0; i < 5; i++) {

    let n = niveles.locos[i];
    for (let j = 0; j < 3; j++) {
      if (n[j].hasOwnProperty("cajas")) {
        for (let m = 0; m < n[j]["cajas"].length; m++) {
          let caja = n[j].cajas[m]

          caja.textura = "madera1"

        }

      }
    }
  }
}

function ponerNombreACajas() {
  for (let i = 0; i < 5; i++) {

    let n = niveles.locos[i];
    for (let j = 0; j < 3; j++) {
      if (n[j].hasOwnProperty("cajas")) {
        for (let m = 0; m < n[j]["cajas"].length; m++) {
          let caja = n[j].cajas[m]

          caja.nombre = ""

        }

      }
    }
  }
}


traerNiveles();