(function () {
    //----- ENABLE USE OF STRICT MODE -----
    "use strict";

    var d,
        a,
        b,
        c,
        nivel = nivel_2,
        container = document.getElementById('container');

    function getType(type) {
        for (d = 0; d < nivel.tilesets.length; d += 1) {
            if (type === nivel.tilesets[d].firstgid) {
                return d;
            }
        }
    }

    for (a = nivel.layers.length - 1; a >= 0; a -= 1) {
        var cont = 0;
        for (b = 0; b < nivel.height; b += 1) {
            for (c = 0; c < nivel.width; c += 1) {
                if (getType(nivel.layers[a].data[cont]) !== undefined) {
                    var tileWidth = 'width: ' + nivel.tilesets[getType(nivel.layers[a].data[cont])].tilewidth + 'px;',
                        tileHeight = 'height: ' + nivel.tilesets[getType(nivel.layers[a].data[cont])].tileheight + 'px;',
                        titleLeft = 'left: ' + c * nivel.tilewidth + 'px;',
                        tileTop = 'top: ' + b * nivel.tileheight + 'px;',
                        name = nivel.tilesets[getType(nivel.layers[a].data[cont])].name,
                        nameLayer = nivel.layers[a].name,
                        image = 'background-image: url(' + nivel.tilesets[getType(nivel.layers[a].data[cont])].image + ');';

                    if (nivel.tilesets[getType(nivel.layers[a].data[cont])].tileheight > nivel.tileheight) {
                        tileTop = 'top: ' + ((b * nivel.tileheight + nivel.tileheight) - nivel.tilesets[getType(nivel.layers[a].data[cont])].tileheight) + 'px;';
                    }


                    container.innerHTML += "<div class='" + nameLayer + " " + name + "' style='" + tileWidth + " " + tileHeight + " " + titleLeft + " " + tileTop + " " + image + "'></div>";
                }
                cont += 1;
            }
        }
    }

    document.getElementById('container').style.width = nivel.tilewidth * nivel.width + 'px';
    
}());