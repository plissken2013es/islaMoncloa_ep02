var Moncloa = {};

Moncloa.Game = function() {};
Moncloa.Game.prototype = {
    init: function() {
        
    },
    preload: function() {
        this.load.path = "media/";
        this.load.image("fondo", "house.png");
        this.load.spritesheet("mariano", "mariano.png", 512, 288);
        this.load.spritesheet("maestro", "maestro.png", 352, 224);
    },
    create: function() {
        var fondo = this.add.image(this.world.centerX, this.world.centerY, "fondo");
        fondo.anchor.setTo(0.5);
        
        this.mariano = this.add.sprite(this.world.centerX - 90, this.game.height*0.8, "mariano", 7);
        this.mariano.anchor.setTo(0.5, 1);
        this.mariano.animations.add("avanza", [7,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 10, false);
        this.mariano.animations.add("retrocede", [29,29,30,31,32,33,34,35,36,37,38,39,40,41,42], 10, false);
                
        this.maestro = this.add.sprite(this.world.centerX + 90, this.game.height*0.8, "maestro", 28);
        this.maestro.anchor.setTo(0.5, 1);
        var avanza = this.maestro.animations.add("avanza", [28,28,29,30,31,32,33,34,35,36,37,38,39,40,41], 10, false);
        avanza.onComplete.add(this.fight, this);
        var retrocede = this.maestro.animations.add("retrocede", [7,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 10, false);
        retrocede.onComplete.add(this.fight, this);
        
        this.fight();
    },
    fight: function() {
        var accionMaestro = this.rnd.pick(["avanza", "retrocede"]);
        console.log("El Maestro elige " + accionMaestro);
        var accionMariano = (accionMaestro == "avanza") ? "retrocede" : "avanza";
        var salto = (accionMaestro == "avanza") ? -10 : 10;
        
        this.mariano.play(accionMariano);
        this.maestro.play(accionMaestro);
        
        var timer = this.time.create();
        timer.repeat(250, 4, function() {
            this.mariano.position.x += salto;
            this.maestro.position.x += salto;
        }, this);
        timer.start();
    }
};

var game = new Phaser.Game(960, 576, Phaser.Canvas);
game.state.add("Moncloa.Game", Moncloa.Game);
game.state.start("Moncloa.Game");