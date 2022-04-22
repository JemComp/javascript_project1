import MovingObject from "./moving_object"
import GameView from "./game_view";
import Game from "./game";


console.log("Webpack is working!")


window.addEventListener("DOMContentLoaded", (event) => {
    let canvas = document.getElementById('game-canvas');
    let ctx = canvas.getContext("2d");

    let view = new GameView(new Game(), ctx);
    view.run();

})

