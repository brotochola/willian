class Usuario {
  constructor() {
    this.meritos = [];
    this.generarArrayDeNiveles();
    this.compras = {};
    this.monedas = 0;
    this.intros = [0, 0, 0, 0, 0];
    this.nivelesJugados = [];
    this.idioma = navigator.language;
    this.aparato = navigator.appVersion;
    this.platform = navigator.platform;
    this.userAgent = navigator.userAgent;
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.pixelRatio = window.devicePixelRatio;
    /*  this.vioTutorial = false;
        if (localStorage.vioTutorial) {
            if (localStorage.vioTutorial == "true" || localStorage.vioTutorial == true) {
                this.vioTutorial = localStorage.vioTutorial

            }

        }*/

    if (window.hasOwnProperty("device")) {
      this.device = device;
    } else {
      this.device = {};
      this.device.uuid = "no_id";
    } //else device

    //  this.traerDataDeFirebase(()=>{this.cargarMeritos()})
    this.registrarUsuarioEnFirebase();
    this.traerDataDeLocalStorage(() => {
      this.cargarMeritos();
    });
    this.guardar();
  }

  registrarUsuarioEnFirebase() {
    ref.child("usuarios/" + this.device.uuid).once("value", (snapshot) => {
      if (snapshot.exists()) {
        ref.child("usuarios/" + this.device.uuid + "/logins").push(Date.now());
      } else {
        this.guardarEnFirebase();
      }
    });
  }

  registrarNivelJugado(m, n) {
    if (true) return;
    this.nivelesJugados.push({ m: m, n: n });
    let nivJugado = this.nivelesJugados[this.nivelesJugados.length - 1];
    db.ref(
      "usuarios/" + this.device.uuid + "/nivelesJugados/" + Date.now()
    ).set(nivJugado, (a) => {
      console.log("SE GUARDO EL NIVEL JUGADO !");
      //if (cb instanceof Function) cb(a)
    });
    //guardo las estrellas totales q tiene el usuario:
    db.ref("usuarios/" + this.device.uuid + "/estrellas").set(
      this.cantEstrellas(),
      (a) => {}
    );
  }

  actualizarMostradorDeEstrellas() {
    $("#cantEstrellas").html(this.cantEstrellas()).show();
  }

  cantEstrellas() {
    let cant = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 9; j++) {
        let n = this.niveles[i][j];
        if (Array.isArray(n)) {
          if (n[0] == 1) cant++;
          if (n[1] == 1) cant++;
          if (n[2] == 1) cant++;
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        let n = this.niveles.locos[i][j];
        if (Array.isArray(n)) {
          if (n[0] == 1) cant++;
          if (n[1] == 1) cant++;
          if (n[2] == 1) cant++;
        }
      }
    }

    return cant;
  }

  cargarMeritos() {
    // Acá deberían venir de firebase, uso localstorage para probar y poder guardar méritos completados
    if (localStorage.hasOwnProperty("meritos")) {
      console.log("Cargo méritos de localStorage");
      try {
        this.meritos = new GestionMeritos(localStorage.meritos);
      } catch (e) {
        this.meritos = new GestionMeritos(JSON.parse(localStorage.meritos));
      }
    } else {
      console.log(
        "No hay meritos en localStorage, uso el json vacío y lo guardo"
      );
      this.meritos = new GestionMeritos();
      localStorage["meritos"] = JSON.stringify(this.meritos);
    }
  }

  guardarEnFirebase(cb) {
    if (true) return;
    let a = JSON.parse(JSON.stringify(this));
    a.meritos = {};
    a.tutoriales = {};
    a.habilidades = {};
    a.logins = [];
    a.logins["0"] = Date.now();

    db.ref("usuarios/" + this.device.uuid).set(this, (a) => {
      if (cb instanceof Function) cb(a);
    });
  }

  guardar() {
    localStorage["usuarioWillian"] = JSON.stringify(this);
  }
  generarArrayDeNiveles() {
    this.niveles = {};
    this.niveles["locos"] = {};
    for (let i = 0; i < 5; i++) {
      this.niveles[i] = {};
      this.niveles.locos[i] = {};
    }

    /*

        Mundo 1: PATEAR, BARRER, SALTAR
    Mundo 2: + CABECEAR
    Mundo 3: + BICICLETA
    Mundo 4: + 360
    Mundo 5: NIVELES MAS DE REACCION RAPIDA, MAS ‘INTERESANTES’*/

    this.habilidades = {
      gambeta: false,
      cabezazo: false,
      sombrerito: false,
    };

    this.tutoriales = {
      gambeta: false,
      cabezazo: false,
      sombrerito: false,
      patear: false,
      saltar_barrida: false,
      pase: false,
      barrida: false,
    };
  }

  /* evaluarDesbloqueoDeHabilidades() {
        if (this.niveles[0].hasOwnProperty(8)) {
            if (this.niveles[0][8].hasOwnProperty(0)) {
                if (this.niveles[0][8][0] == 1) {
                    //ganaste el ultimo nivel del primer mundo
                    this.habilidades.cabezazo = true;
                }
            }
        }

        if (this.niveles[1].hasOwnProperty(8)) {
            if (this.niveles[1][8].hasOwnProperty(0)) {
                if (this.niveles[1][8][0] == 1) {
                    //ganaste el ultimo nivel del segudon mundo
                    this.habilidades.sombrerito = true;
                }
            }
        }


        if (this.niveles[2].hasOwnProperty(8)) {
            if (this.niveles[2][8].hasOwnProperty(0)) {
                if (this.niveles[2][8][0] == 1) {
                    //ganaste el ultimo nivel del tercer mundo
                    this.habilidades.gambeta = true;
                }
            }
        }
        usuario.guardar();

    }*/
  calcularCantEstrellasObtenidasPorNivel(n) {
    if (!Array.isArray(n)) return 0;
    else return n[0] + n[1] + n[2];
  }

  nivelesPorMundo(m) {
    let arrNiveles = [];
    let arrBotones = [];
    for (let i = 0; i < 9; i++) {
      arrNiveles[i] = -1;
      if (this.niveles[m].hasOwnProperty(i)) {
        let n = this.niveles[m][i];
        arrNiveles[i] = this.calcularCantEstrellasObtenidasPorNivel(n);
      }
    }

    let todosEstanBloqueados = true;
    for (let i = 0; i < arrNiveles.length; i++) {
      if (arrNiveles[i] != -1) {
        todosEstanBloqueados = false;
      }
    }
    if (todosEstanBloqueados) {
      arrNiveles[0] = 0;
      return arrNiveles;
    }

    let cant0 = 0;
    let maxLlegado = 0;
    for (let i = 8; i >= 0; i--) {
      if (arrNiveles[i] == -1) {
        if (arrNiveles[i - 1] != -1) arrNiveles[i] = 0;
      } else if (arrNiveles[i] == 0) {
        cant0++;
      } else if (arrNiveles[i] > 0) {
        if (maxLlegado < i) maxLlegado = i;
      }
    }

    let estanGanadosCorrelativamente = true;
    let cualNoGanaste = null;
    for (let i = 0; i <= maxLlegado; i++) {
      if (arrNiveles[i] < 1) {
        cualNoGanaste = i;
        estanGanadosCorrelativamente = false;
        break;
      }
    }
    if (estanGanadosCorrelativamente) {
      arrNiveles[maxLlegado + 2] = 0;
      arrNiveles[maxLlegado + 1] = 0;
    }

    return arrNiveles;
  }

  evaluarCualEsElUltimoNivelLlegado(m) {
    for (let j = 0; j < 9; j++) {
      let n = this.niveles[m][j];

      if (!n.hasOwnProperty(0)) {
        return j;
      } else {
        if (n[0] == 0 && n[1] == 0 && n[2] == 0) continue;
      }
    }
    return this.niveles[m].length; //si estan todos ok el ultimo nivel llegado es 8 (hay 9 niveles)
  }
  traerDataDeLocalStorage(cb) {
    let o;
    if (localStorage.hasOwnProperty("usuarioWillian")) {
      let u = localStorage["usuarioWillian"];

      try {
        o = JSON.parse(u);
      } catch (e) {
        localStorage.usuarioWillian = "";
        return;
      }

      console.log("USUARIO CARGADO");
      console.log(o);

      let keys = Object.keys(o);

      for (let i = 0; i < keys.length; i++) {
        this[keys[i]] = o[keys[i]];
      }
      if (!this.hasOwnProperty("niveles")) {
        this.generarArrayDeNiveles();
      } else {
        if (
          !this.niveles.hasOwnProperty(0) ||
          !this.niveles.hasOwnProperty("locos")
        )
          this.generarArrayDeNiveles();
      }
    } else {
      localStorage.usuarioWillian = "";
    }
    if (cb instanceof Function) cb();
  }

  yaViIntro(c) {
    this.intros[c] = 1;
    this.guardar();
  }

  traerDataDeFirebase(cb) {
    ref
      .child("usuarios")
      .child(this.device.uuid)
      .once(
        "value",
        (snapshot) => {
          let n = snapshot.val();
          //n es el usuario en firebase
          let keys = Object.keys(n);
          console.log(n);
          //meto todas las propieades q vienen de firebase en este objeto
          for (let i = 0; i < keys.length; i++) {
            this[keys[i]] = n[keys[i]];
          }

          if (cb instanceof Function) cb(n);
        },
        function (error) {
          console.log("Error: " + error.code);
        }
      );
  }

  evaluarMeritosDelNivel() {
    console.log("evaluarMeritosDelNivel");
  }

  evaluarMeritosGlobales() {
    console.log("evaluarMeritosGlobales");
  }

  registrarNivel(mundo, nivel, estrella1, estrella2, estrella3) {
    if (nivel.toString().substr(0, 4) == "loco") {
      //let n = mundoNivel2Nivel(mundo - 1, nivel);
      let nNivel = buscarNivelPorNumeroDeMundoYOrden(mundo - 1, nivel);
      //  alert(nNivel)
      if (!Array.isArray(this.niveles.locos[mundo - 1][nNivel]))
        this.niveles.locos[mundo - 1][nNivel] = [];
      this.niveles.locos[mundo - 1][nNivel][0] =
        estrella1 || this.niveles.locos[mundo - 1][nNivel][0];
      this.niveles.locos[mundo - 1][nNivel][1] =
        estrella2 || this.niveles.locos[mundo - 1][nNivel][1];
      this.niveles.locos[mundo - 1][nNivel][2] =
        estrella3 || this.niveles.locos[mundo - 1][nNivel][2];
      //ESTANDARIZO GUARDANDO 1 ó 0s para q en firebase sea menos q true false
      if (this.niveles.locos[mundo - 1][nNivel][0])
        this.niveles.locos[mundo - 1][nNivel][0] = 1;
      else this.niveles.locos[mundo - 1][nNivel][0] = 0;
      if (this.niveles.locos[mundo - 1][nNivel][1])
        this.niveles.locos[mundo - 1][nNivel][1] = 1;
      else this.niveles.locos[mundo - 1][nNivel][1] = 0;
      if (this.niveles.locos[mundo - 1][nNivel][2])
        this.niveles.locos[mundo - 1][nNivel][2] = 1;
      else this.niveles.locos[mundo - 1][nNivel][2] = 0;
    } else {
      let nNivel = buscarNivelPorNumeroDeMundoYOrden(mundo - 1, nivel);
      if (!Array.isArray(this.niveles[mundo - 1][nNivel]))
        this.niveles[mundo - 1][nNivel] = [];
      this.niveles[mundo - 1][nNivel][0] =
        estrella1 || this.niveles[mundo - 1][nNivel][0];
      this.niveles[mundo - 1][nNivel][1] =
        estrella2 || this.niveles[mundo - 1][nNivel][1];
      this.niveles[mundo - 1][nNivel][2] =
        estrella3 || this.niveles[mundo - 1][nNivel][2];

      //ESTANDARIZO GUARDANDO 1 ó 0s para q en firebase sea menos q true false
      if (this.niveles[mundo - 1][nNivel][0])
        this.niveles[mundo - 1][nNivel][0] = 1;
      else this.niveles[mundo - 1][nNivel][0] = 0;
      if (this.niveles[mundo - 1][nNivel][1])
        this.niveles[mundo - 1][nNivel][1] = 1;
      else this.niveles[mundo - 1][nNivel][1] = 0;
      if (this.niveles[mundo - 1][nNivel][2])
        this.niveles[mundo - 1][nNivel][2] = 1;
      else this.niveles[mundo - 1][nNivel][2] = 0;
    }

    //  this.evaluarDesbloqueoDeHabilidades()
    this.guardar();
  }
  agregarMeritoCompleto(m) {
    if (!(m instanceof Object)) return;
    m.cobrado = false;

    this.meritos.push(m);
  }
}
