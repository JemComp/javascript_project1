import Ball from "./ball";
// const Field = require(",/field")


class Game {

    constructor() {
        this.DIM_X = 1000;
        this.DIM_Y = 600;
        this.players = []; 
        this.ball = new Ball({ 
            pos: [this.DIM_X/2, this.DIM_Y/2],
            vel: [0,0]
        })

        this.movable = [this.ball];
    }

    getDIM() {
        return [this.DIM_X, this.DIM_Y]
    }

    reset() {
        this.ball = new Ball ({ 
            pos: [this.DIM_X/2, this.DIX_Y/2],
            vel: [0,0]
        })
    }

    move() {
        this.movable.forEach( (obj) => {
            obj.move()
        })
        this.ball.move();
    }

    draw(ctx) {
        this.movable.forEach( (obj) => {
            obj.draw(ctx)
        })
        this.ball.draw(ctx);
    }

}

export default Game