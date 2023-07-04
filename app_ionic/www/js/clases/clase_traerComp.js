var AdobeAn={};

class traerComp {

    constructor(carpeta, url,  nombre, cb) {

      //  console.log("TRAER COMPOSICION ", carpeta, url,  nombre);



        if(librerias.hasOwnProperty(nombre)){
            if(librerias[nombre].hasOwnProperty("ssMetadata") && librerias[nombre].hasOwnProperty("properties")){
                console.warn("la libreria "+nombre+" ya estaba")
                if (cb instanceof Function)  cb(librerias[nombre]);  
                return
            }
            
        }

        carpeta="escala"+escalaSpriteSheet+"/"+carpeta
        this.urlFinal = carpeta + "/" + url;
        
        this.imgs=[]
        this.loader = "";
        $.ajax({
            url: this.urlFinal,
            error: (e) => console.log(e),
            success: (e) => {
                this.script = document.createElement("script")




                //edito aca el script para compatibilizarlo con el resto del juego, paar poder cargar 2 compositions de adobe animate
                let numCh = 74;
         
                this.str_script=e;
                //this.str_script = e.substr(0, e.length - numCh) + "})(createjs, AdobeAn);"//+  e.substr(q.length-numCh,numCh)


                this.str_script = replaceAll(this.str_script, "lib", "lib_" + nombre);
                this.str_script = replaceAll(this.str_script, "ss=", "ss_" + nombre + "=");
                this.str_script = replaceAll(this.str_script, "ss[", "ss_" + nombre + "[");
                this.str_script = replaceAll(this.str_script, "ss;", "ss_" + nombre + ";");
                this.str_script = replaceAll(this.str_script, "}})(createjs, AdobeAn);","})(createjs, AdobeAn);");

             
                

                this.idxNombreCompo=e.search(escapeRegExp("an.compositions["))
                this.nombreCompo=e.substr(this.idxNombreCompo+17,32);
                console.log("COMPOSICION "+nombre+" CARGADA "+this.nombreCompo);


                this.script.innerHTML = this.str_script;
                $(this.script).addClass ( "comp_" + nombre)
                
               

                $("body").append(this.script);

                this.comp = AdobeAn.getComposition(this.nombreCompo)
                this.library = this.comp.getLibrary();
                composiciones[nombre]=this.comp
               // cm[nombre]=this
                librerias[nombre] = this.library;

                this.loader = new createjs.LoadQueue(false);

               // setTimeout(()=>{
                    this.loader.addEventListener("fileload", (evt) => {
                        evt.result.loading="eager" //para q carguen a la fuerza y no el lazyloading automatico de chrome
                        evt.result.decoding="sync"
                    // this.imgs = this.comp.getImages();
                        this.imgs.push(evt.result);
                    
                    
                    //  if (evt && (evt.item.type == "image")) { this.imgs[evt.item.id] = evt.result; }
                    });

                    this.loader.addEventListener("complete", (evt) => {


                        this.ss = this.comp.getSpriteSheet();

                        this.queue = evt.target;


                        this.ssMetadata = this.library.ssMetadata;
                    
                

                        for (let i = 0; i < this.ssMetadata.length; i++) {

                            this.img = document.createElement("img");
                            
                    /*    this.img.onload=(e)=>{
                                console.log("file load"+Date.now())
                                if (cb instanceof Function)  cb(this.library);                            
                            }*/

            
                /*

                            this.img.style.visibility="hidden"
                            this.img.loading="eager"
                            this.img.decoding="sync"
                            $(this.img).addClass("comp_" + nombre);
                            this.srcIMG = carpeta + "/images/" + this.ssMetadata[i].name + ".png";
                        
                            this.img.src = this.srcIMG;
                            //let img=queue.getResult(ssMetadata[i].name)
    */

                    //     $("body").append(this.img); 
                            this.ss[this.ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [this.imgs[i]], "frames": this.ssMetadata[i].frames })
                    //     $(this.img).remove();
                        } //for
                   

                      if (cb instanceof Function)  cb(this.library);  
                    //  },1000);
                   
                });

                this.manifest = this.library.properties.manifest;
                for (let i = 0; i < this.manifest.length; i++) {
                    this.manifest[i].src = carpeta + "/" + this.manifest[i].src
                }
                this.loader.loadManifest(this.comp.getLibrary().properties.manifest);



            }
        });//script





    }//traercomp


    static cargarComp(camiseta, cb) {
       //ESTA ES LA FUNCION MADRE DE ESTA CLASE
        
        if(librerias.hasOwnProperty(camiseta) && librerias[camiseta].hasOwnProperty("ssMetadata")){
        //    console.log("YA ESTABA LA COMPO: "+camiseta);
             cb(librerias[camiseta]);
             return;
        }
        let a = new traerComp("cuerpos_extras", "cuerpos_" + camiseta + ".js",  camiseta, cb);
     //   console.log(a)
        return a

    }

    static quitar(id){
      //  console.log( $("script#comp_"+id))
        $("script.comp_"+id+", img.comp_"+id).remove()
        librerias[id]={}     
        composiciones[id]={}
    
    }

    static traerFondosArqueroYCabeza(cb) {
        new traerComp("cuerpos_extras", "cabeza_maestra.js",  "cabeza_maestra",()=>{
            new traerComp("pisos", "pisos.js", "pisos",()=>{
                new traerComp("fondo", "fondo.js",  "fondos",()=>{
                    new traerComp("cuerpos_extras", "cuerpos_arquero.js", "arquero",()=>{
                        if(cb instanceof Function) cb();   
                    })

                })
            })
         
        })
     
     
    }

}