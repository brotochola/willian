class Arco{
	
	constructor(arc, alturapiso){
console.log("## ARC.X="+arc.x)
		this.x=arc.x
		this.alturaTravesanio=450;
		this.largoArco=450;
		this.cjs=new librerias["lib_original"].arco();
		this.cjs.x=arc.x
		this.cjs.y=this.alturaTravesanio-20;
		this.caja = this.createBox(this.x+15, this.alturaTravesanio-25);
        this.caja2=this.crearPaloDeAtras();
      
		this.caja3=this.crearCajaFantasma();
        this.arcoAtrasCJS=new librerias["lib_original"].arcoAtras();
        this.arcoAtrasCJS.x=arc.x
       this.arcoAtrasCJS.y=  this.alturaTravesanio-20;
		//this.caja3=this.crearPaloTorcido();
       this.caja.m_shapeList.m_userData = this //guardo la referencia
       this.caja2.m_shapeList.m_userData = "arcoAtras" //guardo la referencia
       this.areaGrande=new librerias["lib_original"].areaGrande();
       this.areaGrande.x=arc.x//-800     
       this.areaGrande.y=780//780
     
       this.circuloCentral=new librerias["lib_original"].circuloCentral();      
       this.posXCirculoCentral= arc.x-3500
       this.circuloCentral.y=  744
       this.limiteArea=arc.x-690;
       this.limiteAreaChica=arc.x-500


	}

    moverRed(){
      
          this.arcoAtrasCJS.play();
            this.cjs.play();
     

    }
            
   getPos() {
        return this.caja.m_position
    }
    crearCajaFantasma(){
        var boxSd = new b2BoxDef();   
        boxSd.extents.Set(30, 30);
        
        boxSd.restitution = 0;

        var boxBd = new b2BodyDef();
        
        boxBd.AddShape(boxSd); 
       
        boxBd.position.Set(this.x+260, this.alturaTravesanio+30);
        boxBd.allowSleep=false;      
        return world.CreateBody(boxBd);
    }
	 createBox(x,y) {
      
        var boxSd = new b2BoxDef();   
        boxSd.extents.Set(200, 20);
        
        boxSd.restitution = 0;

        var boxBd = new b2BodyDef();
        
        boxBd.AddShape(boxSd); 
       
        boxBd.position.Set(x+200, y);
        boxBd.allowSleep=false;      
        return world.CreateBody(boxBd);
    }

    crearPaloDeAtras(){ /* el fondo del arco*/
        var fondoDelArco=new b2BoxDef();  

        fondoDelArco.extents.Set(50, 250);
		fondoDelArco.restitution=0;


        var boxBd = new b2BodyDef();
      
        boxBd.AddShape(fondoDelArco);       
        boxBd.position.Set(this.x+350, this.alturaTravesanio+225);
        boxBd.allowSleep=false;      
        return world.CreateBody(boxBd);
			
    }

    distanciaDeLaPelotaAlTravesanio()
    {
        let distanciaEnX = Math.floor(Math.abs(pelota.cuerpo.m_position.x - this.x));
        let distanciaEnY = Math.floor(Math.abs(pelota.cuerpo.m_position.y - this.alturaTravesanio));
        // a^2 + b^2 = c^2
        let distanciaTotal = Math.sqrt( Math.pow(distanciaEnX,2) + Math.pow(distanciaEnY,2) );
        return distanciaTotal;
    }

/*
      crearPaloTorcido(){
        var fondoDelArco=new b2BoxDef();  

        fondoDelArco.extents.Set(100, 20);
		fondoDelArco.restitution=0;


        var boxBd = new b2BodyDef();
      
        boxBd.AddShape(fondoDelArco);       
        boxBd.position.Set(this.x+250, this.alturaTravesanio);
        boxBd.m_rotation=100
        boxBd.allowSleep=false;      
        return world.CreateBody(boxBd);
			
    }
*/





}