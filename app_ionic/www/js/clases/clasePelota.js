class Pelota {


    constructor(x, y, fuerzaX, fuerzaY, angularVel, aQueVelocidadDejaDeColisionar) {

        this.cantFramesParaPerder=220
        this.height = 60;
        this.activarDestellos = false //en true los activa, dah
        this.cuerpo = this.createBall(x, y);
        this.cuerpo.SetLinearVelocity(new b2Vec2(fuerzaX, fuerzaY));
        if (!isNaN(angularVel)) this.cuerpo.SetAngularVelocity(angularVel);
        else this.cuerpo.SetAngularVelocity(0);
        this.hierba=new librerias["lib_original"].hierba();
        this.cjs = new librerias["lib_original"].pelota();
        this.coefFuerza = 1.5;
        this.estelas = []
        this.quienLePego=undefined
        this.FRAMENUM = 0;
        this.lineaPiso = 844;
        this.lePegoWillian = false;
        this.estaDentroDelArea = false;
        this.contadorPerdiste=0;
        this.contarParaPerder=false
        this.aQueVelocidadDejaDeColisionar = aQueVelocidadDejaDeColisionar 
        if(this.aQueVelocidadDejaDeColisionar==undefined || this.aQueVelocidadDejaDeColisionar==null) this.aQueVelocidadDejaDeColisionar=900
        this.noColisionaConNada = false;

        this.cuerpo.m_shapeList.m_userData = this //guardo la referencia
        
        this.sombra = new librerias["lib_original"].sombra();
        
        this.sombra.y = 870;
        this.sombra.scaleX = this.sombra.scaleY = 0.4
        this.distanciaParaPerder = 800
        this.ponerSombraPelota()
        
        console.log(this.aQueVelocidadDejaDeColisionar)
    }

    pegarle(x, y, quien) {
        if(isNaN(x)){
             console.log(quien, "le pego y queod la pelota en NAN")
           //  debugger;
           x=Math.random()*100-50
           y=Math.random()*100-50

            

        }

        let changuiXPow=30
        if(quien instanceof Willian || quien instanceof Amigo) changuiXPow=-30
        else{
            willian.colisionaConPelota=false
            setTimeout(()=>willian.colisionaConPelota=true,350)
        }
        this.pow=new librerias["lib_original"].pow()
        nivel.addChild(this.pow);
        this.pow.x=this.getPos().x+changuiXPow
        this.pow.y=this.getPos().y-50       
        this.pow.rotation=Math.floor(Math.random()*200 )
        this.pow.gotoAndPlay(0);
        this.pow.scaleX=this.pow.scaleY=0.85

        audioW.reproducirSonidoPateo()
        //LA PELOTA GUARDA POR 100ms QUIEN FUE EL ULTIMO EN PEGARLE
        this.quienLePego = quien;
        juegoW.ultimoEnTocarla = quien;
        quien.leAcaboDePegar = true;
        setTimeout(() => {
            pelota.quienLePego = null;
        }, 850)


        //  console.log("## pegarle "+x+" "+y)
        let velXPelota = pelota.cuerpo.m_linearVelocity.x
        if (velXPelota < 0) velXPelota = 0;
        let velX = /*velXPelota */+ x * this.coefFuerza
        let velY = y * this.coefFuerza;
        // console.log(velX, velY)
   
        this.cuerpo.SetLinearVelocity(new b2Vec2(velX, velY));
        this.cuerpo.SetAngularVelocity((-x * 0.005));



        this.dondeVaACaerLaPelota = this.calcularDondeVaACaerLaPelota();


        if (velX > 0) {
            arquero.estado = 1; //el arquero se pone atento pq le pegaron a la pelota.
            setTimeout(() => { if (arquero.estado == 1) arquero.estado = 0 }, 3000);
        }

        willian.colisionaConPelota = true
    }

    calcularDondeVaACaerLaPelota() {
     //   this.siLaVelocidadEsNaNQueSeaCero()
        this.lePegoWillian = false;
        let posicionInicial = this.getPos().Copy();
        let velocidadInicial = this.cuerpo.m_linearVelocity;

        let alturaALaQueElArqueroLlega = arquero.caja.m_position.y + arquero.vectorSalto.y - arquero.height / 2;

        let distanciaEnX = velocidadInicial.x * 2 * velocidadInicial.y / juegoW.gravity.y;
        let posicionEnXArqueroAtaja = posicionInicial.x - distanciaEnX;

      

        /////////////////////

        // Se va atrás del arco
        /*   if (posicionEnXArqueroAtaja > arco.x)
           {
               posicionEnXArqueroAtaja = arco.x - arquero.distanciaQueSeAdelanta;
           }
           else
           {
               // Pica antes del area grande
               if (posicionEnXArqueroAtaja < arco.x - 700)
               {
                   posicionEnXArqueroAtaja = arco.x - 700;
               }
           }*/
        // arquero.caja.m_position.x = posicionEnXArqueroAtaja;



        /* 
        //CON ESTO MARCAMOS UN DETELLO DONDE EL ARQUERO LA PUEDE AGARRAR.
        //EN EL RECORRIDO DE LA PELOTA, CUANDO PASE POR UN PUNTO EN EL CUAL EL ARQUERO LLEGUE SALTANDO
        //A ESA X DEBERÁ IR EL ARQUERO 
           var destello = new librerias["lib_original"].destello();
           destello.x = posicionEnXArqueroAtaja;
           destello.y = alturaALaQueElArqueroLlega;
           console.log(destello.x,destello.y)
           nivel.addChild(destello);*/





       
        return posicionEnXArqueroAtaja;


    }





    createBall(x, y) {
        var ballSd = new b2CircleDef();
        var ballBd = new b2BodyDef();

        var body = world.CreateBody(ballBd)


        ballSd.density = 0.5;
        ballSd.radius = this.height / 2;

        ballSd.restitution = 0.5; //rebotabilidad
        ballSd.friction = 0.5;


        //body.m_maskBits=2
        // body.m_groupIndex=-1

        ballBd.AddShape(ballSd);

        ballBd.position.Set(x, y);
        return world.CreateBody(ballBd);
    }
    /*
    var kindA = -1;
    var kindB = -2;
    
    var bodyDef = new b2BodyDef();
    var body = world.CreateBody(bodyDef);
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = new b2Shape();
    fixtureDef.filter.groupIndex =
        entity instanceof EntityA
            ? kindA
            : kindB;
    body.CreateFixture(fixture);
    */

    estoyEnElPiso() {
        return this.getPos().y > this.lineaPiso;
    }

    lePegaALaEstrella() {

        let pel = this.getPos()
        let dista = dist(pel.x, pel.y, juegoW.nivel.estrella.x, juegoW.nivel.estrella.y);
        // console.log(dista);
        if (dista < 150) {
            this.estrellaAgarrada = true;
            juegoW.seAgarroLaEstrella();
        }

    }
    limitarVelocidadCheater(){
        //gol de arco a arco
       /* if(this.getPos().y<500 && this.cuerpo.m_linearVelocity.y<0 && this.cuerpo.m_linearVelocity.x>700) {
            this.cuerpo.m_linearVelocity.y*=0.95
            this.cuerpo.m_linearVelocity.x*=0.95
        }*/
     }

    step() {
       
        if (juegoW.ganaste || juegoW.perdiste) {
            this.m_position = this.posFinalPelota;
            return;
        }
     
       
        //EVITAR GOLES DE ARCO A ARCO
       this.limitarVelocidadCheater()

        //ESTO ES LA LOGICA DE VER SI SE AGARRO O NO LA ESTRELLA DEL NIVEL
        if (this.estrellaAgarrada != true) if (juegoW.FRAMENUM % 2 == 0) this.lePegaALaEstrella()

        if (this.cuerpo.m_position.x > arco.limiteArea) {
            this.estaDentroDelArea = true;
        }
        else this.estaDentroDelArea = false;

        this.dondeEstaraEn250 = this.getPosFutura(1.5);


        /*
                var destello = new librerias["lib_original"].destello();
                destello.scaleX=destello.scaleY=0.2
                nivel.addChild(destello)
                destello.x = this.dondeEstaraEn250.x;
                destello.y = this.dondeEstaraEn250.y;
        */


        // console.log(this.getPos().y,(canvasHeight- juegoW.altoPiso-130))
        //FUERZO Q LA PELOTA NUNCA BAJE DE LA LINEA Q DEBERIA BAJAR
        if (this.getPos().y > (canvasHeight - juegoW.altoPiso - 130)) {
            this.cuerpo.m_position.y = canvasHeight - juegoW.altoPiso - 130
            // console.log("LA PELOTA TOCO EL PISO EN "+this.getPos().x)
        }




        this.distanciaAlArco = this.getPos().x - arco.x;
        // console.log(Math.floor(this.distanciaAlArco), Math.floor(this.getPos().x),Math.floor( arco.x))
        if (this.distanciaAlArco > 50 && this.distanciaAlArco < arco.largoArco && this.getPos().y > arco.alturaTravesanio - 20) {
            // GOLLL!!

            juegoW.gol()
            this.posFinalPelota = this.getPos().Copy();

            this.cuerpo.m_linearVelocity.Multiply(0.5) //para q la pelota no se escape mucho y no mueva la camara

        } else if (this.distanciaAlArco > 50 && this.getPos().y < arco.alturaTravesanio) {
            // console.log("## SE TE FUE!")
            juegoW.seFueLaPelota()
            this.posFinalPelota = this.getPos().Copy();
        }

        this.cuerpo.SetAngularVelocity(this.cuerpo.m_angularVelocity * 0.99);

        this.evaluarAgujerosNegros()

        this.evaluarGanarPerderPorPosicion()
        
        
       
        if(!(Math.abs(this.cuerpo.m_linearVelocity.x)<50 && Math.abs(this.cuerpo.m_linearVelocity.y)<50)){
            //si la pelota va rapido
           // console.log(1)
            this.contadorPerdiste=0
            if(this.FRAMENUM>this.cantFramesParaPerder)  this.contarParaPerder=true;
        }else{
         //   console.log(0)
            if(this.contarParaPerder==true && willian.tienePelota!=1){
                this.contadorPerdiste++
                if(this.contadorPerdiste>120){
                    juegoW.seFueLaPelota()
                }
            }
        }
    }

    siLaVelocidadEsNaNQueSeaCero(){
        if(isNaN(this.cuerpo.m_linearVelocity.x)){
            this.cuerpo.m_linearVelocity.x=50;
            this.cuerpo.m_linearVelocity.y=-120;
            console.log("### pelota nan!!!!!!")
        }
    }

    evaluarGanarPerderPorPosicion() {
        //VEMOS SI LA PELOTA QUEDO ATRAS DE WILLIAN, Y ADEMAS SI NO HAY NINGUN AMIGO ATRAS DE ELLA
        if (this.getPos().x < willian.getPos().x - this.distanciaParaPerder) {

            let todoBien = false;
            for (let i = 0; i < amigos.length; i++) {
                if (this.getPos().x > amigos[i].getPos().x - this.distanciaParaPerder) {
                    if (amigos[i].cantVecesHizo < amigos[i].propiedadesIniciales.cantDeVecesQHace)    todoBien = true
                
                }
            }
            //// PERDISTE
            if (todoBien == false) juegoW.seFueLaPelota()
        }
    }
    

    evaluarAgujerosNegros() {
        let changuiX = 50;
        let coefAmigos=2
        let velocidadAmigos = 0.5
        if (willian.agujeroNegro == true) {
            let distX = this.getPos().x - (willian.getPos().x + 50)
            this.cuerpo.m_linearVelocity.x -= distX / 40
        } else {
            for (let i = 0; i < amigos.length; i++) {
                if (amigos[i].agujeroNegro == true && willian.tienePelota!=1 && willian.tienePelota!=2) {
                  //  console.log(amigos[i].nombre+" TIENE AGUJERO NEGRO")
                    if(amigos[i].accion=="corriendo") coefAmigos=10
                    let distX = this.getPos().x - (amigos[i].getPos().x + changuiX * coefAmigos)
                    //v=d/t
                   
                    this.cuerpo.m_linearVelocity.x = (this.cuerpo.m_linearVelocity.x- (distX / velocidadAmigos))  /5
                }
            }

        }
    }

    getPos() {
        return this.cuerpo.m_position
    }

    // Obtengo la posición después de un tiempo t (en frames o steps mas bien)
    getPosFutura(t) {
        let posX = this.cuerpo.m_position.x;
        let posY = this.cuerpo.m_position.y;
        let velX = this.cuerpo.m_linearVelocity.x;
        let velY = this.cuerpo.m_linearVelocity.y;

        let posFutura = this.getPos().Copy();
        posFutura.x = posX + velX * t; // La posición futura de la pelota es igual a la posición inicial más velocidad por tiempo

        // Calculo la altura según el tiempo t y la velocidad inicial
        posFutura.y = posY + velY * t + 0.5 * juegoW.gravity.y * Math.pow(t, 2);


        return posFutura;
    }

    eventoRebotaContraElPiso(){
        this.vl=this.getVelLineal();
       // console.log("!!!!!!! "+this.vl)
        if(this.cuerpo.m_linearVelocity.y>120)   audioW.repro("patear2");

        if(this.vl>300){
          
            this.hierba=new librerias["lib_original"].hierba();
            this.hierba.x=pelota.getPos().x
            this.hierba.y=pelota.getPos().y+15
            this.hierba.scaleX=this.hierba.scaleY=2
            nivel.addChild(this.hierba);
          
            
        }else if(this.vl<28){
            this.cuerpo.m_linearVelocity.y=0;
        }
        // Una vez que pegó en el suelo y rebotó, vuelvo a calcular donde va a caer
        setTimeout( () => { if(juegoW.hasOwnProperty("fps")) this.dondeVaACaerLaPelota = this.calcularDondeVaACaerLaPelota() }, 200);
     }
    getVelLineal(){
        return Math.sqrt(this.cuerpo.m_linearVelocity.x*this.cuerpo.m_linearVelocity.x+this.cuerpo.m_linearVelocity.y*this.cuerpo.m_linearVelocity.y)
    }
    noColisionarPorTresSegundos() {
        this.noColisionaConNada = true;
        setTimeout(() => {
            this.noColisionaConNada = false;
        }, 3000);
    }


    render() {

        


        this.step();
        this.FRAMENUM++

        if (this.activarDestellos && this.FRAMENUM % 2 == 0) {
            // var shape = new createjs.Shape();
            // shape.graphics.beginFill("#ffffff55").drawCircle(this.cuerpo.m_position.x, this.cuerpo.m_position.y, 30);
            var destello = new librerias["lib_original"].destello();
            destello.x = this.cuerpo.m_position.x;
            destello.y = this.cuerpo.m_position.y;

            destello.alpha = 0.6
            createjs.Tween.get(destello)
                .wait(0)
                .to({ alpha: 0, visible: false }, 1500)
                .call(function () {
                    nivel.removeChild(this)
                });
            nivel.addChildAt(destello, 1)
            this.estelas.push(destello)
        }

        //  console.log(shape)


        this.cjs.x = fl(this.cuerpo.m_position.x);
        this.cjs.y = fl(this.cuerpo.m_position.y);
        this.cjs.pelotaGiratoria.rotation = rad2deg(this.cuerpo.m_rotation);
        this.ponerSombraPelota();
   
        //  console.log(porcPelota, this.sombra.scaleX);
        // this.cjs.setIndex(0)
    }
    ponerSombraPelota(){
        let anchoSombra = this.sombra.nominalBounds.width * this.sombra.scaleX / 100;
        this.sombra.x = this.cuerpo.m_position.x 
        let porcPelota = porcentaje(900, -500, this.getPos().y)
        this.sombra.scaleY = this.sombra.scaleX = mapear(porcPelota, 40, 25) / 100;
    }

    distanciaAWillian() {
        return (willian.getPos().x - this.getPos().x)
    }

}
/*
function createBall(world, x, y) {
    var ballSd = new b2CircleDef();
    ballSd.density = 1.0;
    ballSd.radius = 20;
    ballSd.restitution = 1.0;
    ballSd.friction = 0;
    var ballBd = new b2BodyDef();
    ballBd.AddShape(ballSd);
    ballBd.position.Set(x,y);
    return world.CreateBody(ballBd);
}
*/