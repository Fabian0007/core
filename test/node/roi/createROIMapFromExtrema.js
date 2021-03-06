import ROIMapper from '../../../src/image/roi/createROIMapFromExtrema';
import {Image} from '../common';



describe('we check createROIMapFromMaxima', function () {
    it('should yield the right map', function () {

        let image = new Image(5, 5,
            [
                0, 0, 0, 0, 0,
                0, 3, 1, 1, 1,
                0, 1, 2, 2, 2,
                0, 1, 2, 4, 3,
                0, 1, 2, 3, 3
            ],
            {kind: 'GREY'}
        );

        let roiMap = ROIMapper(image);


//        console.log(roiMap);

    });

    it('should yield the right map', function () {

        let image = new Image(5, 5,
            [
                0, 0, 0, 0, 0,
                0, 1, 1, 1, 1,
                0, 1, 2, 2, 2,
                0, 1, 2, 3, 2,
                0, 1, 2, 2, 2
            ],
            {kind: 'GREY'}
        );

        let roiMap = ROIMapper(image);


        console.log(roiMap);

    });

});
