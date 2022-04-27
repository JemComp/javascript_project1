import MovingObject from "./moving_object";


class Placeable extends MovingObject{

    constructor(options) {
        super({
            mass: options['mass'],
            pos: options['pos'],
            vel: options['vel'],
            color: options["color"] ||= "black",
            shape: "rectangle"
        });
        this.dim = options["dim"]
        this.shape = "rectangle"
        this.friction = .9;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0], this.pos[1], this.dim[0], this.dim[1]);
    }

    bounce(otherObj) {
        let v1x = (this.vel[0] * (this.mass - otherObj.mass) + 2 * otherObj.mass * otherObj.vel[0]) /(this.mass + otherObj.mass)
        let v1y = (this.vel[1] * (this.mass - otherObj.mass) + 2 * otherObj.mass * otherObj.vel[1]) /(this.mass + otherObj.mass)

        let v2x = (otherObj.vel[0] * (otherObj.mass - this.mass) + 2 * this.mass * this.vel[0]) /(this.mass + otherObj.mass)
        let v2y = (otherObj.vel[1] * (otherObj.mass - this.mass) + 2 * this.mass * this.vel[1]) /(this.mass + otherObj.mass)
        
        this
        if (otherObj.center()[0] > this.pos[0] && otherObj.center()[0] < this.pos[0] + this.dim[0]) {
           console.log("rectangle range", this.pos, this.pos[0] + this.dim[0])
           console.log("circle range", otherObj.pos[0] )
         
            otherObj.vel = [otherObj.vel[0], v2y];
            console.log("vertical hit")
        } else {
            otherObj.vel  = [v2x, otherObj.vel[1]];
            console.log("side hit")
        }

        this.vel = [v1x, v1y];
        

    }

    center() {
        return [this.pos[0] + this.dim[0]/2, this.pos[1] + this.dim[1]/2]
    }
}

export default Placeable