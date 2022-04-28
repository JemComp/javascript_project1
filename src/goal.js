import Placeable from "./placeable";
import GoalZone from "./goal_zone";

class Goal {

    constructor(options, team) {

        this.goalZone = new GoalZone({
            pos: options["pos"],
            vel: options["vel"],
            dim: [options[`dim`][0] *.8,options[`dim`][1] *.8],
            team: team

        })

        this.things = [this.goalZone]
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0], this.pos[1], this.dim[0], this.dim[1]);

        this.things.forEach((obj) => {
            obj.draw(ctx)
        })

    }

    move() {
        this.things.forEach((obj) => {
            obj.vel = this.vel
            console.log(obj.vel)
            obj.move()
        })

        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    }

}

export default Goal