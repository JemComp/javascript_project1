const Game = require("./game")

class GameView {

    constructor(game, contex) {
        this.game = game,
        this.ctx = contex;
    }

    run() {
        this.ctx.fillStyle = "rgba(135, 211, 124)";
        this.ctx.fillRect(0, 0, this.game.getDIM()[0], this.game.getDIM()[0]);
        this.game.handleInputs()
        this.game.draw(this.ctx);
        this.game.move();
        window.requestAnimationFrame(this.run.bind(this))
    }



}

export default GameView 