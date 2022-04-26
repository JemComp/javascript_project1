
class Scorecard {

    constructor(pos) {
        this.pos = pos;
        this.score = [0,0]
    }

    draw(ctx){
        ctx.fillStyle = "black"
        // ctx.font = '50px serif';

        ctx.fillText(`${this.score[0]} : ${this.score[1]}`, this.pos[0], this.pos[1], 100)
    }
}

export default Scorecard