//let pelota2;

class JuegoWillian {
  constructor(canvasCJS, canvasBOX2D, nivel) {
    ponerCanvasSegunDebug();

    this.nivel = nivel;
    //TRAIGO LOS 2 CUERPOS Q SE VAN A USAR EN ESTE NIVEL
    this.pauseRender = false;

    editor = new JSONEditor(document.getElementById("jsoneditor"), {
      mode: "tree",
    });
    this.tiempoTranscurrido = 0;

    if (cantJuegos == 0) {
      cantJuegos++;
    } else {
      console.log(
        "no pued ehaber mas de un juego de williana a la vez, sino liman los canvas"
      );
      return;
    }

    this.intense = new librerias["lib_original"].intense();

    this.canvas = document.getElementById(canvasCJS);
    this.canvas.style.display = "block";
    this.canvasBOX2D = document.getElementById(canvasBOX2D);

    /*
                this.canvas.addEventListener("mousedown", function () {
                     document.getElementById(canvasCJS).webkitRequestFullScreen()
                })*/

    this.establecerAtributosJuego();

    this.ultimoEnTocarla = willian;
    this.ultimoRebote = "piso";
    this.primerosSegundos = true;
  }
  buscarNivelEnArray() {
    let num = -1;
    for (let i = 0; i < niveles[this.nivel.mundo - 1].length; i++) {
      if (niveles[this.nivel.mundo - 1][i].orden == this.nivel.orden) {
        return i;
      }
    }
    return -1;
  }
  recargarNivelActualDesdeElArray() {
    if (this.nivel.orden.toString().substr(0, 4) == "loco") {
      let numero = parseInt(juegoW.nivel.orden.toString().substr(4, 1)) - 1;
      this.nivel = niveles["locos"][this.nivel.mundo - 1][numero];
    } else {
      this.nivel = niveles[this.nivel.mundo - 1][this.buscarNivelEnArray()];
    }

    this.restart();
  }

  establecerAtributosJuego() {
    this.offsetTarget = 0;
    this.offsetXCamara = 0;
    this.pause = true;
    this.coefCamara = 1;
    this.lineaPiso = 813; //815 pero para evaluar
    this.targetFondoX = 0;
    fps = this.fps = 30;
    this.fpsBase = 30;
    this.FPStarget = 30;
    this.FRAMENUM = 0;
    this.escala = 0.9; //la escala q aplica todo el tiempo
    this.escalaTarget = 0.9; //la q escala q uno toca q se interpola
    this.velocidadCamara = 7.5;
    this.altoPiso = 100;
    this.yBg = 710;
    this.escalaMin = 0.66;
    this.escalaMax = 0.9;
    this.ganaste = false;
    this.perdiste = false;
    this.aQuienSigueLaCamara = "p";
    this.factorDeRotacionCuandoGanas = 5;
    this.agarroEstrella = false;
    this.velCamaraX = 3;
    this.targetNivelX = 0;
    this.targetCamaraArco = 1750;
  }

  willianEstaPorCabecearYSePoneCamaraLenta() {
    if (this.yaSePusoEnCamaraLentaSaltando == false) {
      this.aQuienSigueLaCamara = "w"; //PARA Q SE VAYA UN TOQ A LA IZQ LA CAMARA
      this.escalaMax = 1.2;
      this.slowMo();
      stage.addChild(this.intense);
      setTimeout(() => {
        if (this.ganaste == false && this.perdiste == false) {
          if (this.pelotaLlegoALimiteDeLaCamara == true) this.escalaMax = 0.95;
          else this.escalaMax = 0.9;
          this.aQuienSigueLaCamara = "p";
        }
        this.velocidadNormal();
      }, 1000);
      this.yaSePusoEnCamaraLentaSaltando = true;
    }
  }

  ganasteTodoElJuego() {
    if (this.agarroEstrella & this.cumplisteConTiempo) {
      audioW.gol(3);
    } else if (this.agarroEstrella & (this.cumplisteConTiempo == false)) {
      audioW.gol(2);
    } else if (
      (this.agarroEstrella == false) &
      (this.cumplisteConTiempo == true)
    ) {
      audioW.gol(2);
    } else if (
      (this.agarroEstrella == false) &
      (this.cumplisteConTiempo == false)
    ) {
      audioW.gol(1);
    }

    console.log("GANASTE TODO EL JUEGO, ACA VA VIDEO");
    setTimeout(() => {
      console.log("VIDEO FIN DE JUEGO");
      $("#tutorial")[0].src = "img/final.mp4";
      $("#tutorial")[0].muted = false;
      $("#tutorial")[0].play();

      audioW.frenarTodo();
      $("#tutorial")
        .show()
        .on("ended", () => {
          this.volverALaSeleccionDeNiveles();
        });
    }, 3000);
  }

  gol() {
    if (this.ganaste) return;
    console.log("VELOCIDAD PELOTA: " + pelota.cuerpo.m_linearVelocity.x);

    //this.pause=true;
    if (this.nivel.mundo == 5 && this.nivel.orden == 9) {
      this.ganasteTodoElJuego();
    } else {
      this.evaluarEstrellitasYPonerGanarPerder();
      this.animacionDeCamaraFinDeJuego(35, 1400);
    }

    //  arco.moverRed()

    willian.festejo();

    arquero.caraEnojado();
    for (let i = 0; i < contrincantes.length; i++) {
      contrincantes[i].caraEnojado();
      contrincantes[i].cambiarAccion("parado");
    }

    for (let i = 0; i < amigos.length; i++) {
      amigos[i].festejo();
    }

    this.ganaste = true;

    if (sessionStorage.getItem("perdioEnEsteNivel") == 0) {
      usuario.meritos.registrarNivelGanadoSinPerder();
    }

    console.log(
      "Gol de: " +
        willian.ultimoTiro +
        " - fuera del area: " +
        willian.lePegoDeAfueraDelArea
    );
    usuario.meritos.registrarGol(
      willian.ultimoTiro,
      willian.lePegoDeAfueraDelArea
    );

    if (juegoW.ultimoEnTocarla instanceof Contrincante) {
      console.log("gol en contra!!!");
      usuario.meritos.registrarGolEnContra();
    }

    usuario.meritos.registrarNivelDesbloqueado();

    if (juegoW.primerosSegundos && this.ultimoEnTocarla instanceof Willian) {
      console.log("gol de una!!!");
      usuario.meritos.registrarGolDeUna();
    }

    //COSO DE GANAR Y PERDER
  }
  evaluarEstrellitasYPonerGanarPerder() {
    if (juegoW.tiempoTranscurrido > juegoW.nivel.tiempoObjetivo * 1000)
      this.cumplisteConTiempo = false;
    else this.cumplisteConTiempo = true;
    //console.log(this.agarroEstrella, this.cumplisteConTiempo);
    if (this.agarroEstrella & this.cumplisteConTiempo) {
      this.ponerGanarPerder("ganaste3");
      audioW.gol(3);
    } else if (this.agarroEstrella & (this.cumplisteConTiempo == false)) {
      this.ponerGanarPerder("ganaste2a");
      audioW.gol(2);
    } else if (
      (this.agarroEstrella == false) &
      (this.cumplisteConTiempo == true)
    ) {
      this.ponerGanarPerder("ganaste2b");
      audioW.gol(2);
    } else if (
      (this.agarroEstrella == false) &
      (this.cumplisteConTiempo == false)
    ) {
      this.ponerGanarPerder("ganaste1");
      audioW.gol(1);
    }
    usuario.registrarNivel(
      this.nivel.mundo,
      this.nivel.orden,
      true,
      this.cumplisteConTiempo,
      this.agarroEstrella
    );
  }

  animacionDeCamaraFinDeJuego(velCam, delayTime) {
    this.velocidadCamara = velCam;
    this.escalaMax = 2;
    this.escalaTarget = 1.4;
    this.frameDelGol = this.FRAMENUM;
    todo.regX = canvasWidth / 2;
    todo.regY = canvasHeight / 2;
    todo.x = canvasWidth / 2;
    todo.y = canvasHeight / 2;
    setTimeout(() => {
      this.aQuienSigueLaCamara = "w";
      this.escalaTarget = 2;
    }, delayTime);
  }
  seFueLaPelota() {
    willian.golFallado();
    if (this.nivel.hasOwnProperty("monstruo")) {
      audioW.repro(monstruo.audioGana);
    }
    if (this.perdiste) return;
    console.log("VELOCIDAD PELOTA: " + pelota.cuerpo.m_linearVelocity.x);

    arquero.sonreir();
    for (let i = 0; i < contrincantes.length; i++) {
      contrincantes[i].sonreir();
      contrincantes[i].cambiarAccion("parado");
    }
    for (let i = 0; i < amigos.length; i++) {
      amigos[i].golFallado();
    }

    this.ponerGanarPerder(0);
    console.log("PERDISTE");
    this.animacionDeCamaraFinDeJuego(90, 1000);
    audioW.frenarTodoLosAudiosDefaultDeLosMonstruos();

    audioW.reproducirSonidoAtajada();
    this.perdiste = true;
    sessionStorage.setItem("perdioEnEsteNivel", 1);

    usuario.meritos.registrarNivelPerdido();
  }

  ponerGanarPerder(q) {
    if (this.ganaste == true || this.perdiste == true) return;
    console.log("PONER GANAR PERER " + q);
    this.ganarPerder = new librerias["lib_original"].ganarPerder();
    stage.addChild(this.ganarPerder);
    this.ganarPerder.visible = false;

    setTimeout(() => {
      this.ganarPerder.gotoAndPlay(q);
      this.ganarPerder.visible = true;
    }, 1500);
  }

  restart() {
    $("#contBotones").hide();
    this.tiempoTranscurrido = 0;
    window.nivelTemp = juegoW.nivel;
    editor.destroy();
    $(".jsoneditor.jsoneditor-mode-tree").remove();
    stage.removeAllChildren();
    createjs.Ticker.removeAllEventListeners();
    cantJuegos--;
    juegoW = new JuegoWillian(
      "canvasCreateJs",
      "canvasBox2d",
      window.nivelTemp
    );
    juegoW.setup();

    /*
        for (let i = 0; i < this.nivel.enemigos.length; i++) {
            contrincantes[i].caja.m_position.x = this.nivel.enemigos[i].x;
            contrincantes[i].caja.m_position.y = this.nivel.enemigos[i].y;
            contrincantes[i].FRAMENUM = 0;
            contrincantes[i].colisionaConPelota = true;
            contrincantes[i].cambiarAccion(this.nivel.enemigos[i].empieza)
        }

        for (let i = 0; i < this.nivel.amigos.length; i++) {
            amigos[i].caja.m_position.x = this.nivel.amigos[i].x;
            amigos[i].caja.m_position.y = this.nivel.amigos[i].y;
            amigos[i].FRAMENUM = 0;
            amigos[i].colisionaConPelota = true;
            amigos[i].cambiarAccion(this.nivel.amigos[i].empieza)
            amigos[i].puedePararla = true;
            amigos[i].seDioVuelta = false;
            amigos[i].estado = 0;
        }
        
        arquero.caja.m_position.x = this.nivel.arquero.x;
        arquero.caja.m_position.y = this.nivel.arquero.y;
        arquero.FRAMENUM = 0;
        arquero.cjs.gotoAndStop(this.nivel.arquero.empieza);
        arquero.colisionaConPelota = true;
        arquero.estado = 0;
        arquero.accion = "parado";
        arquero.puedeAgarrarlaArriba = false;
        pelota.cuerpo.visible = true;

        if (arquero.timeoutInvisibilizarPelota) {
            clearTimeout(arquero.timeoutInvisibilizarPelota);
        }

        willian.colisionaConPelota = true;
        willian.caja.m_position.x = this.nivel.willian.x
        willian.caja.m_position.y = this.nivel.willian.y
        willian.cambiarAccion(this.nivel.willian.empieza)

        //saco la pelota porq si se colgó fuera del mundo no responde mas
        nivel.removeChild(pelota.cjs)
        pelota.cuerpo.m_world.DestroyBody(pelota.cuerpo);
        //creo nueva pelota
        pelota = new Pelota(this.nivel.pelota.x, this.nivel.pelota.y, this.nivel.pelota.fuerzaX, -this.nivel.pelota.fuerzaY, this.nivel.pelota.angularVel); //x,y,fuerzaX, -fuerzaY
        
        //la agrego a nivel
        nivel.addChild(pelota.cjs);
        //y la pongo atras del arco
        nivel.setChildIndex(pelota.cjs, nivel.getChildIndex(arco.cjs) - 1)


        this.establecerAtributosJuego()


        willian.FRAMENUM = pelota.FRAMENUM = 0;
        this.velocidadNormal();

        todo.rotation = 0;

        nivel.x = canvasWidth / 2 - pelota.cjs.x
    */
  }

  skewLineasArea() {
    /*  let xGlobal = nivel.x + cancha.x + arco.areaGrande.x
          let prc = porcentaje(0, 1920, xGlobal);
          if(prc>100) prc=100
          if(prc<0) prc=0
          arco.areaGrande.skewX = mapear(prc, 50, -50)
          let shouldBeHeight = arco.areaGrande.nominalBounds.height;
          let isHeight = shouldBeHeight * Math.abs(Math.cos(deg2rad(arco.areaGrande.skewX)));
          let heightRatio = shouldBeHeight / isHeight;
          arco.areaGrande.scaleY = heightRatio;*/

    ////////// circulo central
    let xGlobal = nivel.x + cancha.x + arco.circuloCentral.x;
    let prc = porcentaje(0, 1920, xGlobal);
    if (prc > 100) prc = 100;
    if (prc < 0) prc = 0;
    arco.circuloCentral.skewX = mapear(prc, 70, -70);
    arco.circuloCentral.x = fl(
      arco.posXCirculoCentral - arco.circuloCentral.skewX
    );
    //console.log(arco.circuloCentral.skewX)

    let shouldBeHeight = arco.circuloCentral.nominalBounds.height;
    let isHeight =
      shouldBeHeight * Math.abs(Math.cos(deg2rad(arco.circuloCentral.skewX)));
    let heightRatio = shouldBeHeight / isHeight;
    arco.circuloCentral.scaleY = heightRatio;
  }
  mostrarUOcultar() {
    /* let xGlobal = nivel.x + cancha.x + arco.areaGrande.x

         if(xGlobal>canvasWidth) arco.areaGrande.visible=false
         else if(xGlobal<0) arco.areaGrande.visible=false
         else arco.areaGrande.visible=true*/
  }

  ponerTiempoNivel() {
    this.deltaTime = Date.now() - this.timerUltimoFrame;
    this.timerUltimoFrame = Date.now();
    if (
      this.pause == false &&
      this.ganaste == false &&
      this.perdiste == false &&
      this.deltaTime > 0
    ) {
      this.tiempoTranscurrido = this.FRAMENUM * 33.34;
      if (this.FRAMENUM % 3 == 0) {
        let t = this.tiempoTranscurrido / 1000;
        let lim = this.nivel.tiempoObjetivo;
        let fr = (27 * t) / lim;
        if (fr > 27) fr = 27;
        this.reloj.gotoAndStop(fr);
        //$("#tiempoNivel").html((this.tiempoTranscurrido/1000).toFixed(2)+"/"+this.nivel.tiempoObjetivo);
        // if(this.tiempoTranscurrido/1000>this.nivel.tiempoObjetivo) {}
      }
    }
  }

  render(e) {
    // if (this.pause) return;

    //  this.step()

    //a cada piso le asigno un numero de frame interno segun la posicion de la pelota
    //todos los mc de piso tienen 200fr
    ///// movimiento pisos

    this.calcularFramePisos();
    this.skewLineasArea();
    this.renderJugadores();
    pelota.render();
    //  pelota2.render();

    //  let es = Math.sin(this.FRAMENUM / 6) * 0.03 + 0.5
    //  this.estrella.scaleX = this.estrella.scaleY = es

    if (this.pauseRender == false) {
      if (this.pause == false) {
        if (this.ganaste == false && this.perdiste == false)
          this.ponerTiempoNivel();
        if (!(debug > 0)) {
          let aQuien;
          if (this.aQuienSigueLaCamara == "w") aQuien = willian.cjs;
          //  else if (this.aQuienSigueLaCamara == "willianCentrado") aQuien = this.aQuienSigueLaCamara
          else aQuien = pelota.cjs;
          this.movCamara(aQuien);
        }
      }
      if (this.ganaste == false && this.perdiste == false)
        this.actualizarMapa();
      stage.update();
    }
  }

  calcularFramePisos() {
    for (let i = 0; i < 4; i++) {
      let frN =
        Math.floor((0.54 * -nivel.x) / Math.pow(i + 1, 1)) %
        this["piso" + i].totalFrames;
      if (frN < 0) {
        frN = this["piso" + i].totalFrames + frN;
      }
      this["piso" + i].gotoAndStop(frN);
    }
  }

  /*
        static cargarNivel(i) {
            this.perdioEnEsteNivel = false;
            if (!JuegoWillian.compararNiveles(juegoW.nivel, juegoW.editor.get())) {
                let a = confirm("hay modificaciones en el nivel, seguro queres cargar otro?");
                if (!a) return;
            }
            let lvl;
            if (Number.isInteger(i)) {
                lvl = niveles[i]
            } else if (i instanceof Object) {
                lvl = i
    
            } else {
                console.error(">> EL FORMATO DEL NIVEL INGRESADO ESTA MAL")
                return;
            }
            juegoW.editor.destroy();
            $(".jsoneditor.jsoneditor-mode-tree").remove();
            stage.removeAllChildren();
            createjs.Ticker.removeAllEventListeners()
    
            $("#contBotones").hide()
            audioW.bgJuego.pause()
            cantJuegos--
            $("#jsoneditor, .listaDeNiveles").hide();
            juegoW = new JuegoWillian('canvasCreateJs', 'canvasBox2d', lvl);
            console.log(">> CARGAR NIVEL", lvl);
            juegoW.setup();
            juegoW.editor.set(lvl);
    
            sessionStorage.setItem("perdioEnEsteNivel", 0);
    
        }*/
  static compararNiveles(a, b) {
    return JSON.stringify(a) == JSON.stringify(b);
  }

  movCamara(obj) {
    let d = willian.distanciaALaPelota();
    /*  if (obj == pelota.cjs) {
              if (d > 1800 && d < 5000) obj = { x: (willian.getPos().x + pelota.getPos().x) / 2, y: pelota.getPos().y }
  
          }*/

    let cantDesplazamiento;

    var mitadX = canvasWidth / 2;
    var mitadY = canvasHeight / 2;

    //  console.log(cancha.x, nivel.x,   this.offsetXCamara);

    //cuando ganaste la camara se comporta diferente
    //sigue interpoladamente primero a la pelota, y despue de unos ms, a willian
    //y se traslada de la pelota a willian interpoladamente tmb

    this.offsetTarget = -2 * pelota.cuerpo.m_linearVelocity.x;
    if (pelota.getPos().x < willian.getPos().x) {
      this.offsetTarget *= -0.75;
    }

    this.offsetXCamaraAnterior = this.offsetXCamara;
    this.offsetXCamara -= Math.floor(
      (this.offsetXCamara - this.offsetTarget) / 50
    );
    //ROTACION DE 'TODO'
    this.targetRotationCamara =
      -(this.offsetXCamaraAnterior - this.offsetXCamara) / 10;
    todo.rotation += (this.targetRotationCamara - todo.rotation) / 30;
    ///////////////////////////////////

    if (this.ganaste || this.perdiste) {
      let num = this.FRAMENUM - this.frameDelGol;
      this.factorDeRotacionCuandoGanas *= 0.98;
      //  todo.rotation = Math.cos(num / 14) * this.factorDeRotacionCuandoGanas
      this.offsetTarget = 0;
      nivel.x = fl(
        nivel.x - (nivel.x - (mitadX - obj.x)) / this.velocidadCamara
      );
    } else {
      let valXArco = nivel.x + this.nivel.arco.x;
      // console.log("valXArco="+valXArco)
      //ACA DEFINO DONDE QUEDA LA PELOTA CON RESPECTO AL CENTRO DEL CANVAS
      if (this.targetNivelXAnterior == undefined) {
        this.targetNivelXAnterior =
          canvasWidth / 2 - obj.x + this.offsetXCamara;
      } else {
        this.targetNivelXAnterior = this.targetNivelX;
      }
      this.targetNivelX = canvasWidth / 2 - obj.x + this.offsetXCamara;

      //  console.log("targetnivelx="+this.targetNivelX, "canvaswidth="+canvasWidth, obj.x, this.offsetXCamara)

      //////// SI ESTA CERCA DEL ARCO...

      if (
        (arco.x - pelota.getPos().x < 1080 /* * this.escalaTarget*/ &&
          this.yaSePusoEnCamaraLentaSaltando == false) ||
        (arco.x - pelota.getPos().x < 1800 && willian.tienePelota == 1)
      ) {
        //this.escalaMax = 0.95
        //SE PONE EN CAMARA LENTA PARA ESATA TRANSICION DURANTE 400MS

        //si llegaste a menos de 1800 del arco
        //y willian no esta en camara lenta se frena la camara
        // console.log("llelgo")

        this.pelotaLlegoALimiteDeLaCamara = true;
        this.targetNivelX = this.targetCamaraArco - arco.x;

        if (this.yaSePusoEnCamaraLentaSaltando == false) {
          if (pelota.cuerpo.m_linearVelocity.x > -1) {
            this.velCamaraX = 15;
          } else {
            this.pelotaLlegoALimiteDeLaCamara = false;
          }
        }
      } else {
        // console.log(" no llelgo")
        this.velCamaraX = 10;
        this.pelotaLlegoALimiteDeLaCamara = false;
      }

      if (!isNaN(nivel.x)) {
        //  console.log(nivel.x, this.targetNivelX, this.velCamaraX)
        nivel.x -= fl((nivel.x - this.targetNivelX) / this.velCamaraX); //INTERPOLACION PARA LA CAMARA , SIGUE LA PELOTA CON 3 FRAMES DE RETRASO
        // nivel.x=this.targetNivelX
      } else {
        // console.log("nivel.x=nan")
        //  debugger;
        nivel.x = 0;
      }
    } //ganaste o perdiste

    this.renderBG();

    if (willian.accion != "gambeta360") this.calcularEscala();

    if (willian.accion != "gambeta360") this.moverCancha();

    if (willian.accion != "gambeta360") this.moverFondo();
  }

  renderBG() {
    if (this.camaraLenta) {
      if (this.FRAMENUM % 3 == 0) {
        //mitad de velociad
        bg.gotoAndStop(this.FRAMENUM / 3);
      }
    } else {
      bg.gotoAndStop(this.FRAMENUM);
    }
  }
  moverFondo() {
    let prc = porcentaje(this.escalaMin, this.escalaMax, this.escala);
    let anchoCachoFondo = 731;

    /* if(this.FRAMENUM%10==0) */

    let porcRecorrido = porcentaje(0, this.anchoTotal + 4000, nivel.x);

    this.targetFondoX =
      ((fl(mapear(porcRecorrido, -canvasWidth, this.anchoTotal + canvasWidth)) *
        0.25) %
        anchoCachoFondo) -
      anchoCachoFondo * 0.25;
    if (this.targetFondoX > 0) this.targetFondoX = 0;
    bg.x = this.targetFondoX; //-bg.x)/this.interpolacionFondo

    //  console.log(porcRecorrido, nivel.x,bg.x);

    let escalaTargetBg;

    if (this.ganaste || this.perdiste) {
      //  bg.scaleY = bg.scaleX = bg.scaleX - (bg.scaleX - mapear(prc, 1, 1.2)) / 10

      //  bg.y = bg.y - (bg.y - this.yBg * bg.scaleX ) / 10
      escalaTargetBg = mapear(prc, 0.95, 1.3);
      bg.y = 740;
    } else {
      // if(   !this.pelotaLlegoALimiteDeLaCamara){
      //FONDO
      escalaTargetBg = mapear(prc, 0.95, 1);
      bg.y = this.yBg * bg.scaleX;
      //   console.log((this.targetNivelXAnterior-this.targetNivelX))
      //  bg.x -= (this.targetNivelXAnterior - this.targetNivelX) / 7

      //  }
    }

    bg.scaleX = bg.scaleY = bg.scaleY + (escalaTargetBg - bg.scaleX) / 17;
  }
  moverCancha() {
    //mueve la cancha de acuerdo a la escala
    if (!this.ganaste && !this.perdiste) {
      cancha.y = (canvasHeight - canvasHeight * cancha.scaleY) * 0.5;
    } else {
      /* por este motivo se ve un salto en el fondo cuando haces gol */
      cancha.y = (canvasHeight - canvasHeight * cancha.scaleY) * 0.7;
    }
    cancha.x = fl((canvasWidth - canvasWidth * cancha.scaleX) * 0.5);
    //  cancha.x += (fl((canvasWidth - canvasWidth * cancha.scaleX) * 0.5) -  cancha.x)/this.coefCamara
  }
  calcularEscala() {
    if (!this.ganaste && !this.perdiste && this.FRAMENUM % 3 == 0) {
      //esto es cada 3 pq igual despues se interpola
      let velXPelota = pelota.cuerpo.GetLinearVelocity().x;
      let pelotaY = pelota.getPos().y;

      let dist = Math.floor(Math.abs(willian.getPos().x - pelota.getPos().x));

      let coefEscala = -0.000125 * dist + 0.95;
      // console.log(coefEscala)

      //con esto se queda entre 0.66 y 1:
      let coefYEscala = 0.000355 * pelotaY + 0.75;
      // console.log(this.coefEscala,coefYEscala)
      this.escalaTarget = coefEscala * coefYEscala;
    }

    if (willian.getPos().y < 400 && pelota.getPos().y < 400) {
      //ESTO ES PARA LOS NIVELES LOCOS, PARA Q SI WILLIAN SALTA MUCHO, Q LA CAMARA PUEDA SEGUIRLO
      this.escalaMin = 0.4;
      this.escalaTarget *= 0.9;
      this.coefCamara = 10;
    } else {
      this.coefCamara = 1;
      this.escalaMin = 0.66;
    }

    //cuando tocas para patear se hace zoom in:
    if (this.camaraLenta == 1) this.escalaTarget = this.escalaMax;

    if (this.escalaTarget < this.escalaMin) this.escalaTarget = this.escalaMin;
    if (this.escalaTarget > this.escalaMax) this.escalaTarget = this.escalaMax;
    if (this.escala > this.escalaMax) this.escala = this.escalaMax;
    if (this.escala < this.escalaMin) this.escala = this.escalaMin;

    //interpolacion:
    this.escala =
      this.escala +
      (this.escalaTarget - this.escala) /
        (this.velocidadCamara * this.coefCamara);
    //fuerzo un toque q vaya a 1 la escala, para q los graficos queden lindos
    if (this.escala > 0.995 && this.escala < 1.005) this.escala = 1;
    //establezco la escala

    cancha.scaleX = cancha.scaleY = this.escala;
  }

  laTieneUnContrincanteSiONo() {
    for (let i = 0; i < contrincantes.length; i++) {
      if (contrincantes[i].tienePelota == 1) return true;
    }
    return false;
  }

  seAgarroLaEstrella() {
    //  console.log("SE AGARRO LA ESTRELLA");
    this.agarroEstrella = true;
    audioW.repro("agarrarestrella");
    this.estrella.gotoAndPlay("agarrada");
  }
  setup() {
    audioW.frenarTodoLosAudiosDefaultDeLosMonstruos();
    $("video").hide();

    createjs.Touch.enable(stage);
    this.yaSePusoEnCamaraLentaSaltando = false;
    stage._transparent = false;
    mostrarLoading();
    //  console.log("setup")
    this.tiempoTranscurrido = 0;
    world = this.createWorld();

    $("#tiempoNivel, #canvasCreateJs").show();
    $("#botonpausa, #botonMenu").hide();
    if (getQueryVariable("firebase") != false)
      $("#botonpausa, #botonMenu").show();
    //  $("#tiempoNivel").removeClass("rojo")
    //  stage.mouseMoveOutside = true;

    //FONDO DE ESTADIO
    console.log("MUNDO: " + this.nivel.mundo + ", NIVEL: " + this.nivel.orden);
    let strCielo = "cielo" + this.nivel.mundo;
    let strBG = "fondo" + this.nivel.mundo;

    cielo = new librerias["fondos"][strCielo]();
    bg = new librerias["fondos"][strBG]();

    bg.y = this.yBg;
    bg.regX = 0;
    bg.x = 0;

    todo = new createjs.Container();
    stage.addChild(todo);

    todo.addChild(cielo);
    cielo.y = -60;
    todo.addChild(bg);
    this.anchoBg = bg.nominalBounds.width;

    contrincantes = [];
    amigos = [];
    cajas = [];

    //nivel es donde van los jugadores y la pelota. Es global
    nivel = new createjs.Container(); //y la fisica de box2

    //los detellos o cosas de la pelota van aca:
    nivel.destellos = new createjs.Container();

    this.ponerONoEstrella();

    cancha = new createjs.Container(); //cancha contiene al piso y al nivel

    this.piso3 = new librerias["pisos"].piso3();
    this.piso2 = new librerias["pisos"].piso2();
    this.piso1 = new librerias["pisos"].piso1();
    this.piso0 = new librerias["pisos"].piso0();

    this.piso0.y = 1080;
    this.piso1.y = 750;
    this.piso2.y = 712;
    this.piso3.y = 715;
    // this.piso1.visible=this.piso2.visible=this.piso3.visible=this.piso0.visible=false

    cancha.addChild(this.piso3);
    cancha.addChild(this.piso2);
    cancha.addChild(this.piso1);

    arco = new Arco(this.nivel.arco, canvasHeight - this.altoPiso);
    /* tribunaAtras=new librerias["fondos"].tribunaAtras();
         tribunaAtras.scaleX=tribunaAtras.scaleY=5;
         arco.cjs.addChild(tribunaAtras)
         tribunaAtras.x=300
         tribunaAtras.y=  -1260*/
    cancha.addChild(nivel); //nivel va dentro de cancha
    cancha.addChild(this.piso0); //despues de nivel va el piso 0, q los tapa

    // cancha.addChild(this.piso0) //despues de nivel va el piso 0, q los tapa
    nivel.addChild(arco.areaGrande);
    nivel.addChild(arco.circuloCentral);
    nivel.addChild(arco.arcoAtrasCJS);

    todo.addChild(cancha); //y cancha dentro de stage

    //estas variables son globales.. por ahora

    // WILLIAN y PELOTA
    pelota = new Pelota(
      this.nivel.pelota.x,
      this.nivel.pelota.y,
      this.nivel.pelota.fuerzaX,
      -this.nivel.pelota.fuerzaY,
      this.nivel.pelota.angularVel,
      this.nivel.pelota.aQueVelocidadDejaDeColisionar
    ); //x,y,fuerzaX, -fuerzaY
    //  pelota2 = new Pelota(this.nivel.pelota.x+100, this.nivel.pelota.y-100, this.nivel.pelota.fuerzaX, -this.nivel.pelota.fuerzaY, this.nivel.pelota.angularVel); //x,y,fuerzaX, -fuerzaY

    arquero = new Arquero(this.nivel.arquero);
    arquero.setupCara();
    this.nivel.willian.camiseta = this.nivel.camisetaWillian;
    willian = new Willian(this.nivel.willian);
    willian.setupCara();

    stage.update();

    if (
      this.nivel.hasOwnProperty("monstruo") &&
      this.nivel.monstruo.hasOwnProperty("x")
    ) {
      monstruo = new Monstruo(this.nivel.monstruo);
      nivel.addChild(monstruo.cjs);
    }

    ///// CAJAS:

    if (Array.isArray(this.nivel.cajas)) {
      for (let i = 0; i < this.nivel.cajas.length; i++) {
        let caja = new Caja(this.nivel.cajas[i]);
        cajas.push(caja);
        caja.i = i;
        nivel.addChild(caja.sombra);
      }
      for (let i = 0; i < cajas.length; i++) {
        nivel.addChild(cajas[i].cjs);
      }
    }

    nivel.addChild(arquero.sombra);
    nivel.addChild(arquero.cjs);

    if (Array.isArray(this.nivel.enemigos)) {
      for (let i = 0; i < this.nivel.enemigos.length; i++) {
        // console.log(this.nivel.enemigos[i].nombre)
        //  this.nivel.enemigos[i].camiseta = this.nivel.camisetaContrincantes;
        let contr = new Contrincante(this.nivel.enemigos[i]);
        contr.setupCara();
        stage.update();

        contrincantes.push(contr);
        nivel.addChild(contr.sombra);
        nivel.addChild(contr.cjs);
      }
    }

    if (Array.isArray(this.nivel.amigos)) {
      for (let i = 0; i < this.nivel.amigos.length; i++) {
        //console.log(this.nivel.amigos[i].nombre);
        //  this.nivel.amigos[i].camiseta = this.nivel.camisetaWillian;
        let amig = new Amigo(this.nivel.amigos[i]);

        amig.setupCara();
        stage.update();

        amigos.push(amig);
        nivel.addChild(amig.sombra);
        nivel.addChild(amig.cjs);
      }
    }

    nivel.addChild(pelota.cjs);
    // nivel.addChild(pelota2.cjs)
    nivel.addChild(pelota.sombra);

    nivel.addChild(willian.sombra);
    nivel.addChild(willian.cjs);

    nivel.addChild(nivel.destellos);

    nivel.addChild(arco.cjs);
    stage.update();

    setTimeout(() => (this.primerosSegundos = false), 5000);

    interfaz = new UI();
    this.objPiso = this.createGround();
    this.objPiso.m_shapeList.m_userData = "piso";
    $("#negro").show();
    createjs.Ticker.removeAllEventListeners();
    createjs.Ticker.addEventListener("tick", (e) => {
      this.step(e);
    });

    this.ponerMapa();

    this.arranque();

    //PONGO RELOJ
    this.reloj = new librerias["lib_original"].reloj(0);
    this.reloj.gotoAndStop(0);
    this.reloj.x = 958;
    this.reloj.y = 80;
    stage.addChild(this.reloj);

    stage.update();
  }

  ponerMapa() {
    let ratioMapa = 20;
    let anchoMapa = 667;
    this.itemMasAtras = 99999;
    if (willian.getPos().x < this.itemMasAtras)
      this.itemMasAtras = willian.getPos().x;
    if (pelota.getPos().x < this.itemMasAtras)
      this.itemMasAtras = pelota.getPos().x;
    for (let i = 0; i < amigos.length; i++) {
      if (amigos[i].getPos().x < this.itemMasAtras)
        this.itemMasAtras = amigos[i].getPos().x;
    }
    for (let i = 0; i < contrincantes.length; i++) {
      if (contrincantes[i].getPos().x < this.itemMasAtras)
        this.itemMasAtras = contrincantes[i].getPos().x;
    }
    this.itemMasAtras -= 300;
    this.anchoTotal = this.nivel.arco.x + 300 - this.itemMasAtras;

    this.escalaMapa = anchoMapa / this.anchoTotal;
    //  console.log("poniendo mapa: "+this.escalaMapa, anchoTotal, anchoMapa);

    this.mapa = new createjs.Container();
    this.mapa.y = 970;

    let escalaItemsMapa = 0.3;

    //LINEA DE FONDO:
    this.lineaMapa = new librerias["lib_original"].lineaBlanca();
    this.lineaMapa.x = 0; //this.itemMasAtras*escalaItemsMapa;
    this.lineaMapa.y = 10;
    this.mapa.addChild(this.lineaMapa);

    ////pongo jugadores, pelota y arco en el mapa:
    for (let i = 0; i < amigos.length; i++) {
      amigos[i].itemMapa = new librerias["lib_original"].itemMapaAmigo();
      amigos[i].itemMapa.scaleX = amigos[i].itemMapa.scaleY = escalaItemsMapa;
      this.mapa.addChild(amigos[i].itemMapa);
    }
    for (let i = 0; i < contrincantes.length; i++) {
      let tipoEnemigo = contrincantes[i].definirItemMapa();

      contrincantes[i].itemMapa = new librerias["lib_original"][
        "itemMapaEnemigo" + tipoEnemigo
      ]();
      contrincantes[i].itemMapa.scaleX = contrincantes[i].itemMapa.scaleY =
        escalaItemsMapa;
      this.mapa.addChild(contrincantes[i].itemMapa);
    }
    willian.itemMapa = new librerias["lib_original"].itemMapaWillian();
    arquero.itemMapa = new librerias["lib_original"].itemMapaArquero();

    //establecer colores segun dificultad del arquero
    setTimeout(() => {
      if (this.nivel.arquero.aQVelDaReboteArriba < 333)
        arquero.itemMapa.arriba.gotoAndStop(0);
      else if (
        this.nivel.arquero.aQVelDaReboteArriba < 666 &&
        this.nivel.arquero.aQVelDaReboteArriba > 333
      )
        arquero.itemMapa.arriba.gotoAndStop(1);
      else if (this.nivel.arquero.aQVelDaReboteArriba > 666)
        arquero.itemMapa.arriba.gotoAndStop(2);

      if (this.nivel.arquero.aQVelDaReboteMedio < 333)
        arquero.itemMapa.medio.gotoAndStop(0);
      else if (
        this.nivel.arquero.aQVelDaReboteMedio < 666 &&
        this.nivel.arquero.aQVelDaReboteMedio > 333
      )
        arquero.itemMapa.medio.gotoAndStop(1);
      else if (this.nivel.arquero.aQVelDaReboteMedio > 666)
        arquero.itemMapa.medio.gotoAndStop(2);

      if (this.nivel.arquero.aQVelDaReboteAbajo < 333)
        arquero.itemMapa.abajo.gotoAndStop(0);
      else if (
        this.nivel.arquero.aQVelDaReboteAbajo < 666 &&
        this.nivel.arquero.aQVelDaReboteAbajo > 333
      )
        arquero.itemMapa.abajo.gotoAndStop(1);
      else if (this.nivel.arquero.aQVelDaReboteAbajo > 666)
        arquero.itemMapa.abajo.gotoAndStop(2);
    }, 500);

    pelota.itemMapa = new librerias["lib_original"].pelota();
    willian.itemMapa.scaleX = willian.itemMapa.scaleY = escalaItemsMapa;
    arquero.itemMapa.scaleX = arquero.itemMapa.scaleY = escalaItemsMapa;
    pelota.itemMapa.scaleX = pelota.itemMapa.scaleY = escalaItemsMapa;

    this.mapa.addChild(willian.itemMapa);
    this.mapa.addChild(arquero.itemMapa);
    this.mapa.addChild(pelota.itemMapa);

    stage.addChild(this.mapa);

    this.mapa.x = canvasWidth / 2 - anchoMapa / 2;

    //le pongo o0.6 de alpha a todos los items del mapa, menos al aruqero q le ponemos 0.8
    for (let i = 0; i < this.mapa.children.length; i++) {
      if (this.mapa.children[i] == arquero.itemMapa)
        this.mapa.children[i].alpha = 0.8;
      else this.mapa.children[i].alpha = 0.6;
    }
    //this.mapa.alpha = 0.6;
  }

  actualizarMapa() {
    //CADA JUGADOR TIENE SU ITEM EN EL MAPA
    let ratioMapa = this.escalaMapa;

    for (let i = 0; i < amigos.length; i++) {
      amigos[i].itemMapa.x =
        (amigos[i].getPos().x - this.itemMasAtras) * ratioMapa;
    }
    for (let i = 0; i < contrincantes.length; i++) {
      contrincantes[i].itemMapa.x =
        (contrincantes[i].getPos().x - this.itemMasAtras) * ratioMapa;
    }
    pelota.itemMapa.x = (pelota.getPos().x - this.itemMasAtras) * ratioMapa;
    pelota.itemMapa.y = pelota.getPos().y / 35 - 10;

    willian.itemMapa.x = (willian.getPos().x - this.itemMasAtras) * ratioMapa;

    arquero.itemMapa.x = (arquero.getPos().x - this.itemMasAtras) * ratioMapa;
  }

  ponerONoEstrella() {
    this.estrella = new librerias["lib_original"].estrellaAnimada(); //new createjs.Bitmap("img/estrella.png");
    nivel.addChild(this.estrella);
    this.estrella.regX = 50;
    this.estrella.regY = 100;
    this.estrella.scaleX = this.estrella.scaleY = 0.5;
    this.estrella.x = this.nivel.estrella.x;
    this.estrella.y = this.nivel.estrella.y;

    let nNivel = buscarNivelPorNumeroDeMundoYOrden(
      this.nivel.mundo - 1,
      this.nivel.orden
    );
    //   console.log(this.nivel.mundo - 1, this.nivel.orden);
    if (usuario.niveles[this.nivel.mundo - 1].hasOwnProperty(nNivel)) {
      if (Array.isArray(usuario.niveles[this.nivel.mundo - 1][nNivel])) {
        if (usuario.niveles[this.nivel.mundo - 1][nNivel][2] == 1) {
          this.estrella.alpha = 0.5;
        }
      }
    }
  }

  posicionarNivelParaElArranque() {
    //ACÁ ESTAN LAS MISMAS COSAS Q HACEN LA FUNCION MOVCAMARA(q), PERO SIN INTERPOLACION
    let dist = Math.floor(Math.abs(willian.getPos().x - pelota.getPos().x));
    this.escala =
      -0.000125 * dist + 0.95 * (0.000355 * pelota.getPos().y + 0.75);
    if (this.escala > this.escalaMax) this.escala = this.escalaMax;
    if (this.escala < this.escalaMin) this.escala = this.escalaMin;

    cancha.scaleX = cancha.scaleY = this.escala;

    this.offsetTarget = -2 * this.nivel.pelota.fuerzaX;
    nivel.x = 960 - willian.getPos().x + this.offsetTarget;

    //mueve la cancha de acuerdo a la escala

    cancha.y = (canvasHeight - canvasHeight * cancha.scaleY) * 0.5;
    cancha.x = fl((canvasWidth - canvasWidth * cancha.scaleX) * 0.5);
    this.moverFondo();
    this.skewLineasArea();
  }
  arranque() {
    //  this.step();
    this.renderJugadores();

    bg.stop(); //el fondo lo freno porq lo manejo aparte en renderBG()

    audioW.startLevel();

    setTimeout(() => {
      this.renderJugadores();
      this.posicionarNivelParaElArranque();

      stage.update();
      this.tiempoTranscurrido = 0;
      this.pauseRender = true;
      setTimeout(ocultarLoading, 500);
    }, 200);

    setTimeout(() => {
      //  this.slowMo()
      // stage.update();
      //   this.renderJugadores()
      //this.movCamara(pelota);
      this.tiempoTranscurrido = 0;
      $("#negro").hide();
      this.pause = false;
      this.pauseRender = false;
      $("#contBotones, button#restart, button#volver").show();
    }, 1000);

    // setTimeout(()=>{this.velocidadNormal()}, 1500);

    audioW.reproducirBgJuego();
  }

  renderJugadores() {
    willian.render();
    arquero.render();

    if (Array.isArray(this.nivel.enemigos)) {
      for (let i = 0; i < this.nivel.enemigos.length; i++) {
        contrincantes[i].render();
      }
    }

    if (Array.isArray(this.nivel.amigos)) {
      for (let i = 0; i < this.nivel.amigos.length; i++) {
        amigos[i].render();
      }
    }

    if (Array.isArray(this.nivel.cajas)) {
      for (let i = 0; i < cajas.length; i++) {
        cajas[i].render();
      }
    }

    if (
      this.nivel.hasOwnProperty("monstruo") &&
      monstruo != null &&
      monstruo != undefined
    ) {
      monstruo.render();
    }
  }

  step() {
    nivel.destellos.removeAllChildren();
    if (
      (willian.tienePelota == 1 || willian.tienePelota == 2) &&
      willian.tiro.angulo > 90 &&
      willian.tiro.angulo < 270 &&
      interfaz.pateando
    ) {
      interfaz.calcularTrayectoria();
    }

    if (Date.now() - interfaz.tiempoMouseDown > 3000) {
      //SI ESTAS EN SLOWMO POR 4 SEGUNDOS...
      //  interfaz.tiempoMaximoDeSlowmo()
    }

    //FPS ES SOLO PARA CALCULAR EL TIEMPO Q PASA ENTRE STEPS
    //CREATEJS VA SIEMPRE A 24, Y LO Q CAMBIA ES BOX2D, CON ESTO:

    this.timeStep = CONST_TIMESTEP / this.fps; //le bajo un toq la velocidad, antes de pasarlo a cjs1 estaba en 4/fps

    if (this.pause == false)
      world.Step(this.timeStep, ITERACIONES_POS, ITERACIONES_VEL);
    //esto fue, lo dejo en 25,25 q son las iteracoin de pos y de vel
    //hay q castRay.. o sea trazar una linea entre la poscion actual de la pelota y su posicion anterior
    //si esa linea choca con algo la pelota deberia chocar

    this.fps = this.fps + (this.FPStarget - this.fps) / 10;

    this.FRAMENUM++;

    this.render();
    if (debug > 0) this.drawWorld(world);

    //  if(this.FRAMENUM%120==0) alert(createjs.Ticker.getMeasuredFPS())
  }

  slowMo() {
    this.timeoutAudioSlomo = setTimeout(() => audioW.repro("slomo"), 300);
    this.camaraLenta = 1;
    this.FPStarget = this.fpsBase * 10;
  }
  velocidadNormal() {
    clearTimeout(this.timeoutAudioSlomo);
    this.fps = this.fpsBase;
    this.FPStarget = this.fpsBase;
    this.camaraLenta = 0;
    stage.removeChild(this.intense);
  }

  drawShape(shape) {
    let context = this.canvasBOX2D.getContext("2d");
    let escalaDebug = 1;
    let margenX = 0;
    let margenY = 0;
    if (getQueryVariable("escalaDebug") != false) {
      escalaDebug = 0.25;
      margenX = canvasWidth / 2;
      margenY = canvasHeight / 2;
    }

    context.strokeStyle = "#ffffff";
    context.beginPath();
    switch (shape.m_type) {
      case b2Shape.e_circleShape:
        {
          var circle = shape;
          var pos = circle.m_position;
          var r = circle.m_radius;
          var segments = 16.0;
          var theta = 0.0;
          var dtheta = (2.0 * Math.PI) / segments;
          // draw circle
          context.moveTo(
            pos.x * escalaDebug + r * escalaDebug + margenX,
            pos.y * escalaDebug + margenY
          );
          for (var i = 0; i < segments; i++) {
            var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
            var v = b2Math.AddVV(pos, d);
            context.lineTo(
              v.x * escalaDebug + margenX,
              v.y * escalaDebug + margenY
            );
            theta += dtheta;
          }
          context.lineTo(
            pos.x * escalaDebug + r * escalaDebug + margenX,
            pos.y * escalaDebug + margenY
          );

          // draw radius
          context.moveTo(
            pos.x * escalaDebug + margenX,
            pos.y * escalaDebug + margenY
          );
          var ax = circle.m_R.col1;
          var pos2 = new b2Vec2(
            pos.x * escalaDebug + r * ax.x * escalaDebug + margenX,
            pos.y * escalaDebug + r * ax.y * escalaDebug + margenY
          );
          context.lineTo(
            pos2.x * escalaDebug + margenX,
            pos2.y * escalaDebug + margenY
          );
        }
        break;
      case b2Shape.e_polyShape:
        {
          var poly = shape;
          var tV = b2Math.AddVV(
            poly.m_position,
            b2Math.b2MulMV(poly.m_R, poly.m_vertices[0])
          );
          context.moveTo(
            tV.x * escalaDebug + margenX,
            tV.y * escalaDebug + margenY
          );
          for (var i = 0; i < poly.m_vertexCount; i++) {
            //   console.log(poly.m_vertices[i])
            var v = b2Math.AddVV(
              poly.m_position,
              b2Math.b2MulMV(poly.m_R, poly.m_vertices[i])
            );
            context.lineTo(
              v.x * escalaDebug + margenX,
              v.y * escalaDebug + margenY
            );
          }
          context.lineTo(
            tV.x * escalaDebug + margenX,
            tV.y * escalaDebug + margenY
          );
        }
        break;
    }
    context.stroke();
  }

  drawWorld(world) {
    // console.log("draw world!!")
    ctx = this.canvasBOX2D.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    /* for (var j = world.m_jointList; j; j = j.m_next) {
             drawJoint(j, context);
         }*/
    for (var b = world.m_bodyList; b; b = b.m_next) {
      for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
        this.drawShape(s);
      }
    }
  }

  createWorld() {
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-canvasWidth * 1.5, -canvasHeight * 4); //4 pantallas de alto tiene el mundo
    //el mundo va desde -1920,-4320 hasta el archo+3840, 2160.. bastante changui
    worldAABB.maxVertex.Set(this.nivel.arco.x + canvasWidth, canvasHeight);

    this.gravity = new b2Vec2(0, 100);
    var doSleep = false;
    world = new b2World(worldAABB, this.gravity, doSleep);

    let a = new b2CollisionFilter();
    a.ShouldCollide = this.filtroColisiones;

    world.SetFilter(a);

    //estas son las paredes
    //createBox(world, 0, 125, 10, 250);
    //createBox(world, 500, 125, 10, 250);

    return world;
  }

  filtroColisiones(shape1, shape2) {
    if (this.ganaste || this.perdiste) return true;

    let s1, s2;

    ///me fijo que es shape1
    if (shape1.m_userData instanceof Pelota) s1 = "pelota";
    else if (shape1.m_userData instanceof Willian) s1 = "willian";
    else if (shape1.m_userData instanceof Contrincante) s1 = "contrincante";
    else if (shape1.m_userData instanceof Arquero) s1 = "arquero";
    else if (shape1.m_userData == "piso") s1 = "piso";
    else if (shape1.m_userData instanceof Amigo) s1 = "amigo";
    else if (shape1.m_userData instanceof Arco) s1 = "arco";
    else if (shape1.m_userData == "arcoAtras") s1 = "arcoAtras";
    else if (shape1.m_userData instanceof Caja) s1 = "caja";
    else if (shape1.m_userData instanceof Monstruo) s1 = "monstruo";

    //me fijo que es shape2
    if (shape2.m_userData instanceof Pelota) s2 = "pelota";
    else if (shape2.m_userData instanceof Willian) s2 = "willian";
    else if (shape2.m_userData instanceof Contrincante) s2 = "contrincante";
    else if (shape2.m_userData instanceof Arquero) s2 = "arquero";
    else if (shape2.m_userData == "piso") s2 = "piso";
    else if (shape2.m_userData instanceof Amigo) s2 = "amigo";
    else if (shape2.m_userData instanceof Arco) s2 = "arco";
    else if (shape2.m_userData == "arcoAtras") s2 = "arcoAtras";
    else if (shape2.m_userData instanceof Caja) s2 = "caja";
    else if (shape2.m_userData instanceof Monstruo) s2 = "monstruo";

    if (
      (shape1.m_userData instanceof Jugador && s2 == "piso") ||
      (shape2.m_userData instanceof Jugador && s1 == "piso")
    ) {
      if (shape1.m_userData instanceof Jugador) {
        return shape1.m_userData.colisionPiso();
      } else {
        return shape2.m_userData.colisionPiso();
      }
    }

    if ((s1 == "caja" && s2 == "piso") || (s2 == "piso" && s1 == "caja")) {
      if (shape1.m_userData instanceof Caja)
        shape1.m_userData.eventoColisionPiso();
      else if (shape2.m_userData instanceof Caja)
        shape2.m_userData.eventoColisionPiso();
      return true;
    }

    if (
      (s1 == "arquero" && s2 == "caja") ||
      (s2 == "arquero" && s1 == "caja")
    ) {
      return false;
    }

    if (
      (shape1.m_userData instanceof Jugador && s2 == "caja") ||
      (shape2.m_userData instanceof Jugador && s1 == "caja")
    ) {
      if (shape1.m_userData instanceof Jugador) {
        return shape1.m_userData.colisionCaja(shape2.m_userData);
      } else {
        return shape2.m_userData.colisionCaja(shape1.m_userData);
      }
    }

    if (s1 == "pelota" || s2 == "pelota") {
      //CONTRA CUALQUIER COSA Q PEGA LA PELOTA REDUCE SU VELOCIDAD

      pelota.cuerpo.m_linearVelocity.x *= 0.86;
      pelota.cuerpo.m_linearVelocity.y *= 0.9;

      if (
        s1 != "piso" &&
        s2 != "piso" &&
        s1 != "monstruo" &&
        s2 != "monstruo"
      ) {
        if (
          pelota.noColisionaConNada ||
          Math.abs(pelota.cuerpo.m_linearVelocity.x) >
            pelota.aQueVelocidadDejaDeColisionar
        )
          return false;
      } else {
        if (s1 == "piso" || s2 == "piso") {
          //REBOTA CONTRA EL PISO
          pelota.eventoRebotaContraElPiso();
          arquero.colisionPelotaPiso();
          this.ultimoRebote = "piso";
        } else {
          //PEGA CONTRA EL MONSTRUO
        }
      }
      ///debug
    }

    if ((s1 == "caja" && s2 == "pelota") || (s1 == "pelota" && s2 == "caja")) {
      let caj;
      if (s2 == "caja") {
        caj = shape2.m_userData;
      } else {
        caj = shape1.m_userData;
      }
      //  console.log(caj)
      return caj.eventoColisionConPelota();
    }

    if (s1 == "caja" && s2 == "caja") {
      let caj1 = shape1.m_userData;
      let caj2 = shape2.m_userData;
      caj1.eventoColisionConCaja(caj2);
      caj2.eventoColisionConCaja(caj1);

      //  console.log(caj)
      return true;
    }

    if (
      (s1 == "monstruo" && s2 == "pelota") ||
      (s1 == "pelota" && s2 == "monstruo")
    ) {
      let m;
      if (s2 == "monstruo") {
        m = shape2.m_userData;
      } else {
        m = shape1.m_userData;
      }
      return m.eventoColisionConPelota();
    }

    if (
      (s1 == "willian" && s2 == "pelota") ||
      (s1 == "pelota" && s2 == "willian")
    ) {
      //  console.log("willian -> pelota: " + willian.colisionaConPelota)

      return willian.eventoColisionConPelota();
      /*
            MODO DIFICIL: PONER ESTO SIEMPRE EN FALSE.
            OBLIGA A SER SUPER PRECISO
            */
    } else if (
      (s1 == "arquero" && s2 == "pelota") ||
      (s1 == "pelota" && s2 == "arquero")
    ) {
      //console.log("arquero -> pelota: "+  arquero.colisionaConPelota)
      return arquero.eventoColisionConPelota(); //arquero.colisionaConPelota;

      // WILLIAN CHOCA CON UN CONTRINCANTE
    } else if (
      (s1 == "willian" && s2 == "contrincante") ||
      (s1 == "contrincante" && s2 == "willian")
    ) {
      willian.pasaAContrincante();
      return false; //|| this.perdiste || this.ganaste;
    } else if (s1 == "contrincante" && s2 == "contrincante") {
      return false; //|| this.perdiste || this.ganaste;
    } else if (s1 == "amigo" && s2 == "amigo") {
      return false; //|| this.perdiste || this.ganaste;
    } else if (
      (s1 == "willian" && s2 == "arquero") ||
      (s1 == "arquero" && s2 == "willian")
    ) {
      return false; //|| this.perdiste || this.ganaste;
    } else if (
      (s1 == "contrincante" && s2 == "arquero") ||
      (s1 == "arquero" && s2 == "contrincante")
    ) {
      return false; // || this.perdiste || this.ganaste;
    } else if (
      (s1 == "amigo" && s2 == "willian") ||
      (s1 == "willian" && s2 == "amigo")
    ) {
      return false; //|| this.perdiste || this.ganaste;
    } else if (
      (s1 == "amigo" && s2 == "contrincante") ||
      (s1 == "contrincante" && s2 == "amigo")
    ) {
      return false; //|| this.perdiste || this.ganaste;
    } else if (
      (s1 == "amigo" && s2 == "arquero") ||
      (s1 == "arquero" && s2 == "amigo")
    ) {
      return false; // || this.perdiste || this.ganaste;
    } else if (
      (s1 == "amigo" && s2 == "pelota") ||
      (s1 == "pelota" && s2 == "amigo")
    ) {
      let amigo;
      if (s2 == "amigo") {
        amigo = shape2.m_userData;
      } else {
        amigo = shape1.m_userData;
      }
      return amigo.eventoColisionConPelota();
    } else if (
      (s1 == "pelota" && s2 == "contrincante") ||
      (s1 == "contrincante" && s2 == "pelota")
    ) {
      // PELOTA CHOCA CON UN CONTRINCANTE
      let contrincante;
      if (s2 == "contrincante") {
        contrincante = shape2.m_userData;
      } else {
        contrincante = shape1.m_userData;
      }
      return contrincante.eventoColisionConPelota();
    } else if (s1 == "piso" || s2 == "piso") {
      //   console.log("piso!!")
      return true;
    } else if (
      (s1 == "arco" && s2 == "pelota") ||
      (s1 == "pelota" && s2 == "arco")
    ) {
      // Cuando pega en el arco, me fijo a qué distancia está la pelota del travesaño
      if (arco.distanciaDeLaPelotaAlTravesanio() < 100) {
        usuario.meritos.registrarTiroAlTravesanio();
        audioW.reproducirPalo();
        this.ultimoRebote = "travesanio";
      }
      return true;
    } else if (
      (s1 == "arcoAtras" && s2 == "pelota") ||
      (s2 == "arcoAtras" && s1 == "pelota")
    ) {
      arco.moverRed();
      return true;
    } else {
      return true;
    }
  } //colisiones
  volverALaSeleccionDeNiveles() {
    audioW.frenarTodoLosAudiosDefaultDeLosMonstruos();

    $(".jsoneditor.jsoneditor-mode-tree").remove();
    stage.removeAllChildren();
    createjs.Ticker.removeAllEventListeners();

    audioW.reproducirMusica();
    $("#contBotones").hide();

    //  try{delete juegoW; }catch(e){}

    $("video").show();
    $("canvas,  #tutorial").hide();

    pantallaSeleccionNiveles = new SeleccionNiveles(juegoW.nivel.mundo);
    juegoW.sacar();
  }

  sacar() {
    editor.destroy();
    traerComp.quitar(this.nivel.camisetaWillian);
    traerComp.quitar(this.nivel.camisetaContrincantes);

    $("#tutorial").hide();
    $(".jsoneditor.jsoneditor-mode-tree").remove();
    stage.removeAllChildren();
    createjs.Ticker.removeAllEventListeners();
    //mainMenu = new MainMenu();
    document.getElementById("restart").style.display = "none";
    document.getElementById("volver").style.display = "none";
    audioW.frenar("bgJuego");
    juegoW = {};
    //  try{delete juegoW; }catch(e){}

    cantJuegos--;
  }

  createGround() {
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(this.nivel.arco.x + canvasWidth, this.altoPiso); //ancho y alto del piso
    groundSd.restitution = 0; //rebotabilidad del piso
    groundSd.friction = 0.65;
    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundSd.m_userData = "piso";
    groundBd.m_userData = "piso";
    groundBd.allowSleep = false;
    groundBd.position.Set(-100, canvasHeight - this.altoPiso);
    return world.CreateBody(groundBd);
  }
  siguienteNivel() {
    audioW.frenarTodoLosAudiosDefaultDeLosMonstruos();

    let a;
    if (this.nivel.orden == 9) {
      //CUANDO GANAS EL NIVEL 9 DE UN MUNDO TE VUELVE A LA SELECCION DE MUNDOS
      this.sacar();
      pantallaSeleccionNiveles.mundo++;
      pantallaSeleccionMundos.mostrar(pantallaSeleccionNiveles.mundo);
    } else if (this.nivel.orden.toString().substr(0, 4) == "loco") {
      this.volverALaSeleccionDeNiveles();
    } else {
      a = this.nivel.orden + 1;
      pantallaSeleccionNiveles.arrancarNivel(a);
    }
  }

  ponerListenersABotonesGanarPerder() {
    // console.log("### poner listeners", this.ganarPerder);

    //EN COMPU MOUSEDOWN ANDA BIEN
    this.ganarPerder.botSiguiente.removeAllEventListeners();
    this.ganarPerder.botMenu.removeAllEventListeners();
    this.ganarPerder.botRestart.removeAllEventListeners();

    this.ganarPerder.botMenu.addEventListener(
      "click",
      juegoW.volverALaSeleccionDeNiveles
    );
    if (this.ganaste) {
      if (mobileCheck()) {
        this.ganarPerder.botSiguiente.addEventListener("click", () =>
          this.siguienteNivel()
        );
      } else {
        this.ganarPerder.botSiguiente.addEventListener("mousedown", () =>
          this.siguienteNivel()
        );
      }
    } else {
      if (mobileCheck()) {
        this.ganarPerder.botSiguiente.addEventListener("click", () =>
          this.restart()
        );
      } else {
        this.ganarPerder.botSiguiente.addEventListener("mousedown", () =>
          this.restart()
        );
      }
    }

    if (mobileCheck()) {
      this.ganarPerder.botRestart.addEventListener("click", () =>
        this.restart()
      );
    } else {
      this.ganarPerder.botRestart.addEventListener("mousedown", () =>
        this.restart()
      );
    }
  }

  agregarCajas(inicioX, inicioY, c, altoFila) {
    // niveles["locos"][0][0].cajas=[]
    // let inicioX = -90;
    if (altoFila == undefined || altoFila == null) altoFila = 80;
    if (inicioY == undefined || inicioY == null) inicioY = 850;
    let index = 0;
    let cajaJson = {
      x: 90,
      y: 650,
      width: 50,
      height: 40,
      rotation: 0,
      velAngular: 0,
      fixed: false,
    };
    let caja;
    let dif = c * 5;
    let cajass = [];
    let arrCajasParaNivel = [];
    for (let i = c; i >= 0; i--) {
      if (i % 2 == 1) {
        cajaJson.rotation = Math.floor(Math.random() * 2) * 180;
        cajaJson.width = 50 + (dif / c) * i;
        cajaJson.x = inicioX;
        cajaJson.y = inicioY;
        cajass.push(new Caja(cajaJson));
        arrCajasParaNivel.push(JSON.parse(JSON.stringify(cajaJson)));
        nivel.addChild(cajass[index].cjs);
        index++;
        cajaJson.x = inicioX + 120 + (dif / c) * i * 1.1;
        cajaJson.y = inicioY;
        cajass.push(new Caja(cajaJson));
        arrCajasParaNivel.push(JSON.parse(JSON.stringify(cajaJson)));
        nivel.addChild(cajass[index].cjs);
        index++;
        inicioY -= altoFila;
      } else {
        cajaJson.width = 33 + ((dif / c) * i) / 1.3;
        cajaJson.x = inicioX - 20 - (dif / c) * i;
        cajaJson.y = inicioY;
        cajass.push(new Caja(cajaJson));
        arrCajasParaNivel.push(JSON.parse(JSON.stringify(cajaJson)));
        nivel.addChild(cajass[index].cjs);
        index++;

        cajaJson.x = inicioX + 50 + (dif / c) * i;
        cajaJson.y = inicioY;
        cajass.push(new Caja(cajaJson));
        arrCajasParaNivel.push(JSON.parse(JSON.stringify(cajaJson)));
        nivel.addChild(cajass[index].cjs);
        index++;

        cajaJson.x = inicioX + 170 + (dif / c) * i * 1.22;
        cajaJson.y = inicioY;
        cajass.push(new Caja(cajaJson));
        arrCajasParaNivel.push(JSON.parse(JSON.stringify(cajaJson)));
        nivel.addChild(cajass[index].cjs);
        index++;
        inicioY -= altoFila;
      }
    }

    return arrCajasParaNivel;
  }
}
