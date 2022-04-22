import MovingObject from "./moving_object";

class Ball extends MovingObject {

    constructor(options) {
        super({
            mass: 5,
            pos: options['pos'],
            vel: options['vel'],
            color: "gray",
            radius: 15
        });
    }

}

export default Ball