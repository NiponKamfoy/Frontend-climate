import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import dataIndex from  '../../data/dataLegend'
import './gradientLegend.css'  

const GradientLegend = (props) => {
  
  const mapInstance = useMap();

  var data = dataIndex.indices.CDD 
  // Indices
  if (props.dataIndexName === 'CDD'){
    data = dataIndex.indices.CDD
  } else if (props.dataIndexName === 'CSDI' ) {
    data = dataIndex.indices.CSDI
  } else if (props.dataIndexName === 'CWD' ) {
    data = dataIndex.indices.CWD
  } else if (props.dataIndexName === 'DTR' ) {
    data = dataIndex.indices.DTR
  } else if (props.dataIndexName === 'FD0' ) {
    data = dataIndex.indices.FD0
  } else if (props.dataIndexName === 'FD16' ) {
    data = dataIndex.indices.FD16
  } else if (props.dataIndexName === 'ID0' ) {
    data = dataIndex.indices.ID0
  } else if (props.dataIndexName === 'PRCPTOT' ) {
    data = dataIndex.indices.PRCPTOT
  } else if (props.dataIndexName === 'R10mm' ) {
    data = dataIndex.indices.R10mm
  } else if (props.dataIndexName === 'R20mm' ) {
    data = dataIndex.indices.R20mm
  } else if (props.dataIndexName === 'R25mm' ) {
    data = dataIndex.indices.R25mm
  } else if (props.dataIndexName === 'R95p' ) {
    data = dataIndex.indices.R95p
  } else if (props.dataIndexName === 'R99p' ) {
    data = dataIndex.indices.R99p
  } else if (props.dataIndexName === 'RX1day' ) {
    data = dataIndex.indices.RX1day
  } else if (props.dataIndexName === 'RX5day' ) {
    data = dataIndex.indices.RX5day
  } else if (props.dataIndexName === 'SDII' ) {
    data = dataIndex.indices.SDII
  } else if (props.dataIndexName === 'SU25' ) {
    data = dataIndex.indices.SU25
  } else if (props.dataIndexName === 'SU35' ) {
    data = dataIndex.indices.SU35
  } else if (props.dataIndexName === 'TMAXmean' ) {
    data = dataIndex.indices.TMAXmean
  } else if (props.dataIndexName === 'TMEANmean' ) {
    data = dataIndex.indices.TMEANmean
  } else if (props.dataIndexName === 'TMINmean' ) {
    data = dataIndex.indices.TMINmean
  } else if (props.dataIndexName === 'TN10P' ) {
    data = dataIndex.indices.TN10P
  } else if (props.dataIndexName === 'TN90P' ) {
    data = dataIndex.indices.TN90P
  } else if (props.dataIndexName === 'TNn' ) {
    data = dataIndex.indices.TNn
  } else if (props.dataIndexName === 'TNx' ) {
    data = dataIndex.indices.TNx
  } else if (props.dataIndexName === 'TR20' ) {
    data = dataIndex.indices.TR20
  } else if (props.dataIndexName === 'TR25' ) {
    data = dataIndex.indices.TR25
  } else if (props.dataIndexName === 'TX10P' ) {
    data = dataIndex.indices.TX10P
  } else if (props.dataIndexName === 'TX90P' ) {
    data = dataIndex.indices.TX90P
  } else if (props.dataIndexName === 'TXn' ) {
    data = dataIndex.indices.TXn
  } else if (props.dataIndexName === 'TXx' ) {
    data = dataIndex.indices.TXx
  } else if (props.dataIndexName === 'WSDI' ) {
    data = dataIndex.indices.WSDI
  }
  // SPI
  else if (props.dataIndexName.split(' ')[1] === 'month' ) {
    data = dataIndex.SPI.spi
  } else if (props.dataIndexName.split(' ')[2] === 'month' ) {
    data = dataIndex.SPI.spi
  }

  var max = data.max
  var min = data.min
  // get color depending on population density value
  var color = dataIndex.divergentReverse

  if (props.compareMode !== undefined && props.compareMode === 'On' && props.dataIndexName.split(' ')[1] === 'month'){
    color = dataIndex.divergent
  }
  else if (props.compareMode !== undefined && props.compareMode === 'On' ){
    max = 20
    min = -20
  }
  else if (props.dataIndexName.split(' ')[0] !== 'CDD' && props.dataIndexName.split(' ')[0] !== 'CSDI' && props.dataIndexName.split(' ')[0] !== 'PRCPTOT'){
    color = dataIndex.divergent
  }
   
  if (props.legendMax !== '' && props.legendMin !== ''){
    max = props.legendMax
    min = props.legendMin
  }

  var unit = data.unit

  const interval = (max - min)/8
    
  useEffect(() => {

    if (props.dataIndexName.split(' ')[1] === 'month') {
  
        const GradientLegend = L.control({ position: "bottomright" });
    
        GradientLegend.onAdd = () => {
            const div = L.DomUtil.create("div", "info2 gradientLegend");
            
            const grades = 
            [
              min + 8*interval,
              min + 7*interval, 
              min + 6*interval, 
              min + 5*interval, 
              min + 4*interval, 
              min + 3*interval, 
              min + 2*interval, 
              min + interval,
              min
            ];
      
            // let labels = [];
            // let to;
      
            // for (let i = 0; i < grades.length; i++) {
            //   to = grades[i];
      
            //   labels.push(
            //     to.toFixed(1)
            //   );
            // }
    
            div.innerHTML += div.innerHTML += "<h4>".concat("SPI ", "(" , props.dataIndexName , ")"  , "</h4>");
            div.innerHTML += '<i style="background: linear-gradient(0deg, '+ color +');"></i>';
            div.innerHTML += grades[0].toFixed(1)
            div.innerHTML += '<br>'
            div.innerHTML += '<br>'
            div.innerHTML += grades[2].toFixed(1)
            div.innerHTML += '<br>'
            div.innerHTML += '<br>'
            div.innerHTML += grades[4].toFixed(1)
            div.innerHTML += '<br>'
            div.innerHTML += '<br>'
            div.innerHTML += grades[6].toFixed(1)
            div.innerHTML += '<br>'
            div.innerHTML += '<br>'
            div.innerHTML += grades[8].toFixed(1)
            // div.innerHTML += labels.join("<br>");
    
            return div;
        };
        
        GradientLegend.addTo(mapInstance);
        
        return () => GradientLegend.remove();
  
      } else if (props.dataIndexName.split(' ')[2] === 'month') {
        const GradientLegend = L.control({ position: "bottomright" });
    
        GradientLegend.onAdd = () => {
            const div = L.DomUtil.create("div", "info2 gradientLegend");
            
            const grades = 
            [
              min + 8*interval,
              min + 7*interval, 
              min + 6*interval, 
              min + 5*interval, 
              min + 4*interval, 
              min + 3*interval, 
              min + 2*interval, 
              min + interval,
              min
            ];
      
            // let labels = [];
            // let to;
      
            // for (let i = 0; i < grades.length; i++) {
            //   to = grades[i];
      
            //   labels.push(
            //     to.toFixed(1)
            //   );
            // }
    
            div.innerHTML += "<h4>".concat("SPI ", "(" , props.dataIndexName , ")"  , "</h4>");
            div.innerHTML += '<i style="background: linear-gradient(0deg, '+ color +');"></i>';
            div.innerHTML += grades[0].toFixed(1)
            div.innerHTML += '<br>'
            div.innerHTML += '<br>'
            div.innerHTML += grades[2].toFixed(1)
            div.innerHTML += '<br>'
            div.innerHTML += '<br>'
            div.innerHTML += grades[4].toFixed(1)
            div.innerHTML += '<br>'
            div.innerHTML += '<br>'
            div.innerHTML += grades[6].toFixed(1)
            div.innerHTML += '<br>'
            div.innerHTML += '<br>'
            div.innerHTML += grades[8].toFixed(1)
            // div.innerHTML += labels.join("<br>");
    
            return div;
        };
        
        GradientLegend.addTo(mapInstance);
        
        return () => GradientLegend.remove();
  
      // } else if (textSplit[2],substring(0,3) === 'indices') {
      } else {
        const GradientLegend = L.control({ position: "bottomright" });
    
        GradientLegend.onAdd = () => {
            const div = L.DomUtil.create("div", "info2 gradientLegend");
            
            const grades = 
            [
              min + 8*interval,
              min + 7*interval, 
              min + 6*interval, 
              min + 5*interval, 
              min + 4*interval, 
              min + 3*interval, 
              min + 2*interval, 
              min + interval,
              min
            ];
      
            // let labels = [];
            // let to;
            
            // for (let i = 0; i < grades.length; i++) {
            //   to = grades[i];
      
            //   labels.push(
            //     to.toFixed(0)
            //   );
            // }
    
            div.innerHTML += "<h4>" + props.dataIndexName + " (" + unit + ")" + "</h4>"
            div.innerHTML += '<i style="background: linear-gradient(0deg, '+ color +');"></i>';
            div.innerHTML += grades[0].toFixed(0)
            div.innerHTML += '<br>'
            div.innerHTML += '<br>'
            div.innerHTML += grades[2].toFixed(0)
            div.innerHTML += '<br>'
            div.innerHTML += '<br>'
            div.innerHTML += grades[4].toFixed(0)
            div.innerHTML += '<br>'
            div.innerHTML += '<br>'
            div.innerHTML += grades[6].toFixed(0)
            div.innerHTML += '<br>'
            div.innerHTML += '<br>'
            div.innerHTML += grades[8].toFixed(0)
            // div.innerHTML += labels.join("<br>");
    
            return div;
        };
        
        GradientLegend.addTo(mapInstance);
        
        return () => GradientLegend.remove();
    }
  }, [props.dataIndexName, props.legendMax,props.legendMin, data.color, mapInstance, color, interval, min, unit])
};

export default GradientLegend;