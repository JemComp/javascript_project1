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
    }

}
export default GoalZone