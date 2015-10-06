//see https://github.com/fiji/Auto_Threshold/blob/master/src/main/java/fiji/threshold/Auto_Threshold.java
// W. Doyle, "Operation useful for similarity-invariant pattern recognition,"
// Journal of the Association for Computing Machinery, vol. 9,pp. 259-267, 1962.
// ported to ImageJ plugin by G.Landini from Antti Niemisto's Matlab code (GPL)
// Original Matlab code Copyright (C) 2004 Antti Niemisto
// See http://www.cs.tut.fi/~ant/histthresh/ for an excellent slide presentation
// and the original Matlab code.

function partialSum(histogram, limite) {//a partial sum is calculated according to the value limit
    let sum = 0;
    for (let i = 0; i <= limite; i++){
        sum += histogram[i];
    }

    return sum;
}

 export default function percentile(histogram,total) {

    let threshold = -1;
    let percentile= 0.5; // default fraction of foreground pixels
    let distancePercentile = []; //stores the distances to the target percentile
    let histogramLength = histogram.length;
    let lowDistance = 1.0; //lower percentile distance


    for (let i = 0; i < histogramLength; i++){
        distancePercentile[i] = Math.abs((partialSum(histogram, i) / total) - percentile);
        if (distancePercentile[i] < lowDistance) {
            lowDistance = distancePercentile[i];
            threshold = i;
        }
    }
    return threshold;
}
