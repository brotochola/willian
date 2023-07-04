console.log("-clase jugador")

class Jugador {
    constructor(w, cjs) {
        //cjs es un objeto de la lib de cjs

        this.cabeza = new librerias["cabeza_maestra"]["cabezaMaestra"]();


        this.recordarFestejo = false;
        this.leAcaboDePegar = false
        this.propiedadesIniciales = w
        this.nombre = w.nombre
        this.agujeroNegro = false;
        this.height = 130
        this.width = 40;
        if (this instanceof Arquero) {
            this.width = 80;
        }
        this.x = w.x
        this.y = w.y

        this.caja = this.createBox(world, this.x, this.y, this.width, this.height, false);
        this.FRAMENUM = 0;

        this.comoDecideDesplazarse = w.empieza;
        this.colisionaConPelota = true;
        this.tienePelota = -1;
        this.distanciaMinimaParaPegarle = 230
        this.distanciaParaBarrerse = 400;
        //   this.vectorCorriendoOriginal = new b2Vec2(w.velocidadMax, 0)
        this.vectorCorriendo = new b2Vec2(w.velocidadMax, 0)
        this.vectorCorriendoParaSombrerito = new b2Vec2(w.velocidadMax*1.6, 0)
        this.vectorCaminando = new b2Vec2(50, 0)
        this.vectorTrotando = new b2Vec2(0.7 * w.velocidadMax, 0)
        this.vectorCaminandoParaAtras = new b2Vec2(-50, 0)
        this.vectorSalto = new b2Vec2(0, -this.propiedadesIniciales.saltoMax)



        this.alturaParaPegarleConLosPies = this.caja.m_position.y - this.height / 4; //718 (limite superior, la pera aprox)

        this.alturaParaCabecearSinSaltar = this.alturaParaPegarleConLosPies - this.height / 4; //la frente

        this.alturaParaSaltarYCabecear = this.alturaParaCabecearSinSaltar - this.propiedadesIniciales.saltoMax - this.height * 0.33;


        this.cjs = cjs; //le meto el nuevo objeto de cjs


        this.cjs.cabezaMaestra.removeAllChildren();
        this.cjs.cabezaMaestra.addChild(this.cabeza)

        this.cjs.padre = this;
        this.quien = this.nombre;





        this.labels = this.cjs.getLabels();

        this.cjs.x = this.x;
        this.cjs.y = this.y
        this.caja.m_shapeList.m_userData = this //guardo la referencia
        this.cjs.scaleX = this.cjs.scaleY = 0.75;

        this.sombra = new librerias["lib_original"].sombra();
        this.sombra.y = 850;

        this.ultimoTiro = "";
        this.lePegoDeAfueraDelArea = false;

        setTimeout(() => {
            // console.log(this.nombre+" "+w.empieza)
            if (!(this instanceof Arquero)) this.agregarFuncionesEstandar()
            let offs = 0;
            if (w.empieza == "corriendo" || w.empieza == "caminando" || w.empieza == "trotando") {
                offs = Math.floor(Math.random() * 7)
            }
            this.cambiarAccion(w.empieza, offs);
        }, 50)

        setTimeout(() => {
            this.setupCara();
            stage.update();
            //    let escala = this.height / this.cjs.getBounds().height
            //  try{stage.update()}catch(e){}
        }, 300)



    }


    agregarFuncionesEstandar() {

        // timeline functions:
        this.cjs.frame_30 = function () {
            this.cjs.gotoAndPlay("parado")
        }
        this.cjs.frame_47 = function () {
            this.cjs.gotoAndPlay("corriendo")
        }
        this.cjs.frame_56 = function () {
            this.cjs.padre.patear()
        }
        this.cjs.frame_66 = function () {
            this.cjs.padre.terminoDePatear();
        }
        this.cjs.frame_95 = function () {
            this.cjs.gotoAndPlay("caminando")
        }
        this.cjs.frame_103 = function () {
            //    alert(1)
            this.cjs.padre.evaluarCabezaGambeta360();
        }
        this.cjs.frame_107 = function () {

            this.cjs.padre.mitadDeGambeta360();
        }
        this.cjs.frame_118 = function () {

            this.cjs.padre.terminoGambeta360();
        }
        this.cjs.frame_122 = function () {
            this.cjs.padre.cabecear()
        }
        this.cjs.frame_129 = function () {
            this.cjs.padre.terminoDePatear();
        }
        this.cjs.frame_131 = function () {
            this.cjs.padre.cabecear()
        }
        this.cjs.frame_134 = function () {
            this.cjs.gotoAndStop("suspendidoEnElAire")
        }
        this.cjs.frame_138 = function () {
            this.cjs.padre.impulsoParaArriba();
        }
        this.cjs.frame_140 = function () {
            this.cjs.padre.suspendidoEnElAireHastaCaer()
        }
        this.cjs.frame_237 = function () {
            this.cjs.padre.terminoDeAterrizar();
        }
        this.cjs.frame_255 = function () {
            this.cjs.padre.stop();
        }
        this.cjs.frame_270 = function () {
            this.cjs.padre.cambiarAccion("parado")
        }
        this.cjs.frame_326 = function () {
            this.cjs.padre.stop()
        }
        this.cjs.frame_340 = function () {
            this.cjs.padre.stop()
        }
        this.cjs.frame_361 = function () {
            this.cjs.gotoAndPlay("festejo")
        }
        this.cjs.frame_381 = function () {
            this.cjs.gotoAndPlay("festejo2")
        }
        this.cjs.frame_395 = function () {
            this.cjs.gotoAndPlay("corriendo")
        }
        this.cjs.frame_398 = function () {
            this.cjs.padre.mitadDeLaGambetaSombrerito();
        }
        this.cjs.frame_402 = function () {
            this.cjs.padre.terminoSombrerito();
        }
        this.cjs.frame_424 = function () {
            this.cjs.padre.terminoLaBarrida();
        }
        this.cjs.frame_431 = function () {
            this.cjs.padre.terminoDePatear();
        }
        this.cjs.frame_462 = function () {
            this.cjs.gotoAndPlay("trotando")
        }
        this.cjs.frame_470 = function () {
            this.cjs.padre.terminoDeBajarla()
        }
        this.cjs.frame_474 = function () {
            this.cjs.padre.terminoDeGirar();
        }

        // actions tween:
        this.cjs.timeline.addTween(createjs.Tween.get(this).wait(30).call(this.cjs.frame_30).wait(17).call(this.cjs.frame_47).wait(9).call(this.cjs.frame_56).wait(10).call(this.cjs.frame_66).wait(29).call(this.cjs.frame_95).wait(8).call(this.cjs.frame_103).wait(4).call(this.cjs.frame_107).wait(11).call(this.cjs.frame_118).wait(4).call(this.cjs.frame_122).wait(7).call(this.cjs.frame_129).wait(2).call(this.cjs.frame_131).wait(3).call(this.cjs.frame_134).wait(4).call(this.cjs.frame_138).wait(2).call(this.cjs.frame_140).wait(97).call(this.cjs.frame_237).wait(18).call(this.cjs.frame_255).wait(15).call(this.cjs.frame_270).wait(56).call(this.cjs.frame_326).wait(14).call(this.cjs.frame_340).wait(21).call(this.cjs.frame_361).wait(20).call(this.cjs.frame_381).wait(14).call(this.cjs.frame_395).wait(3).call(this.cjs.frame_398).wait(4).call(this.cjs.frame_402).wait(22).call(this.cjs.frame_424).wait(7).call(this.cjs.frame_431).wait(31).call(this.cjs.frame_462).wait(8).call(this.cjs.frame_470).wait(4).call(this.cjs.frame_474).wait(1));
    }

    stop() {
        //LATAMO CON ALAMBRE
        this.cjs.gotoAndPlay(this.cjs.currentFrame - 1)
    }

    evaluarCabezaGambeta360() {
        console.log("evaluar cabeza 360")
        this.cjs["cabeza_willian"].visible = false;
        this.cjs["cabeza_willian2"].visible = false;
        try { this.cjs["cabeza_willian_pelo1"].visible = false; } catch (e) {
            this.cjs["cabeza_willian3"].visible = false;
        }
        this.cjs["cabeza_willian_trencitas"].visible = false;
        try { this.cjs["cabeza_" + this.propiedadesIniciales.cara.pelo].visible = true; } catch (e) {
            if (juegoW.nivel.mundo == 1 || juegoW.nivel.mundo == 2) {
                try { this.cjs["cabeza_willian_pelo1"].visible = true; } catch (e) {
                    this.cjs["cabeza_willian3"].visible = true;
                }

            } else if (juegoW.nivel.mundo == 3) {
                this.cjs["cabeza_willian_trencitas"].visible = true;
            } else if (juegoW.nivel.mundo == 4) {
                this.cjs["cabeza_willian2"].visible = true;

            } else if (juegoW.nivel.mundo == 5) {
                this.cjs["cabeza_willian"].visible = true;

            }
        }
    }

    setupCara() {




        let cabeza = this.cjs.cabezaMaestra.children[0]

        //piel
        cabeza.cara.gotoAndStop(this.propiedadesIniciales.cara.piel)
        cabeza.pestaneos.gotoAndStop(this.propiedadesIniciales.cara.piel)
        //pestaneos:
        for (let b = 0; b < cabeza.pestaneos.children.length; b++) {
            cabeza.pestaneos["pestaneo" + b].visible = false;
        }
        this.miPestaneo = cabeza.pestaneos["pestaneo" + this.propiedadesIniciales.cara.piel];
        this.miPestaneo.visible = true;

        //boca:
        for (let b = 0; b < cabeza.boca.children.length; b++) {
            cabeza.boca["boca" + b].visible = false;
        }

        //POR SI LAS MOSCAS
        if (this.propiedadesIniciales.cara.boca > 1) this.propiedadesIniciales.cara.boca = 1;
        this.miBoca = cabeza.boca["boca" + this.propiedadesIniciales.cara.boca];
        this.miBoca.visible = true;

        //cejas:
        for (let b = 0; b < cabeza.cejas.children.length; b++) {
            cabeza.cejas.children[b].visible = false;
        }
        this.misCejas = cabeza.cejas[this.propiedadesIniciales.cara.cejas];
        this.misCejas.visible = true;
        this.misCejas.gotoAndStop("comun");


        //nariz:
        if (this.propiedadesIniciales.cara.nariz == undefined || this.propiedadesIniciales.cara.nariz == null || this.propiedadesIniciales.cara.nariz < 0) this.propiedadesIniciales.cara.nariz = 0
        cabeza.nariz.gotoAndStop(this.propiedadesIniciales.cara.piel)
        setTimeout(() => {
            cabeza.nariz.narices.gotoAndStop(this.propiedadesIniciales.cara.nariz)
        }, 100)


        //flequis:
        cabeza.flequillos.gotoAndStop(this.propiedadesIniciales.cara.pelo);

        //pelo:
        cabeza.pelo.gotoAndStop(this.propiedadesIniciales.cara.pelo)
        //ojos:
        cabeza.pupilas.pupi1.gotoAndStop(this.propiedadesIniciales.cara.ojos)
        cabeza.pupilas.pupi2.gotoAndStop(this.propiedadesIniciales.cara.ojos)



        this.cambiarFormaOjos(0)
    }

    cambiarFormaOjos(x) {
        try {
            this.cjs.cabezaMaestra.children[0].formaOjos.gotoAndStop(x); //los frames son la forma
            this.cjs.cabezaMaestra.children[0].formaOjos.children[0].gotoAndStop(this.propiedadesIniciales.cara.piel) //cada posicion tiene adentro frames de color de piel
        } catch (e) { console.error(this.nombre + " tiene problemas para poner los ojos") }

    }

    estoyEnElPiso() {
        let minVel=50
        let piso = this.getPos().y + this.height / 2 > juegoW.lineaPiso;
        if(piso) return true;
        else{
            if (this.caja.m_linearVelocity.y > minVel) {
                return false
            } else if (this.caja.m_linearVelocity.y > -minVel && this.caja.m_linearVelocity.y < minVel) {
                if(this.caja.m_linearVelocity.y>-1 && this.caja.m_linearVelocity.y<1) return true
                else return this.enPiso
            } else if (this.caja.m_linearVelocity.y < -minVel) {
                return false;
            }
       }



    }


    createBox(world, x, y, width, height, fixed) {
        if (typeof (fixed) == 'undefined') fixed = true;
        var boxSd = new b2BoxDef();
        if (!fixed) boxSd.density = 1;
        boxSd.extents.Set(width, height);
        boxSd.restitution = 0;
        boxSd.friction = 0.19;
        var boxBd = new b2BodyDef();
        boxBd.preventRotation = true

        //  boxSd.m_maskBits=1 //contra que pega
        //  boxSd.m_categoryBits=1 //q categoria es

        boxBd.AddShape(boxSd);
        boxBd.position.Set(x, y);
        boxBd.allowSleep = false;
        return world.CreateBody(boxBd);



    }

    terminoDePatear() {

        //ESTA FUNCION SE EJECUTA AL FINAL DE LA ANIMACION DE PEGARLE
        //LE HAYA PEGADO EL JUGADOR O NO
        if (pelota.quienLePego != this) {
            this.cambiarAccion(this.comoDecideDesplazarse)
            return;
        }

        this.comoDecideDesplazarse = this.propiedadesIniciales.accionDpsDePegarle
        if (this.leAcaboDePegar == true) {

            //alert(this.propiedadesIniciales.accionDpsDePegarle)
            if (this instanceof Arquero) {
                this.estado = 4;
                this.cambiarAccion("vuelveALaLinea");
            } else {
                this.cambiarAccion(this.propiedadesIniciales.accionDpsDePegarle);

            }
        } else {
            this.cambiarAccion(this.comoDecideDesplazarse)
        }
        this.caraTerminoDePatear();

        this.leAcaboDePegar = false;
    }
    ejecutarTiro() {
        this.agujeroNegro = false;
        //   console.log(this.accion, this.tienePelota, this.estoyEnElPiso())
        //ESTA FUNCION HACE REFERENCIA A SI CABECEA EN EL PISO, EN EL AIRE O LE PEGA CON EL PIE
        if (this.tienePelota == 2 || this.tienePelota == 3) {
            //SI LA PELOTA VIENE POR ARRIBA 
            if (this.estoyEnElPiso()) {
                //if(this.accion!="salto"){
                //Y WILLIAN ESTA EN EL PISO
                //CABECEAR
                console.log("### CABECEAR")
                if (this.accion == "corriendo" || this.accion == "trotando") {
                    this.cambiarAccion("cabeceando", 3) //offset
                } else {
                    this.cambiarAccion("cabeceando", 0)
                }
            } else {
                //SI LA PELOTA VIENE POR EL AIRE Y WILLIAN ESTA SALTANDO
                //BUSCO EL FRAME DE LA ANIMACION "SALTANDO Y CABECEANDO" IGUAL AL FRAME EN Q ESTA WILLIAN


                this.cambiarAccion("cabecearEnElAire")

                audioW.reproducirSonidoPateo();
            }

            this.ultimoTiro = "cabeza";
            if (this.getPos().x > (Math.abs(arco.limiteArea)))
                this.lePegoDeAfueraDelArea = false;
            else this.lePegoDeAfueraDelArea = true;

        } else {
            console.log("### PATEAR")
            if (this.accion == "suspendidoEnElAire") {
                if (this.tienePelota != 1) {
                    console.log("querias patear pero estabas ene l aire")
                    return;
                } else {
                    console.log("le estas pegando con el pie, en el aire, y si tenias la pelota en 1")
                }
            }

            if (this.accion == "corriendo") {
                this.cambiarAccion("pateando", 7) //offset
            } else if (this.accion == "trotando") {
                this.cambiarAccion("pateando", 4)
            } else {
                if (this.accion != "cabecearEnElAire") this.cambiarAccion("pateando", 0)
            }

            this.ultimoTiro = "pie";
            if (this.getPos().x > (Math.abs(arco.limiteArea)))
                this.lePegoDeAfueraDelArea = false;
            else this.lePegoDeAfueraDelArea = true;

        }
    }


    patear() { //ESTA FUNCION SE EJECUTA EN FLASH
        if (this.tienePelota == 1) {




            pelota.pegarle(this.fuerzaX, this.fuerzaY, this)

            this.caja.SetLinearVelocity(new b2Vec2(-10, 0))
            //Calculo el volumen del audio del golpeo según la fuerza más grande
            if (Math.abs(this.fuerzaX) > Math.abs(this.fuerzaY)) {
                audioW.reproducirSonidoPateo(Math.abs(this.fuerzaX / 500));
            }
            else audioW.reproducirSonidoPateo(Math.abs(this.fuerzaY / 500));
        } else if (this.tienePelota == 0) {
            //no tiene la pelota
            //console.log("$$$$$$$$$$$$$$$$$$$$$ no le pegaste, la pelota esta lejos")
        }


    }


    saltar() {

        audioW.reproducirSonidoSaltar()
        //ESTA FUNCION SOLO CALCULA LA FUERZA Q TIENE QUE TENER THIS.VECTORSALTO
        //Y MANDA LA ANIMACION

        if (this.accion == "gambeta360" || this.accion == "salto" || this.accion == "aterrizar") return;
        if (!this.estoyEnElPiso()) return;



        if (this instanceof Willian) {
            this.vectorSalto.x = this.caja.m_linearVelocity.x - this.fuerzaX * 0.2;
            this.vectorSalto.y = -this.fuerzaY * 0.4 * (Math.abs(this.propiedadesIniciales.saltoMax) / 150);
            //if(this.vectorSalto.x>500) 

            if ((this.accion == "corriendo" || this.accion == "trotando") && (this.tienePelota == 1) && (!this.llegoAlArea)) {
                pelota.cuerpo.m_position.x = this.caja.m_position.x + 100;
                pelota.cuerpo.m_position.y = this.caja.m_position.y + 80;
                pelota.pegarle(pelota.cuerpo.m_linearVelocity.x * 0.6, -140, this);
            }

        } else {
            //no es willian
            this.vectorSalto.x = this.caja.m_linearVelocity.x;
            //this.vectorSalto.y = -100;

            if ((this.accion == "corriendo" || this.accion == "trotando") && (this.tienePelota == 1)) {
                pelota.cuerpo.m_position.x = this.caja.m_position.x - 100;
                pelota.cuerpo.m_position.y = this.caja.m_position.y + 80;
                pelota.cuerpo.m_linearVelocity = new b2Vec2(pelota.cuerpo.m_linearVelocity.x, -120)

            }
        }
        if (this.vectorSalto.x > this.propiedadesIniciales.velocidadMax / 2) this.vectorSalto.x = this.propiedadesIniciales.velocidadMax / 2;
        if (Math.abs(this.vectorSalto.y) > Math.abs(this.propiedadesIniciales.saltoMax)) this.vectorSalto.y = -Math.abs(this.propiedadesIniciales.saltoMax);

        this.enPiso = false;
        this.cambiarAccion("salto")


    }

    impulsoParaArriba() {
        //console.log(this.nombre + " impulso!!")
        this.caja.SetLinearVelocity(this.vectorSalto);
        // this.cjs.stop();
    }

    tieneLaPelota() {
        /*

        me fijo la distancia lineal a la pelota. no la distancia en Y
        porq de la distancia en Y evaluo q animacion deberia ir:
        4: todavía no la tiene, pero la ve venir rápidamente
        3: tiene q saltar y cabecear, o sea q la pelota esta encima de su cabeza
        2: puede cabecear sin saltar
        1: con los pies
        0: la pelota le quedo alta, aunq esta de su lado y a una dist de x ok
        -1: no tiene la pelota, o le quedo atras
        -2: le quedo abajo pero a uns distancia en x ok

        */
        let dis = Math.abs(pelota.getPos().x - this.getPos().x);

        let posicionPelota;

        if ((this instanceof Willian) || (this instanceof Amigo)) {
            posicionPelota = pelota.getPos().x > this.getPos().x
        } else {
            posicionPelota = pelota.getPos().x < this.getPos().x
        }








        if (dis < this.distanciaMinimaParaPegarle && posicionPelota == true) {

            if (pelota.getPos().y > this.alturaParaSaltarYCabecear && pelota.getPos().y < this.alturaParaCabecearSinSaltar) {
                return 3 //saltar y cabecear
            } else if (pelota.getPos().y > this.alturaParaCabecearSinSaltar && pelota.getPos().y < this.alturaParaPegarleConLosPies) {
                return 2 //cabecear sin saltar
            } else if (pelota.getPos().y > this.alturaParaPegarleConLosPies) {
                if (pelota.getPos().y > this.getPos().y + this.height / 2 + 50) {
                    return -2;
                } else {
                    return 1
                }

            }
            else {
                return 0; //si esta muy alto pero si esta a una distancia de x ok
            }

        } /*else {
            let pelotaFutura=pelota.getPosFutura(0.5);
            let dis2 = Math.abs(pelotaFutura.x - this.getPos().x);
            if (dis2 < this.distanciaMinimaParaPegarle && posicionPelota && pelota.cuerpo.m_linearVelocity.x > 400) {
                let posY = pelotaFutura.y;
                if (posY > this.alturaParaSaltarYCabecear && pelota.getPos().y < this.alturaParaCabecearSinSaltar) {
                    return 4;
                }
                else return -1;
            }
            else return -1;
        }*/
        else return -1;


    } //tiene la pelota

    evaluarSiLlegoAlAreaChicaYFrenar() {

        if (this.getPos().x > (Math.abs(arco.limiteArea) - 100)) {
            // console.log(this.nombre +" llego al area!!!!!")
            //WILLIAN SE FRENA AL ENTRAR AL AREA
            this.llegoAlArea = true
            if (this.accion == "corriendo" || this.accion == "trotando" || this.accion == "caminando") {
                if (juegoW.ganaste == false && juegoW.perdiste == false) {
                    this.cambiarAccion("parado")
                } else {
                    if (juegoW.ganaste == true) this.cambiarAccion("festejo2");
                    else if (juegow.perdiste == true) this.cambiarAccion("golFallado2");
                }
            }
        }
    }

    distanciaLinealALaPelota() {
        let distX = pelota.getPos().x - this.getPos().x
        let distY = pelota.getPos().y - this.getPos().y
        return Math.sqrt(distX * distX + distY * distY);
    }
    saltarEnXTiempo(t) {

        let changui = 0;
        let pasito = juegoW.timeStep * 1000
        setTimeout(() => {
            this.vectorSalto.y = -this.propiedadesIniciales.saltoMax
            this.vectorSalto.x = 0
            this.cambiarAccion("salto")
        }, t * pasito - changui);
    }
    tieneLaPelotaFutura(t) {

        let p = pelota.getPosFutura(t);

        /*

        me fijo la distancia lineal a la pelota. no la distancia en Y
        porq de la distancia en Y evaluo q animacion deberia ir:
        4: todavía no la tiene, pero la ve venir rápidamente
        3: tiene q saltar y cabecear, o sea q la pelota esta encima de su cabeza
        2: puede cabecear sin saltar
        1: con los pies
        0: la pelota le quedo alta, aunq esta de su lado y a una dist de x ok
        -1: no tiene la pelota, o le quedo atras
        -2: le quedo abajo pero a uns distancia en x ok

        */
        let dis = Math.abs(p.x - this.getPos().x);

        let posicionPelota;

        if ((this.nombre == "willian") || (this instanceof Amigo)) {
            posicionPelota = p.x > this.getPos().x
        } else {
            posicionPelota = p.x < this.getPos().x
        }








        if (dis < this.distanciaMinimaParaPegarle && posicionPelota == true) {

            if (p.y > this.alturaParaSaltarYCabecear && p.y < this.alturaParaCabecearSinSaltar) {
                return 3 //saltar y cabecear
            } else if (p.y > this.alturaParaCabecearSinSaltar && p.y < this.alturaParaPegarleConLosPies) {
                return 2 //cabecear sin saltar
            } else if (p.y > this.alturaParaPegarleConLosPies) {
                if (p.y > this.getPos().y + this.height / 2 + 50) {
                    return -2;
                } else {
                    return 1
                }

            }
            else {
                return 0; //si esta muy alto pero si esta a una distancia de x ok
            }

        }
        else return -1;


    } //tiene la pelota futura

    suspendidoEnElAireHastaCaer() {
        this.cambiarAccion("suspendidoEnElAire")
        //  console.log(this.nombre+"  suspe")
        //ESTA ACCION SE EJECUTA DIRECTO DESPUES DEL SALTO. Y SE FRENA PARA Q DURE TODO LO NECESARIO EN EL AIRE
        // this.accion = "suspendidoEnElAire"
        // console.log("SUSPENDIDO EN EL AIRE HASTA CAER")

    }
    terminoLaBarrida() {
        //   console.log("termino la barrida!")
        //this.caja.m_position.y = 750;
        //  console.log(this.comoDecideDesplazarse)

        this.terminoDeAterrizar()


    }
    terminoDeRecibirPelotaEnLaCara() {
        console.log("terminod e recibir pelotazo ")
    }
    terminoDeAterrizar() {
        // console.log(this.comoDecideDesplazarse)

        //ESTA FUNCION SE EJECUTA AL FINAL DE LA ANIMACION DE PEGARLE
        //LE HAYA PEGADO EL JUGADOR O NO


        //  console.log("TERMINO DE ATTERIZAR", juegoW.ganaste, juegoW.perdiste, this.llegoAlArea, this.recordarFestejo)

        if (juegoW.ganaste == false && juegoW.perdiste == false) {
            if (this instanceof Arquero) {
                this.cambiarAccion("vuelveALaLinea");
            } else {
                if (this.llegoAlArea) this.cambiarAccion("parado")
                else this.cambiarAccion(this.comoDecideDesplazarse)
            }
        } else {

            //  alert("termino de aterrizar y ganaste o perdiste"+this.recordarFestejo)
            if (this.recordarFestejo != false) {

                this.cambiarAccion(this.recordarFestejo);
                this.recordarFestejo = false;
            } else {
                console.warn(this.nombre + " NO TENIA FESTEJO NI GOLFALLADO")
                this.cambiarAccion("parado")
            }

        }




        this.caraNormal();
        this.leAcaboDePegar = false;
    }

    stepGenerico() {

        /* STEP GENERICO DE TODOS LOS JUGADORES */
        // if (juegoW.ganaste || juegoW.perdiste) return;
        this.tienePelota = this.tieneLaPelota()



        // console.log(this.nombre+" "+this.tienePelota)

     

        //CONTROL DE POSICIONES PARA TIENELAPELOTA()
        this.alturaParaPegarleConLosPies = this.caja.m_position.y - this.height / 4;
        this.alturaParaCabecearSinSaltar = this.alturaParaPegarleConLosPies - this.height;
        this.alturaParaSaltarYCabecear = this.alturaParaCabecearSinSaltar - this.propiedadesIniciales.saltoMax - this.height * 0.33;
        this.pisoAnterior = this.piso
        this.piso = this.estoyEnElPiso()

        if ((this.piso == true && this.pisoAnterior == false && this.accion == "pateando") ) {
            this.cambiarAccion("aterrizar");
            audioW.repro("aterrizar")

            this.caraAterrizando()
        }
        if (this.estoyEnElPiso()) { //SI ESTA EN EL PIS

            if (this.accion == "suspendidoEnElAire" || this.accion == "cabecearEnElAire") {
                

                this.cambiarAccion("aterrizar");
                audioW.repro("aterrizar")
                this.caraAterrizando()

            }
        } else {//SI NO ESTA EN EL PISO, O SEA Q ESTA EN EL AIRE

            //SI EL NUMERO DE FRAME CORRESPONDE A UN FRAME DEL CHABON PARADO
            //Q ESTE EN EL FRAME DE SUSPENDIDO EN EL AIRE.
            //AUNQ PUEDE ESTAR EN EL AIRE POR OTROS MOTIVOS
            if (this.cjs.currentFrame < this.labels[2].position - 1) this.suspendidoEnElAireHastaCaer()
        } //fin if estoy ene l piso


        if (this.accion == "parado") {
            this.caja.m_linearVelocity.x *= 0.8
            this.caja.m_rotation = 0
            if (this.caja.m_position.y > 750) this.caja.m_position.y = 750;
        } else if (this.accion == "barrida") {

        } else if (this.accion == "festejo" || this.accion == "golFallado" || this.accion == "festejo2") {
            this.caja.m_linearVelocity.x *= 0.9

        } else if (this.accion == "pelotazoCara") {
            if (!(this instanceof Willian)) {
                this.caja.m_rotation = Math.PI / 2
            } else {
                this.caja.m_rotation = -Math.PI / 2
            }
            this.caja.m_linearVelocity.x = 0;
            this.caja.m_position.y = juegoW.lineaPiso
        } else {
            this.caja.m_rotation = 0
            if ((this.accion != "suspendidoEnElAire") && (this.accion != "cabecearEnElAire") && (this.accion != "pateando") && (this.accion != "gambeta360")) {
                //   this.caja.m_position.y = this.propiedadesIniciales.y;
            }
        }


        if (juegoW.perdiste || juegoW.ganaste) return; //CON ESTO EVITO Q SI GANASTE O PERDISTE SIGA CON LAS PUPILAS Y PESTAÑEOS Y VELOCIDADES

        //MOVIMIENTO, CORRER, CAMINAR
        if (this.FRAMENUM % 10 == 0) {
            this.posicionPupilas();
            if (this.accion == "corriendo") this.caja.SetLinearVelocity(this.vectorCorriendo);
            else if (this.accion == "trotando") this.caja.SetLinearVelocity(this.vectorTrotando);
            else if (this.accion == "caminando") this.caja.SetLinearVelocity(this.vectorCaminando);
            else if (this.accion == "parado") { }
        }
        if (this.FRAMENUM % 30 == 0) {
            if (!interfaz.pateando) this.pestaneoRandom()
        }
        
        //SI SE CHOCA CONTRA ALGO PARA
        if( (this.accion=="corriendo" || this.accion=="caminando" || this.accion=="trotando")){
            if(this instanceof Willian || this instanceof Amigo){
                if(this.caja.m_linearVelocity.x<1){
                    this.cambiarAccion("parado")
                    this.comoDecideDesplazarse="parado"
                }
            }else{
                if(this.caja.m_linearVelocity.x>-1){
                    this.cambiarAccion("parado")
                    this.comoDecideDesplazarse="parado"
                }
            }
          
        }

      

    }

    posicionPupilas() {
        let x, y, px, py, fram;
        if (this instanceof Willian || this instanceof Amigo) {
            x = this.getPos().x;
            y = this.getPos().y;
            px = pelota.getPos().x;
            py = pelota.getPos().y;
            fram = "e";
        } else {
            px = this.getPos().x;
            y = this.getPos().y;
            x = pelota.getPos().x;
            py = pelota.getPos().y;
            fram = "e";
        }

        let chang = 100;


        if (px > x && py > y) fram = "se"
        if (px > x && py < y) fram = "ne"
        if (px < x && py > y) fram = "so"
        if (px < x && py < y) fram = "no"

        if (Math.abs(px - x) < chang && Math.abs(py - y) > chang * 3) {
            if (py < y) fram = "n";
            else if (py > y) fram = "s";
        }

        if (Math.abs(py - y) < chang * 3 && Math.abs(px - x) > chang) {
            if (px > x) fram = "e";
            else if (px < x) fram = "o";
        }

        if (Math.abs(px - x) < chang && Math.abs(py - y) < chang * 3) {
            //si la distancia a la pelota es menor q ambos changuis:
        }


        this.cjs.cabezaMaestra.children[0].pupilas.gotoAndStop(fram)
    }

    terminoDeBajarla() {
        //ESTA ACCION SALE DE FLASH
        console.log("termino de bajarla", this.comoDecideDesplazarse)
        this.cambiarAccion(this.comoDecideDesplazarse)
    }
    render() {
        //render lo llama claseJuegoWillian en su metodo render



        this.FRAMENUM++;




        if (juegoW.pause == false) {
            this.stepGenerico();
            this.step(); //el metodo step() esta en cada chabon
        }
        //  else this.stop();

        //console.log(this.nombre+" "+this.tienePelota)

        this.cjs.x = fl(this.caja.m_position.x) //-Math.sin(this.caja.m_rotation*0.75)*this.width;
        this.cjs.y = fl(this.caja.m_position.y - Math.abs(this.caja.m_rotation) * this.height / 3) //+Math.cos(this.caja.m_rotation*0.7)*this.height*1.1;
        //  this.cjs.rotation = rad2deg(this.caja.m_rotation);

       // if (this.accion == "barrida" || this.accion == "barrido") {


           // if (this.estoyEnElPiso()) {
                //  this.cjs.y = juegoW.lineaPiso - 60
                //this.caja.m_position.y = juegoW.lineaPiso
           // }

       // }

        //////SOMBRA:

        let porcPelota = porcentaje(900, 900 - this.propiedadesIniciales.saltoMax, this.getPos().y)
        this.sombra.x = this.caja.m_position.x// fl(this.caja.m_position.x - porcPelota * 0.85 + (750 - this.getPos().y))
        this.sombra.scaleX = mapear(porcPelota, 100, 90) / 100;




        /* CAMARA LENTA */

        if (juegoW.camaraLenta) {
            if (this.FRAMENUM % 3 == 0) { //mitad de velociad
                this.cjs.gotoAndStop(this.cjs.currentFrame + 1)
            }
        } else {
            this.cjs.gotoAndStop(this.cjs.currentFrame + 1)
        }


    }
    eventoColisionConPelota() {

        audioW.reproducirColisionPelotaJugador()


        arquero.lePegoWillianDeLejos = false;


        let cabeza = this.getPos().y - this.height / 2 - pelota.height / 2
        if (cabeza > pelota.getPos().y + pelota.height / 2 && (pelota.cuerpo.m_linearVelocity.y > 0)) {
            //SI LA PELOTA LE PEGA ARRIBA DE LA CABEZA
            if (this instanceof Willian || this instanceof Amigo) {
                //SI ES WILLIAN O AMIGO, LA PELOTA TIENE Q ESTAR YENDO PARA LA DERECHA
                //SI LE VIENE EN CONTRA ESTA OK Q LES PEGUE

                if (pelota.cuerpo.m_linearVelocity.x > 0) {
                    return false;
                }
            } else if (this instanceof Contrincante || this instanceof Arquero) {
                //  console.log("pelota cabeza")
                // if(pelota.cuerpo.m_linearVelocity.x<0){
                //VICEVERSA
                return false;
                // }
            }

        } //pelota arriba de la cabeza



        juegoW.ultimoEnTocarla = this;
        //  console.log(this.nombre + " colisiona con pelota");




        /////////// SI LA PELOTA LES PEGA POR ATRAS NO COLISIONAN:
        if (this instanceof Willian || this instanceof Amigo) {
            //   console.log("AMIGO O WILLIAN")
            if (pelota.getPos().x < this.getPos().x) {
                //    console.log("PELOTA ATRAS")
                if (pelota.cuerpo.m_linearVelocity.x > 0) {

                    console.log("COLISION DESDE ATRAS CON WILLIAN O AMIGO")
                    return false;
                }
            }
        } else if (this instanceof Contrincante || this instanceof Arquero) {
            //  console.log("CONTRINCANTE")
            if (pelota.getPos().x > this.getPos().x) {
                //  console.log("LA PELOTA ESTABA A LA DERECHA")
                if (pelota.cuerpo.m_linearVelocity.x < 0) {
                    //  console.log("COLISION DESDE ATRAS CON CONTRINCANTE O ARQUERO")

                    return false;
                }
            }
        }////// FIN NO COLISION SI LA PELOTA LES VIENE DE ATRAS




        let posCara = this.getPos().y - this.height / 1.5
        //console.log(Math.abs(pelota.cuerpo.m_linearVelocity.x), this.nombre,posCara,pelota.getPos().y )

        if (Math.abs(pelota.cuerpo.m_linearVelocity.x) > 500) {

            if (pelota.getPos().y > posCara && pelota.getPos().y < posCara + 30) {
                this.cambiarAccion("PelotazoCara");

                //CARA DE MUERTE
                pelota.cuerpo.m_linearVelocity.x *= -1
                pelota.cuerpo.m_linearVelocity.y = -100
                //  juegoW.pause=true;
                return this.colisionaConPelota;
                //SI LE ROMPE LA CARA NO SE FIJA SI LA TIENE Q BAJAR
            }
        }
        //  console.log(pelota.getPos().y)
        if (this.tienePelota == -2) {
            if (pelota.getPos().y > 830) {
                if (this.accion == "suspendidoEnElAire" || this.accion == "corriendo" || this.accion == "trotando" || this.accion == "caminando") {
                    this.caja.m_linearVelocity.x -= 100
                    this.cambiarAccion("cayendoDeCulo")
                    audioW.repro("caeculo");
                    return this.colisionaConPelota;
                }

            }

        }


        if (this.tienePelota == 1) { //SI LE PEGA EN EL TORSO O PIERNAS
            if (Math.abs(Math.abs(pelota.cuerpo.m_linearVelocity.x) - Math.abs(willian.caja.m_linearVelocity.x)) > 200) {
                if (this.accion == "corriendo" || this.accion == "caminando" || this.accion == "trotando" || this.accion == "parado") {
                    this.cambiarAccion("bajarbalon");
                    this.levantarCejas(500)
                    if (this.colisionaConPelota == true) pelota.cuerpo.m_linearVelocity.x *= 0
                    return this.colisionaConPelota;
                }
            }
        }




        return this.colisionaConPelota;



    }

    cambiarAccion(c, frameOffset) {
        //if (c == "aterrizar") console.log("%%aterrizar", this.nombre);
        //  console.log("clase jug",c,this.accion)

        //if(c=="suspendidoEnElAire")
        if (c == "barrida" && this.accion == "suspendidoEnElAire") return;
        if (this.accion == "barrida" && c != this.comoDecideDesplazarse) {
            console.log("intenta cambiar de " + this.accion + " a " + c);
            return;
        }
        if (c == "salto" && this.accion == "suspendidoEnElAire") return
        if (c == "pateando" && this.accion == "bicicleta") return;
        if (c == undefined) return;
        if (this.accion == c) return;
        if (this.accion == "barrida" && c == "pateando") return

        // if (this.accion == "parado") {
        if (c == "corriendo") this.caja.m_linearVelocity.x = this.vectorCorriendo.x * 0.8;
        else if (c == "trotando") this.caja.SetLinearVelocity(this.vectorTrotando);
        else if (c == "caminando") this.caja.SetLinearVelocity(this.vectorCaminando);

        //}


        if (juegoW.ganaste == true || juegoW.perdiste == true) {
            if (c == "pateando" || c == "corriendo") {
                c = "parado";
            }
            if (this.estoyEnElPiso() && this.recordarFestejo != false) {
                c = this.recordarFestejo


            }
        }

        /*  if(this.accion=="salto" && c!="aterrizar") return;
          if (this.accion == "pateando" && c!=this.comoDecideDesplazarse) {
              //DESPUES DE PATEAR SOLO SE PUEDE IR A UNA ACCION DE MOVIMIENTO
              return;
              console.log("se quiere cambiar la accion de " + this.nombre + " pero esta pateando", c)
          }*/

        // if(this.accion=="golFallado" || this.accion=="festejo" || this.accion=="festejo2") return;
        //  if(this.accion=="freno") return;
        // console.log("%%%", this.propiedadesIniciales.nombre, "ant: " + this.accion, c, frameOffset)
        // ACA SE EVALUA SI TIENE Q DEJAR DE CORRER LENTAMENTE Y MOSTRAR OTRA
        if (frameOffset == null || frameOffset == undefined || frameOffset == "") frameOffset = 0;

        this.accionAnteAnterior = this.accionAnterior;
        this.accionAnterior = this.accion;

        //SI ESTABAS CORRIENDO Y PARAS. FRENA.
        //DESDE FLASH AL FINAL DE LA ACCION FRENO PASA A PARADO
        if (this.accion == "corriendo" || this.accion == "trotando") {
            if (c == "parado") {
                this.cambiarAccion("freno");
                return;
            }
        } else if (this.accion == "barrida") {
            if (c == "pateando" || c == "cabeceando") return;
        }

        //////////// BARRIDA
        if (c == "barrida" || c == "barrido") {
            this.cjs.gotoAndPlay("barrido");
            this.accion = c;
            let direccion; //valor de lo que va a moverse.
            if (this.nombre == "willian") direccion = 1;
            else direccion = -1
            let ratioFuerza = 1.15;
            this.caja.SetLinearVelocity(new b2Vec2(this.propiedadesIniciales.velocidadMax * ratioFuerza * direccion, this.caja.m_linearVelocity.y))
            //this.caja.m_linearVelocity.x=this.propiedadesIniciales.velocidadMax*ratioFuerza*direccion
            return;

        } else {
            //si la accion no es barrida, ni ninguna q requiera un tratamiento especial...
            //si estas excediendo la velocidad maxima se limita, en la barrida es mas rapido
            /* if(Math.abs(this.caja.m_linearVelocity.x)>this.propiedadesIniciales.velocidadMax) {
                 this.caja.m_linearVelocity.x=this.propiedadesIniciales.velocidadMax;
             }*/
            if (c == "pateando") {
                this.caraPateando();

            }

            for (let i = 0; i < this.labels.length; i++) {
                let lbl = this.labels[i].label
                if (lbl == c) {
                    //si existe el label
                    if (this.accion == c) {
                        // console.log("## la accion indicada ya estaba en ejecucion")
                        return
                    } else {

                        this.cjs.gotoAndPlay(this.labels[i].position + frameOffset)
                        this.accion = c;
                        return i;
                    }

                }
            }
        }

        //ESTO LO USAMOS PARA LO QUE HACE DESPUES DE SALTAR Y ATERRIZAR
        //Y PARA LA BARRIDA TMB PUEDE SER
        //Y PARA LAS GAMBETAS
        if (c == "caminando" || c == "corriendo" || c == "trotando") {
            this.comoDecideDesplazarse = c
        }


        //ESTA FUNCION DEBERIA RETORNAR ANTES DE LLEGAR ACA, SINO SE QUEDA PARADO
        console.log(this.nombre + " quiere hacer la accion " + c + " pero no la tiene")
        this.cjs.gotoAndStop("parado")
        this.accion = "parado"
    }

    golFallado() {
        if (this.estoyEnElPiso()) this.cambiarAccion("golFallado");
        else this.recordarFestejo = "golFallado"
        this.caraDePerdisteNivel();
    }

    festejo() {
        if (this.estoyEnElPiso()) this.cambiarAccion("festejo");
        else this.recordarFestejo = "festejo"
        this.caraDeGol()
    }



    terminoSombrerito() {
        //  console.log("TERMINO SOMBRERITO")
        //this.cambiarAccion("corriendo");

        this.cjs.gotoAndPlay("corriendo");
        this.accionAnteAnterior = this.accionAnterior;
        this.accionAnterior = this.accion;
        this.accion = "corriendo";
        this.comoDecideDesplazarse = "corriendo";
        setTimeout(() => { this.colisionaConPelota = true; }, 100)


    }

    terminoDeGirar() {
        this.direccion *= -1;
        this.cjs.scaleX *= -1;
    }
    cabecear() {
        //   alert(this.fuerzaX)
        //ESTA FUNCION SE EJECUTA DESDE LA ANIMACION DE CABECEO
        if (this.tienePelota == 2 || this.tienePelota == 3) {

            pelota.pegarle(this.fuerzaX * 0.7, this.fuerzaY * 0.7, this)
        }
    }


    getPos() {
        return this.caja.m_position;
    }


    distanciaALaPelota() {
        return Math.floor(Math.abs(this.getPos().x - pelota.getPos().x))
    }

    //############### CARAS
    pestaneoRandom() {

        setTimeout(() => { this.cjs.cabezaMaestra.children[0].pestaneos.children[0].gotoAndPlay(0) }, Math.floor(Math.random() * 1500));
    }

    caraPateando() {
        if (juegoW.perdiste == true || juegoW.ganaste == true) return;

        this.cambiarFormaOjos(4)
        this.caraEnojado()

    }

    caraEnojado() {
        if (juegoW.perdiste == true || juegoW.ganaste == true) return;

        this.misCejas.gotoAndStop("enojado")
        this.miBoca.gotoAndStop("dolor")
    }
    caraApuntando() {
        if (juegoW.perdiste == true || juegoW.ganaste == true) return;

        this.misCejas.gotoAndStop("enojado")
        this.miBoca.gotoAndStop("enojado")
        this.cambiarFormaOjos(1)
    }

    caraTerminoDePatear() {
        if (juegoW.perdiste == true || juegoW.ganaste == true) return;

        this.cambiarFormaOjos(3)
        setTimeout(() => { this.cambiarFormaOjos(5) }, 30)
        setTimeout(() => { this.cambiarFormaOjos(0) }, 50)
        setTimeout(() => { this.caraNormal() }, 250)

    }
    caraNormal() {
        if (juegoW.perdiste == true || juegoW.ganaste == true) return;

        this.cambiarFormaOjos(0)

        this.misCejas.gotoAndStop("comun")
        this.miBoca.gotoAndStop("normal")
    }
    levantarCejas(tiempo) {
        this.misCejas.gotoAndStop("sorpresa")
        setTimeout(() => { this.misCejas.gotoAndStop("comun") }, tiempo)
    }
    sonreir() {
        this.levantarCejas(600);
        this.miBoca.gotoAndStop("sonrisa_abierta")
    }

    caraSaltando() {
        if (juegoW.perdiste == true || juegoW.ganaste == true) return;

        this.levantarCejas(400);
        this.miBoca.gotoAndStop("o")
    }

    caraDeGol() {
        this.levantarCejas(600);
        this.miBoca.gotoAndStop("sonrisa_abierta")
        this.cambiarFormaOjos(3);
    }

    caraAterrizando() {
        if (juegoW.perdiste == true || juegoW.ganaste == true) return;
        this.misCejas.gotoAndStop("enojado")
        this.miBoca.gotoAndStop("dolor")
        this.cambiarFormaOjos(3)
        setTimeout(() => {
            this.miBoca.gotoAndStop("comun")
        }, 300)
        setTimeout(() => {
            this.misCejas.gotoAndStop("comun");
            this.cambiarFormaOjos(0);
        }, 450)

    }

    caraDePerder() {
        this.cambiarFormaOjos(5);
        this.miBoca.gotoAndStop("dolor")
        this.misCejas.gotoAndStop("triste")
        //   console.log(  this.cjs.cabezaMaestra.children[0], this.cjs.cabezaMaestra.children[0].pupilas)
        this.cjs.cabezaMaestra.children[0].pupilas.gotoAndStop(2);

    }

    caraDePerdisteNivel() {
        this.caraDePerder()
        setTimeout(() => { this.caraDePerder() }, 200);
        setTimeout(() => { this.caraDePerder() }, 451);
    }


    //############### FIN CARAS


    colisionPiso() {
        this.enPiso = true;
        return true
    }

       getVelLineal(){
            return Math.sqrt(this.caja.m_linearVelocity.x*this.caja.m_linearVelocity.x+this.caja.m_linearVelocity.y*this.caja.m_linearVelocity.y)
        }

        
    colisionCaja(c) {
      


        ////////////////////////////
        let ladoCaja = c.getPos().x - c.propiedadesIniciales.width / 2
        let ladoJ = this.getPos().x + this.width / 2
        let baseJ = this.getPos().y + this.height / 2
        let techoCaja = c.getPos().y - c.propiedadesIniciales.height / 2
        let distX = ladoCaja - ladoJ
        let distY = techoCaja - baseJ
        //console.log(distX, distY)

        //console.log(c.getPos().x, c.propiedadesIniciales.width, c.getPos().x-c.propiedadesIniciales.width/2, ladoJ)



       // audioW.repro("patear2")
       audioW.repro(c.nombreAudio,false,(c.getVelLineal()+this.getVelLineal())/800);


        let pies=c.getPos().y > this.getPos().y && this.caja.m_linearVelocity.y > 0
        let lado=c.getPos().x > this.getPos().x && this.caja.m_linearVelocity.x > 0
        
        if (pies || distX < distY) {
            //SI WILLIAN ESTA YENDO PARA ABAJO
            this.enPiso = true;
            console.log("COLISION PIES 1")
        } else if (lado || distX > distY) {
          /*  this.caja.m_linearVelocity.x = 0;
            this.cambiarAccion("parado")
            this.comoDecideDesplazarse = "parado";
            this.inhibirMecanismoQHaceSinPelota = true
            console.log("COLISION DE LADO 1")*/

        }

      

        return true

    }

}