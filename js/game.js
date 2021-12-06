var HTMLElement = HTMLElement,
    animationFrame = animationFrame,
    Hammer = Hammer,
    console = console,
    Element = Element,
    Audio = Audio;

(function () {
    //----- ENABLE USE OF STRICT MODE -----
    "use strict";

    //----- DECLARATION OF GLOBAL VARIABLES -----
    var avatar = document.getElementsByClassName("avatar")[0],
        gat = [],
        lock,
        container = document.getElementById('container'),
        mc,
        positionBackgroundCoin = 0,
        
        //----- AUDIO -----
        somJump = new Audio("audio/jump.wav"),
        somWalk = new Audio("audio/walk.wav"),
        somMotor = new Audio("audio/motor.wav"),
        somMusic = new Audio("audio/music.wav"),
        somCoin = new Audio("audio/coin.wav"),
        
        //----- IMAGE -----
        imgAvatarL = new Image(),
        imgAvatarR = new Image();

    somMusic.volume = 0.4;
    somMusic.loop = true;
    somMusic.play();

    imgAvatarL.src = 'img/AvatarL.png';
    imgAvatarR.src = 'img/AvatarR.png';
    
    /*
    somMusic.oncanplaythrough = function() {
        alert("audio carregado");
    };
    
    imgAvatarL.onload = function(e) {
        alert("AvatarL carregado!");
    };

    imgAvatarR.onload = function(e) {
        alert("AvatarR carregado!");
    };
    */

    //----- REQUEST ANIMATION FRAME CROSS BOWSER -----
    window.animationFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
    }());

    //----- TOGGLE FULLSCREEN CROSS BOWSER -----
    function toggleFullScreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    //----- REMOVE ELEMENTS -----
    HTMLElement.prototype.remover = function () {
        this.parentElement.removeChild(this);
    };

    //----- GET OBJECT TYPE -----
    HTMLElement.prototype.tipoObjeto = function () {
        var classe = this.getAttribute("class"),
            palavras = classe.split(" "),
            tamanho = palavras.length,
            tipoDeObjeto = palavras[tamanho - 1];
        return tipoDeObjeto;
    };

    //----- FUNCTION TO LOCKING OF NEW CALL -----
    lock = function (valor, bolean) {
        if (gat[valor] === undefined) {
            gat[valor] = true;
        }
        switch (bolean) {
        case undefined:
            var a = gat[valor];
            gat[valor] = false;
            return a;
        case true:
            gat[valor] = true;
            break;
        case 'status':
            return gat[valor];
        }
    };

    //----- FUNCTION TO RETURN FALSE IF COLLISION OCCUR -----
    HTMLElement.prototype.colisao = function (valor, distancia) {
        var quantObjetos = document.getElementsByClassName("objeto").length,
            movBottom,
            movTop,
            movLeft,
            movRight,
            all = true,
            bottom = true,
            right = true,
            left = true,
            top = true,
            i,
            thisTop,
            thisBottom,
            thisLeft,
            thisRight,
            colide,
            colideTop,
            colideLeft,
            colideRight,
            colideBottom,
            objeto;

        function verificarColisao() {
            //----- VARIABLES OF THE SELECTED OBJECT -----
            var objetoTop = objeto.offsetTop,
                objetoBottom = objeto.offsetTop + objeto.offsetHeight,
                objetoLeft = objeto.offsetLeft,
                objetoRight = objeto.offsetLeft + objeto.offsetWidth;

            if (thisBottom >= objetoTop && thisRight >= objetoLeft && thisLeft <= objetoRight && thisTop <= objetoBottom) {
                if (thisBottom > objetoTop && thisRight > objetoLeft && thisLeft < objetoRight && thisTop < objetoBottom) {
                    colide = true;
                }
                if (thisBottom >= objetoTop && thisRight > objetoLeft && thisLeft < objetoRight && thisTop < objetoBottom) {
                    movBottom = objetoTop;
                }
                if (thisTop <= objetoBottom && thisBottom > objetoTop && thisRight > objetoLeft && thisLeft < objetoRight) {
                    movTop = objetoBottom;
                }
                if (thisLeft <= objetoRight && thisBottom > objetoTop && thisRight > objetoLeft && thisTop < objetoBottom) {
                    movLeft = objetoRight;
                }
                if (thisRight >= objetoLeft && thisBottom > objetoTop && thisLeft < objetoRight && thisTop < objetoBottom) {
                    movRight = objetoLeft;
                }
                if (thisBottom === objetoTop && thisRight > objetoLeft && thisLeft < objetoRight && thisTop < objetoBottom) {
                    colideTop = true;
                }
                if (thisRight === objetoLeft && thisBottom > objetoTop && thisLeft < objetoRight && thisTop < objetoBottom) {
                    colideLeft = true;
                }
                if (thisLeft === objetoRight && thisBottom > objetoTop && thisRight > objetoLeft && thisTop < objetoBottom) {
                    colideRight = true;
                }
                if (thisTop === objetoBottom && thisBottom > objetoTop && thisRight > objetoLeft && thisLeft < objetoRight) {
                    colideBottom = true;
                }
            }
        }

        for (i = 0; i < quantObjetos; i += 1) {
            objeto = document.getElementsByClassName("objeto")[i];

            colide = false;
            colideTop = false;
            colideLeft = false;
            colideRight = false;
            colideBottom = false;

            thisTop = this.offsetTop;
            thisBottom = this.offsetTop + this.offsetHeight;
            thisLeft = this.offsetLeft;
            thisRight = this.offsetLeft + this.offsetWidth;

            switch (valor) {
            case 'top':
                thisTop -= distancia;
                break;
            case 'left':
                thisLeft -= distancia;
                break;
            case 'right':
                thisRight += distancia;
                break;
            case 'bottom':
                thisBottom += distancia;
                break;
            }

            //----- IF THE OBJECT IS AVATAR -----
            if (this.tipoObjeto() === 'avatar' && objeto.tipoObjeto() !== 'avatar') {
                verificarColisao();

                //----- SHARES FOR EVERY TYPE OF OBJECT -----
                if (colide) {
                    switch (objeto.tipoObjeto()) {
                    case 'steel':
                        if (colide) {
                            all = false;
                        }
                        if (colideTop) {
                            bottom = false;
                        }
                        if (colideLeft) {
                            right = false;
                        }
                        if (colideRight) {
                            left = false;
                        }
                        if (colideBottom) {
                            top = false;
                        }
                        break;
                    case 'coin':
                        if (distancia < 40) {
                            quantObjetos -= 1;
                            document.getElementById('valorcoin').innerHTML = (parseInt(document.getElementById('valorcoin').innerHTML, 10) + 1).toFixed(2);
                            somCoin.currentTime = 0;
                            somCoin.play();
                            objeto.remover();
                        }
                        break;
                    }
                }
            }
            //----- BELOW BY CONDITIONS IF 'THIS' IS NOT AVATAR -----
        }

        switch (valor) {
        case 'top':
            if (!all) {
                top = false;
                if (distancia < 40) { this.style.top = movTop + 'px'; }
            }
            return top;
        case 'left':
            if (!all) {
                left = false;
                this.style.left = movLeft + 'px';
            }
            return left;
        case 'right':
            if (!all) {
                right = false;
                this.style.left = movRight - this.offsetWidth + 'px';
            }
            return right;
        case 'bottom':
            if (!all) {
                bottom = false;
                this.style.top = movBottom - this.offsetHeight + 'px';
            }
            return bottom;
        default:
            return all;
        }
    };

    //----- ANIMATION AVATAR -----    
    function animWalk() {
        var frame;

        function walk() {
            if (frame === -320) {
                frame = -40;
            } else {
                frame -= 40;
            }
            if (!lock(5, 'status')) {
                avatar.style.backgroundPositionY = '-160px';
                if (!avatar.colisao('bottom', 2)) {
                    somMotor.play();
                }
            } else {
                if (avatar.colisao('bottom', 2)) {
                    avatar.style.backgroundPositionY = '-80px';
                } else {
                    avatar.style.backgroundPositionY = '0px';
                    somWalk.play();
					    somMusic.play();
                }
            }

            avatar.style.backgroundPositionX = frame + 'px';

            setTimeout(function () {
                if (!lock(1, 'status') || !lock(2, 'status')) {
                    animationFrame(walk);
                } else {
                    lock(4, true);
                    avatar.style.backgroundPositionX = '0px';
                }
            }, 1000 / 15);
        }
        if (lock(4)) {
            frame = 0;
            walk();
        }
    }

    /**************
     * GAME CONTROLS
     **************/

    //----- GO TO DIRECTION -----
    function go(direction) {
        var vel = 2,
            g = 0,
            qw = 0,
            oldw = 1;

        function walkUp() {
            var easing = 1 - qw * qw;
            if (qw < 1) {
                qw += 0.02;
            }

            if (avatar.colisao('top', (vel * 2) * easing)) {
                avatar.style.top = avatar.offsetTop - ((vel * 2) * easing) + 'px';
            }
            if (!lock(0, 'status')) {
                if (qw < 1 && avatar.colisao('top', 2)) {
                    animationFrame(walkUp);
                } else {
                    oldw = 0;
                    lock(0, true);
                }
            }
        }

        function walkDown() {
            var easing = oldw * oldw;
            if (oldw < 1) {
                oldw += 0.02;
            }
            if (avatar.colisao('bottom', vel * easing)) {
                avatar.style.top = avatar.offsetTop + vel * easing + 'px';
            }
            if (!lock(3, 'status')) {
                animationFrame(walkDown);
            }
        }

        function walkLeft() {
            avatar.style.backgroundImage = "url('img/AvatarL.png')";
            if (avatar.colisao('left', vel) && avatar.offsetLeft >= 0) {
                avatar.style.left = avatar.offsetLeft - vel + 'px';
                document.getElementById('camera').scrollLeft = (avatar.offsetLeft + vel) - document.getElementById('camera').offsetWidth / 2;
            }
            if (!lock(1, 'status')) {
                animationFrame(walkLeft);
            }
        }

        function walkRight() {
            avatar.style.backgroundImage = "url('img/AvatarR.png')";
            if (avatar.colisao('right', vel) && avatar.offsetLeft < document.getElementById('container').offsetWidth - avatar.offsetWidth) {
                avatar.style.left = avatar.offsetLeft + vel + 'px';
                document.getElementById('camera').scrollLeft = (avatar.offsetLeft - vel) - document.getElementById('camera').offsetWidth / 2;
            }
            if (!lock(2, 'status')) {
                animationFrame(walkRight);
            }
        }

        switch (direction) {
        case 'up':
            if (lock(0)) {

                somJump.currentTime = 0;
                somJump.play();
                avatar.style.backgroundPositionY = '-80px';

                walkUp();
            }
            break;
        case 'left':
            if (lock(1)) {
                animWalk();
                walkLeft();
            }
            break;
        case 'right':
            if (lock(2)) {
                animWalk();
                walkRight();
            }
            break;
        case 'down':
            if (!lock(5, 'status')) {
                avatar.style.backgroundPositionY = '-160px';
            } else {
                if (avatar.colisao('bottom', 2)) {
                    avatar.style.backgroundPositionY = '-80px';
                } else {
                    avatar.style.backgroundPositionY = '0px';
                }
            }
            if (lock(3)) {
                walkDown();
            }
            break;
        }
    }

    //----- KEYBOARD CONTROLS -----
    document.onkeydown = function (e) {
        switch (e.keyCode) {
        case 37: // Button left
            go('left');
            break;
        case 38: // Button up
            if (!avatar.colisao('bottom', 2)) {
                go('up');
            }
            break;
        case 39: // Button right
            go('right');
            break;
        case 40: // Button down
            if (lock(5)) {
                avatar.style.height = '40px';
                avatar.style.top = avatar.offsetTop + 40 + 'px';
            }
            break;
        }
    };

    //----- RESET KEYBOARD CONTROLS -----
    document.onkeyup = function (e) {
        function as() {
            if (avatar.colisao('top', 40)) {
                lock(5, true);
                avatar.style.height = '80px';
                avatar.style.top = avatar.offsetTop - 40 + 'px';
                lock(6, true);
            } else {
                animationFrame(as);
            }
        }

        switch (e.keyCode) {
        case 37: // Button left
            lock(1, true);
            break;
        case 39: // Button right
            lock(2, true);
            break;
        case 40: // Button down
            if (avatar.colisao('top', 40)) {
                lock(5, true);
                avatar.style.height = '80px';
                avatar.style.top = avatar.offsetTop - 40 + 'px';
            } else {
                if (lock(6)) {
                    as();
                }
            }
            break;
        }
    };

    //----- GESTURE CONTROL WITH "HAMMER.JS" LIBRARY -----
    mc = new Hammer(container); // Create a simple instance

    mc.get('pan').set({
        direction: Hammer.DIRECTION_ALL
    }); // Let the pan gesture support all directions

    mc.on("panstart panend panleft panright panup pandown", function (e) {
        switch (e.type) {
        case 'panleft': // Button left
            lock(2, true);
            go('left');
            break;
        case 'panup': // Button up
            if (!avatar.colisao('bottom', 2)) {
                go('up');
            }
            break;
        case 'panright': // Button right
            lock(1, true);
            go('right');
            break;
        case 'pandown': // Button down
            if (lock(5)) {
                avatar.style.height = '40px';
                avatar.style.top = avatar.offsetTop + 40 + 'px';
            }
            break;
        case 'panend': // Reset all
            lock(1, true);
            lock(2, true);
            break;
        }
        console.log(e.type);
    });

    //----- SWITCH TO FULL SCREEN -----
    document.getElementById('fullscreen').onclick = function () {
        toggleFullScreen();
    };

    //----- GRAVITY -----
    function gravity() {
        if (lock(0, 'status')) {
            go('down');
        }
        animationFrame(gravity);
    }
    gravity();

    // ANIMATION COIN
    function animCoin() {
        var coin = document.getElementsByClassName('coin').length,
            i;

        for (i = 0; i < coin; i += 1) {
            document.getElementsByClassName('coin')[i].style.backgroundPositionX = positionBackgroundCoin + 'px';
        }
        if (positionBackgroundCoin > 192) {
            positionBackgroundCoin = 0;
        } else {
            positionBackgroundCoin -= 20;
        }
        setTimeout(function () {
            animationFrame(animCoin);
        }, 1000 / 15);
    }
    animCoin();
}());