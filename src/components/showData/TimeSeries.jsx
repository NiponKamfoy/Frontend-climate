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
    
    const mean = calculateMean(props.histrogramData);
    const stdDev = calculateStandardDeviation(props.histrogramData, mean);
    
    function generateBellCurveData(mean, stdDev, numPoints = 100) {
    const data = [];
    const step = stdDev * 6 / numPoints;
    for (let i = mean - stdDev * 3; i <= mean + stdDev * 3; i += step) {
        data.push({ x: i, y: (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp((-1*(i - mean)) ** 2 / (2 * stdDev ** 2)) });
    }
    console.log(data);
    return data;
    }
    const [bellCurveData, setBellCurveData] = useState([])

    const draggleRef = useRef(null);

    useEffect(() => {
        if (props.compareMode !== undefined && props.compareMode === "On"){
            setKey('area')
            setValue('index')
            setData(props.compareDataGraph)
            console.log(props.compareDataGraph);
           
           
        }
        else if (props.type === 'Histrogram'){
            setKey('value')
            setValue('frequency')
            setData(props.histrogramData)
            let tempBellcurve = generateBellCurveData(mean, stdDev)
            setBellCurveData(tempBellcurve)
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

    
      
 
    if (props.type === 'Linechart') {
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
        return (

            <ResponsiveContainer 
                    height={props.height} 
                    width={props.width} 
                    debounce={1} 
                    className='graph'
                >

            <ComposedChart data={data}>
                <CartesianGrid />
                <XAxis dataKey={key} xAxisId={0}/>
                <XAxis data={bellCurveData.x} xAxisId={1} orientation='top'/>
                <YAxis yAxisId={0}/>
                <YAxis yAxisId={1} orientation="right"/>
                <Tooltip />
                <Legend />
                <Bar
                    dataKey={value} 
                    fill="#3288bd" 
                    name={props.dataIndexName} 
                    unit={props.dataIndexName.unit}
                    yAxisId={0}
                    xAxisId={0}
                />
                <Area data={bellCurveData.y} type="monotone" fill="#82ca9d" stroke="#82ca9d" yAxisId={1} xAxisId={1}/>
            </ComposedChart>
            </ResponsiveContainer>
        )
    }
}

export default TimeSeries;