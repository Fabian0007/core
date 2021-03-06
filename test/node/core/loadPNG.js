import {Image, load} from '../common';

describe('Load PNG', function () {
    const tests = [
        // ['name', components, alpha, bitDepth]
        ['grey8', 1, 0, 8],
        ['grey16', 1, 0, 16],
        ['greya16', 1, 1, 8],
        ['greya32', 1, 1, 16],
        ['rgb24', 3, 0, 8],
        ['rgb48', 3, 0, 16],
        ['rgba32', 3, 1, 8],
        ['rgba64', 3, 1, 16]
    ];

    tests.forEach(function (test) {
        it(test[0], function () {
            return load('format/' + test[0] + '.png').then(function (img) {
                img.components.should.equal(test[1]);
                img.alpha.should.equal(test[2]);
                img.bitDepth.should.equal(test[3]);
            });
        });
    });
});
