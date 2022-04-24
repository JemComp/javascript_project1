import MovingObject from "./moving_object"
import GameView from "./game_view";
import Game from "./game";


console.log("Webpack is working!")


window.addEventListener("DOMContentLoaded", (event) => {
    let canvas = document.getElementById('game-canvas');
    let ctx = canvas.getContext("2d");
    let game = new Game()
    let view = new GameView(game, ctx);
    view.run();

    window.addEventListener("keydown", (event) => {
        game.pressedKeys[event.code] = true
        // console.log("press")
    })

    window.addEventListener("keyup", (event) => {
        game.pressedKeys[event.code] = false

    })

})

