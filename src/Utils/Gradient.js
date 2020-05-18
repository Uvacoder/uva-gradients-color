class Gradient {
    constructor(colorStack, linear, degrees, name) {
        this.colorStack = colorStack; // array of Color objects
        this.linear = linear; // false = radial
        this.degrees = degrees; // if linear
        this.name = name;
    }
}

export { Gradient };
