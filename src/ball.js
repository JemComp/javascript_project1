import MovingObject from "./moving_object";

class Ball extends MovingObject {

    constructor(options) {
        super({
            mass: 10,
            pos: options['pos'],
            vel: options['vel'],
            color: "white",
            radius: 10
        });
        this.friction = .98;
    }

}

export default Ball