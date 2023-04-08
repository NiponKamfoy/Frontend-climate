import React, { useRef, useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar,ResponsiveContainer,Area, ComposedChart, ReferenceLine, BarChart} from 'recharts';

import Draggable from 'react-draggable';
import './timeSeries.css'
import jstat from 'jstat';

import { mean, deviation } from 'd3-array';
import { curveBasis } from 'd3-shape';
import tempTimeseries from './tempTimeseries';

// function normalDistribution(mu, sigma, x) {
//   const factor = 1 / (sigma * Math.sqrt(2 * Math.PI));
//   const exponential = Math.exp(-Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2)));
//   return factor * exponential;
// }

// function generateBellCurveData(data) {
//   const values = data.map(d => d.value);
//   const avg = mean(values);
//   const stdDev = deviation(values);
//   const bellCurveData = [];
//   for (let i = -4; i <= 4; i += 0.1) {
//     const x = avg + i * stdDev;
//     const y = normalDistribution(avg, stdDev, x);
//     bellCurveData.push({'x': x,'y': y });
//   }
//   return bellCurveData;
// }


const TimeSeries = (props) => {
    const [data, setData] = useState(props.data)
    const [key, setKey] = useState('')
    const [value, setValue] = useState('')

    const [disabled, setDisabled] = useState(false);
    const [bounds, setBounds] = useState({
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    });

    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
          return;
        }
        setBounds({
          left: -targetRect.left + uiData.x,
          right: clientWidth - (targetRect.right - uiData.x),
          top: -targetRect.top + uiData.y,
          bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    function calculateMean(data) {
        const total = data.reduce((acc, { frequency }) => acc + frequency, 0);
        return data.reduce((acc, { value, frequency }) => acc + value * frequency, 0) / total;
      }
      
    function calculateStandardDeviation(data, mean) {
        const total = data.reduce((acc, { frequency }) => acc + frequency, 0);
        return Math.sqrt(
            data.reduce((acc, { value, frequency }) => acc + frequency * (value - mean) ** 2, 0) / total
        );
    }
    
    var mean = calculateMean(props.histrogramData);
    var stdDev = calculateStandardDeviation(props.histrogramData, mean);
    
    function generateBellCurveData(mean, stdDev, histrogramdata, numPoints = 100) {
        const data = [];
        
        for (let i = 0; i < histrogramdata.length; i++){
            data.push({ x: histrogramdata[i]['value'], y:  10*(jstat.normal.pdf(histrogramdata[i]['value'], mean, stdDev))});
        }
        return data;
    }

    const [bellCurveData, setBellCurveData] = useState([])
    const [bellCurveDataCompare, setBellCurveDataCompare] = useState([])
    const [bellCurveData1, setBellCurveData1] = useState([])
    const draggleRef = useRef(null);

    useEffect(() => {

        if (props.dataType === 'Overall'){
            setKey('date')
            setValue('index')
            setData(props.data)
            console.log('overall');
        }else if (props.dataType === "Seasonal"){
            console.log('seasonal');
            setKey('month')
            setValue('value')
            setData(props.data2)
            console.log(props.data2);
        } 
        if (props.compareMode !== undefined && props.compareMode === "On"){
            setKey('value')
            setValue('frequency')
            if (props.bellCurveData1 !== undefined || props.bellCurveData1 !== []){
                setBellCurveData1(props.bellCurveData1)
            }
            if (props.bellCurveData !== undefined || props.bellCurveDataCompare !== []){
                setBellCurveDataCompare(props.bellCurveCompare)
            }
           
           
        }
        else if (props.type === 'Histrogram'){
            setKey('value')
            setValue('frequency')
            setData(props.histrogramData)
            mean = calculateMean(props.histrogramData);
            stdDev = calculateStandardDeviation(props.histrogramData, mean);
            let tempBellcurve = generateBellCurveData(mean, stdDev, props.histrogramData)
            // let tempBellcurve = generateBellCurveData(props.histrogramData)
            setBellCurveData(tempBellcurve)
            console.log(tempBellcurve);
            console.log(props.histrogramData);
            props.setBellCurveData(tempBellcurve)
        }
        
    }, [props.dataType, props.data, props.data2, props.compareMode, props.compareDataGraph, props.histrogramData, props.type, , props.bellCurveCompare, props.bellCurveData1])

    
      
    if (props.compareMode !== undefined && props.compareMode === "On"){

        console.log('bellCurveData1: ', bellCurveData1);
        console.log('bellCurveDataCompare: ', bellCurveDataCompare);

        var maxY = bellCurveData1[0]['y']

        for (let i = 0; i < bellCurveData1.length; i++){
            if (bellCurveData1[i]['y'] > maxY){
                maxY = bellCurveData1[i]['y']
            }
        }

        for (let i = 0; i < bellCurveDataCompare.length; i++){
            if (bellCurveDataCompare[i]['y'] > maxY){
                maxY = bellCurveDataCompare[i]['y']
            }
        }

        var maxX = bellCurveData1[0]['x']

        for (let i = 0; i < bellCurveData1.length; i++){
            if (bellCurveData1[i]['x'] > maxX){
                maxX = bellCurveData1[i]['x']
            }
        }

        for (let i = 0; i < bellCurveDataCompare.length; i++){
            if (bellCurveDataCompare[i]['x'] > maxX){
                maxX = bellCurveDataCompare[i]['x']
            }
        }
        console.log('maxX : ', maxX);
        return (
            <ResponsiveContainer 
                    height={props.height} 
                    width={props.width} 
                    debounce={1} 
                    className='graph'
                >

            <ComposedChart data={bellCurveDataCompare}>
                <CartesianGrid />
                <XAxis data={bellCurveData1} dataKey={'x'} />
                <YAxis data={bellCurveDataCompare} dataKey={'y'} yAxisId={1} domain={[0, maxY]}/>
                <Tooltip />
                <Legend />
                <Area data={bellCurveData1} dataKey={'y'} name={'Graph 1 :'} type="monotone" fill='green' stroke="green"  yAxisId={1}/>
                <Area data={bellCurveDataCompare} dataKey={'y'} name={'Graph 2 : '} type="monotone" fill='red' stroke="red"  yAxisId={1}/>
            </ComposedChart>
            </ResponsiveContainer>
        )
    }
    else if (props.type === 'Linechart') {
        return (
            <ResponsiveContainer 
                height={props.height} 
                width={props.width} 
                debounce={1} 
                className='graph'
            >
                <LineChart 
                    data={data}
                    style={{
                        width: '100%',
                        cursor: 'move',
                    }}
                    onMouseEnter={() => {
                        if (disabled) {
                            setDisabled(false);
                        }
                    }}
                    onMouseLeave={() => {
                        setDisabled(true);
                    }}
                    onClick={(graph) => (
                        <Draggable
                            disabled={disabled}
                            bounds={bounds}
                            onStart={(event, uiData) => onStart(event, uiData)}
                        >
                        <div ref={draggleRef}>{graph}</div>
                        </Draggable>
                    )}
                >
                {/* <LineChart width={450} height={250} data={data} className='graph'> */}
                    {/* <CartesianGrid stroke="black" fill='#555' fillOpacity={0.7}/> */}
                    <CartesianGrid 
                        stroke="black" 
                        strokeOpacity={0.3} 
                        fill='#555' 
                        fillOpacity={0.2}
                    />
                    <Line 
                        name={props.dataIndexName} 
                        unit={props.dataIndexName.unit} 
                        type="monotone" 
                        dataKey={value} 
                        stroke="red" 
                        dot={false}
                    />
                    <XAxis dataKey={key}/>                        
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="bottom"/>
                    <Draggable />
                </LineChart>
            </ResponsiveContainer>    
        )
    }
    else if (props.type === "Histrogram"){
        var max = 0
        for (let i = 0; i < data.length; i++){
            if (data[i]['frequency'] > max){
                max = data[i]['frequency']
            }
        }
        console.log(data);
        console.log(max);
        return (

            <ResponsiveContainer 
                    height={props.height} 
                    width={props.width} 
                    debounce={1} 
                    className='graph'
                >

            <ComposedChart data={data}>
                <CartesianGrid />
                <XAxis data={bellCurveData} dataKey={'x'} />
                <YAxis dataKey={value} yAxisId={0} domain={[0, max]} />
                <YAxis data={bellCurveData} dataKey={'y'} yAxisId={1} domain={[0, 1]} orientation='right'/>
                <Tooltip />
                <Legend />
                <Bar
                    dataKey={value} 
                    fill="#3288bd" 
                    name={props.dataIndexName} 
                    unit={props.dataIndexName.unit}
                    yAxisId={0}
                />
                <Area data={bellCurveData} dataKey={'y'} name={'Normal Distribution'} type="monotone" fill='green' stroke="green"  yAxisId={1} />
            </ComposedChart>
            </ResponsiveContainer>




        //     <ResponsiveContainer height={props.height} 
        //             width={props.width} 
        //             debounce={1} 
        //             className='graph'>
        //         <BarChart data={bellCurveData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        //             <CartesianGrid strokeDasharray="3 3" />
        //             <XAxis dataKey="x" label={{ value: 'Value', position: 'insideBottomRight', offset: -10 }} />
        //             <YAxis label={{ value: 'y', angle: -90, position: 'insideLeft' }} />
        //             <Tooltip />
        //             <Legend />
        //             <Area dataKey="y" type="monotone" fill='green' stroke="green" />
        //             <Bar dataKey="y" fill="#8884d8" />
        //             <ReferenceLine y={0} stroke="#000" />
        //             <Bar dataKey="y" fill="#82ca9d" />
        //             <defs>
        //                 <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        //                     <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        //                     <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        //                 </linearGradient>
        //             </defs>
        //             {/* <path d={`M${bellCurveData.map(d => [xScale(d.x), yScale(d.y)]).join('L')}`} stroke="#82ca9d" strokeWidth={2} fill="none" /> */}
        //         </BarChart>
        //   </ResponsiveContainer>
        )
    }
}

export default TimeSeries;