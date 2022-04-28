import Placeable from "./placeable";

class GoalZone extends Placeable{

    constructor(options) {
        super({
            mass: options['mass'],
            pos: options['pos'],
            vel: options['vel'],
            dim: options["dim"],
            color: options["color"] ||= "black",
            shape: "rectangle"
        })
        this.team = options["team"]
        this.goal = new Image();
        if (this.team === 1) {
            this.goal.src = "../src/images/goalRight.png"
        }
        else {
            this.goal.src = "../src/images/goalLeft.png"
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        // ctx.fillRect(this.pos[0], this.pos[1], this.dim[0], this.dim[1]);

        ctx.drawImage(this.goal, 190, 100, 200, 400, this.pos[0], this.pos[1], this.dim[0], this.dim[1])
    }

}
export default GoalZone