import MovingObject from "./moving_object";

class Player extends MovingObject {
    constructor(options) {
        super({
            mass: 100,
            pos: options['pos'],
            vel: options['vel'],
            color: options["color"] ||= "red",
            radius: 20
        });

    }


    inputs(key) {
        
    }
}

export default Player