export function sample(array) {
    return array[Math.floor(Math.random() * this.hand.length)]
}

export function doFor(iterations, funct) {
    for (let index = 0; index < iterations; index++) {
        funct()
    }
}