class Willian extends Jugador {













    constructor(w) {

        let strCuerpo = w.camiseta + String(w.cara.piel)

        let cuerpo = new librerias[w.camiseta][strCuerpo]();




        super(w, cuerpo)

        this.agujeroNegro = false

        this.tiro = {};
        this.coefFuerza = 5;

        this.step();

        

        this.pelotaEnElAirePorSombrerito = false;
        this.inhibirMecanismoQHaceSinPelota = false;

        setTimeout(() => { this.setupCara() }, 200)


        this.corriendoParaBicicleta = false;


        this.caja.m_shapeList.m_userData = this //guardo la referencia
        this.nombre = "willian"
        this.direccion = 1;
        this.esperandoPase = false;
        this.llegoAlArea = false;
        this.gambeta360Interrumpida = false;
        this.tiroSombrerito = false;
        this.esquivoContrincanteConSombrerito = false;
        this.cantidadDeSombreritos = 0;
        this.timeoutSombrerito;

        this.enPiso=this.estoyEnElPiso()

    } //constructor












    pressup() {
        // console.log(this.tiro.angulo)


        // console.log("WILLIAN PRESSUP")
        if (juegoW.ganaste || juegoW.perdiste) return;


        juegoW.velocidadNormal()

        this.fuerzaX = -Math.floor(Math.cos(deg2rad(this.tiro.angulo)) * this.tiro.fuerza * this.coefFuerza)
        this.fuerzaY = Math.floor(Math.sin(deg2rad(this.tiro.angulo)) * this.tiro.fuerza * this.coefFuerza)
        /* if(this.fuerzaX>750) this.fuerzaX=750;
         if(this.fuerzaY>750) this.fuerzaY=750;
         else if(this.fuerzaY<-750) this.fuerzaY=-750;*/

        this.tienePelota = this.tieneLaPelota()

        if (this.tiro.angulo > 0 && this.tiro.angulo < 90) {


            if (this.accion == "parado" && this.tienePelota == 1) return;

            this.saltar()
            this.caraSaltando()


        } else if (this.tiro.angulo > 90 && this.tiro.angulo < 270) {
            //STICK PARA ATRAS, PEGARLE...
            this.ejecutarTiro();
            this.inhibirMecanismoQHaceSinPelota=false;
            if (arco.caja.m_position.x - pelota.cuerpo.m_position.x > 3500) {
                arquero.lePegoWillianDeLejos = true;
            }
            arquero.estado = 1;

           setTimeout(()=> this.evaluarPatearCajas(),200);


        } else if (this.tiro.angulo > 270 && this.tiro.angulo < 360) {
            this.caraNormal()
            if (!this.llegoAlArea) {
                if (this.tienePelota == -1) {
                    this.cambiarAccion("barrida")
                    audioW.reproducirBarrida();
                }
            }
        }








    }

    evaluarPatearCajas(){
        let cajasAPatear=Caja.cajasCercaDeWillian();
        for(let i=0;i<cajasAPatear.length;i++){
            cajasAPatear[i].impulsar(this.fuerzaX, this.fuerzaY);
        }
    }

    mitadDeGambeta360() {

        if (this.gambeta360Interrumpida == false) {
            this.caja.m_linearVelocity.x = 1.3 * this.caja.m_linearVelocity.x;
            pelota.cuerpo.m_linearVelocity.x = this.caja.m_linearVelocity.x * 0.8;
            pelota.cuerpo.m_linearVelocity.y = 0;
            this.colisionaConPelota = true;
        }

    }
    terminoGambeta360() {
        //esto se ejecuta desde flash

        // pelota.cuerpo.m_position.x+=50; //la pelota se adelanta 50px
        // pelota.cuerpo.m_linearVelocity.x*=1.1// la velocidad de lao pelota aumenta 10%
        //  this.caja.m_position.x=pelota.getPos().x-120 //willian se posiciona 120px detras de la pelota
        //vuelve la colision entre willian y la pelota
        this.cambiarAccion(this.comoDecideDesplazarse); //pasa a corriendo
        this.gambeta360Interrumpida = false;


    }

    mitadDeLaGambetaSombrerito() {
        this.pelotaEnElAirePorSombrerito = true;
        this.tiroSombrerito = true;
        arquero.estado = 1;
        setTimeout(() => { this.pelotaEnElAirePorSombrerito = false }, 1000);
        //ACA LA PELOTA SALE PARA ARRIBA
        console.log("mitad del sombrerito!!!")
        pelota.cuerpo.m_linearVelocity.x = 285;
        pelota.cuerpo.m_linearVelocity.y = -300;



    }
    cambiarAccion(c) {
        

        if(c=="salto" || c=="barrida" || c=="barrido" || c=="gambeta360" || c=="sombrerito" || c=="bicicleta"){
            this.inhibirMecanismoQHaceSinPelota=true;   
        }
        //juegoW.ganaste || juegoW.perdiste) return;
      //  console.log(c)
        //SI ESTA EN EL AIRE SOLO PUEDE SALTAR O PEGARLE
        if (this.llegoAlArea) {
          
            if (this.tienePelota != 1) {
          
                if (c == "corriendo" || c == "caminando" || c == "trotando" || c == "gambeta360" || c == "barrida" || c == "barrido" || c == "bicicleta") {
                  
                    return;
                }
            }
        }


        //sobre carga de metodo :O
        if (c == "gambeta360") {
            if (this.tieneLaPelota() != 1) return; //si no tenes la pelota a la altura de los pies
            if (!this.estoyEnElPiso()) return; //o si willian no esta en el piso
            //  if(this.distContrincanteMasCercano
            pelota.cuerpo.y+=(pelota.estoyEnElPiso-pelota.cuerpo.y)/2

            this.colisionaConPelota = false;
            this.frDeLaGambeta360 = this.FRAMENUM;
            pelota.cuerpo.SetLinearVelocity(new b2Vec2(this.caja.m_linearVelocity.x / 4 + this.distanciaALaPelota(), 50))

            // console.log(this.caja.m_linearVelocity.Add)
            audioW.reproducirGambeta360()
            this.caja.m_linearVelocity.x = Math.floor(this.caja.m_linearVelocity.x / 4 + this.distanciaALaPelota())
            this.caja.m_linearVelocity.y = Math.floor(-canvasHeight + pelota.getPos().y + juegoW.altoPiso + 10);
           



        } else if (c == "bicicleta") {
           
            if (this.accion == "parado" || this.tienePelota!=1) return;

            this.inhibirMecanismoQHaceSinPelota = true
            setTimeout(() => this.inhibirMecanismoQHaceSinPelota = false, 2000);
            this.colisionaConPelota = false;
            // this.caja.m_position.x= pelota.cuerpo.m_position.x+120
            this.vectorCorriendo = new b2Vec2(this.propiedadesIniciales.velocidadMax * 1.6, 0)
            //setTimeout(()=>{  super.cambiarAccion(c)},500);
            this.corriendoParaBicicleta = true;
            audioW.reproducirSombrerito()
            
            return;


        } else if ((c == "festejo") || (c == "festejo2") || (c == "golFallado")) {
           // this.caja.SetLinearVelocity(new b2Vec2(0, 0));
            
        }

       
        //setTimeout(()=>{this.inhibirMecanismoQHaceSinPelota=false},1000)

        super.cambiarAccion(c)

    }

    eventoColisionConPelota() {
        if(this.corriendoParaBicicleta==true ) return false

        
        arquero.estado = 1;
    //this.inhibirMecanismoQHaceSinPelota=true;

        //si alguien la toca y ese alguien es willian, y habia hecho el sombrerito, se computa como un sombrerito bien hecho, en los meritos
        willian.chequearSiHizoSombrerito();
        if (pelota.getPos().x < this.getPos().x) {
            // alert("colision willian pelota desde atras")
            //mientras la pelota esta atras le pone agujero negro
            this.agujeroNegro = true;
            //y se lo saca en 250ms
            setTimeout(() => { this.agujeroNegro = false }, 250);
            return false;
        }



       return super.eventoColisionConPelota()
    }


     stats(){
        console.log("##accion=" + this.accion, "tienePelota=" + this.tienePelota, "comodecide=" + this.comoDecideDesplazarse, "coli=" + this.colisionaConPelota, pelota.noColisionaConNada, "velPelo=" + Math.floor(pelota.cuerpo.m_linearVelocity.x), "corriendPa=" + this.corriendoParaBicicleta, "inhi=" + this.inhibirMecanismoQHaceSinPelota, "agujeroNegro="+this.agujeroNegro)
    }

    verSiLaPelotaEstraAtrasEInhibir(){
        this.xW = this.getPos().x
        this.yW = this.getPos().y
        this.xP = pelota.getPos().x
        this.yP = pelota.getPos().y
        this.pelotaAtras = (this.xW + 100) > this.xP; 
        if(this.pelotaAtras) this.inhibirMecanismoQHaceSinPelota=false
       else this.inhibirMecanismoQHaceSinPelota=true
   
    }

    step() {
     //this.stats()
       // console.log(this.accion, this.estoyEnElPiso())
   

        if (this.agujeroNegro) Amigo.quitarAgujeroNegroATodos();

        if (this.accion == "gambeta360") {
            if (this.gambeta360Interrumpida == false) {
                let frGambeta360 = this.FRAMENUM - this.frDeLaGambeta360;
                //movimiento de willian mientras hace la gambeta 360
                // pelota.cuerpo.m_linearVelocity.x-=this.distanciaALaPelota()/10
                this.timeoutGambeta360 = setTimeout(() => {
                    pelota.cuerpo.m_position.x += (this.getPos().x - pelota.getPos().x) / 4 + frGambeta360 * 2
                }, juegoW.deltaTime)
                //this.caja.m_position.x+=((pelota.getPos().x-this.width/2)-this.caja.m_position.x)/10;
                // this.caja.m_position.y+= ((pelota.getPos().y-this.height*1.2)-this.caja.m_position.y)/3;
            } else {
                clearInterval(this.timeoutGambeta360)
            }

        } else if (this.accion == "barrida") {

            this.colisionaConPelota = true;
        }

        //AI DE WILLIAN!!!::    


        if (this.corriendoParaBicicleta == true || this.vectorCorriendo.x==this.vectorCorriendoParaSombrerito.x) {
            this.colisionaConPelota=false;
            if (this.getPos().x > pelota.getPos().x) {
                this.corriendoParaBicicleta = false;
                this.cjs.gotoAndPlay("bicicleta");
                this.vectorCorriendo = new b2Vec2(this.propiedadesIniciales.velocidadMax, 0)
            }
        }

        //CUANDO SALTAS SE PONE EN CAMARA LENTA EL JUEGO
        if (this.accion == "suspendidoEnElAire" || this.accion == "salto") {
            if (this.tienePelota == 2 || this.tienePelota == 3) {

                juegoW.willianEstaPorCabecearYSePoneCamaraLenta()
            }
        } else if (this.accion == "aterrizar") {
            juegoW.yaSePusoEnCamaraLentaSaltando = false;
            juegoW.velocidadNormal();
        }


        //  this.contrMasCercano = this.distContrincanteMasCercano();








        if (this.corriendoParaBicicleta != true 
            && !this.inhibirMecanismoQHaceSinPelota
             && juegoW.perdiste == false
              && juegoW.ganaste == false 
              && this.accion!="parado" 
              && this.accion!="gambeta360"
              && this.accion!="aterrizando"
              && this.accion!="aterrizar"
              && this.accion!="cayendoDeCulo"
              && this.recordarFestejo==false
              && this.estoyEnElPiso() 
              && this.tienePelota!=1 
              && this.FRAMENUM>60) 
              this.evaluarQueHacerSiNoTieneLaPelota()
       // else console.warn("!!!NO SE PONE MECANISMO DE Q HACER SIN PELOTA")

        
       // this.verSiLaPelotaEstraAtrasEInhibir()

        // SI WILLIAN TIENE LA PELOTA DEBAJO DE EL
        /*  if(this.getPos().y+this.height/2<pelota.getPos().y-pelota.height){
                if(this.accion!="gambeta360"){
                    this.caja.m_linearVelocity.x*=0.9
                    pelota.cuerpo.m_linearVelocity.x++
                }
            }*/







        if (this.esperandoPase && pelota.cuerpo.m_position.x > this.caja.m_position.x + 100) {
            this.recibirPase();
            this.esperandoPase = false;
        }


        this.evaluarSiLlegoAlAreaChicaYFrenar()
        // console.log(this.caja.m_linearVelocity)




    } //step

    evaluarQueHacerSiNoTieneLaPelota() {

        this.xW = this.getPos().x
        this.yW = this.getPos().y
        this.xP = pelota.getPos().x
        this.yP = pelota.getPos().y
        let pelotaAtras = (this.xW + 120) > this.xP; 
      

        if (pelota.cuerpo.m_linearVelocity.x < 0 ) {
            this.inhibirMecanismoQHaceSinPelota=true;
            return; //si la pelota va para la izq no hacer esto
        }

        let tiempoPelota = ((this.xW - this.xP) / pelota.cuerpo.m_linearVelocity.x)

        if(!pelotaAtras){
         //   this.inhibirMecanismoQHaceSinPelota=true;
          //  return
        
        }
        

            if (tiempoPelota>-1.5) {
                
               
                if (tiempoPelota > 0 && tiempoPelota < 0.5) {
                    if (this.accion == "corriendo") this.cambiarAccion("trotando")
                    else if (this.accion == "trotando") this.cambiarAccion("caminando")

                } else if (tiempoPelota > 0.5) {
                    if (this.comoDecideDesplazarse == "corriendo" || this.comoDecideDesplazarse == "trotando") {
                        this.cambiarAccion("caminando")
                        this.comoDecideDesplazarse="corriendo";
                    }

                }
            } else {
                //tiempoPelota es menor a 0
                //SI LA PELOTA ESTA ADELANTE DE WILLIAN
             
                if (tiempoPelota < -1.5 && tiempoPelota > -2.5) {
                    if ( this.accion == "caminando" ) this.cambiarAccion("trotando")
                    else if(this.accion == "trotando" )  this.cambiarAccion("corriendo")

                } else if (tiempoPelota < -2.5) {
                    if (this.comoDecideDesplazarse == "corriendo" || this.comoDecideDesplazarse == "trotando" || this.comoDecideDesplazarse=="caminando")  {
                        this.cambiarAccion(this.comoDecideDesplazarse)
                        

                        
                    }

                }
               
               

           
                
            }


        
    } //q hace cuando no tiene la pelota

    distContrincanteMasCercano() {
        let contrincanteMasCercano = 9999999999;
        let xW = this.getPos().x

        for (let i = 0; i < contrincantes.length; i++) {
            let c = contrincantes[i];

            if (c.x > xW && (c.x - xW) < contrincanteMasCercano) {
                contrincanteMasCercano = c.x - xW
            }
        }
        return contrincanteMasCercano;
    }

    irABuscarPase() {
        this.inhibirMecanismoQHaceSinPelota=false;
        let dondeCaePelota = pelota.calcularDondeVaACaerLaPelota();
        let distanciaWillianPelota = dondeCaePelota - willian.getPos().x;
        let velocidadALaQueTieneQueCorrer = this.vectorCorriendo.x;

        // alert(dondeCaePelota+", "+distanciaWillianPelota+","+velocidadALaQueTieneQueCorrer)
        //  console.log("la pelota va a caer a esta distanciad de willian: "+distanciaWillianPelota.toString());

        if (distanciaWillianPelota > 0) {
            this.esperandoPase = true;
            let tiempoEnLlegar = (dondeCaePelota - pelota.cuerpo.m_position.x) / pelota.cuerpo.GetLinearVelocity().x;
            velocidadALaQueTieneQueCorrer = distanciaWillianPelota / tiempoEnLlegar;

            //  console.log("tiempo en llegar: "+tiempoEnLlegar.toString());

            if (velocidadALaQueTieneQueCorrer < this.vectorCorriendo.x) {
                if (velocidadALaQueTieneQueCorrer > 100) {
                    this.vectorCorriendo = new b2Vec2(velocidadALaQueTieneQueCorrer, 0);
                }
                else this.vectorCorriendo = new b2Vec2(100, 0);
            }

            this.colisionaConPelota = false;
        }
        else this.velocidadMax = 0;
    }

    recibirPase() {
        this.vectorCorriendo = new b2Vec2(this.propiedadesIniciales.velocidadMax, 0);
        this.colisionaConPelota = true;
    }

    // Este evento se da cuando willian pasa por al lado de un contrincante
    pasaAContrincante() {
        if (this.tiroSombrerito) {
            this.esquivoContrincanteConSombrerito = true;
        }
        setTimeout(() => { this.tiroSombrerito = false; }, 1000);
    }

    chequearSiHizoSombrerito() {
        if (juegoW.ultimoEnTocarla instanceof Willian && this.esquivoContrincanteConSombrerito) {
            console.log("Sombrerito exitoso!!");
            this.cantidadDeSombreritos++;
            usuario.meritos.registrarSombrerito();
            if (this.timeoutSombrerito != null) {
                clearTimeout(this.timeoutSombrerito);
            }
            this.timeoutSombrerito = setTimeout(() => { this.cantidadDeSombreritos = 0; usuario.meritos.volverACeroSombreritos(); }, 8000);
        }
        this.esquivoContrincanteConSombrerito = false;
    }

   

}