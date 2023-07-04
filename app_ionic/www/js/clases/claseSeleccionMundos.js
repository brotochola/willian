

var pantallaSeleccionMundos;

class SeleccionMundos {

    constructor(c) {
        console.log("CONSTRUCTOR SELECTOR DE MUNDOS")
        //el mundo q viene preseleccionado
        if (c == undefined || c == null) c = 1;

        $("#cantEstrellas").removeClass("mm")

        stage._transparent=false;

     

        this.destrabarMundo2=10
        this.destrabarMundo3=25
        this.destrabarMundo4=43
        this.destrabarMundo5=65


        this.cjs = new librerias["seleccionMundos"].seleccionMundo();



     //   this.cjs.scaleX=this.cjs.scaleY=document.getElementById("canvasCreateJs").width/1920
        this.habilitarNivelesSegunHastaDondeLlegaste()
        stage.removeChild(this.cjs)
        stage.addChild(this.cjs);
        
        this.cjs.botMenu.removeAllEventListeners()
        this.cjs.bot1.removeAllEventListeners()
        this.cjs.bot2.removeAllEventListeners()
        this.cjs.bot3.removeAllEventListeners()
        this.cjs.bot4.removeAllEventListeners()
        this.cjs.bot5.removeAllEventListeners()
        this.cjs.botPlay.removeAllEventListeners()


        this.cjs.botMenu.addEventListener("click", () => {
           this.volverAlMainMenu()
        });

        this.cjs.bot1.addEventListener("click", () => {
            this.cambiarWillian(1)
            this.botonPlay()
        });
        this.cjs.bot2.addEventListener("click", () => {
           if(this.maxMundoLlegado>=2) {
               this.cambiarWillian(2)
               this.botonPlay()
           }
        });
        this.cjs.bot3.addEventListener("click", () => {
            if(this.maxMundoLlegado>=3){
                  this.cambiarWillian(3)
                  this.botonPlay()
            }
        });
        this.cjs.bot4.addEventListener("click", () => {
            if(this.maxMundoLlegado>=4) {
                 this.cambiarWillian(4)
                 this.botonPlay()
            }
        });
        this.cjs.bot5.addEventListener("click", () => {
            if(this.maxMundoLlegado==5) {
                 this.cambiarWillian(5)
                 this.botonPlay()
            }
        });

        this.cjs.botPlay.addEventListener("click", ()=>this.botonPlay());
        usuario.actualizarMostradorDeEstrellas();

        this.cambiarWillian(c)
        $("#seleccionDeMundos").show()
        this.ponerNumerosEnCantidadEstrellas()
        if (!esApp()) audioW.reproducirMusica()

        if(iOS) createjs.Touch.enable(stage);
        else createjs.Touch.enable(stage, true, false); //multitouch, y allowdefault

    }

    botonPlay(){
        audioW.repro("entrarmundo")
        mostrarLoading();
        this.sacar();
        this.evaluarPonerIntroMundo(()=>{
            pantallaSeleccionNiveles = new SeleccionNiveles(this.mundoSeleccionado)
        });
        
    }

    evaluarPonerIntroMundo(cb){
    
      
        let introUsuario=usuario.intros[this.mundoSeleccionado-1];
        if(introUsuario==1) {
            //si ya lo viste sigue de largo
              if(cb instanceof Function) cb();
              return;
        }

        let n=usuario.niveles[this.mundoSeleccionado-1]
        

        if(!n.hasOwnProperty(0) || introUsuario==0){
            usuario.yaViIntro(this.mundoSeleccionado-1);
            let videoTutorial=$("video#tutorial")[0]
            videoTutorial.muted=false;
            videoTutorial.loop=false;
            $(videoTutorial).off()
            videoTutorial.src="img/intros/"+(this.mundoSeleccionado)+".mp4";
           //
           videoTutorial.oncanplaythrough=()=>{
                audioW.frenar("musicaMenu")
               $(videoTutorial).show();
                console.log("!!video can play through")
                ocultarLoading()
            }
        
            $(videoTutorial).on("ended", () => {
                console.log("termino video intro")
                $(videoTutorial).off().hide()
                videoTutorial.muted=true;
                if(cb instanceof Function) cb();

            });

        }else{
            if(cb instanceof Function) cb();
        }
    }

    ponerNumerosEnCantidadEstrellas(){
        $(".contEstre.m2").html(this.destrabarMundo2)
        $(".contEstre.m3").html(this.destrabarMundo3)
        $(".contEstre.m4").html(this.destrabarMundo4)
        $(".contEstre.m5").html(this.destrabarMundo5)
    }

    cambiarWillian(c) {
        audioW.repro("boton")
       
     
        this.mundoSeleccionado = c
        let strCielo = "cielo" + c
        let strBG = "fondo" + c

   

        this.cielo = new librerias["fondos"][strCielo]()
        this.bg = new librerias["fondos"][strBG]();
        this.cjs.cont.removeAllChildren();
        this.cjs.cont.scaleX=this.cjs.cont.scaleY=1;
        this.cjs.cont.addChild(this.cielo)
        this.cielo.y=-150;
        this.cjs.cont.addChild(this.bg)
        this.bg.x = 370
        this.bg.y = 630
        for (let i = 1; i < 6; i++) {
            if (c == i) this.cjs.willianSelMundos["w" + i].visible = true;
            else this.cjs.willianSelMundos["w" + i].visible = false;


        }


    }

    habilitarNivelesSegunHastaDondeLlegaste() {
        this.maxMundoLlegado = 1;
        let cantEstrellasUsuario = usuario.cantEstrellas()

        //LOS MUNDOS SE HABILITAN SEGUN LA CANTIDAD TOTAL DE ESTRELLAS OBTENIDAS

        setTimeout(() => {
            if (cantEstrellasUsuario >= this.destrabarMundo5) {
                this.maxMundoLlegado = 5;
                this.cjs.bot5.gotoAndStop(1)
                this.cjs.bot4.gotoAndStop(1)
                this.cjs.bot3.gotoAndStop(1)
                this.cjs.bot2.gotoAndStop(1)
                $(".contEstre").hide();

            } else  if (cantEstrellasUsuario >= this.destrabarMundo4) {
                this.maxMundoLlegado = 4;
                this.cjs.bot4.gotoAndStop(1)
                this.cjs.bot3.gotoAndStop(1)
                this.cjs.bot2.gotoAndStop(1)
                $(".contEstre").hide();
                $(".contEstre.m5 ").show();

                
            } else if (cantEstrellasUsuario >= this.destrabarMundo3) {
                this.maxMundoLlegado = 3;
                this.cjs.bot3.gotoAndStop(1)
                this.cjs.bot2.gotoAndStop(1)
                $(".contEstre").hide();
                $(".contEstre.m4, .contEstre.m5").show();
            } else if (cantEstrellasUsuario >= this.destrabarMundo2) {
                this.cjs.bot2.gotoAndStop(1)
                this.maxMundoLlegado = 2;
                $(".contEstre").hide();
                $(".contEstre.m5 , .contEstre.m3, .contEstre.m4").show();
            }
            console.log("llegaste hasta el mundo:::: " + this.maxMundoLlegado)
            this.mundoSeleccionado = this.maxMundoLlegado;
            this.cambiarWillian(this.maxMundoLlegado);
            this.cjs.bot1.gotoAndStop(1) //siempre esta habilitado
        }, 800);

     

        setTimeout(() => { $("#loading").hide() }, 1000);


    }


    sacar() {
        $("#seleccionDeMundos").hide()

        stage.removeAllChildren();
        $("canvas").hide()
    }



    mostrar(c) {

        $("#cantEstrellas").removeClass("mm")

        this.sacar()
        mostrarLoading()
        stage.addChild(this.cjs)
        createjs.Ticker.removeAllEventListeners()
        createjs.Ticker.addEventListener("tick", (e) => { stage.update() });
        $("#canvasCreateJs").show();
        this.habilitarNivelesSegunHastaDondeLlegaste()
        this.cambiarWillian(c)
        stage._transparent=false
        $("#seleccionDeMundos").show()
        this.ponerNumerosEnCantidadEstrellas()
        audioW.reproducirMusica()

        usuario.actualizarMostradorDeEstrellas();
    }


    volverAlMainMenu(){
        mostrarLoading()
        stage.removeAllChildren()
        $("#seleccionDeMundos").hide()
        mainMenu.mostrar()
    }


}