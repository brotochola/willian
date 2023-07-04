

class Arquero extends Jugador {










  constructor(w) {



    let cuerpo = new librerias["arquero"].arquero();


    super(w, cuerpo);


    this.cjs.padre = this;
    this.cjs.scaleX = 0.75
    this.cjs.scaleY = 0.75


    this.pegues = {
      'revienta': new b2Vec2(-650, -100),
      'lePegaAlRas': new b2Vec2(-500, 0),
      'lePegaParaArriba': new b2Vec2(-100, -500),
      'pegarleDespacitoParaAdelante': new b2Vec2(-100, -50),
      'lePegaParaAtrasDespacio': new b2Vec2(100, -300)
    }

    this.vectorCorriendo = new b2Vec2(-w.velocidadMax, 0)
    this.vectorCaminando = new b2Vec2(-50, 0)
    this.vectorTrotando = new b2Vec2(-100, 0)
    this.vectorCaminandoParaAtras = new b2Vec2(150, 0)
    this.saltoMax = w.saltoMax;
    this.saltaAnteSombrerito = w.saltaAnteSombrerito;

    this.estaDentroDelArea = true;
    this.posicionInicialX = this.x;

    this.maxAlturaAtajaAbajo = 830;
    this.maxAlturaAtajaMedio = 770;
    this.maxPosicionX = arco.x - 100;

    this.alturaParaPegarleConLosPies = 770;
    this.alturaParaSaltarYCabecear = this.alturaParaCabecearSinSaltar - this.propiedadesIniciales.saltoMax;
    this.alturaParaAtajarMedio = this.alturaParaCabecearSinSaltar + (this.alturaParaPegarleConLosPies - this.alturaParaCabecearSinSaltar) * 2;

    this.distanciaMinimaParaPegarle = 100 //sobreescribo la de la clase jugador

    this.timeoutInvisibilizarPelota; // Guardo el timeout cuando se invisibiliza la pelota. Porque si el usuario hace restart antes de que se invisibilice, lo hace en la siguiente jugada

    /* var destello = new librerias["lib_original"].destello();
     destello.x = this.caja.m_position.x;
     destello.y = this.maxAlturaAtajaAbajo;
     console.log(destello.x,destello.y)
     nivel.addChild(destello); */

    this.estados = ["idle", "patearonAlArco", "vieneWillianConLaPelota", "atajando", "volviendoAlArco", "buscandoPelotaEnElArea", "agarroLaPelota", "saltando", "saleCorriendoABuscarla", "leAcabaDePegar"];
    this.estado = 0;
    this.puedeAgarrarla = false;
    this.puedeAgarrarlaArriba = false;

    this.timeoutParaSaltar;
    this.lePegoWillianDeLejos = false;

  } //constructor

  evaluarCosasYCambiarDeEstado() {

    if (juegoW.perdiste || juegoW.ganaste) return;

    if ((this.estado == 0) || (this.estado == 1)) {
      //let distanciaAlArco = arco.x - pelota.cuerpo.m_position.x;
      let distanciaAlArco = this.caja.m_position.x - pelota.cuerpo.m_position.x;

      // Queda muerta dentro del area
      if (Math.abs(pelota.cuerpo.m_linearVelocity.x) < 50) {
        if (pelota.estaDentroDelArea) {
            this.estado = 5;
        }
        else {
          if ((pelota.cuerpo.m_position.x + 1200 < this.caja.m_position.x) && (willian.tienePelota == 0)) {
            if ((willian.getPos().x + 3400 < pelota.cuerpo.m_position.x) && (pelota.cuerpo.GetLinearVelocity().x < 50)) {
              let amigoEntreWillianYArquero = false;
              for (let i = 0; i < amigos.length; i++)
              {
                if (amigos[i].getPos().x > willian.getPos().x)
                {
                  amigoEntreWillianYArquero = true;
                }
              }
              if (!amigoEntreWillianYArquero) this.estado = 8;
            }
          }
        }
      }
    }

    // Patearon al arco
    if (this.estado == 1) {
      //let distanciaAlArco = arco.x - pelota.cuerpo.m_position.x;
      let distanciaAlArco = this.caja.m_position.x - pelota.cuerpo.m_position.x;

      let alturaMaxima = Math.pow(pelota.cuerpo.GetLinearVelocity().y, 2) / (2 * juegoW.gravity.y);
      let tiempoEnCaer = Math.sqrt(2 * (alturaMaxima - this.alturaParaSaltarYCabecear) / juegoW.gravity.y);

      // Teniendo la distancia al arco y la velocidad, calculo el tiempo que va a demorar en llegar al arco
      let tiempoEnLlegarAlArco = distanciaAlArco / pelota.cuerpo.GetLinearVelocity().x;
      // Y teniendo ese tiempo, calculo la posición en Y de la pelota en el mismo
      let posicionEnYPelotaAlLlegarArco = pelota.getPosFutura(tiempoEnLlegarAlArco).y;

      //    console.log("la pelota cae en x: "+pelota.getPosFutura(tiempoEnLlegarAlArco).x);

      // Va derecho al arco y por arriba del arquero
      if (posicionEnYPelotaAlLlegarArco < this.alturaParaCabecearSinSaltar - 100) {
        if (posicionEnYPelotaAlLlegarArco >= arco.alturaTravesanio - 100) {
          this.estado = 0;
          //  this.vectorSalto.y = this.cuantoTieneQueSaltar(posicionEnYPelotaAlLlegarArco);

          let duracionAnimacionSalto = 1.4;

             //   alert("va a ser gol, saltar en " + (tiempoEnLlegarAlArco - duracionAnimacionSalto) * 0.25 );

                // Esperar el tiempo necesario y saltar para ver si atajo
            //    alert("tiempo en caer: " + tiempoEnCaer + " - tiempo en llegar al arco: " + tiempoEnLlegarAlArco);
               /* if (tiempoEnCaer > tiempoEnLlegarAlArco)
                {
                  alert("saltar en : " + (tiempoEnCaer - duracionAnimacionSalto).toString() );
                  this.timeoutParaSaltar = setTimeout(() => { this.saltarParaAtajar() },  (tiempoEnLlegarAlArco + tiempoEnCaer - duracionAnimacionSalto) * 0.33 * 1000);
                }
                else*/ 
                


                ///////////////////// ESTO HAY Q REVERLO! 12/12/19
               /* this.timeoutParaSaltar = setTimeout(() => { 
                  this.saltarParaAtajar() 
                }, (tiempoEnLlegarAlArco - duracionAnimacionSalto) * 0.25 * 1000); */

          // console.log("pos pelota Y: " + pelota.cuerpo.m_position.y);
          // debugger;

          if (pelota.dondeVaACaerLaPelota > this.getPos().x) {
            if(pelota.dondeVaACaerLaPelota<arco.x - 80){
             
         //     alert("la pelota va a caer en: "+pelota.dondeVaACaerLaPelota);
              this.maxPosicionX=pelota.dondeVaACaerLaPelota
             // this.cambiarAccion("vuelveALaLinea");
            }
          }
        }
      }
      else {
        if (pelota.dondeVaACaerLaPelota == undefined) return;
        // Va a rebotar antes del arco o va derecho al cuerpo del arquero, calculo donde cae y el arquero va a ese punto
        let distanciaPelotaFuturaArquero = Math.abs(pelota.dondeVaACaerLaPelota - this.getPos().x)
        //si el arquero esta a la derecha de donde va a caer la pelota:
        if (pelota.dondeVaACaerLaPelota < this.getPos().x) {
          if (pelota.dondeVaACaerLaPelota > arco.limiteArea) {
            if (arco.x > pelota.dondeVaACaerLaPelota) {
              if (distanciaPelotaFuturaArquero > -this.vectorCorriendo.x) {
                this.cambiarAccion("corriendo");
              }
            }
          }
          //y su distancia a ese punto es al menos de "un paso"

        }
        //si llego:
        if (distanciaPelotaFuturaArquero < -this.vectorCorriendo.x) {
          //se para a esperar la pelota
          this.cambiarAccion("parado")
        }
      }

      if (pelota.dondeVaACaerLaPelota > this.getPos().x) {
        this.cambiarAccion("vuelveALaLinea");
      }
    }

    //SI NO VIO A WILLIAN Y ESTA A DISTANCIA DE VERLO, LO VE
  //  if (this.estado == 0) {
      if (this.distanciaALaPelota() < this.propiedadesIniciales.aQueDistanciaVeAWillian) {
        if (willian.tienePelota > 0 && willian.tienePelota < 4) {
          if (willian.accion == "corriendo" || willian.accion == "trotando" || willian.accion == "caminando") {
            if (pelota.cuerpo.m_position.x < this.caja.m_position.x) {
              this.estado = 2; //estado q vio a willian q viene con la pelota.                
            }
          }
        }
      }
   // }

    // No está atajando
    if ((this.estado == 0) || (this.estado == 1) || (this.estado == 2) 
      || (this.estado == 4))  {

      // Si la pelota entra al área y no la tiene, la va a buscar
      if (pelota.estaDentroDelArea && (this.tienePelota == -1) && (this.estado != 4) && (this.estado != 1) && (this.estado != 7) && (this.y <= this.caja.m_position.y) && (pelota.cuerpo.m_position.y > this.alturaParaCabecearSinSaltar)) {
        this.estado = 5;
      }
    }

    // console.log(this.estado);

  } //cambio de estado


  moverseSegunAcciones() {

    //contrincantes corriendo solo, segun el nivel
    //aca hay q evaluar segun la AI qué es lo q va a hcer
    if (this.accion == "pateando")
    {
      this.caja.m_linearVelocity.x = 0;
    }

    if (this.FRAMENUM % 10 == 0) {
      if (this.accion == "corriendo" && this.estaDentroDelArea) this.caja.SetLinearVelocity(this.vectorCorriendo);
      //else if (this.accion == "trotando") this.caja.SetLinearVelocity(this.vectorMovTroteWillian);
      else if (this.accion == "caminando") this.caja.SetLinearVelocity(this.vectorCaminando);
      else if (this.accion == "esperaEnElAreaChica") {
        // alert("vuelve a la linea!!!!")
        if (this.caja.m_position.x < juegoW.nivel.arco.x - 500) {
          this.caja.SetLinearVelocity(this.vectorCaminandoParaAtras);
        }
        else this.frenar();
      }
      else if (this.accion == "esperaEnElAreaGrande") {
        //   alert("vuelve a la linea!!!!")
        if (this.caja.m_position.x < juegoW.nivel.arco.x - 800) {
          this.caja.SetLinearVelocity(this.vectorCaminandoParaAtras);
        }
        else this.frenar();
      }
      else if (this.accion == "vuelveALaLinea") {

        // alert("vuelve a la linea!!!!")
        if (this.caja.m_position.x < this.maxPosicionX) {
          this.caja.SetLinearVelocity(this.vectorCaminandoParaAtras);
        }
        else {
          this.maxPosicionX=arco.x-100
          this.frenar();
          }
      }
      else if ((this.accion == "frenoSinPelota") || (this.accion == "frenoConPelota")) this.caja.SetLinearVelocity(new b2Vec2(0, 0));
      else if ((this.accion == "atajoAbajo") || (this.accion == "atajaMedio") || (this.accion == "atajaArriba") ||
        (this.accion == "atajoAbajoConPelota") || (this.accion == "atajaMedioConPelota") || (this.accion == "aterrizarConPelota") || (this.accion == "suspendidoEnElAireConPelota")) { this.caja.SetLinearVelocity(new b2Vec2(0, this.caja.GetLinearVelocity().y)) }
      else if (this.accion == "parado") { }

    }
  }

  segunEstadoHacerCosas() {
    if (this.estado == 9)
    {
      if (this.caja.m_position.x >= this.maxPosicionX) {
        this.frenar();
        this.estado = 0;
      }
      else {
        this.cambiarAccion("vuelveALaLinea");
      }
    }

    let seLaQuita = false;
    if (juegoW.perdiste || juegoW.ganaste) {
      if (this.accion == "corriendo") {
        this.cambiarAccion("frenoSinPelota");
      }
      return;
    }

    if (this.estado == 0) {
      this.chequearSiTieneLaPelotaCerca();
    }

    // PATEARON AL ARCO
    if ((this.estado == 1) || (this.estado == 7)) {
      this.chequearSiTieneLaPelotaCerca();
    }
    else if (this.estado == 2 /*|| this.estado==1 || this.estado==0*/) {
      //SE ACERCA WILLIAN
      this.cambiarAccion(this.propiedadesIniciales.accionCuandoVeAWillian);
      if (this.tienePelota == 1) {
        willian.colisionaConPelota = false;
        setTimeout(() => { willian.colisionaConPelota = true; }, 1000);
        if (!this.estaDentroDelArea) {
          if (this.propiedadesIniciales.flanqueableConGambeta360 == true) {
            if (willian.accion != "gambeta360") {
              pelota.pegarle(this.pegues["revienta"].x, this.pegues["revienta"].y, this);
              seLaQuita = true;
              this.levantarCejas(600)
              //cara de preocupado iria aca en realidad
            }
          }
          else {
            pelota.pegarle(this.pegues["revienta"].x, this.pegues["revienta"].y, this);
            seLaQuita = true;
            this.levantarCejas(600)
            //cara de preocupado iria aca en realidad
          }
        }
        else {
          this.cambiarAccion(this.propiedadesIniciales.accionAnteWillian);
          seLaQuita = true;
        }

        if (seLaQuita == true) {
          //ACA LA REVIENTA!!! 7.2.20
          this.cambiarAccion("pateando", 8);
         // alert(1)
          pelota.pegarle(this.propiedadesIniciales.fuerzaX, this.propiedadesIniciales.fuerzaY, this);
          willian.colisionPelotaPiso=false
          setTimeout(()=>{willian.colisionPelotaPiso=true},500)
          this.estado = 0;
         //pelota.noColisionarPorTresSegundos();
         // juegoW.seFueLaPelota();
        }
      }
    }

    else if (this.estado == 4) {
      // Llegó a la posición inicial
      if (this.caja.m_position.x >= this.maxPosicionX) {
        this.frenar();
        this.estado = 0;
      }
      else {
        this.cambiarAccion("vuelveALaLinea");
      }
      if ((this.propiedadesIniciales.accionAnteWillian == "reventarla") && (this.tienePelota == 1))
      {
        this.cambiarAccion("reventarla");
      }
      else this.chequearSiTieneLaPelotaCerca();
    }

    else if (this.estado == 5) {
      //let distanciaAlArco = arco.x - pelota.cuerpo.m_position.x;
      let distanciaAlArco = this.caja.m_position.x - pelota.cuerpo.m_position.x;

      // Teniendo la distancia al arco y la velocidad, calculo el tiempo que va a demorar en llegar al arco
      let tiempoEnLlegarAlArco = distanciaAlArco / pelota.cuerpo.GetLinearVelocity().x;
      // Y teniendo ese tiempo, calculo la posición en Y de la pelota en el mismo
      let posicionEnYPelotaAlLlegarArco = pelota.getPosFutura(tiempoEnLlegarAlArco).y;

      if (pelota.cuerpo.m_position.y < 500) {
        if (posicionEnYPelotaAlLlegarArco > 500) {
          this.estado = 4;
        }
      }
      else {
        
          if (pelota.cuerpo.m_position.x < this.caja.m_position.x) {
            if (pelota.dondeVaACaerLaPelota < this.caja.m_position.x) {

              if (pelota.cuerpo.m_position.x < this.caja.m_position.x - 100)
              {
                this.cambiarAccion("corriendo");
              }
              else 
              {
                this.llegaHastaLaPelota();
              }
            }
          }
          else this.estado = 4;
      }
      if ((this.propiedadesIniciales.accionAnteWillian == "reventarla") && (this.tienePelota == 1))
      {
        this.cambiarAccion("reventarla");
      }
      else this.chequearSiTieneLaPelotaCerca();
    }

    else if (this.estado == 8) {
      if (this.accion != "corriendo") {
        this.cambiarAccion("corriendo");
      }
    }
  }

  terminoDeAtajar() {
    // console.log("###  TEMRINO DE ATAJAR")
    this.stop(); //ESTO ES UNA ATADA CON ALAMBRE PQ NO ANDAN EL STOP. viene de claseJugador
  }

  saltarParaAtajar() {
    audioW.reproducirSonidoSaltar()

    // Si la pelota está por delante del arquero
    if (pelota.cuerpo.m_position.x < this.caja.m_position.x) {
      if ((willian.tiroSombrerito == true) && !this.saltaAnteSombrerito) {
        return;
      }

      this.cambiarAccion("atajaArriba", 2);
      this.estado = 7;

      setTimeout(() => { this.estado = 0 }, 1000);
    }
  }

  chequearSiTieneLaPelotaCerca() {
    
    if(this.distanciaLinealALaPelota()>1200) return;
    if(this.tiempoEnLlegarle<0 || this.tiempoEnLlegarle>0.5) return;
    //if (this.tiempoEnLlegarle>0.5) return;

    let tiempo=this.tiempoEnLlegarle//0.133





    let posFuturaPelota = pelota.getPosFutura(tiempo);

    let velocPelotaX = pelota.cuerpo.GetLinearVelocity().x;

    let atajaAbajo = posFuturaPelota.y > this.maxAlturaAtajaAbajo;
    let atajaMedio = posFuturaPelota.y > this.maxAlturaAtajaMedio && posFuturaPelota.y < this.maxAlturaAtajaAbajo;
    //console.log(posFuturaPelota.y, this.maxAlturaAtajaAbajo, this.maxAlturaAtajaMedio)
    let vieneMuyFuerte = false;

    console.log("Vel pelota: " + pelota.cuerpo.GetLinearVelocity().x);

    if (this.lePegoWillianDeLejos)
    {
      console.log("WILLIAN LE PEGÓ DE LEJOS");
    }

      if (atajaAbajo) {
        console.log("Ataja abajo, max: " + this.propiedadesIniciales.aQVelDaReboteAbajo);
        if ((velocPelotaX > this.propiedadesIniciales.aQVelDaReboteAbajo) && (!this.lePegoWillianDeLejos)) vieneMuyFuerte = true;
      }      else if (atajaMedio) {
            console.log("Ataja al medio, max: " + this.propiedadesIniciales.aQVelDaReboteMedio);
        if ((velocPelotaX > this.propiedadesIniciales.aQVelDaReboteMedio) && (!this.lePegoWillianDeLejos)) vieneMuyFuerte = true;
      }      else {//ataja arriba
            console.log("Ataja arriba, max: " + this.propiedadesIniciales.aQVelDaReboteArriba);
        if ((velocPelotaX > this.propiedadesIniciales.aQVelDaReboteArriba) && (!this.lePegoWillianDeLejos)) vieneMuyFuerte = true;
      }
      ////////////
      if (!vieneMuyFuerte) {
        console.log("puede atajar o dar rebote")
        if (this.estaDentroDelArea) {
          // console.log("-------"+pelota.cuerpo.m_linearVelocity.x)
          // Verifico si tiene la pelota cerca y ataja por "reflejos"
          if (((posFuturaPelota.x >= arquero.caja.m_position.x - 80) && (posFuturaPelota.x <= arquero.caja.m_position.x + 80) && (posFuturaPelota.y >= this.y - this.height - this.saltoMax)) ||
            // O bien la pelota está dentro del área y el arquero la está buscando
            ((this.estado == 5) || (this.estado == 1) || (this.estado == 7) || (this.estado == 4)) && ((this.tienePelota == 1) || (this.tienePelota == 2))) {
            juegoW.ultimoEnTocarla = this;

            this.estado = 3;
            //this.cambiarAccion("frenoConPelota");
            if (atajaAbajo) {
             

              // Chequeo si la puede agarrar abajo, sino directamente rebota
              if (velocPelotaX < this.propiedadesIniciales.aQVelLaAtajaAbajo) {
                this.cambiarAccion("atajoAbajo");
                  setTimeout(() => { this.cambiarAccion("atajoAbajoConPelota", 4); this.invisibilizarPelotaDelJuego(); }, 20);
                  console.log("puede agarrarla abajo")
              }
              else 
              {
                  // REBOTE ABAJO
                this.cambiarAccion("pateando",5);
                let n=60/velocPelotaX*1000
              
                if(n<0) n=0
                else if(n>200) n=200

               
                  setTimeout(()=>{                    
                    if(this.tieneLaPelota()==1) pelota.pegarle(this.propiedadesIniciales.fuerzaX,this.propiedadesIniciales.fuerzaY,this)
                    
                  },n)
               
                //this.darRebote();
                console.log("da rebote abajo. PATEANDO")
              }
            }
            else {
              if (atajaMedio) {

                this.cambiarAccion("atajaMedio");

                // Chequeo si la puede agarrar al medio
                if (velocPelotaX < this.propiedadesIniciales.aQVelLaAtajaMedio) {
                  setTimeout(() => { this.cambiarAccion("atajaMedioConPelota", 6); this.invisibilizarPelotaDelJuego(); }, 10);
                  console.log("puede agarrarla al medio")
                }
                else 
                {
                  console.log("da rebote al medio")
                  this.darRebote();
                }
              }
              else {

                this.cambiarAccion("atajaArriba", 2);
                // Chequeo si la puede agarrar arriba
                
                if (velocPelotaX < this.propiedadesIniciales.aQVelLaAtajaArriba) {
                  setTimeout(() => {
                    console.log("puede agarrarla arriba")
                    this.cambiarAccion("suspendidoEnElAireConPelota", 4); 
                    this.invisibilizarPelotaDelJuego();
                  }, 33);
                }
                else 
                {
                  console.log("da rebote arriba")
                  this.darRebote();
                }
              }
            }
            setTimeout(() => { if (this.estado != 6) this.estado = 0; }, 1500);
          }
        }
        else {
          this.cambiarAccion("vuelveALaLinea");
          this.estado = 4;

        }
      }      else {
        //si no viene muy fuerte.
        this.colisionaConPelota = false;
        this.estado = 0;
        console.log("VIENE MUY FUERTE, NO TIENE QUE ATAJAR");
      }
   
  }
  eventoColisionConPelota() {
    console.log("VELOCIDAD PELOTA: "+pelota.cuerpo.m_linearVelocity.x);
    
    
    if (!this.estaDentroDelArea && pelota.cuerpo.m_linearVelocity.x>0)
    {
      this.darReboteFueraDelArea();
    }
    return false;
  }

  darRebote() {
    this.vaADarRebote = true;

  }

  darReboteFueraDelArea() {
    let fx = this.propiedadesIniciales.fuerzaX
    let fy = this.propiedadesIniciales.fuerzaY
    audioW.reproducirColisionPelotaJugador();
    let velocidadPelota = pelota.cuerpo.GetLinearVelocity();
    let fuerzaXNueva=(-velocidadPelota.x * 0.5 + fx) / 2;
    let fuerzaYNueva=(-velocidadPelota.y + fy) / 2
    
    //if(fuerzaXNueva>-100) fuerzaXNueva=-100

    pelota.cuerpo.SetLinearVelocity(new b2Vec2(fuerzaXNueva, fuerzaYNueva));
  }

  invisibilizarPelotaDelJuego() {
    //EL ARQUERO LA ATAJÓ Y LA TIENE EN LAS MANOS.
    pelota.cuerpo.SetLinearVelocity(new b2Vec2(0, 0)); //freno la pelota
    pelota.cjs.visible = false; //la invisibilizo
    pelota.sombra.visible = false; //la invisibilizo
    setTimeout(() => { this.estado = 6; }, 1500);
    juegoW.seFueLaPelota();

    //juegoW.aQuienSigueLaCamara=this.cjs //la camara sigue al arquero

  }

  impulsoParaArriba() {
  
    this.calcularYSetearCuantoTieneQueSaltar()
    this.caja.SetLinearVelocity(this.vectorSalto);
  }

  calcularYSetearCuantoTieneQueSaltar()
  //IDEM CLASEJUGADOR.SALTAR()
  {
    let cabezaArquero = this.getPos().y + this.height / 2;
    let alturaQueSaltaParaLlegar = Math.abs(pelota.getPos().y - cabezaArquero);

    if (alturaQueSaltaParaLlegar > this.saltoMax) {
      alturaQueSaltaParaLlegar = this.saltoMax;
    }
    this.vectorSalto.y = -alturaQueSaltaParaLlegar;
    console.log("ve salto=" + this.vectorSalto.y);
    return -alturaQueSaltaParaLlegar;
  }

  siLaTieneDarONoRebote() {
    if (this.tienePelota == 1 || this.tienePelota==2 ) {
      if (this.vaADarRebote == true) {
        let fx = this.propiedadesIniciales.fuerzaX
        let fy = this.propiedadesIniciales.fuerzaY

        audioW.reproducirColisionPelotaJugador()
        //  setTimeout( () => {

        let velocidadPelota = pelota.cuerpo.GetLinearVelocity();

        pelota.cuerpo.SetLinearVelocity(new b2Vec2((-velocidadPelota.x * 0.5 + fx) / 2, (-velocidadPelota.y + fy) / 2));
        //  this.darRebote=false;
        //  }, 30);
        this.vaADarRebote = false;
      }
    }/*else if(this.propiedadesIniciales.accionAnteWillian=="revienta" || this.propiedadesIniciales.accionAnteWillian=="reventarla"){
       
      if(this.tienePelota==1) {
        alert(1)
        this.cambiarAccion("pateando",2)
      }
    }*/


  }


  calcularEnCuantoLeLlega(){
    

    let dist = this.getPos().x - pelota.getPos().x
    let tiempo = dist / pelota.cuerpo.GetLinearVelocity().x
    this.tiempoEnLlegarle=tiempo;
  
  }

  step() {
    if(this.estado==6 && (juegoW.perdiste || juegoW.ganaste)){
     this.cjs.gotoAndStop("paradoConPelota");
      }
    //console.log(this.estados[this.estado], this.accion,  this.tiempoEnLlegarle);
    if (this.caja.m_position.x > arco.limiteArea) {
      this.estaDentroDelArea = true;
    }
    else this.estaDentroDelArea = false;

    this.calcularEnCuantoLeLlega();
    this.siLaTieneDarONoRebote();
    this.evaluarCosasYCambiarDeEstado()
    this.segunEstadoHacerCosas()
    this.moverseSegunAcciones();

    if (this.accion == "suspendidoEnElAireConPelota") {
      if (this.estoyEnElPiso()) {
        this.cambiarAccion("aterrizarConPelota");
      }
    }

    // Si está volviendo al arco y la pelota le queda atrás, deja de colisionar para no hacerse gol encontra
    if (this.accion == "volviendoAlArco") {
      if (pelota.cuerpo.m_position.x > this.caja.m_position.x) {
        this.colisionaConPelota = false;
      }
      else this.colisionaConPelota = true;
    }

  /*  console.log("estado arquero: " + this.estado);
    console.log("arquero max x: "+ this.maxPosicionX);
    console.log("arquero pos x: "+ this.getPos().x);*/

    /*
            console.log("estado arquero: " + this.estado);
            console.log("pelota.x: "+pelota.cuerpo.m_position.x);
            console.log("arquero.x: "+this.caja.m_position.x);
            console.log("arquero.accion: "+this.accion);
            console.log("-------------"); */

    /* if (pelota.estoyEnElPiso() && this.estado == 1)
     {
       this.estado = 0;
     }*/

  } //step


  patear() {

    //  console.log(this.fuerzaX, this.fuerzaY)
    if (this.tieneLaPelota() == 1) {
      pelota.pegarle(this.propiedadesIniciales.fuerzaX, this.propiedadesIniciales.fuerzaY, this)
     // this.caja.SetLinearVelocity(new b2Vec2(10, 0))
    } else {
      // console.log("no le pegaste, la pelota esta lejos" )
    }


  }

  distanciaAWillian() {
    return Math.abs(this.getPos().x - willian.getPos().x)
  }

  cambiarAccion(c, frameOffset) {
    if (this.estado == 6 && juegoW.perdiste) return;
    //sobre carga de metodo
    if(c==this.accion) return;
    
    if ((this.accion == "pateando" || this.accion == "reventarla" || this.accion == "revienta") && (c == "vuelveALaLinea" || c == "corriendo")) return;

    if(this.accion=="suspendidoEnElAire" || this.accion=="atajaArriba" ){
     if(  c=="atajaArriba" || c=="atajaMedio" || c=="atajaAbajo" || c=="caminando" || c=="vuelveALaLinea" || c=="corriendo") 
     {
       return;
     }
    }
    
    //   console.log(c, this.accion);

    //SI YA LLEGO A LA LINEA, Q NOS E PONGA A IR A LA LINEA OTRA VEZ.
    if (c == "vuelveALaLinea" && ((this.maxPosicionX - this.caja.m_position.x) < 10)) return;

    if (c == "reventarla" || c=="revienta") {
      //alert(1)
     /* if (this.tieneLaPelota() != 1) return; //si no tenes la pelota a la altura de los pies */
      if (!this.estoyEnElPiso()) return; //o si willian no esta en el piso
      //pelota.cuerpo.SetLinearVelocity(new b2Vec2(this.propiedadesIniciales.fuerzaX, this.propiedadesIniciales.fuerzaY))
      Contrincante.sacarColisionATodos(200) 
      c = "pateando";
      this.cambiarAccion("pateando");
    }

    if ((c == "esperaEnElAreaGrande") && (this.estado != 1)) {
      if ((this.caja.m_position.x < arco.limiteArea + 50) && (this.caja.m_position.x > arco.limiteArea - 50)) {
        c = "parado";
      }
      else if (this.caja.m_position.x < arco.limiteArea - 25) {
        c = "vuelveALaLinea";
      }
      else if (this.caja.m_position.x > arco.limiteArea + 25) {
        c = "corriendo";
      }
    }

    if ((c == "esperaEnElAreaChica") && (this.estado != 1)) {
      if ((this.caja.m_position.x < arco.limiteAreaChica + 50) && (this.caja.m_position.x > arco.limiteAreaChica - 50)) {
        c = "parado";
      }
      else if (this.caja.m_position.x < arco.limiteAreaChica - 25) {
        c = "vuelveALaLinea";
      }
      else if (this.caja.m_position.x > arco.limiteAreaChica + 25) {
        c = "corriendo";
      }
    }

    /*  if (c == "atajaArriba")
      {
        alert("cambiar accion atajaArriba");
        if (this.accion == "suspendidoEnElAireConPelota")
        {
          alert("quiere cambiar de atajaArriba a suspendidoEnElAireConPelota");
          return;
        }
      }*/
    super.cambiarAccion(c, frameOffset)
  }

  colisionPelotaPiso() {
    if (pelota.cuerpo.GetLinearVelocity().x > 0) {
      this.estado = 1;
    }
    clearTimeout(this.timeoutParaSaltar);
  }

  frenar() {
    if (this.caja.GetLinearVelocity().x < -10) {
      this.cambiarAccion("frenoSinPelota");
    }
    else this.cambiarAccion("parado");
    this.estado = 0;
  }

  llegaHastaLaPelota()
  {
    if ((this.propiedadesIniciales.accionAnteWillian == "reventarla") && (this.tienePelota == 1))
    {
      this.cambiarAccion("reventarla");
      setTimeout( () => { this.estado = 9 }, 500);
    }
    else 
    {
      console.log("LLEGA HASTA DONDE ESTÁ LA PELOTA")
      this.cambiarAccion("frenoConPelota", 3);
      this.invisibilizarPelotaDelJuego();
    }
  }
  
  terminoDePatear() {
    //ESTA FUNCION SE EJECUTA AL FINAL DE LA ANIMACION DE PEGARLE

    this.cambiarAccion("parado");
    setTimeout(() => { this.cambiarAccion("vuelveALaLinea") }, 100);

    this.caraTerminoDePatear();
  }

}