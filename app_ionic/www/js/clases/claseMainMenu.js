console.log("claseMainMenu.js")

class MainMenu {

    constructor() {



        traerComp.traerFondosArqueroYCabeza(()=>{  this.ponerListenersABotones()})
      
        new traerComp("seleccionMundos", "xfl_seleccionMundos.js", "seleccionMundos", (e)=>{
                

        this.cjs = new librerias["lib_original"].mainMenu();
        this.cjs.w1.removeAllChildren()
        //let r=Math.floor(Math.random()*5)+1
        this.cjs.w1.addChild(new librerias["seleccionMundos"].w5())
        stage.addChild(this.cjs);

        if (esApp()) audioW.reproducirMusica()


      
    
        
        createjs.Ticker.removeAllEventListeners()
        createjs.Ticker.addEventListener("tick", function () { stage.update() });
        usuario.actualizarMostradorDeEstrellas();
        this.evaluarPonerFondoODejarlo()

        setTimeout(()=>{
            //$("video")[0].src="img/fondo_brasil.mp4"
            console.warn("!!!! termino de cargar mainmenu")
            evaluarFinVideoIntro()
          
        },1000);

        })




    }

    ponerListenersABotones(){
        $("#mainmenu #tienda").off().click(() => {
            audioW.repro("boton")
            alert("no disponible")
        });
        $("#mainmenu #config").off().click(() => {
            audioW.repro("boton")
            alert("no disponible")
        });
        $("#mainmenu #avatar").off().click(() => {
            audioW.repro("boton")
            alert("no disponible")
        });
        $("#mainmenu #tienda").off().click(() => {
            audioW.repro("boton")
            alert("no disponible")
        });
        $("#mainmenu #audio").off().click(() => {
            audioW.repro("boton")
             audioW.mute()
           
        });

        $("#mainmenu #campaign").off().click(() => {
            audioW.repro("boton")
            //esta es global, deberia ser un array o algo asi
            pantallaSeleccionMundos = this.irASeleccionDeMundo()
        });
    }
    evaluarPonerFondoODejarlo(){
        //SI VENIS DE OTRA PANTALLA, O SEA Q NO ESTA ARRANCANDO DE UNA LA APP, PONGO EL FODNO
       /* let t=$("video#fondo")[0].src.substr($("video#fondo")[0].src.length-10,10)        
       if( t!="brasil.mp4")*/ $("video#fondo")[0].src="img/fondo_brasil.mp4"
    }

    mostrar() {
        $("#cantEstrellas").removeClass("mm").addClass("mm")

        this.evaluarPonerFondoODejarlo()
        $("#mainmenu").show();
        stage._transparent=true
        $("video#fondo").show();
        stage.addChild(this.cjs);
        setTimeout(ocultarLoading,500)
    }



    irASeleccionDeMundo(c) {
    
        //c es cual viene preseleccionado

    

   
           $("#loading").show();
      
            this.sacar();
            $("video").hide();
            
            pantallaSeleccionMundos=   new SeleccionMundos(c);
            return pantallaSeleccionMundos
        
    }

    sacar() {
        $("#cantEstrellas").removeClass("mm")
        // this.video.src = "";
        stage.removeAllChildren()
      //  createjs.Ticker.removeAllEventListeners()

        $(" seccion#mainmenu").hide();
    }




}