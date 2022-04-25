import MovingObject from "./moving_object";

class Ball extends MovingObject {

    constructor(options) {
        super({
            mass: 10,
            pos: options['pos'],
            vel: options['vel'],
            color: "gray",
            radius: 10
        });
        this.friction = .95;
    }

}

export default Ball