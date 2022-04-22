const Game = require("./game")

class GameView {

    constructor(game, contex) {
        this.game = game,
        this.ctx = contex;
    }

    run() {
        // console.log(this.game.getDIM()[0], this.game.getDIM()[1])
         // console.log(
        this.ctx.fillStyle = "rgba(135, 211, 124)";
        this.ctx.fillRect(0, 0, this.game.getDIM()[0], this.game.getDIM()[0]);

        this.game.move();
        this.game.draw(this.ctx);
        // console.log(this.game.ball)
        window.requestAnimationFrame(this.run.bind(this))
    }

}

export default GameView 