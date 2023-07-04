class Contrincante extends Jugador {










    constructor(w) {
        
        if(w.cara.piel>1) w.cara.piel=1;

        let strCuerpo = juegoW.nivel.camisetaContrincantes+ String(w.cara.piel)

        

        let cuerpo = new librerias[juegoW.nivel.camisetaContrincantes][strCuerpo]();


        super(w, cuerpo)
        
        this.cjs.scaleX = -0.75

        //CARACTERISTICAS ESPECIFICAS DE LOS CONTRINCANTES:
        this.vioAWillian = false;

        this.vectorCorriendo = new b2Vec2(-w.velocidadMax, 0)
        this.vectorCaminando = new b2Vec2(-50, 0)
        this.vectorTrotando = new b2Vec2(-100, 0)
        this.vectorCaminandoParaAtras = new b2Vec2(50, 0)
        this.vectorSalto = new b2Vec2(-50, -w.saltoMax)
        this.direccion = -1;

        this.cabeceando = false;

        this.distanciaMinimaParaPegarle = 150 //sobreescribo la de la clase jugador

        this.pegues = {
            'revienta': new b2Vec2(-450, -100),
            'lePegaAlRas': new b2Vec2(-300, -10),
            'lePegaParaArriba': new b2Vec2(-100, -300),
            'pegarleDespacitoParaAdelante': new b2Vec2(-140, -50),
            'lePegaParaAtrasDespacio': new b2Vec2(100, -300)
        }
        //filter.categoryBits = 0x0002;

        this.estoyListoParaVerAWillian = false;
        setTimeout(() => this.estoyListoParaVerAWillian = true, 1200)


    } //constructor

    eventoColisionConPelota() {
        // audioW.reproducirColisionPelotaJugador()
        juegoW.ultimoEnTocarla = this;
        willian.esquivoContrincanteConSombrerito = false;
      
       
        //alert( this.colisionaConPelota)
        return   super.eventoColisionConPelota()
    }

        definirItemMapa(){
            if(this.propiedadesIniciales.seBarreCuandoTieneAWillianA2m==true){
                return "Salto"
            }else if(this.propiedadesIniciales.saltaAnteSombrerito==false && usuario.habilidades.sombrerito){
                return "Sombrerito"
            } else if(this.propiedadesIniciales.flanqueableConGambeta360==true && usuario.habilidades.gambeta){
                return "Gambeta"
            }else{
                return "Vacio"
            }
        }
   

    step() {

        // console.log(this.tienePelota)

  


        if (this.accion == "suspendidoEnElAire" || this.accion == "salto") {
            //si esta en el aire le puede pegar solo en tienePelota=2, pq 3 es mas arriba
            if (this.tienePelota == 2 /*|| this.tienePelota == 3*/ || this.tienePelota == 1) {

                if (this.pegues[this.propiedadesIniciales.queHaceCuandoLaRecupera] != null) {
                    //si la actitud q toma cuando la recupera es un tipo de pegue
                    this.fuerzaX = this.pegues[this.propiedadesIniciales.queHaceCuandoLaRecupera].x
                    this.fuerzaY = pelota.cuerpo.m_linearVelocity.y = this.pegues[this.propiedadesIniciales.queHaceCuandoLaRecupera].y
                    this.cambiarAccion("cabeceando", 1);
                } else {
                    console.log("#####" + this.nombre + " no sabe como pegarle!!!!!")
                }
            }
        }

        //LOS CONTRINCANTES SOLO SE FIJAN SI TIENEN Q SALTAR SI LA PELOTA ESTA DEL LADO DE WILLIAN
        // Y SI LA PELOTA ESTA VINIENDO


        this.chequearPelotaFutura()



        //SI NO VIO A WILLIAN Y ESTA A DISTANCIA DE VERLO, LO VE
        if (this.tienePelota != 1 && this.tienePelota != 2 && this.estoyListoParaVerAWillian == true) {
            if (!this.vioAWillian && (this.distanciaALaPelota() < this.propiedadesIniciales.aQueDistanciaVeAWillian)) {
                this.vioAWillian = true;
                console.log(this.nombre + " vio a willian, accion: " + this.propiedadesIniciales.queHaceCuandoVeAWillian)
                //EJECUTA LA ACCION Q DICE EL JSON
                this.cambiarAccion(this.propiedadesIniciales.queHaceCuandoVeAWillian);
            }
        }






        //SI TIENE LA PELOTA
        if (this.tienePelota == 1 || this.tienePelota == 2) {

         
        

            ////// SI ESTE CONTRINCANTE TIEN ELA PELOTA Y WILLIAN HACE ACIONES DETERMINADAS:
            if (willian.accion == "gambeta360") {
                if (this.propiedadesIniciales.flanqueableConGambeta360 == true) {
                    //lo podes pasar
                    this.colisionaConPelota = false;
                    willian.colisionaConPelota = true;
                    willian.agujeroNegro = true;
                    setTimeout(() => { willian.agujeroNegro = false; }, 150);

                    //  console.log("willian estaba haciendo la gambeta 360 y " + this.nombre + " no hizo nada porq  es flanqueble")
                    return;
                } else {            
                    
                    //si no es flanqueable

                    willian.agujeroNegro = false;
                    willian.gambeta360Interrumpida = true;
                    pelota.cuerpo.m_linearVelocity.x -= Math.abs(pelota.cuerpo.m_linearVelocity.x) * 0.5
                    //si no es flanqueable con la cambeta 360
                    willian.colisionaConPelota = false;
                    this.colisionaConPelota = true;
                    this.queHaceCuandoTieneLaPelota();
                    return;
                }

            } else if (willian.accion == "barrida" || willian.accion == "barrido") {
                console.log(willian.accion+", "+this.colisionaConPelota+", "+willian.tieneLaPelota())
                //ESTO EN REALIDAD NO SE SI DEBERIA SER ASI
                //QUIZA NUNCA TIENE Q SALTAR EL CONTRINCANTE CUANDO WILLIAN SE BARRE PARA SACARSELA
                //O QUE SI SALTA, Q SOLO LE AGREGUE UN GRADO DE DIFICULTAD, PERO Q NO SEA IMPOSIBLE SACARSELA
                if (this.propiedadesIniciales.saltaAnteBarrida == true) {
                    this.saltar();
                } else {
                    //si este chabon no salta ante la barrida de willian
                    if (willian.tieneLaPelota() == 1) {
                        this.colisionaConPelota = false;
                        willian.colisionaConPelota = true;
                        setTimeout(() => { this.colisionaConPelota = true; }, 1200);
                    }
                }
                return;

            } else {
                //si willian no esta en ningnua accion en particular
                //LOS DOS SE CRUZAN, GANA EL CONTRINCANTE POR DEFAULT
                if (this.accion == "barrida" || this.accion == "barrido") {
                    if(willian.tienePelota==1  || willian.tienePelota==2){
                        if (willian.accion == "suspendidoEnElAire" || willian.accion == "salto") {
                            //  willian.agujeroNegro == true;
                            //  setTimeout(() => { willian.agujeroNegro = false; }, 750)
                            this.colisionaConPelota = false;
                            willian.colisionaConPelota = true;
                            pelota.cuerpo.m_position.x+=20
                        } else {
                        //  Amigo.hacerTodosLosAmigosNoColisionables()          
                          pelota.cuerpo.m_position.x-=20
                            willian.colisionaConPelota = false;
                            this.colisionaConPelota = true;
                        /*  setTimeout(() => {
                                willian.colisionaConPelota = true;
                            }, 2000)*/
                        }
                  }
                  
                } else{
                    //NO ESTOY EN LA BARRIDA
                    let laTieneUnAmigo = false
                    let qAmigoLaTiene;
                    let quienTieneLaPelota
                    for (let i = 0; i < amigos.length; i++) {
                        if (amigos[i].tieneLaPelota == 1) {
                            laTieneUnAmigo = true
                            qAmigoLaTiene = amigos[i];
                        }
                        break;
                    }

                    if (laTieneUnAmigo == true) quienTieneLaPelota = qAmigoLaTiene;
                    else if (willian.tieneLaPelota() == 1) quienTieneLaPelota = willian;
                    if (willian.tieneLaPelota() == 1 || laTieneUnAmigo == true) {
                        //SI LOS DOS TIENEN LA PELOTA
                        quienTieneLaPelota.colisionaConPelota = false;
                        pelota.cuerpo.m_position.x-=20
                        setTimeout(() => {
                            quienTieneLaPelota.colisionaConPelota = true;
                        }, 750);
                        this.colisionaConPelota = true;
                        this.queHaceCuandoTieneLaPelota();
                        return;
                    }

                    
                    if(willian.tienePelota!=1 && willian.tienePelota!=2){
                        //SI ESTE ENEMIGO LA TIENE Y WILLIAN NO, LE PEGA, Y RETURN, Y ALCA
                        this.agujeroNegro=false;
                        this.colisionaConPelota=true;
                        this.queHaceCuandoTieneLaPelota();
                        return
                    }
                }
            }


            //si tiene la pelota
        } else if (this.tienePelota == 3) {
            //eso se resuelve en otro lado


        } else {
            //SI NO TIENE LA PELOTA
            if (this.vioAWillian == true) {
                if (willian.tienePelota == 1) {
                    if (this.distanciaALaPelota() < this.distanciaParaBarrerse) {
                        if (willian.colisionaConPelota == true) {
                            if (this.propiedadesIniciales.seBarreCuandoTieneAWillianA2m == true) {



                                this.cambiarAccion("barrida");

                                // alert(willian.colisionaConPelota)


                            }
                        }

                    }
                }
            }
        }



        //    console.log(this.nombre+"; "+this.distanciaALaPelota()+" "+this.distanciaAWillian()+" tiene pelo: "+this.tieneLaPelota());







    } //step
    chequearPelotaFutura() {
        if (pelota.cuerpo.m_linearVelocity.x > 0 && this.getPos().x > pelota.getPos().x) {

            let velXPelota = pelota.cuerpo.m_linearVelocity.x;
            let dis = this.getPos().x - pelota.getPos().x - 100 //(changui para pegarle);
            let t = dis / velXPelota; //tiempo=distancia/velocidad

            //t es en frames
            //un frame son 33.333ms
            if (t > 0 && t < 7 && this.accion != "cabecearEnElAire"   && this.accion != "aterrizar"  && this.accion != "suspendidoEnElAire" && this.accion != "salto") {

                let tengoPelotaFutura = this.tieneLaPelotaFutura(t);
                  
                if (tengoPelotaFutura == 3) {
                
                    if (willian.pelotaEnElAirePorSombrerito == true) {
                        //  alert("bici")
                        if (this.propiedadesIniciales.saltaAnteSombrerito == true) {
                            this.saltarEnXTiempo(t)

                        }


                    } else {
                        // alert("no bici")
                        if (this.propiedadesIniciales.saltaParaCabecear == true) {
                           
                            this.saltarEnXTiempo(t)
                        }
                    }
                } else if ((t > 3 && t < 4) && tengoPelotaFutura == 0) {
                    //ESTO ES: SI EN EL RECORRIDO DE LA PELOTA NO VA A PODER CABECEAR, CUANDO LE FALTEN 3 O 4 FRAMES, Q SALTE IGUAL
                    // if(this.accion!="suspendidoEnElAire" && this.accion!="salto" ){
                    this.saltarEnXTiempo(t)
                    // }
                } else if (tengoPelotaFutura == 1 || tengoPelotaFutura == 2) {
                   // this.queHaceCuandoTieneLaPelota();
                }
            }//if t

        } //if chequear pelota
    }


    queHaceCuandoTieneLaPelota() {
       // console.log(this.nombre + " q hace cuando tiene la pelota")
      //  console.log(this.pegues[this.propiedadesIniciales.queHaceCuandoLaRecupera] )
        if (this.pegues[this.propiedadesIniciales.queHaceCuandoLaRecupera] != null) {
            //si la actitud q toma cuando la recupera es un tipo de pegue
            this.fuerzaX = this.pegues[this.propiedadesIniciales.queHaceCuandoLaRecupera].x
            this.fuerzaY /*= pelota.cuerpo.m_linearVelocity.y*/ = this.pegues[this.propiedadesIniciales.queHaceCuandoLaRecupera].y
         
            if (!this.cabeceando) {
               
                Amigo.hacerTodosLosAmigosNoColisionables(500)
                this.ejecutarTiro();
            }

           
            setTimeout(() => {
                willian.colisionaConPelota = true;
            }, 750) //750ms es lo suficientemente corto para que si willian o alguien esta a unos 2m, le pegue, pero si esta al lado no


        } else if (this.propiedadesIniciales.queHaceCuandoLaRecupera == "correHaciaAdelanteConLaPelota") {
            this.cambiarAccion("corriendo");


        } else if (this.propiedadesIniciales.queHaceCuandoLaRecupera == "laDomina") {
            //nadam

        } // q hace cuando tiene la pelota
    }




    distanciaAWillian() {
        return Math.floor(Math.abs(this.getPos().x - willian.getPos().x))
    }


    static sacarColisionATodos(tiempo) {
        for (let i = 0; i < contrincantes.length; i++) {
            let c = contrincantes[i];
            c.colisionaConPelota = false;
        }
        setTimeout(() => {
            for (let i = 0; i < contrincantes.length; i++) {
                let c = contrincantes[i];
                c.colisionaConPelota = true;

            }
        }, tiempo)

    }


}