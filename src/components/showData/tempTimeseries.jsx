import React from 'react'
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Histogram, Curve } from 'recharts';
import { extent, bin } from 'd3-array';

const tempTimeseries = (props) => {

    const binCount = 10;
    const dataMin = 0;
    const dataMax = 100;
    const dataRange = dataMax - dataMin;

    const binGenerator = bin()
    .thresholds(binCount)
    .domain([dataMin, dataMax]);

    const binnedData = binGenerator(props.data.map(d => d.value));

    const histogramData = binnedData.map((bin, index) => ({
    binIndex: index,
    binStart: bin.x0,
    binEnd: bin.x1,
    count: bin.length,
    frequency: bin.length / props.data.length,
    }));

    const bellCurveData = [];

    const bellCurveGenerator = extent.scaleLinear()
    .domain([0, binCount - 1])
    .range([dataMin, dataMax]);

    for (let i = 0; i < binCount; i++) {
    const x = bellCurveGenerator(i);
    const y = (1 / (dataRange * Math.sqrt(2 * Math.PI))) * Math.exp(-1 * Math.pow(x - dataRange / 2, 2) / (2 * Math.pow(dataRange / 6, 2)));
    bellCurveData.push({ x, y });
    }


    return (
        <ResponsiveContainer width="100%" height={400}>
            <Bar dataKey="count" data={histogramData} fill="#8884d8" label={{ position: 'top' }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="binStart" tickFormatter={(value) => `${value}-${value + dataRange / binCount}`} />
                <YAxis />
                <Tooltip />
                <Legend />
            </Bar>
            <Line dataKey="y" data={bellCurveData} stroke="#82ca9d" dot={false} strokeWidth={2} />
        </ResponsiveContainer>
    )
}

export default tempTimeseries