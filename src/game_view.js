const Game = require("./game")

class GameView {

    constructor(game, contex) {
        this.game = game,
        this.ctx = contex;
        this.field = new Image();
        this.field.src = "../src/images/soccerField.png"
    }

    run() {
        // this.ctx.fillStyle = "rgba(135, 211, 124)";
        this.ctx.fillRect(0, 0, this.game.getDIM()[0], this.game.getDIM()[1]);
        this.ctx.drawImage(this.field, 0,0, this.game.getDIM()[0], this.game.getDIM()[1])
        this.game.handleInputs()
        this.game.draw(this.ctx, this.goal);
        this.game.move();
        window.requestAnimationFrame(this.run.bind(this))
    }



}

export default GameView 