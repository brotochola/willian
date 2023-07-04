class AudioWillian {

	constructor(arc, alturapiso) {

		//alert("constructor clase audio")

		this.muted=false;
		this.arrAudios=[]

		this.getAudio("pix")
		this.getAudio("patear1")
		this.getAudio("patear2")
		this.getAudio("boton");
		this.getAudio("saltar");
		this.getAudio("entrarmundo");
		this.getAudio("caeculo");
		this.getAudio("aterrizar");
		this.getAudio("agarrarestrella");
	

		this.getAudio("aplausos");
		this.getAudio("startlevel");

		this.getAudio("GAMBETA_BICICLETA");
		this.getAudio("GAMBETA_360");		
		this.getAudio("BARRIDA");
		this.getAudio("atajada");
		this.getAudio("palo");
	//	this.getAudio("rebote");
		this.getAudio("musicaMenu");

		this.getAudio("bgJuego");
		this.getAudio("LEVEL_END_GOL_1STAR");
		this.getAudio("LEVEL_END_GOL_2STAR");
		this.getAudio("LEVEL_END_GOL_3STAR");
	
		this.getAudio("slomo");
		this.getAudio("slomo0");
		

		//audios nuevos 2020:
		this.getAudio("madera1");
		this.getAudio("madera2");
		this.getAudio("madera3");
		this.getAudio("CALABAZA_DEFAULT")
		this.getAudio("CALABAZA_GANA")
		this.getAudio("CALABAZA_INICIA")
		this.getAudio("CALABAZA_RECIBE-GOLPE")

		this.getAudio("ROBOT_DEFAULT")
		this.getAudio("ROBOT_GANA")
		this.getAudio("ROBOT_INICIA")
		this.getAudio("ROBOT_RECIBE-GOLPE")

		this.getAudio("ALIEN_DEFAULT")
		this.getAudio("ALIEN_GANA")
		this.getAudio("ALIEN_INICIA")
		this.getAudio("ALIEN_RECIBE-GOLPE")

		this.getAudio("AUTO_DEFAULT")
		this.getAudio("AUTO_GANA")
		this.getAudio("AUTO_INICIA")
		this.getAudio("AUTO_RECIBE-GOLPE")

		this.getAudio("DRAGON_DEFAULT")
		this.getAudio("DRAGON_GANA")
		this.getAudio("DRAGON_INICIA")
		this.getAudio("DRAGON_RECIBE-GOLPE")

		this.getAudio("EXPLOTA_MONSTRUO")


	}
	frenarTodo(){
		

		for(let i=0;i<this.arrAudios.length;i++){
		   try{	this.frenar(this.arrAudios[i])}catch(e){console.log(e)}
		}
	}
	mute(c){
		if(this.muted==false) {
			this.muted=true
			this.frenarTodo()
		}
		else {
			this.muted=false
			this.reproducirMusica()
		}
		//alert(this.muted)
		if(this.muted){
			$("#mainmenu #audio").addClass("off")
		}else{
			$("#mainmenu #audio").removeClass("off")

		}
	}

	frenar(c){
		//if(iOS) return;
		if (esApp() && !iOS) window.plugins.NativeAudio.stop(c);
		else{
			try{
				this[c].pause();
				this[c].loop=false;
			}catch(e){}
		}
	}

	frenarTodoLosAudiosDefaultDeLosMonstruos(){
		this.frenar("DRAGON_DEFAULT")
		this.frenar("ALIEN_DEFAULT")
		this.frenar("AUTO_DEFAULT")
		this.frenar("CALABAZA_DEFAULT")
		this.frenar("ROBOT_DEFAULT")
		try{
			this["DRAGON_DEFAULT"].loop=false;
			this["ALIEN_DEFAULT"].loop=false;
			this["AUTO_DEFAULT"].loop=false;
			this["CALABAZA_DEFAULT"].loop=false;
			this["ROBOT_DEFAULT"].loop=false;
		}catch(e){}
	}

	repro(c,loop, vol){
		if(c==undefined || c=="" || c==null) return;
		if(this.muted==true) return
		//console.log(c,vol)

		if(vol==undefined) vol=1;
		else if(vol>1) vol=1
		else if(vol<0) vol=0.05;

		//if(iOS) return;
		if (esApp() && !iOS) {
			if(loop==true) window.plugins.NativeAudio.loop(c);
			else window.plugins.NativeAudio.play(c);
			window.plugins.NativeAudio.setVolumeForComplexAsset(c, vol)
		}
		else{
			try{this[c].volume=vol
		if(loop==true) this[c].loop=true;
			else this[c].loop=false;

			
			this[c].currentTime=0;
			this[c].play();
		}catch(e){
			lowLag.play(c)
		}
			

			
		
		}
	}


	startLevel(){
		//if(iOS) return;
		this.repro("startlevel")
	}
	reproducirBarrida()
	{
		//if(iOS) return;
		this.repro("BARRIDA");
	
	}
	reproducirSombrerito(){
		//if(iOS) return;
		this.repro("GAMBETA_BICICLETA")
		setTimeout(()=>this.repro("aplausos"),400)
	}
	reproducirColisionPelotaJugador(){//if(iOS) return;
		this.repro("patear2")
		
	}
	reproducirGambeta360(){//if(iOS) return;
		
		this.repro("GAMBETA_360");
		setTimeout(()=>this.repro("aplausos"),400)
	}
	reproducirSonidoSaltar() {//if(iOS) return;
		this.repro("saltar")
	}
	reproducirMusica() { //if(iOS) return;
		//if(iOS) return;
		if(this.muted) return
		if (esApp() && !iOS) window.plugins.NativeAudio.stop("bgJuego");
		else{
			this.bgJuego.pause(); 
		}
		if (esApp() && !iOS){
			window.plugins.NativeAudio.stop("bgJuego");
			window.plugins.NativeAudio.loop('musicaMenu');
			}
		else{
			this.musicaMenu.loop=true;

			this.musicaMenu.play();
		}
	}
	reproducirBgJuego() {//if(iOS) return;
		if(this.muted) return
		if (esApp() && !iOS) window.plugins.NativeAudio.stop("musicaMenu");
		else{
			this.musicaMenu.pause();
		}
		
		if (esApp() && !iOS){
			window.plugins.NativeAudio.stop("musicaMenu");
			window.plugins.NativeAudio.loop('bgJuego');
		}
		else{
			this.bgJuego.loop=true;
			this.bgJuego.play();
		}
	}


	getAudio(name,segundoNombre) {//if(iOS) return;

		if(segundoNombre==undefined || segundoNombre==null) segundoNombre="";
	
	

		if (esApp() && !iOS) {
			window.plugins.NativeAudio.preloadComplex(name+segundoNombre, 'audio/' + name + '.mp3', 1,1,0, ()=>{}, function (msg) {
				//alert(name+segundoNombre+".mp3 cargado ok")
			}, function (msg) {
				//alert("no encontro el mp3 "+name+segundoNombre)
				window.plugins.NativeAudio.preloadComplex(name+segundoNombre, 'audio/' + name + '.ogg',1,1,0, ()=>{},  function (msg) {
				}, function (msg) {
					window.plugins.NativeAudio.preloadComplex(name+segundoNombre, 'audio/' + name + '.wav',1,1,0, ()=>{},  function (msg) {
					}, function (msg) {
						console.log(msg)
					});
				});
			});
		}else{

			if(name=="musicaMenu" || name=="bgJuego"){
				this[name]=new Audio("audio/"+name+".mp3");
				this[name].loop=true;
			
			}else{

				lowLag.load("audio/"+name+".mp3",name+segundoNombre)
			}
			/*
			try{
				this[name+segundoNombre]=new Audio("audio/"+name+".mp3")
				
			}catch(e){
				try{
					this[name+segundoNombre]=new Audio("audio/"+name+".wav")
				}catch(e){
					console.warn("NO SE ENCONTRO EL AUDIO "+name+segundoNombre)
				}
			}
			this[name+segundoNombre].preload="auto";
			*/
		}
		this.arrAudios.push(name+segundoNombre)
	}


	reproducirSonidoPateo(vol) {//if(iOS) return;
		// Obtengo un sonido aleatorio 
		var rnd = Math.floor(Math.random() * 2);

		if (isNaN(vol)) {
			vol = 0.6;
		}

		if (vol > 1) {
			vol = 1;
		}
		else if (vol < 0.1) {
			vol = 0.1;
		}
		this.repro("patear1")
		// this.sonidoPateo[rnd].volume = vol;
		//  this.sonidoPateo[rnd].play();
	}
	gol(n){//if(iOS) return;
		this.repro("LEVEL_END_GOL_"+n+"STAR");
	
	
	}
	reproducirPalo() {//if(iOS) return;
		this.repro("palo")
	}

	reproducirSonidoAtajada() {//if(iOS) return;
		this.repro("atajada")
	}

	reproducirSonidoRebote() {//if(iOS) return;
	//	this.repro("rebote');

	}
}