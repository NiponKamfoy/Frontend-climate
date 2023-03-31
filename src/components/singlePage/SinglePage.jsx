import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Layout } from 'antd';
import TimeSeries from '../showData/TimeSeries';
import Grid from '../showData/Grid';
import Legend from '../showData/Legend';
import GradientLegend from '../showData/GradientLegend';
import Breadcrumb from '../showData/Breadcrumb';
import Setting from '../selectionInput/Setting';
import 'leaflet/dist/leaflet.css';
import "../../data/dataSelection";
import './singlePage.css';
import { useEffect } from 'react';

const SinglePage = () => {

  const center = [13.2955977,102.2090103]
  const zoom = 6

  const [height, setHeight] = useState("30%")
  const [width, setWidth] = useState("30%")

  const [dataIndex, setDataIndex] = useState('CDD')
  const [timeSeriesData, setTimeSeriesData] = useState([])
  const [seasonalData ,setSeasonalData] = useState([])
  const [histrogramData, setHistrogramData] = useState([])
  const [selectArea, setSelectArea] = useState("Thailand")
  const [selectData, setSelectData] = useState("ecearth@RCP4.5@indices@CDD")
  const [selectDate, setSelectDate] = useState('Thu, 19 Mar 1970 17:50:44 GMT,Sat, 19 Mar 2005 17:50:44 GMT')
  const [graphType, setGraphType] = useState('Linechart')
  const [graphShow, setGraphShow] = useState('On')
  const [dataType, setDataType] = useState('Overall')
  const [gridOpacity, setGridopacity] = useState(70)
  const [legendMax, setLegendMax] =useState('') 
  const [legendMin, setLegendMin] =useState('') 
  const [legendType, setLegendType] = useState('Interval')

  const areaChange = (area) => {
    setSelectArea(area)
  }
  var indexName = ''
  const dataChange = (data) => {
    setSelectData(data)
    indexName = data.split('@')[selectData.split('@').length - 1]
    setDataIndex(indexName)
    console.log('indexName: ', indexName);
    console.log('dataIndex: ',dataIndex);
  }
  const dateChange = (date) => {
    setSelectDate(date)
  }

  const getTimeSeriesData = (data) => {
    setTimeSeriesData(data)
  }

  const getSeasonalData = (data) => {
    setSeasonalData(data)
  }

  const getHistrogramData = (data) => {
    setHistrogramData(data)
  }

  function SetViewOnChange(coords) {
    const map = useMap();
    if (["Brunei Darussalam", "Cambodia", "Malaysia", "Indonesia", "Lao People's Democratic Republic", "Myanmar","Philippines", "Thailand", "Timor-Leste", "Vietnam", "Singapore"].includes(selectArea)){
        map.setView([coords[1], coords[0]], 6);
    }else{
        map.setView([coords[1], coords[0]], 8);
    }
    return null;
  }

  const opacityChange = (value) => {
    setGridopacity(value)
  }

  const legendMaxChange = (max) => {
    setLegendMax(max)
  }

  const legendMinChange = (min) => {
    setLegendMin(min)
  }

//   useEffect(() => {
//      if (props.dataType === 'Overall'){
//          setKey('date')
//          setValue('index')
//          setData(props.data)
//      } 
        // else if (props.dataType === "Seasonal"){
//          setKey('month')
//          setValue('value')
//          setData(props.data2)
//      } 
//    }, [])

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      scrollWheelZoom={true} 
      zoomControl={false} 
      className="map-container"
    >
        
        <TileLayer
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
        />
        
        <Layout style={{ minHeight: '100vh'}}>
            <TimeSeries
              dataIndexName={dataIndex} 
              data={timeSeriesData} 
              data2={seasonalData} 
              type={graphType} 
              dataType={dataType}
              height={height}
              width={width}
              histrogramData = {histrogramData}
            />
        </Layout>

        <Grid 
          area={selectArea} 
          data={selectData} 
          date={selectDate} 
          SetViewOnChange={SetViewOnChange} 
          setTimeSeriesData={getTimeSeriesData} 
          setSeasonalData={getSeasonalData}
          setHistrogramData = {getHistrogramData}
          gridOpacity={gridOpacity}
          legendMax={legendMax}
          legendMin={legendMin}
        />

        <Legend 
          dataIndexName={dataIndex}
          legendMax={legendMax}
          legendMin={legendMin}
          legendType={legendType}
        />

        <GradientLegend 
          dataIndexName={dataIndex}
          legendMax={legendMax}
          legendMin={legendMin}
          legendType={legendType}        
        />

        <Breadcrumb 
          selectArea={selectArea} 
          selectData={selectData} 
          selectDate={selectDate}
        />

        <Setting 
          graphType={graphType} 
          setGraphType={setGraphType} 
          graphShow={graphShow} 
          setGraphShow={setGraphShow}
          dataType={dataType} 
          setDataType={setDataType}
          opacityChange={opacityChange} 
          gridOpacity={gridOpacity}
          legendMaxChange={legendMaxChange}
          legendMinChange={legendMinChange}
          legenMax={legendMax}
          legenMin={legendMin}
          legendType={legendType} 
          setLegendType={setLegendType}
          setHeight={setHeight}
          setWidth={setWidth} 

          areaChange={areaChange} 
          dataChange={dataChange} 
          dateChange={dateChange} 
          area={selectArea} 
          data={selectData} 
          date={selectDate}         
        />
    </MapContainer>   
  )
}

export default SinglePage;