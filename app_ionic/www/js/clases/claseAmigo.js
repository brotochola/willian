class Amigo extends Jugador {
  constructor(w) {
    if(w.cara.piel>1) w.cara.piel=1; //por si las moscas
    let strCuerpo = juegoW.nivel.camisetaWillian + String(w.cara.piel)
    console.log(strCuerpo);
    let cuerpo = new librerias[juegoW.nivel.camisetaWillian][strCuerpo]();
    super(w, cuerpo)
    this.cjs.scaleX = 0.75
    //CARACTERISTICAS ESPECIFICAS DE LOS CONTRINCANTES:
    this.vioAWillian = false;
    this.propiedadesIniciales = w;
    this.cantVecesHizo = 0;
    this.colisionaConPelota = false;
    this.puedePararla = true;
    this.seDioVuelta = false;
    this.vectorPase = new b2Vec2(w.fuerzaX, w.fuerzaY);
    this.fuerzaX = w.fuerzaX
    this.fuerzaY = w.fuerzaY
    this.vectorPegarleAlArco = new b2Vec2(w.fuerzaArcoX, -200);
    this.vectorCorriendo = new b2Vec2(w.velocidadMax, 0)
    this.vectorCaminando = new b2Vec2(40, 0)
    this.vectorTrotando = new b2Vec2(100, 0)
    this.vectorCaminandoParaAtras = new b2Vec2(50, 0)
    this.vectorSalto = new b2Vec2(50, -w.saltoMax)
    this.precisionArco = w.precision;
    this.velMaxParaPararla = w.velMaxParaPararla;
    this.direccion = 1;
    this.estados = ["idle", "laPara", "esperandoParaPasarla", "pasando", "pelotaQuedoAtras", "terminoDeEsperar", "dandoseVuelta"];
    this.estado = 0;
  } //constructor
  static quitarAgujeroNegroATodos() {
    for (let i = 0; i < amigos.length; i++) {
      amigos[i].agujeroNegro = false;
    }
  }
  static hacerTodosLosAmigosNoColisionables(t) {
    if (isNaN(t)) t = 750
    for (let i = 0; i < amigos.length; i++) {
      amigos[i].colisionaConPelota = false;
    }
    setTimeout(() => {
      for (let i = 0; i < amigos.length; i++) {
        amigos[i].colisionaConPelota = true;
      }
    }, t)
  }
  evaluarCosasYCambiarDeEstado() {
    if (juegoW.perdiste || juegoW.ganaste) {
      this.estado = 0;
      this.cambiarAccion("parado");
      return;
    }
    //EMPIEZA FALSE
    this.colisionaConPelota = false;
    //Y QUEDA ASI SI SE CUMPLE CUALQUIER COSA DE ESTA:
    if (willian.tienePelota == 1 || willian.tienePelota == 2) {
      if (!(willian.tiroSombrerito == false && willian.accion != "sombrerito" && willian.accion != "bicicleta" && willian.accion != "cabeceando" && willian.accion != "gambeta360" && willian.accion != "pateando" && willian.accion != "suspendidoEnElAire" && willian.accion != "salto" && willian.accion != "terminarDePatear" && willian.accion != "cabecearEnElAire" && willian.accion != "barrida" && willian.accion != "barrido")) return
    }
    if (this.puedePararla != true) return
    if (!(this.accion == "parado" || this.accion == "bajarbalon" || this.accion == "trotando" || this.accion == "corriendo" || this.accion == "caminando")) return
    if (!(this.laTieneUnContrincante == false && this.laTieneUnContrincante2 == false && this.laTieneUnContrincante3 == false)) return
    if (this.cantVecesHizo < this.propiedadesIniciales.cantDeVecesQHace) {
      if ((this.tienePelota == 1) && (this.estado == 0)) {
        //CUENTO LA CANTIDAD DE VECES QUE LA AGARRO Y LE PEGO
        //SI YA LLEGO A LA CANTIDAD, ES TRANSLUCIDO Y FUE
        this.colisionaConPelota = true;
        this.estado = 1;
      }
    } else {
      //SI YA LLEGO A LA CANTIDAD 
      //  console.log("amigo "+this.nombre+" YA HABIA HECHO LA CANTIDAD DE VECES Y AHORA NO HACE NADA")
      this.colisionaConPelota = false;
      this.estado = 0;
    }
  }
  segunEstadoHacerCosas() {
    // Paró la pelota
  //  console.log(this.estado)
    if (this.estado == 1) {
      if (juegoW.laTieneUnContrincanteSiONo() == false && this.distanciaALaPelota() < 200 /*&& willian.inhibirMecanismoQHaceSinPelota == false*/ && willian.tienePelota != 1 && willian.tienePelota != 2 && willian.accion != "bicicleta" && willian.accion != "sombrerito" && willian.tiroSombrerito == false && willian.accion != "cabeceando" && willian.accion != "gambeta360" && willian.accion != "pateando" && willian.accion != "terminarDePatear" && willian.accion != "cabecearEnElAire" && willian.accion != "barrida" && willian.accion != "barrido") {
        // Verifico si la velocidad de la pelota es adecuada para pararla
        if (Math.abs(pelota.cuerpo.GetLinearVelocity().x) < this.velMaxParaPararla) {
          //ACA AGARRA LA PELOTA
          willian.colisionaConPelota = false;
          //   console.log(willian.tienePelota, this.tienePelota);
          this.colisionaConPelota = false;
          console.log("AMIGO PARA LA PELOTA")
          this.agujeroNegro = true;
          setTimeout(() => {
            this.agujeroNegro = false;
            this.colisionaConPelota = true;
            willian.colisionaConPelota = true;
          }, this.propiedadesIniciales.tiempoEsperaParaPasarselaAWillian * 1000);
          // pelota.cuerpo.SetLinearVelocity(new b2Vec2(0, pelota.cuerpo.GetLinearVelocity().y));
          this.cambiarAccion(this.propiedadesIniciales.queHaceCuandoLaRecupera);
          // Se pone en estado: esperando para pasarla
          this.estado = 2;
          this.esperarParaPasarla();
        } else {
          // La pelota viene muy fuerte
          this.estado = 0;
          this.puedePararla = false;
          console.log("EL AMIGO NO PUEDE PARARLA, EL PASE VINO MUY FUERTE");
        }
      } //if la puede agarrar
    }
    // Terminó de esperar, puede dar el pase
    else if (this.estado == 5) {
      this.pasarla();
    }
    // Se está dando vuelta, el pase es hacia atrás
    else if (this.estado == 6) {
      // La pelota frena, el amigo sigue corriendo hasta pasarla. Ahí recién se da vuelta y patea
      if (this.caja.m_position.x >= pelota.cuerpo.m_position.x + 150) {
        this.cambiarAccion("parado");
        this.pegarle();
        setTimeout(() => {
          this.cjs.scaleX *= -1
        }, 600);
        this.estado = 0;
      }
    }
  }
  esperarParaPasarla() {
    setTimeout(() => {
      this.pasarla();
    }, this.propiedadesIniciales.tiempoEsperaParaPasarselaAWillian * 1000);
  }
  pasarla() {
    this.estado = 3;
    this.colisionaConPelota = false;
    // Si tiene la pelota, da el pase. Sino se pone en estado "terminó de esperar", en el cual si la recibe nuevamente puede dar el pase al toque
    if (this.tienePelota == 1) {
      if (this.vectorPase.x < 0) {
        this.seDioVuelta = true;
        this.estado = 6;
        this.cjs.scaleX *= -1;
      }
      // Si se da vuelta, le doy a la pelota una pequeña velocidad hacia atrás para que pase al otro lado
      if (this.seDioVuelta) {
        pelota.cuerpo.SetLinearVelocity(new b2Vec2(-150, pelota.cuerpo.GetLinearVelocity().y));
      } else this.pegarle();
    }
    // Terminó de esperar
    else {
      if (this.estado != 6) {
        this.estado = 5;
      }
    }
  }
  patear() { //ESTA FUNCION SE EJECUTA EN FLASH
    //SOBREESCRIBO EL METODO DE LA CLASE JUGADOR!
 //   let preci=1-this.precisionArco


    //ACA IRIA LO DE LA PRECISION, PERO NO LO USAMOS

    if (this.tienePelota == 1 || this.cjs.scaleX < 0) {
      pelota.pegarle(this.fuerzaX, this.fuerzaY, this)
      if (this.estado == 6) {
        this.caja.SetLinearVelocity(new b2Vec2(-10, 0));
      } else {
        this.caja.SetLinearVelocity(new b2Vec2(10, 0));
      }
      //Calculo el volumen del audio del golpeo según la fuerza más grande
      if (Math.abs(this.fuerzaX) > Math.abs(this.fuerzaY)) {
        audioW.reproducirSonidoPateo(Math.abs(this.fuerzaX / 500));
      } else audioW.reproducirSonidoPateo(Math.abs(this.fuerzaY / 500));
    }
  }
  pegarle() {
    // pelota.pegarle(this.vectorPase.x, this.vectorPase.y, this);
    setTimeout(function () {
      willian.irABuscarPase();
    }, 200);
    this.cambiarAccion("pateando", 4);
    this.cantVecesHizo++;
    willian.colisionaConPelota = true;
    let amigo = this;
    // Tomo el tiempo a esperar para correr después del pase del json de nivel (si no está pongo el default)
    // let tiempoAEsperarParaCorrer = 1200;
		/* if (this.propiedadesIniciales.tiempoEsperaParaCorrerDespuesDePasarla) {
		    tiempoAEsperarParaCorrer = this.propiedadesIniciales.tiempoEsperaParaCorrerDespuesDePasarla * 1000;
		  }*/
    // setTimeout(function () {
    if (amigo.seDioVuelta) { }
    // amigo.cambiarAccion("corriendo");
    amigo.colisionaConPelota = true;
    amigo.estado = 0;
    // }, tiempoAEsperarParaCorrer);
  }
  step() {
    //GUARDO LOS ULTIMOS 3 ESTADOS DE SI LA TIENE UN CONTRINCANTE O NO
    //PARA Q LOS NABOS DE LOS AMIGOS NO LA QUIERAN AGARRAR SI LA TIENE UN CONTRINCANTE
    //PQ SE PONE EL AGUJERO NEGRO Y QUEDA MAL
    this.laTieneUnContrincante3 = this.laTieneUnContrincante2;
    this.laTieneUnContrincante2 = this.laTieneUnContrincante;
    this.laTieneUnContrincante = juegoW.laTieneUnContrincanteSiONo();
    this.chequearPelotaFutura()
    this.evaluarCosasYCambiarDeEstado()
    this.segunEstadoHacerCosas()
    // console.log(this.estado);
    this.evaluarSiLlegoAlAreaChicaYFrenar()
    this.siWillianYYoTenemosLaPelotaDejarla()
    
    if (this.estoyEnElPiso()) { //SI ESTA EN EL PISO
      if (this.accion == "suspendidoEnElAire" || this.accion == "cabecearEnElAire") {
          this.cambiarAccion("aterrizar");
          audioW.repro("aterrizar")
          this.caraAterrizando()
      }
    } else {//SI NO ESTA EN EL PISO, O SEA Q ESTA EN EL AIRE
        
        this.suspendidoEnElAireHastaCaer()
    }

  } //step

  chequearPelotaFutura() {
 //   console.log(this.tienePelota, this.colisionaConPelota, this.estado, this.agujeroNegro, this.cantVecesHizo);
    if (this.tienePelota != 3) return;
    if (this.estado == 1) return;
    if (this.cantVecesHizo >= this.propiedadesIniciales.cantDeVecesQHace) return
    if (this.accion != "cabecearEnElAire" && this.accion != "aterrizar" && this.accion != "suspendidoEnElAire" && this.accion != "salto") {
      if (this.propiedadesIniciales.saltaParaCabecear == true || this.propiedadesIniciales.saltaParaPararla == true) {
        this.saltar()
      }
    }
  }
  siWillianYYoTenemosLaPelotaDejarla() {
    if (willian.tienePelota != 0 && willian.tienePelota != -1 && willian.tienePelota != -2) {
      if ((this.tieneLaPelota() == 1) && (this.estado == 2 || this.estado == 1)) this.colisionaConPelota = true;
      else this.colisionaConPelota = false;
    }
  }
  estaCercaDelArea() {
    return (this.caja.m_position.x > arco.limiteArea / 1.5);
  }
  distanciaAWillian() {
    return Math.floor(Math.abs(this.getPos().x - willian.getPos().x))
  }
  eventoColisionConPelota() {
    
    willian.inhibirMecanismoQHaceSinPelota=false;
   if(this.cantVecesHizo >= this.propiedadesIniciales.cantDeVecesQHace) return false


    if (pelota.cuerpo.m_linearVelocity.x > 0) {
      //la pelota va para la derecha
      if (pelota.getPos().x < this.getPos().x) {
        //y la pelota esta atras
        return false;
      }
    } else {
      //si va para la izq
      if (pelota.getPos().x > this.getPos().x) {
        //la pelota esta a la derehca y esta suspendio en el aire
        if (this.accion == "suspendidoEnElAire") {
          console.log("amigo suspendido");
          //PARAR LA PELOTA EN EL AIRE
          pelota.cuerpo.m_linearVelocity.x *= 0.9
          
            if (this.propiedadesIniciales.tiempoEsperaParaPasarselaAWillian < 0.25) {
              console.log("aAMIGO CABECEANDO EN EL AIRE!")
              this.cambiarAccion("cabecearEnElAire")
              this.cantVecesHizo++
            } else {
              this.agujeroNegro = true
              this.estado = 1
            }
          
          return true;
        }else{
          //no esta suspendido en el aire
         /* this.colisionaConPelota=true;
          this.estado=1;*/

          }
      }



    }

    return super.eventoColisionConPelota()

  
  } //colision

}