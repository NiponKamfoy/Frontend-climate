import React, { useRef, useEffect, useState } from 'react'
import { LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    Bar,
    ResponsiveContainer,Area, ComposedChart} from 'recharts';
import Draggable from 'react-draggable';
import './timeSeries.css'
import jstat from 'jstat';

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
    
    function generateBellCurveData(mean, stdDev, numPoints = 100, histrogramdata) {
        const data = [];
        
        for (let i = 0; i < histrogramdata.length; i++){
            data.push({ x: histrogramdata[i]['value'], y:  1000*(jstat.normal.pdf(histrogramdata[i]['value'], mean, stdDev))});
        }
        return data;
    }
    const [bellCurveData, setBellCurveData] = useState([])
    const [bellCurveDataCompare, setBellCurveDataCompare] = useState([])
    const [bellCurveData1, setBellCurveData1] = useState([])
    const draggleRef = useRef(null);
    

    useEffect(() => {
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
            let tempBellcurve = generateBellCurveData(mean, stdDev, props.histrogramData.length, props.histrogramData)
            setBellCurveData(tempBellcurve)
            props.setBellCurveData(tempBellcurve)
        }
        else if (props.dataType === 'Overall'){
            setKey('date')
            setValue('index')
            setData(props.data)
        } else if (props.dataType === "Seasonal"){
            setKey('month')
            setValue('value')
            setData(props.data2)
        } 
    }, [props.dataType, props.data, props.data2, props.compareMode, props.compareDataGraph, props.histrogramData, props.type, mean, stdDev])

    
      
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
                    <XAxis dataKey={key}/>                        <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="bottom"/>
                    <Draggable />
                </LineChart>
            </ResponsiveContainer>    
        )
    }
    else if (props.type === "Histrogram"){
        var max = data[0]['frequency']
        for (let i = 0; i < data.length; i++){
            if (data[i]['frequency'] > max){
                max = data[i]['frequency']
            }
        }
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
                <YAxis data={bellCurveData} dataKey={'y'} yAxisId={1} domain={[0, max]}/>
                <Tooltip />
                <Legend />
                <Bar
                    dataKey={value} 
                    fill="#3288bd" 
                    name={props.dataIndexName} 
                    unit={props.dataIndexName.unit}
                    yAxisId={1} 
                />
                <Area data={bellCurveData} dataKey={'y'} name={'Normal Distribution'} type="monotone" fill='red' stroke="red"  yAxisId={1}/>
            </ComposedChart>
            </ResponsiveContainer>
        )
    }
}

export default TimeSeries;