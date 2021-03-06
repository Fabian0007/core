import Image from '../image';

export default function crop({
    x = 0,
    y = 0,
    width = this.width - x,
    height = this.height - y
    } = {}) {

    if (x > (this.width - 1) || y > (this.height - 1))
        throw new RangeError(`crop: origin (x:${x}, y:${y}) out of range (${this.width - 1}; ${this.height - 1})`);
    if (width <= 0 || height <= 0)
        throw new RangeError(`crop: width and height (width:${width}; height:${height}) must be positive numbers`);
    if (x < 0 || y < 0)
        throw new RangeError(`crop: x and y (x:${x}, y:${y}) must be positive numbers`);
    if (width > (this.width - x) || height > (this.height - y))
        throw new RangeError(`crop: (x: ${x}, y:${y}, width:${width}, height:${height}) size is out of range`);

    let newImage = Image.createFrom(this, {width, height});

    let xWidth = width * this.channels;
    let y1 = y + height;

    let ptr = 0; // pointer for new array

    let jLeft = x * this.channels;

    for (let i = y; i < y1; i++) {
        let j = (i * this.width * this.channels) + jLeft;
        let jL = j + xWidth;
        for (; j < jL; j++) {
            newImage.data[ptr++] = this.data[j];
        }
    }

    return newImage;
}
