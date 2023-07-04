class Merito{
    constructor(nombre, descripcion, valorAEvaluar, global, cantidadRequerida, premio){
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.global=global; //booleano, global o por nivel
        this.cantidad=0;
        this.cantidadRequerida=cantidadRequerida; //func
        this.completo=false;
        this.premio=premio;
    }
    
    volverACero(){        
        this.cantidad=0;
    }

    sumar(){
        this.cantidad++
        this.chequear()
    }

    chequear(){
        if (this.completo == false)
        {
            if(this.cantidad>= this.cantidadRequerida){
                this.completo=true;
                //GANASTE!
                usuario.monedas+=this.premio;
              //  alert("completaste el merito " + this.nombre + ", ganaste "+this.premio+" monedas");
   
                // Acá debería guardar el progreso en Firebase
                localStorage.meritos = JSON.stringify(usuario.meritos);
           }
        }
    }
    
    volverACeroLosQNoSonGlobales(){
        for(let i=0;i<usuario.meritos.length;i++){
            let m=usuario.meritos[i];
            if(m.global==false && m.completo==false){
                m.volverACero();
            }
        }
    }

}