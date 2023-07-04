class GestionMeritos {
  
  constructor(objMeritos = jsonMeritos) {
    const UMM = 10;
    
    this.meritoPatearDosVecesPorNivel = objMeritos.meritoPatearDosVecesPorNivel; // Mérito para probar
    this.meritoPatearDosVecesPorNivel.__proto__ = Merito.prototype;
    
    // Méritos por nivel
    this.meritoTresEstrellas = objMeritos.meritoTresEstrellas; 
    this.meritoTresEstrellas.__proto__ = Merito.prototype;
    this.meritoDosSombreritos = objMeritos.meritoDosSombreritos; 
    this.meritoDosSombreritos.__proto__ = Merito.prototype;
    this.meritoTresSombreritos = objMeritos.meritoTresSombreritos; 
    this.meritoTresSombreritos.__proto__ = Merito.prototype;
    this.meritoGolCabezaTravesanio = objMeritos.meritoGolCabezaTravesanio; 
    this.meritoGolCabezaTravesanio.__proto__ = Merito.prototype;
    this.meritoGolDeUna = objMeritos.meritoGolDeUna; 
    this.meritoGolDeUna.__proto__ = Merito.prototype;
    this.meritoGolEnContra = objMeritos.meritoGolEnContra; 
    this.meritoGolEnContra.__proto__ = Merito.prototype;
    this.meritoComprarRopa = objMeritos.meritoComprarRopa;
    this.meritoComprarRopa.__proto__ = Merito.prototype;
    this.meritoDesbloquearNivel = objMeritos.meritoDesbloquearNivel; 
    this.meritoDesbloquearNivel.__proto__ = Merito.prototype;
    this.meritoCompartirFoto = objMeritos.meritoCompartirFoto; 
    this.meritoCompartirFoto.__proto__ = Merito.prototype;
    
    // Méritos globales
    this.meritoTravesanioTresVeces = objMeritos.meritoTravesanioTresVeces; 
    this.meritoTravesanioTresVeces.__proto__ = Merito.prototype;
    this.meritoTravesanioSieteVeces = objMeritos.meritoTravesanioSieteVeces; 
    this.meritoTravesanioSieteVeces.__proto__ = Merito.prototype;
    this.meritoGanarTresNivelesSeguidosSinPerder = objMeritos.meritoGanarTresNivelesSeguidosSinPerder;
    this.meritoGanarTresNivelesSeguidosSinPerder.__proto__ = Merito.prototype;
    this.meritoGanarCincoNivelesSeguidosSinPerder = objMeritos.meritoGanarCincoNivelesSeguidosSinPerder; 
    this.meritoGanarCincoNivelesSeguidosSinPerder.__proto__ = Merito.prototype;
    this.meritoGanarDiezNivelesSeguidosSinPerder = objMeritos.meritoGanarDiezNivelesSeguidosSinPerder; 
    this.meritoGanarDiezNivelesSeguidosSinPerder.__proto__ = Merito.prototype;
    this.meritoGanarQuinceNivelesSeguidosSinPerder = objMeritos.meritoGanarQuinceNivelesSeguidosSinPerder; 
    this.meritoGanarQuinceNivelesSeguidosSinPerder.__proto__ = Merito.prototype;
    this.meritoGanarVeinteNivelesSeguidosSinPerder = objMeritos.meritoGanarVeinteNivelesSeguidosSinPerder; 
    this.meritoGanarVeinteNivelesSeguidosSinPerder.__proto__ = Merito.prototype;
    this.meritoGanarMundoSinPerder = objMeritos.meritoGanarMundoSinPerder; 
    this.meritoGanarMundoSinPerder.__proto__ = Merito.prototype;
    this.meritoDosGolesCabeza = objMeritos.meritoDosGolesCabeza; 
    this.meritoDosGolesCabeza.__proto__ = Merito.prototype;
    this.meritoTresGolesCabeza = objMeritos.meritoTresGolesCabeza; 
    this.meritoTresGolesCabeza.__proto__ = Merito.prototype;
    this.meritoCuatroGolesCabeza = objMeritos.meritoCuatroGolesCabeza; 
    this.meritoCuatroGolesCabeza.__proto__ = Merito.prototype;
    this.meritoCincoGolesCabeza = objMeritos.meritoCincoGolesCabeza; 
    this.meritoCincoGolesCabeza.__proto__ = Merito.prototype;
    this.meritoDosGolesFueraDelArea = objMeritos.meritoDosGolesFueraDelArea; 
    this.meritoDosGolesFueraDelArea.__proto__ = Merito.prototype;
    this.meritoTresGolesFueraDelArea = objMeritos.meritoTresGolesFueraDelArea; 
    this.meritoTresGolesFueraDelArea.__proto__ = Merito.prototype;
    this.meritoCuatroGolesFueraDelArea = objMeritos.meritoCuatroGolesFueraDelArea; 
    this.meritoCuatroGolesFueraDelArea.__proto__ = Merito.prototype;
    this.meritoCincoGolesFueraDelArea = objMeritos.meritoCincoGolesFueraDelArea; 
    this.meritoCincoGolesFueraDelArea.__proto__ = Merito.prototype;
    
    // Propiedades de nivel
    this.tirosAlTravesanioNivel = 0;

    this.puedeRegistrarTiroAlTravesanio = true;
  }
  
  // Gestión de méritos por nivel!!!
  
  registrarTiroAlArco()
  {
    this.meritoPatearDosVecesPorNivel.sumar();
  }

  registrarTresEstrellasSinPerder()
  {
    this.meritoTresEstrellas.sumar();
  }
  
  registrarSombrerito()
  {
    this.meritoDosSombreritos.sumar();
    this.meritoTresSombreritos.sumar();
  }
  
  volverACeroSombreritos()
  {
    this.meritoDosSombreritos.volverACero();
    this.meritoTresSombreritos.volverACero();
  }
  
  registrarGolDeUna()
  {
    this.meritoGolDeUna.sumar();
  }
  
  registrarGolEnContra()
  {
    this.meritoGolEnContra.sumar();
  }
  
  registrarCompraDeRopa()
  {
    this.meritoComprarRopa.sumar();
  }
  
  registrarNivelDesbloqueado()
  {
    this.meritoDesbloquearNivel.sumar();
  }
  
  registrarFotoCompartida()
  {
    this.meritoCompartirFoto.sumar();
  }
  
  // Gestión de méritos globales!!!
  
  registrarTiroAlTravesanio()
  {
    // Esto es para evitar que cuando rebote dos veces en el travesaño lo registre duplicado
    this.puedeRegistrarTiroAlTravesanio = false;
    setTimeout( () => this.puedeRegistrarTiroAlTravesanio = true, 5000);

    this.meritoTravesanioTresVeces.sumar();
    this.meritoTravesanioSieteVeces.sumar();
    
    this.tirosAlTravesanioNivel++;
  }
  
  registrarNivelGanadoSinPerder()
  {
    this.meritoGanarTresNivelesSeguidosSinPerder.sumar();
    this.meritoGanarCincoNivelesSeguidosSinPerder.sumar();
    this.meritoGanarDiezNivelesSeguidosSinPerder.sumar();
    this.meritoGanarQuinceNivelesSeguidosSinPerder.sumar();
    this.meritoGanarVeinteNivelesSeguidosSinPerder.sumar();
    
    // Compruebo cuantos niveles del mundo ganó sin perder, si ganó todos disparo el mérito correspondiente
   /* let nivelesGanadosDeEsteMundo = localStorage.getItem("nivelesGanadosMundo"+juegoW.mundo);
    if (nivelesGanadosDeEsteMundo)
    {
      localStorage.setItem("nivelesGanadosMundo"+juegoW.mundo, nivelesGanadosDeEsteMundo++);
      
      if (nivelesGanadosDeEsteMundo == 6)
      {
        this.meritoGanarMundoSinPerder.sumar();
      }
    }
    // Es el primer nivel del mundo
    else localStorage.setItem("nivelesGanadosMundo"+juegoW.mundo, 1); */
  }
  
  registrarNivelPerdido()
  {
    this.meritoDosSombreritos.volverACero();
    this.meritoTresSombreritos.volverACero();
    
    this.meritoGanarTresNivelesSeguidosSinPerder.volverACero();
    this.meritoGanarCincoNivelesSeguidosSinPerder.volverACero();
    this.meritoGanarDiezNivelesSeguidosSinPerder.volverACero();
    this.meritoGanarQuinceNivelesSeguidosSinPerder.volverACero();
    this.meritoGanarVeinteNivelesSeguidosSinPerder.volverACero();
    
    this.meritoGanarMundoSinPerder.volverACero();
    //localStorage.setItem("nivelesGanadosMundo"+juegoW.mundo, 0);
  }
  
  // Lo llama la clase Willian, tiene que traer la parte del cuerpo con la que hace el gol (pie o cabeza), y si está fuera del área o no
  registrarGol(tipoDeTiro, fueraDelArea)
  {
    // Si fue gol de cabeza, registro los méritos que chequean esta propiedad
    if (tipoDeTiro == "cabeza")
    {
      this.meritoDosGolesCabeza.sumar();
      this.meritoTresGolesCabeza.sumar();
      this.meritoCuatroGolesCabeza.sumar();
      this.meritoCincoGolesCabeza.sumar();
      
      // Verifico si antes de hacer el gol de cabeza pegó en el travesaño, si es así sumar el mérito correspondiente
      if (juegoW.ultimoRebote == "travesanio")
      {
        this.meritoGolCabezaTravesanio.sumar();
      }
    }
    else
    {
      // Si no es gol de cabeza, vuelvo a cero ya que tienen que ser seguidos
      this.meritoDosGolesCabeza.volverACero();
      this.meritoTresGolesCabeza.volverACero();
      this.meritoCuatroGolesCabeza.volverACero();
      this.meritoCincoGolesCabeza.volverACero();
    }
    
    // Gol desde afuera del área
    if (fueraDelArea == true)
    {
      this.meritoDosGolesFueraDelArea.sumar();
      this.meritoTresGolesFueraDelArea.sumar();
      this.meritoCuatroGolesFueraDelArea.sumar();
      this.meritoCincoGolesFueraDelArea.sumar();
    }
    else
    {
      // Vuelvo a cero los méritos que tienen que ver con esto
      this.meritoDosGolesFueraDelArea.volverACero();
      this.meritoTresGolesFueraDelArea.volverACero();
      this.meritoCuatroGolesFueraDelArea.volverACero();
      this.meritoCincoGolesFueraDelArea.volverACero();
    }
    
  }
  
}