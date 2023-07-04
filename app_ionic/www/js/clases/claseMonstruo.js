

class Monstruo {
    constructor(w) {
        //cjs es un objeto de la lib de cjs

 

        this.propiedadesIniciales = w;
      
        if(w.fixed==undefined) w.fixed=false;
        this.fixed=w.fixed

        this.height = w.height;
        this.width = w.width;
        this.tipo=w.tipo
        this.fuerzaX=w.fuerzaX
        this.fuerzaY=w.fuerzaY

        this.x = w.x
        this.y = w.y
        this.muerto=false;
        this.vida=w.vida;
        this.golpe=w.golpe
        this.offsetX=w.offsetX
        this.offsetY=w.offsetY
        this.escala=w.escala

        this.cjs = new librerias["monstruos"]["monstruo"+w.tipo]() //pueden tener tipo
        this.cjs.x = this.x+this.offsetX
        this.cjs.y = this.y+this.offsetY
       
        this.cjs.scaleX= this.cjs.scaleY=this.escala


        this.caja = this.createBox(world, this.x, this.y, this.width, this.height, w.fixed,0);
        this.caja.m_position.x=this.x
        this.caja.m_position.y=this.y
      //  this.caja.m_rotation=deg2rad(w.rotation);
        //this.FRAMENUM = 0;

        this.colisionaConPelota = true;
        

      


        this.cjs.padre = this;
       

    
        
       
        this.caja.m_shapeList.m_userData = this //guardo la referencia
       
        let strAudio=""
        if(w.tipo==1) strAudio="DRAGON"
        if(w.tipo==2) strAudio="CALABAZA"
        if(w.tipo==3) strAudio="ROBOT"
        if(w.tipo==4) strAudio="ALIEN"
        if(w.tipo==5) strAudio="AUTO"
        
        this.audioDefault=strAudio+"_DEFAULT"
        this.audioGana=strAudio+"_GANA"
        this.audioInicia=strAudio+"_INICIA"
        this.audioGolpe=strAudio+"_RECIBE-GOLPE"

        audioW.repro(this.audioInicia);
        setTimeout(()=>{audioW.repro(this.audioDefault,true)},200)

        this.render()


    }

    muerte(){
        //FUNCION DE FLASH
        console.log("EL MONSTRUO MURIO")
        this.colisionaConPelota=false
        nivel.removeChild(this.cjs)
        world.DestroyBody(this.caja)
    }

    estoyEnElPiso() {
        return this.getPos().y + this.height / 2 > juegoW.lineaPiso;
    }


    createBox(world, x, y, width, height, fixed, rotation) {
        if (typeof (fixed) == 'undefined') fixed = true;
        var boxSd = new b2BoxDef();
        if (!fixed) boxSd.density = 1;
        boxSd.extents.Set(width, height);
        boxSd.restitution = 0;
        boxSd.friction = 0.19;
        var boxBd = new b2BodyDef();
        boxBd.preventRotation = false

        //  boxSd.m_maskBits=1 //contra que pega
        //  boxSd.m_categoryBits=1 //q categoria es
        boxBd.m_rotation=rotation
        boxBd.AddShape(boxSd);
        boxBd.position.Set(x, y);
        boxBd.allowSleep = false;
        let bo=world.CreateBody(boxBd);
       // console.log(bo)
        return bo



    }
    frameMuerte(){
        setTimeout(()=>audioW.repro("EXPLOTA_MONSTRUO"),700)
        audioW.frenar(this.audioDefault)
        this.cjs.gotoAndPlay("muerto");
        this.muerto=true;
    }


    render() {

        if(this.muerto==true) return;

      //  console.log("render monstruo")


         if(juegoW.pause!=false)  return;
       //  else this.stop();

        //console.log(this.nombre+" "+this.tienePelota)

        this.cjs.x = fl(this.caja.m_position.x)+this.offsetX
        this.cjs.y = fl(this.caja.m_position.y)+this.offsetY
         this.cjs.rotation = rad2deg(this.caja.m_rotation);



   

    }

    ponerPow(x,y){
        this.pow=new librerias["lib_original"].pow()
        nivel.addChild(this.pow);
        this.pow.x=x+25
        this.pow.y=y  
        this.pow.rotation=Math.floor(Math.random()*200 )
        this.pow.gotoAndPlay(0);
        this.pow.scaleX=this.pow.scaleY=0.85
    }
    eventoColisionConPelota() {
       
       // console.log("COLISION MONSTRUO")
        audioW.repro(this.audioGolpe)
        this.ponerPow(pelota.getPos().x,pelota.getPos().y)
        if(this.muerto==true) return false; //si esta muriendo no colisiona

        this.vida-=this.golpe
        if(this.vida<=0){
            //aca muere
            pelota.cuerpo.m_linearVelocity.x*=-1
            
            this.frameMuerte()
            return false
        }else{
            this.cjs.gotoAndPlay("golpe");
        }

        this.pegarleALaPelota()
        return true



    }

    pegarleALaPelota(){
        pelota.cuerpo.m_linearVelocity.x=this.fuerzaX-pelota.cuerpo.m_linearVelocity.x
        pelota.cuerpo.m_linearVelocity.y=this.fuerzaY-pelota.cuerpo.m_linearVelocity.y
    }



    

    getPos() {
        return this.caja.m_position;
    }


    distanciaALaPelota() {
        return Math.floor(Math.abs(this.getPos().x - pelota.getPos().x))
    }

  

}
