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
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0], this.pos[1], this.dim[0], this.dim[1]);
    }

    // bounce(otherObj) {

    // }
}

export default Placeable