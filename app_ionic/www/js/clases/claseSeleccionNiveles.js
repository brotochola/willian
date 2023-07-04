var pantallaSeleccionNiveles;
class SeleccionNiveles {
	constructor(mundo) {
		mundo--;
		//  stage.addChild(new createjs.Bitmap(this.video))
		/*
		1-brasil
		2-corinthians
		3-shaktar
		4-chelsea
		5-brasil
		*/
		if (mundo == 0) $("video#fondo")[0].src = "img/fondo_corinthians.mp4";
		else if (mundo == 1) $("video#fondo")[0].src = "img/fondo_brasil.mp4";
		else if (mundo == 2) $("video#fondo")[0].src = "img/fondo_shaktar.mp4";
		else if (mundo == 3) $("video#fondo")[0].src = "img/fondo_chelsea.mp4";
		else if (mundo == 4) $("video#fondo")[0].src = "img/fondo_brasil.mp4";
		this.mundo = mundo; //a q mundo pertenece esta selecicon de niveles 
		$("video#fondo").show();
		$("#seleccionDeNiveles").show();
		$("#seleccionDeNiveles #tienda").off().click(() => {
			audioW.repro("boton")
			alert("no disponible")
		});
		$("#seleccionDeNiveles #config").off().click(() => {
			audioW.repro("boton")
			this.sacar()
			pantallaSeleccionMundos.mostrar(this.mundo + 1);
		});
		if (!esApp()) audioW.reproducirMusica()
		this.ponerBotonesComoVanSegunUsuario()
		usuario.actualizarMostradorDeEstrellas();
		setTimeout(() => {
			ocultarLoading()
		}, 700);
	}
	ponerBotonesComoVanSegunUsuario() {
		//los pongo todos bloqueados de movida, por las dudas:
		$(".nivel").removeClass("estrella0 estrella1 estrella2 estrella3 bloqueado").addClass("bloqueado").off()
		let arrBotones = usuario.nivelesPorMundo(this.mundo)
		this.botonesNivelesAzules = $("#seleccionDeNiveles #niveles div.nivel.especial")
		if (arrBotones[0] > 0 && arrBotones[1] > 0 && arrBotones[2] > 0) {
			$(this.botonesNivelesAzules[0]).html("I")
			$(this.botonesNivelesAzules[0]).removeClass("estrella0 estrella1 estrella2 estrella3 bloqueado")
			$(this.botonesNivelesAzules[0]).off()
			$(this.botonesNivelesAzules[0]).click(() => { this.arrancarNivel("loco1"); })
			let cantEstre = usuario.calcularCantEstrellasObtenidasPorNivel(usuario.niveles["locos"][this.mundo][0])
			$(this.botonesNivelesAzules[0]).addClass("estrella" + cantEstre);
		} else {
			if (getQueryVariable("godMode") != false) $(this.botonesNivelesAzules[0]).off().click(() => this.arrancarNivel("loco1"));
		}
		if (arrBotones[3] > 0 && arrBotones[4] > 0 && arrBotones[5] > 0) {
			let cantEstre = usuario.calcularCantEstrellasObtenidasPorNivel(usuario.niveles["locos"][this.mundo][1])
			$(this.botonesNivelesAzules[1]).html("II").removeClass("estrella0 estrella1 estrella2 estrella3 bloqueado").off().click(() => this.arrancarNivel("loco2"));
			$(this.botonesNivelesAzules[1]).addClass("estrella" + cantEstre);
		} else {
			if (getQueryVariable("godMode") != false) $(this.botonesNivelesAzules[1]).off().click(() => this.arrancarNivel("loco2"));
		}

		if (arrBotones[6] > 0 && arrBotones[7] > 0 && arrBotones[8] > 0) {
			//SI GANASTE LOS NIVELES 7,8,9:
			let cantEstre = usuario.calcularCantEstrellasObtenidasPorNivel(usuario.niveles["locos"][this.mundo][2])
			$(this.botonesNivelesAzules[2]).html("III").removeClass("estrella0 estrella1 estrella2 estrella3 bloqueado").off().click(() => this.arrancarNivel("loco3"));
			$(this.botonesNivelesAzules[2]).addClass("estrella" + cantEstre);
		} else {
			if (getQueryVariable("godMode") != false) $(this.botonesNivelesAzules[2]).off().click(() => this.arrancarNivel("loco3"));
		}
		this.botones = $("#seleccionDeNiveles #niveles div.nivel.comun");
		this.botones.each((k, v) => {
			// console.log(k+1, maxNivel)
			$(v).off();
			$(v).removeClass("estrella0 estrella1 estrella2 estrella3 bloqueado");
			let val = arrBotones[k]
			let numeroDeOrden = k + 1
			if (val > -1) {
				$(v).html(k + 1);
				$(v).click(() => this.arrancarNivel(numeroDeOrden));
				if (val > 0) $(v).addClass("estrella" + val);
			} else {
				$(v).addClass("bloqueado");
				///// ESTO ES DEBUG
				if (getQueryVariable("godMode") != false) $(v).click(() => this.arrancarNivel(numeroDeOrden));
			}
		})
	}
	sacar() {
		$("video, seccion#seleccionDeNiveles").hide();
		// this.ponerBotonesComoVanSegunUsuario();
	}
	buscarNivelPorNumeroDeOrden(o) {
		for (let i = 0; i < niveles[(this.mundo)].length; i++) {
			if (niveles[(this.mundo)][i].orden == o) {
				//  console.log("MUNDO " + (this.mundo + 1) + ", nivel " + o + ", q es el item numero " + i);
				return niveles[(this.mundo)][i]
			}
		}
		//console.log("MUNDO " + (this.mundo + 1) + ", nivel " + o + ", no se encontro");
		return -1;
	}
	arrancarNivel(x) {
		console.log("ARRANCAR NIVEL " + this.mundo + ", " + x)
		if (juegoW != undefined && juegoW instanceof Object && juegoW.hasOwnProperty("fps")) juegoW.sacar();
		audioW.repro("boton")
		$("#cantEstrellas").hide();
		mostrarLoading()
		//esto deberia ser ms piola, no simplemente el indice
		//los niveles tienenq  tener mundo e indice dentro del mundo
		if (x.toString().substr(0, 4) == "loco") {
			//  console.log(x.substr(4,1)-1)
			this.cual = niveles["locos"][this.mundo][x.toString().substr(4, 1) - 1]
		} else {
			this.cual = this.buscarNivelPorNumeroDeOrden(x);
			this.qNivel = x
		}
		///   console.log(this.mundo, this.cual)
		//   console.log(niveles[this.mundo][this.cual])
		this.precargarCuerpos(this.cual, () => {
			//GUARDO QUE NIVELES JUGO EL USUARIO
			usuario.registrarNivelJugado(this.cual.mundo, this.cual.orden)

			usuario.guardar();
			stage.removeAllChildren();
			$("video#fondo").hide();
			juegoW = new JuegoWillian('canvasCreateJs', 'canvasBox2d', this.cual); //le meto q canvas es para cjs, otro para box2d y el nivel
			this.sacar();
			this.evaluarPonerTutoriales()
		});
		//alert("juego w")
	}
	evaluarPonerTutoriales() {
		//let reproducir = false;
		if (this.mundo == 0 && this.qNivel == 1) {
			this.ponerTutorial("img/tutoriales/patear.mp4");

			if (usuario.tutoriales.patear == false) {
				usuario.tutoriales.patear = true;
				}else { this.ponerleClickAHTMLParaSaltearTutorial() 
			}
		} else if (this.mundo == 0 && this.qNivel == 4) {
			this.ponerTutorial("img/tutoriales/saltar_barrida.mp4");

			if (usuario.tutoriales.saltar_barrida == false) {
				usuario.tutoriales.saltar_barrida = true;
				}else { this.ponerleClickAHTMLParaSaltearTutorial() 
			}
		} else if (this.mundo == 0 && this.qNivel == 6) {
			this.ponerTutorial("img/tutoriales/pase.mp4");


			if (usuario.tutoriales.pase == false) {
				usuario.tutoriales.pase = true;
				}else { this.ponerleClickAHTMLParaSaltearTutorial() 
			}
		} else if (this.mundo == 0 && this.qNivel == 7) {
			this.ponerTutorial("img/tutoriales/barrida.mp4")

			if (usuario.tutoriales.barrida == false) {
				usuario.tutoriales.barrida = true;
				}else { this.ponerleClickAHTMLParaSaltearTutorial() 
			}
		} else if (this.mundo == 1 && this.qNivel == 1) {
			usuario.habilidades.cabezazo = true
			this.ponerTutorial("img/tutoriales/cabezazo.mp4");


			if (usuario.tutoriales.cabezazo == false) {

				usuario.tutoriales.cabezazo = true;
				}else { this.ponerleClickAHTMLParaSaltearTutorial() 
			}
		} else if (this.mundo == 2 && this.qNivel == 1) {
			usuario.habilidades.sombrerito = true
			this.ponerTutorial("img/tutoriales/sombrerito.mp4")


			if (usuario.tutoriales.sombrerito == false) {
				usuario.tutoriales.sombrerito = true;
				}else { this.ponerleClickAHTMLParaSaltearTutorial() 
			}
		} else if (this.mundo == 3 && this.qNivel == 1) {
			usuario.habilidades.gambeta = true
			this.ponerTutorial("img/tutoriales/360.mp4")


			if (usuario.tutoriales.gambeta == false) {
				usuario.tutoriales.gambeta = true;
				}else { this.ponerleClickAHTMLParaSaltearTutorial() 
			}
		} else {
			juegoW.setup();
			$("#tutorial")[0].src = "";
			$("#tutorial").off()
			$("html").off()

		}//if niveles

		usuario.guardar()


		audioW.reproducirBgJuego()
		$("#tutorial").off().on("ended", () => {
			$("#tutorial")[0].src = "";
			juegoW.setup();
			$("#tutorial").off()
		});



	}
	ponerleClickAHTMLParaSaltearTutorial() {
		$("html")[0].onclick = () => {
			console.log("click tutorial");
			$("html").off()
			juegoW.setup();
			$("#tutorial")[0].src = "";
		};
	}

	ponerTutorial(url) {
		$("#tutorial")[0].src = url;
		$("#tutorial").show();
		$("#tutorial")[0].currentTime = 0
		$("#tutorial")[0].play()
	}
	precargarCuerpos(nivel, cb) {
		if (nivel.hasOwnProperty("monstruo")) {
			//SI TIENE MONSTRUO
			//  alert("el nivel tiene monstruo")
			traerComp.cargarComp("monstruos", () => {
				if (this.cual.camisetaWillian == this.cual.camisetaContrincantes || (this.cual.hasOwnProperty("enemigos") && this.cual.enemigos.length == 0) || !this.cual.hasOwnProperty("enemigos")) {
					traerComp.cargarComp(this.cual.camisetaWillian, () => {
						if (cb instanceof Function) cb();
					});
				} else {
					traerComp.cargarComp(this.cual.camisetaWillian, () => {
						traerComp.cargarComp(this.cual.camisetaContrincantes, () => {
							if (cb instanceof Function) cb();
						})
					})
				} //if camsietas iguales
			}); //traercomp monstruo
		} else {
			if (this.cual.camisetaWillian == this.cual.camisetaContrincantes || (this.cual.hasOwnProperty("enemigos") && this.cual.enemigos.length == 0) || !this.cual.hasOwnProperty("enemigos")) {
				traerComp.cargarComp(this.cual.camisetaWillian, () => {
					if (cb instanceof Function) cb();
				});
			} else {
				traerComp.cargarComp(this.cual.camisetaWillian, () => {
					traerComp.cargarComp(this.cual.camisetaContrincantes, () => {
						if (cb instanceof Function) cb();
					})
				})
			} //if camsietas iguales
		} //if mosntruo
	} //precargar
}