import React, {  useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Layout } from 'antd';
import TimeSeries from '../showData/TimeSeries';
import Grid from '../showData/IntervalGrid';
import IntervalLegend from '../showData/IntervalLegend';
import GradientLegend from '../showData/GradientLegend';
import Breadcrumb from '../showData/Breadcrumb';
import SettingCompare from './SettingCompare'
import 'leaflet/dist/leaflet.css';
import "../../data/dataSelection";
import './comparePage.css';

const ComparePage = (props) => {

  const center = [13.2955977,102.2090103]
  const zoom = 6

  const [height1, setHeight1] = useState("30%")
  const [width1, setWidth1] = useState("50%")

  const [dataIndex1, setDataIndex1] = useState('CDD')
  const [timeSeriesData1, setTimeSeriesData1] = useState([])
  const [histrogramData1, setHistrogramData1] = useState([])
  const [seasonalData1 ,setSeasonalData1] = useState([])
  const [selectArea1, setSelectArea1] = useState("Thailand")
  const [selectData1, setSelectData1] = useState("ecearth@RCP4.5@indices@CDD")
  const [selectDate1, setSelectDate1] = useState('Thu, 19 Mar 1970 17:50:44 GMT,Sat, 19 Mar 2005 17:50:44 GMT')
  const [graphType1, setGraphType1] = useState('Linechart')
  const [dataType1, setDataType1] = useState('Overall')
  const [gridOpacity1, setGridopacity1] = useState(70)
  const [legendMax1, setLegendMax1] =useState('') 
  const [legendMin1, setLegendMin1] =useState('')
  const [graphShow1, setGraphShow1] = useState('On')
  const [legendType1, setLegendType1] = useState('Interval') 
  const [compareData1, setCompareData1] = useState([])

  const areaChange1 = (area) => {
    setSelectArea1(area)
  }

  var indexName1 = ''
  const dataChange1 = (data) => {
    setSelectData1(data)
    indexName1 = data.split('@')[selectData1.split('@').length - 1]
    setDataIndex1(indexName1)
    console.log('indexName: ', indexName1);
    console.log('dataIndex: ',dataIndex1);
  }

  const dateChange1 = (date) => {
    setSelectDate1(date)
  }

  const getTimeSeriesData1 = (data) => {
    setTimeSeriesData1(data)
  }

  const getSeasonalData1 = (data) => {
    setSeasonalData1(data)
  }

  const getHistrogramData1 = (data) => {
    setHistrogramData1(data)
  }

  function SetViewOnChange1(coords) {
    const map = useMap();
    if (["Brunei Darussalam", "Cambodia", "Malaysia", "Indonesia", "Lao People's Democratic Republic", "Myanmar","Philippines", "Thailand", "Timor-Leste", "Vietnam", "Singapore"].includes(selectArea1)){
        map.setView([coords[1], coords[0]], 6);
    }else{
        map.setView([coords[1], coords[0]], 8);
    }
    return null;
  }

  const opacityChange1 = (value) => {
    setGridopacity1(value)
  }

  const legendMaxChange1 = (max) => {
    setLegendMax1(max)
  }

  const legendMinChange1 = (min) => {
    setLegendMin1(min)
  }

  const [bellCurveData1, setBellCurveData1]  = useState([])
  const bellCurveDataChange1 = (data) => {
  setBellCurveData1(data)
  console.log('setBellCurveData1: ', data);
}

// =======================================================================
    
    const [height2, setHeight2] = useState("30%")
    const [width2, setWidth2] = useState("50%")

    const [dataIndex2, setDataIndex2] = useState('CDD')
    const [timeSeriesData2, setTimeSeriesData2] = useState([])
    const [histrogramData2, setHistrogramData2] = useState([])
    const [seasonalData2 ,setSeasonalData2] = useState([])
    const [selectArea2, setSelectArea2] = useState("Thailand")
    const [selectData2, setSelectData2] = useState("ecearth@RCP4.5@indices@CDD")
    const [selectDate2, setSelectDate2] = useState('Thu, 19 Mar 1970 17:50:44 GMT,Sat, 19 Mar 2005 17:50:44 GMT')
    const [graphType2, setGraphType2] = useState('Linechart')
    const [dataType2, setDataType2] = useState('Overall')
    const [gridOpacity2, setGridopacity2] = useState(70)
    const [legendMax2, setLegendMax2] =useState('') 
    const [legendMin2, setLegendMin2] =useState('')
    const [graphShow2, setGraphShow2] = useState('On')
    const [legendType2, setLegendType2] = useState('Interval')  
    const [compareMode2, setCompareMode2] = useState('Off')
    const [compareData2, setCompareData2] = useState([])

    const areaChange2 = (area) => {
        setSelectArea2(area)
    }

    var indexName2 = ''
    const dataChange2 = (data) => {
        setSelectData2(data)
        indexName2 = data.split('@')[selectData2.split('@').length - 1]
        setDataIndex2(indexName2)
        console.log('indexName: ', indexName2);
        console.log('dataIndex: ',dataIndex2);
    }

    const dateChange2 = (date) => {
        setSelectDate2(date)
    }

    const getTimeSeriesData2 = (data) => {
        setTimeSeriesData2(data)
    }

    const getSeasonalData2 = (data) => {
        setSeasonalData2(data)
    }

    const getHistrogramData2 = (data) => {
        setHistrogramData2(data)
      }

    function SetViewOnChange2(coords) {
        const map = useMap();
        if (["Brunei Darussalam", "Cambodia", "Malaysia", "Indonesia", "Lao People's Democratic Republic", "Myanmar","Philippines", "Thailand", "Timor-Leste", "Vietnam", "Singapore"].includes(selectArea2)){
            map.setView([coords[1], coords[0]], 6);
        } else {
            map.setView([coords[1], coords[0]], 8);
        }
        return null;
    }

    const opacityChange2 = (value) => {
        setGridopacity2(value)
    }

    const legendMaxChange2 = (max) => {
        setLegendMax2(max)
    }

    const legendMinChange2 = (min) => {
        setLegendMin2(min)
    }
    const [bellCurveData2, setBellCurveData2]  = useState([])
    const bellCurveDataChange2 = (data) => {
    setBellCurveData2(data)
    console.log('setBellCurveData2: ', data);
    }

    const compareModeChange2 = (mode) => {
        setCompareMode2(mode)
        if (mode === 'On'){
            for (let i = 0; i < compareData1.length; i++){
                compareData2[i]['properties']['index'] = compareData1[i]['properties']['index'] - compareData2[i]['properties']['index']
            }
        }else {
            let temp = gridOpacity2 + 1
            setGridopacity2(temp)
        }
    }



// =======================================================================
   
    return (
        <div className='grid-container'>
            <div className='grid-item'>
                <MapContainer 
                    center={center} 
                    zoom={zoom} 
                    scrollWheelZoom={true} 
                    zoomControl={false} 
                    className="map-container-compare"
                >
                        
                    <TileLayer
                        url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
                    />
                        
                    <Layout style={{ textAlign: "left", minHeight: '100vh'}}>
                        <TimeSeries
                            dataIndexName={dataIndex1} 
                            data={timeSeriesData1} 
                            data2={seasonalData1} 
                            type={graphType1} 
                            dataType={dataType1}
                            height={height1}
                            width={width1}
                            setBellCurveData = {bellCurveDataChange1}
                            histrogramData = {histrogramData1}
                            />
                    </Layout>
        
                    <Grid 
                        area={selectArea1} 
                        data={selectData1} 
                        date={selectDate1} 
                        SetViewOnChange={SetViewOnChange1} 
                        setTimeSeriesData={getTimeSeriesData1} 
                        setHistrogramData = {getHistrogramData1}
                        setSeasonalData={getSeasonalData1}
                        gridOpacity={gridOpacity1}
                        legendMax={legendMax1}
                        legendMin={legendMin1}
                        setCompareData = {setCompareData1}
                    />

                    <IntervalLegend 
                        dataIndexName={dataIndex1}
                        legendMax={legendMax1}
                        legendMin={legendMin1}
                        legendType={legendType1}
                    />

                    {/* <GradientLegend 
                        dataIndexName={dataIndex1}
                        legendMax={legendMax1}
                        legendMin={legendMin1}
                        legendType={legendType1}        
                    /> */}
        
                    <Breadcrumb 
                        selectArea={selectArea1} 
                        selectData={selectData1} 
                        selectDate={selectDate1}
                    />

                    <SettingCompare 
                        graphType={graphType1} 
                        setGraphType={setGraphType1} 
                        dataType={dataType1} 
                        setDataType={setDataType1}
                        opacityChange={opacityChange1} 
                        gridOpacity={gridOpacity1}
                        legendMaxChange={legendMaxChange1}
                        legendMinChange={legendMinChange1}
                        legenMax={legendMax1}
                        legenMin={legendMin1}

                        areaChange1={areaChange1} 
                        dataChange1={dataChange1} 
                        dateChange1={dateChange1} 
                        area1={selectArea1} 
                        data1={selectData1} 
                        date1={selectDate1} 
                        
                        graphShow={graphShow1} 
                        setGraphShow={setGraphShow1}                     
                        legendType={legendType1} 
                        setLegendType={setLegendType1}
                        setHeight={setHeight1}
                        setWidth={setWidth1}  
                    />
                </MapContainer>
            </div>
        
            <div className='grid-item'>
                <MapContainer 
                    center={center} 
                    zoom={zoom} 
                    scrollWheelZoom={true} 
                    zoomControl={false} 
                    className="map-container-compare"
                >
                        
                    <TileLayer
                        url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
                    />
                        
                    <Layout style={{ minHeight: '100vh'}}>
                        <TimeSeries
                            dataIndexName={dataIndex2} 
                            data={timeSeriesData2} 
                            data2={seasonalData2} 
                            type={graphType2} 
                            dataType={dataType2}
                            height={height2}
                            setBellCurveData = {bellCurveDataChange2}
                            histrogramData = {histrogramData2}
                            width={width2}
                            compareMode = {compareMode2}
                            bellCurveData1 = {bellCurveData1}
                            bellCurveCompare = {bellCurveData2}
                        />
                    </Layout>
        
                    <Grid 
                        area={selectArea2} 
                        data={selectData2} 
                        date={selectDate2} 
                        SetViewOnChange={SetViewOnChange2} 
                        setTimeSeriesData={getTimeSeriesData2} 
                        setHistrogramData = {getHistrogramData2}
                        setSeasonalData={getSeasonalData2}
                        gridOpacity={gridOpacity2}
                        legendMax={legendMax2}
                        legendMin={legendMin2}
                        compareMode = {compareMode2}
                        setCompareData = {setCompareData2}
                    />

                    <IntervalLegend 
                        dataIndexName={dataIndex2}
                        legendMax={legendMax2}
                        legendMin={legendMin2}
                        legendType={legendType2}
                        compareMode = {compareMode2}
                    />
                    
                    {/* <GradientLegend 
                        dataIndexName={dataIndex2}
                        legendMax={legendMax2}
                        legendMin={legendMin2}
                        legendType={legendType2}        
                    /> */}
        
                    <Breadcrumb 
                        selectArea={selectArea2} 
                        selectData={selectData2} 
                        selectDate={selectDate2}
                    />

                    <SettingCompare 
                        graphType={graphType2} 
                        setGraphType={setGraphType2} 
                        dataType={dataType2} 
                        setDataType={setDataType2}
                        opacityChange={opacityChange2} 
                        gridOpacity={gridOpacity2}
                        legendMaxChange={legendMaxChange2}
                        legendMinChange={legendMinChange2}
                        legenMax={legendMax2}
                        legenMin={legendMin2}

                        areaChange1={areaChange2} 
                        dataChange1={dataChange2} 
                        dateChange1={dateChange2} 
                        area1={selectArea2} 
                        data1={selectData2} 
                        date1={selectDate2} 

                        graphShow={graphShow2} 
                        setGraphShow={setGraphShow2}                     
                        legendType={legendType2} 
                        setLegendType={setLegendType2}
                        setHeight={setHeight2}
                        setWidth={setWidth2} 
                        enableDiffMode={true} 
                        setCompareMode={compareModeChange2}
                        compareMode={compareMode2}

                    />
                </MapContainer>
            </div>
        </div>    
    )  
}

export default ComparePage;