import Image from '../image';
import {validateChannel} from './../../util/channel';

export default function getRow(row, channel = 0) {

    this.checkProcessable('getRow', {
        bitDepth: [8, 16]
    });

    this.checkRow(row);
    this.checkChannel(channel);


    let array = new Array(this.width);
    let ptr = 0;
    let begin = row * this.width * this.channels + channel;
    let end = begin + this.width * this.channels;
    for (let j = begin; j < end; j += this.channels) {
        array[ptr++] = this.data[j];
    }

    return array;
}
