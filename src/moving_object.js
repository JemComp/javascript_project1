
class MovingObject {

    constructor(options) { // CONSTRUCTOR TAKES IN HASH WITH PARAMETERS
        this.mass = options['mass'];
        this.pos = options['pos'];
        this.vel = options['vel'];
        this.radius = options['radius'];
        this.color = options['color']
        this.friction = 1;
        this.shape = "circle"; 

    }


    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI)
        ctx.fill();
    }

    rebound(wall) {
        if (wall === "horizontal") {
            this.vel[0] = -1 * this.friction * this.vel[0]
        } 

        if (wall === "vertical") {
            this.vel[1] = -1 * this.friction * this.vel[1]
        }
    }


    move() {
        this.vel[0] = this.friction*this.vel[0];
        this.vel[1] = this.friction* this.vel[1]
        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    }

    bounce(otherObj) {


    }

    


}

export default MovingObject