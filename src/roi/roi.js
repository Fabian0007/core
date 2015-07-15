'use strict';

export default
class ROI {

    constructor(map, id) {
        this.map = map;
        this.id = id;
        this.minX = Number.POSITIVE_INFINITY;
        this.maxX = Number.NEGATIVE_INFINITY;
        this.minY = Number.POSITIVE_INFINITY;
        this.maxY = Number.NEGATIVE_INFINITY;
        this.meanX = 0;
        this.meanY = 0;
        this.surface = 0;
        this.computed = {}; // what is the map value surrounding
    }

    get width() {
        return this.maxX - this.minX + 1;
    }

    get height() {
        return this.maxY - this.minY + 1;
    }

    get surround() {
        if (this.computed.surround) return this.computed.surround;
        return this.computed.surround = getSurroundingIDs(this);
    }

    get mask() {
        if (this.computed.mask) return this.computed.mask;

        let width = this.maxX - this.minX + 1;
        let height = this.maxY - this.minY + 1;
        let img = new IJ(width, height, {
            kind: 'BINARY',
            position: [this.minX, this.minY]
        });
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (this.map.pixels[x + this.minX + (y + this.minY) * this.map.width] === this.id) img.setBitXY(x, y);
            }
        }

        return this.computed.mask = img;
    }
}


/* it should really be an array to solve complex cases related to border effect
Like the image
0000
1111
0000
1111

The first row of 1 will be surrouned by 2 differents zones

Or even worse
010
111
010
The cross will be surrouned by 4 differents zones

 However in most of the cases it will be an array of one element
*/

function getSurroundingIDs(roi) {
    var surrounding=new Array(1);;
    var ptr=0;
    let roiMap = roi.map;
    let pixels = roiMap.pixels;
    // we check the first line and the last line
    let fromX=Math.max(roi.minX,1);
    let toX=Math.min(roi.width,roiMap.width-2);

    // not optimized  if height=1 !
    for (let y of [0, roi.height - 1]) {
        for (let x = 0; x < roi.width; x++) {
            let target = (y + roi.minY) * roiMap.width + x + roi.minX;
            if ((x-roi.minX)>0 && pixels[target] == roi.id && pixels[target - 1] != roi.id) {
                let value=pixels[target - 1];
                if (surrounding.indexOf(value)==-1) {
                    surrounding[ptr++]=value;
                }
            }
            if ((roiMap.width-x-roi.minX)>1 && pixels[target] == roi.id && pixels[target + 1] != roi.id) {
                let value=pixels[target + 1];
                if (surrounding.indexOf(value)==-1) {
                    surrounding[ptr++]=value;
                }
            }
        }
    }


    // we check the first column and the last column
    let fromY=Math.max(roi.minY,1);
    let toY=Math.min(roi.height,roiMap.height-2);
    // not optimized  if width=1 !
    for (let x of [0, roi.width-1]) {
        for (let y = 0; y < roi.height; y++) {
            let target = (y + roi.minY) * roiMap.width + x + roi.minX;
            if ((y-roi.minY)>0 && pixels[target] == roi.id && pixels[target - roiMap.width] != roi.id) {
                let value=pixels[target - roiMap.width];
                if (surrounding.indexOf(value)==-1) {
                    surrounding[ptr++]=value;
                }
            }
            if ((roiMap.height-y-roi.minY)>1  && pixels[target] == roi.id && pixels[target + roiMap.width] != roi.id) {
                let value=pixels[target + roiMap.width];
                if (surrounding.indexOf(value)==-1) {
                    surrounding[ptr++]=value;
                }
            }
        }
    }
    if (surrounding[0]==undefined) return [0];
    return surrounding; // the selection takes the whole rectangle
}