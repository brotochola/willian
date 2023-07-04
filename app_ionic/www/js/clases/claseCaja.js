

class Caja {
    constructor(w) {
        //cjs es un objeto de la lib de cjs

 

        this.propiedadesIniciales = w;

        if(this.propiedadesIniciales.coef==undefined) this.propiedadesIniciales.coef=0.4

        this.height = w.height;
        this.width = w.width;
     
        this.x = w.x
        this.y = w.y


        this.caja = this.createBox(world, this.x, this.y, this.width, this.height, w.fixed, w.density);
        this.caja.m_angularDamping=0.95 //la velocidad angular queda en 95% dps de cada frame
        this.caja.m_rotation=deg2rad(w.rotation);
        //this.FRAMENUM = 0;

        this.colisionaConPelota = true;
   
        this.sombra = new librerias["lib_original"].sombra();
        this.sombra.y = 850;
        this.sombra.alpha=0.5
        this.ponerSombra()
        this.cjs={};
        try{
            this.cjs = new librerias["lib_original"]["caja_"+this.propiedadesIniciales.textura]();
        }catch(e){
            this.cjs = new librerias["lib_original"]["caja_madera1"]();
        }
        this.coefEscala=1
        // SEGUN LA TEXTURA LE HARDCODEO EL ANCHO Q TIENE ESE SIMBOLO
        if(w.textura=="palo" || w.textura=="palo2"){
            this.anchoNatural=452
            this.altoNatural=68
        }else if(w.textura=="madera1" || w.textura=="madera2" || w.textura=="madera3"){
            this.anchoNatural=100
            this.altoNatural=100
        }else if(w.textura=="columna"){
            this.anchoNatural=68
            this.altoNatural=452
        }

        this.cjs.scaleX=this.width/this.anchoNatural *2*this.coefEscala
        this.cjs.scaleY=this.height/this.altoNatural * 2*this.coefEscala

        this.cjs.padre = this;
        

    
        
        this.cjs.x = this.x;
        this.cjs.y = this.y
        this.caja.m_shapeList.m_userData = this //guardo la referencia
        this.FRAMENUM = 0;
        this.i=cajas.length;
        this.nombreAudio=this.propiedadesIniciales.textura+this.i

        audioW.getAudio(this.propiedadesIniciales.textura,this.i)

    }

    estoyEnElPiso() {
        return this.getPos().y + this.height / 2 > juegoW.lineaPiso;
    }


    createBox(world, x, y, width, height, fixed, rotation, density) {
        if (typeof (fixed) == 'undefined') fixed = true;
        var boxSd = new b2BoxDef();
        
        if (fixed) boxSd.density = 0;
        else{
            if(density!=undefined) boxSd.density=density;
            else boxSd.density=0.5
        }

        boxSd.extents.Set(width, height);
        

        boxSd.restitution = 0.0000001;
        
        boxSd.friction = 0.4;
        
        //boxSd.type=1

        var boxBd = new b2BodyDef();
       

        // Si la caja se mueve, que no rote
        if (this.propiedadesIniciales.hasOwnProperty("preventRotation"))
        {
            if (this.propiedadesIniciales.preventRotation == true)
            {
                boxBd.preventRotation = true
            }
            else boxBd.preventRotation = false
        }
        else boxBd.preventRotation = false


        //  boxSd.m_maskBits=1 //contra que pega
        //  boxSd.m_categoryBits=1 //q categoria es

        boxBd.m_rotation=rotation
      //  console.log(boxBd)

        boxBd.AddShape(boxSd);
        boxBd.position.Set(x, y);
        boxBd.allowSleep = false;
        return world.CreateBody(boxBd);



    }


    render() {
        //render lo llama claseJuegoWillian en su metodo render


        //VELOCIDAD TERMINAL PARA LAS CAJAS
        if(this.caja.m_linearVelocity.x>500) this.caja.m_linearVelocity.x=500
        if(this.caja.m_linearVelocity.y>500) this.caja.m_linearVelocity.y=500
        if(this.caja.m_linearVelocity.y<-500) this.caja.m_linearVelocity.y=-500
        if(this.caja.m_linearVelocity.x<-500) this.caja.m_linearVelocity.x=-500


         if(juegoW.pause!=false)  return;
       //  else this.stop();

        //console.log(this.nombre+" "+this.tienePelota)

        this.cjs.x = fl(this.caja.m_position.x)
        this.cjs.y = fl(this.caja.m_position.y)

        
         this.cjs.rotation = rad2deg(this.caja.m_rotation);
 
         if (this.propiedadesIniciales.ampY > 0)
         {
            this.moverArribaYAbajo();
         }
         


      this.ponerSombra()
         
        // this.sombra.y=this.caja.m_position.y+this.height*0.5

         this.FRAMENUM++;
         

   

    }

    ponerSombra(){
        this.sombra.x =this.caja.m_position.x// fl(this.caja.m_position.x - porcPelota * 0.85 + (750 - this.getPos().y))
        this.sombra.scaleX = (this.width/90*Math.cos(this.caja.m_rotation) + this.height/90*Math.sin(this.caja.m_rotation))
        if(this.sombra.scaleX<0.2) this.sombra.scaleX=0.2
    }

    
    eventoColisionPiso(){
        //audioW.repro("patear2");
       // if(this.caja.m_position.y+this.height/2>900) this.caja.m_position.y=850-this.height/2
       audioW.repro(this.nombreAudio,false,this.caja.m_linearVelocity.y/400);


    }

    eventoColisionConPelota() {
       // console.log(this)
       
       audioW.repro(this.nombreAudio, false,pelota.cuerpo.m_linearVelocity.x/800);


       let ladoCaja=this.getPos().x-this.propiedadesIniciales.width/2
       let techoCaja=this.getPos().y-this.propiedadesIniciales.height/2
       
     //  console.log("py=",pelota.getPos().y,"techo caja=",techoCaja, "px=", pelota.getPos().y, "lado caja=",ladoCaja)

        let lado="";

        if(pelota.getPos().y<techoCaja && pelota.getPos().x>this.getPos().x-this.propiedadesIniciales.width/2 && pelota.getPos().x<this.getPos().x+this.propiedadesIniciales.width/2){
            lado="arriba"
        }else if(pelota.getPos().x<ladoCaja && pelota.getPos().y>this.getPos().y-this.propiedadesIniciales.height/2 && pelota.getPos().y<this.getPos().y+this.propiedadesIniciales.width/2){
            lado="izq"
        }else if(pelota.getPos().y>this.getPos().y+this.propiedadesIniciales.height/2 && pelota.getPos().x>this.getPos().x-this.propiedadesIniciales.width/2 && pelota.getPos().x<this.getPos().x+this.propiedadesIniciales.width/2){
            lado="abajo"
        }

        if (this.propiedadesIniciales.fixed || this.propiedadesIniciales.ampX > 0 || this.propiedadesIniciales.ampY > 0)
        {
            if(lado=="izq"){
                pelota.cuerpo.m_linearVelocity.x *= -this.propiedadesIniciales.coef/2;
                pelota.cuerpo.m_linearVelocity.y *= -this.propiedadesIniciales.coef;
            }else if(lado=="abajo"){
                pelota.cuerpo.m_linearVelocity.y *= -this.propiedadesIniciales.coef/2;
                pelota.cuerpo.m_linearVelocity.x *= -this.propiedadesIniciales.coef;
            }
        }
        else
        {
            if(pelota.quienLePego!=null && pelota.quienLePego!=undefined ){
                if(this.propiedadesIniciales.coef!=undefined && this.propiedadesIniciales.coef>0){
                   this.caja.m_linearVelocity.x=pelota.cuerpo.m_linearVelocity.x*this.propiedadesIniciales.coef+Math.random()*150//*0.2
                    this.caja.m_linearVelocity.y=pelota.cuerpo.m_linearVelocity.y*this.propiedadesIniciales.coef+Math.random()*100-50//*0.2
                      this.caja.m_angularVelocity=  this.caja.m_linearVelocity.x/100
               }
            }
        }

        return true//this.colisionaConPelota;

    }

    impulsar(x,y){
        if (this.propiedadesIniciales.fixed || this.propiedadesIniciales.ampX > 0 || this.propiedadesIniciales.ampY > 0) return true
        this.caja.m_linearVelocity.x+=x*this.propiedadesIniciales.coef//*0.15
        this.caja.m_linearVelocity.y+=y*this.propiedadesIniciales.coef//*0.15
    //    this.caja.rotation=Math.random()*0.3
        this.caja.m_angularVelocity=  this.caja.m_linearVelocity.x/100
        audioW.repro("patear1",false,0.4)
        audioW.repro(this.nombreAudio,false,0.3)

        }

        getVelLineal(){
            return Math.sqrt(this.caja.m_linearVelocity.x*this.caja.m_linearVelocity.x+this.caja.m_linearVelocity.y*this.caja.m_linearVelocity.y)
        }
    eventoColisionConCaja(otraCaja){
      //  audioW.reproducirSonidoPateo(otraCaja.caja.m_linearVelocity.x/1000)
       // console.log(this, otraCaja);
       if (this.propiedadesIniciales.fixed || this.propiedadesIniciales.ampX > 0 || this.propiedadesIniciales.ampY > 0) return true
       this.caja.m_linearVelocity.x=otraCaja.caja.m_linearVelocity.x
      this.caja.m_linearVelocity.y= otraCaja.caja.m_linearVelocity.y+Math.random()*20-10//*0.2
     
       audioW.repro(this.nombreAudio,false,otraCaja.getVelLineal()/600);

       return true;

    }

    getPos() {
        return this.caja.m_position;
    }


    distanciaALaPelota() {
        return Math.floor(Math.abs(this.getPos().x - pelota.getPos().x))
    }

    static cajasCercaDeWillian(){
        let cajret=[]
        for(let i=0;i<cajas.length;i++){
            let c=cajas[i]
            let dist=c.getPos().x-willian.getPos().x
            let distY=c.getPos().y-willian.getPos().y            
            if(dist>-80 && dist<160 && distY>-100 && distY<120 ) cajret.push(c)
            
         }
         return cajret;
    }

    moverArribaYAbajo()
    {
        if(this.propiedadesIniciales.hasOwnProperty("ampX") || this.propiedadesIniciales.hasOwnProperty("ampY")){
            let coef=1
            if(juegoW.camaraLenta) coef=3

            if(this.FRAMENUM/coef%(30/this.propiedadesIniciales.frecY)==0 && this.FRAMENUM>31){
                this.caja.m_linearVelocity.y=-this.propiedadesIniciales.ampY
            }
            /*
            let movY = this.propiedadesIniciales.ampY * Math.sin(this.FRAMENUM/coef*this.propiedadesIniciales.frecY);

            this.caja.m_position.y = this.y + movY;
            this.caja.m_position.x = this.x;*/
        }
    }

}