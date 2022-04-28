import MovingObject from "./moving_object";

class Ball extends MovingObject {

    constructor(options) {
        super({
            mass: 10,
            pos: options['pos'],
            vel: options['vel'],
            color: "grey",
            radius: 10
        });
        this.friction = .98;
        this.ballPic = new Image();
        this.ballPic.src = "./src/images/soccerBall.png"
    }

    draw(ctx) {
        ctx.drawImage(this.ballPic, this.pos[0]-this.radius, this.pos[1] - this.radius, 2*this.radius, 2*this.radius)
    }   


}

export default Ball