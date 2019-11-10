var map = {
    cols: 9,
    rows: 9,
    tsize: 64,
    layers: [[
        3, 3, 3, 3, 3, 3, 3, 3,
        3, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 2, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 2, 1, 1, 1, 3,
        3, 1, 1, 1, 2, 1, 1, 3,
        3, 1, 1, 1, 2, 1, 1, 3,
        3, 3, 3, 1, 2, 3, 3, 3
    ], [
        4, 3, 3, 3, 3, 3, 3, 4,
        4, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 5, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 4,
        4, 4, 4, 0, 5, 4, 4, 4,
        0, 3, 3, 0, 0, 3, 3, 3
    ]],
    // getTile: function (layer, col, row) {
    //     return this.layers[layer][row * map.cols + col];
    // }
    getTile: function (name, col, row) {
        return this[name][row][col]; // is it less efficient to go by name ??? might be more future proof though than to have list that can potentially change order and confuse people?
    },
    getDynamicTile: function (col, row) {
        const data = this['dynamic'][row][col];
        if (data.player) {
            return 6;
        }
        if (data.berries) {
            return 7;
        }
        return 0;
    }
};

Game.load = function () {
    return [
        Loader.loadImage('tiles', '../assets/tiles_new.png'),
        Loader.loadImage('character', '../assets/character.png')
    ];
};

Game.init = function () {
    this.tileAtlas = Loader.getImage('tiles');
    //this.hero = { x: 128, y: 384, image: Loader.getImage('character') };
    var socket = io.connect('http://localhost:3000')
    console.log("INIT")

    socket.on('get proximity', function (msg) {
        map.tiles = msg.tiles;
        map.dynamic = msg.dynamic
        if (map.dynamic[4][4].berries) {
            socket.emit('action', { type: "use ground item" });
        } else {
            socket.emit('action', { type: "move", direction: "right" });
        }
        Game.render()
    });
};

// Game._drawLayer = function (layer) {
//     for (var c = 0; c < map.cols; c++) {
//         for (var r = 0; r < map.rows; r++) {
//             var tile = map.getTile(layer, c, r);
//             if (tile !== 0) { // 0 => empty tile
//                 this.ctx.drawImage(
//                     this.tileAtlas, // image
//                     (tile - 1) * map.tsize, // source x
//                     0, // source y
//                     map.tsize, // source width
//                     map.tsize, // source height
//                     c * map.tsize,  // target x
//                     r * map.tsize, // target y
//                     map.tsize, // target width
//                     map.tsize // target height
//                 );
//             }
//         }
//     }
// };

Game._drawLayer = function (layer) {
    for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
            var tile = map.getTile(layer, c, r);
            if (tile !== 0) { // 0 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
                    (tile - 1) * map.tsize, // source x
                    0, // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    r * map.tsize,  // target x
                    c * map.tsize, // target y
                    map.tsize, // target width
                    map.tsize // target height
                );
            }
        }
    }
};

Game._drawDynamicLayer = function (layer) {
    for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
            var tile = map.getDynamicTile(c, r);
            if (tile !== 0) { // 0 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
                    (tile - 1) * map.tsize, // source x
                    0, // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    r * map.tsize,  // target x
                    c * map.tsize, // target y
                    map.tsize, // target width
                    map.tsize // target height
                );
            }
        }
    }
};

Game.render = function () {
    // draw map background layer
    this._drawLayer("tiles");
    // draw game sprites
    //this.ctx.drawImage(this.hero.image, this.hero.x, this.hero.y);
    // draw map top layer
    this._drawDynamicLayer();
};
