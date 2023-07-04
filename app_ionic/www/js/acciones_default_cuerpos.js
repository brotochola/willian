
	// timeline functions:
	this.frame_30 = function() {
		this.gotoAndPlay("parado")
	}
	this.frame_47 = function() {
		this.gotoAndPlay("corriendo")
	}
	this.frame_56 = function() {
		this.padre.patear()
	}
	this.frame_66 = function() {
		this.padre.terminoDePatear();
	}
	this.frame_95 = function() {
		this.gotoAndPlay("caminando")
	}
	this.frame_107 = function() {
		this.padre.mitadDeGambeta360();
	}
	this.frame_118 = function() {
		this.padre.terminoGambeta360();
	}
	this.frame_122 = function() {
		this.padre.cabecear()
	}
	this.frame_129 = function() {
		this.padre.terminoDePatear();
	}
	this.frame_131 = function() {
		this.padre.cabecear()
	}
	this.frame_134 = function() {
		this.gotoAndStop("suspendidoEnElAire")
	}
	this.frame_138 = function() {
		this.padre.impulsoParaArriba();
	}
	this.frame_140 = function() {
		this.padre.suspendidoEnElAireHastaCaer()
	}
	this.frame_237 = function() {
		this.padre.terminoDeAterrizar();
	}
	this.frame_255 = function() {
		this.padre.stop();
	}
	this.frame_270 = function() {
		this.padre.cambiarAccion("parado")
	}
	this.frame_326 = function() {
		this.padre.stop()
	}
	this.frame_340 = function() {
		this.padre.stop()
	}
	this.frame_361 = function() {
		this.gotoAndPlay("festejo")
	}
	this.frame_381 = function() {
		this.gotoAndPlay("festejo2")
	}
	this.frame_395 = function() {
		this.gotoAndPlay("corriendo")
	}
	this.frame_398 = function() {
		this.padre.mitadDeLaGambetaSombrerito();
	}
	this.frame_402 = function() {
		this.padre.terminoSombrerito();
	}
	this.frame_424 = function() {
		this.padre.terminoLaBarrida();
	}
	this.frame_431 = function() {
		this.padre.terminoDePatear();
	}
	this.frame_462 = function() {
		this.gotoAndPlay("trotando")
	}
	this.frame_470 = function() {
		this.padre.terminoDeBajarla()
	}
	this.frame_474 = function() {
		this.padre.terminoDeGirar();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(30).call(this.frame_30).wait(17).call(this.frame_47).wait(9).call(this.frame_56).wait(10).call(this.frame_66).wait(29).call(this.frame_95).wait(12).call(this.frame_107).wait(11).call(this.frame_118).wait(4).call(this.frame_122).wait(7).call(this.frame_129).wait(2).call(this.frame_131).wait(3).call(this.frame_134).wait(4).call(this.frame_138).wait(2).call(this.frame_140).wait(97).call(this.frame_237).wait(18).call(this.frame_255).wait(15).call(this.frame_270).wait(56).call(this.frame_326).wait(14).call(this.frame_340).wait(21).call(this.frame_361).wait(20).call(this.frame_381).wait(14).call(this.frame_395).wait(3).call(this.frame_398).wait(4).call(this.frame_402).wait(22).call(this.frame_424).wait(7).call(this.frame_431).wait(31).call(this.frame_462).wait(8).call(this.frame_470).wait(4).call(this.frame_474).wait(1));