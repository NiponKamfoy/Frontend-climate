import { Modal, Radio, Menu } from 'antd';
import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { FileOutlined,  
  QuestionOutlined ,
  LogoutOutlined,
  SettingFilled, 
  DownOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  SwapOutlined } from '@ant-design/icons';
import { FloatButton, Button, Col, InputNumber, Row, Slider } from 'antd';
import dataSetting from '../../data/dataSelection'
import SelectDate from './SelectDate';
import './settingCompare.css'

const SettingCompare = (props) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const draggleRef = useRef(null);

  const formatter = (value) => `${value}%`;

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e) => {
    setOpen(false);
  };

  const handleCancel = (e) => {
    setOpen(false);
  };

  const [open1, setOpen1] = useState(false);

  const showAbout = () => {
    setOpen1(true);
  };

  const handleOk1 = (e) => {
    setOpen1(false);
  };

  const handleCancel1 = (e) => {
    setOpen1(false);
  };

  const dataChange = ({ target: { value } }) => {
    props.setDataType(value);
  };

  const graphChange = (e) => {
    props.setGraphType(e.target.value);
  };

  const graphShow = (e) => {
    if (e.target.value === "On") {
      props.setWidth("50%")
      props.setHeight("30%")
      props.setGraphShow(e.target.value)
    } else {
      props.setWidth("0")
      props.setHeight("0")
      props.setGraphShow(e.target.value)
    }
  };

  const legendChange = (e) => {
    props.setLegendType(e.target.value);
  };

  const [legendMinValue, setlegendMinValue] = useState('');
  const [legendMaxValue, setlegendMaxValue] = useState('');
  const [inputValue, setInputValue] = useState(70);
  
  const opecityChange = (newValue) => {
    setInputValue(newValue);
    props.opacityChange(newValue)
    console.log(props.gridOpacity);
  };

  const legendMinChange =(e) => {
    setlegendMinValue(e);
    props.legendMinChange(e)
  }

  const legendMaxChange =(e) => {
    setlegendMaxValue(e);
    props.legendMaxChange(e)
  }

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

  // ================================================================================

  const [picker1, setPicker1]  = useState('year')

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type
    };
  }
  const settingSelection = dataSetting
  const {province, country, data_provider, type_index, type_value, index_name, SPI_name} = settingSelection
  
  const countryList1 = country.map((cName) => {
      return getItem(cName, cName)
  })

  const provinceList1 = province.map((cName) => {
      return getItem(cName, cName.replace(' ', '_'))
  })

  const selectDataMenuLeft = data_provider.map((providerName => {
    return getItem(providerName, providerName.concat('@', 'left'), null, type_value.map(valueName => {
        return getItem(valueName, providerName.concat("@",valueName,"@", 'left'), null, type_index.map(indexName => {
            if(indexName === "SPI"){
                return getItem(indexName, providerName.concat("@",valueName,"@",indexName,"@", 'left'), null, SPI_name.map(spiname => {
                    return getItem(spiname, providerName.concat("@",valueName,"@",indexName,"@",spiname.trim()))
                }))
            }else {
                return getItem(indexName, providerName.concat("@",valueName,"@",indexName,"@", 'left'), null, index_name.map(spiname => {
                    return getItem(spiname, providerName.concat("@",valueName,"@",indexName,"@",spiname.trim()))
                }))
            }
        }))
    }))
}))

  const items_1 = [
        
            getItem('Select Area', 'area1', <GlobalOutlined />, [
                getItem('Country', 'subCountry1', null, countryList1),
                getItem('Thailand', 'subThai1', null, provinceList1),
            ]),
            { type: 'divider' },
            getItem('Select Dataset', 'dataType1', <DatabaseOutlined />, selectDataMenuLeft),
            // { type: 'divider' },
            // getItem(<SelectDate date={props.date1} picker={picker1} dateChange={props.dateChange1}/> , 'dateRange1')       
    ];

    const onClick = (e) => {
      const dataNameArray1 = props.data1.split('@')
      let typeIdex1 = dataNameArray1[2]
      if (e.keyPath[e.keyPath.length - 1] === 'area1'){
          props.areaChange1(e.keyPath[0])
      }
      else if (e.keyPath[e.keyPath.length - 1] === 'dataType1'){
          props.dataChange1(e.keyPath[0])
          if (typeIdex1 === "SPI"){
              setPicker1('month')
          }else {
              setPicker1('year')
          }
      }
  }

  // return (
  //   <>      
  //     <FloatButton.Group
  //       trigger="click"
  //       type="primary"
  //       className='setting'
  //       icon={<DownOutlined />}
  //     >
  //       <FloatButton
  //         icon={<SettingFilled />}
  //         onClick={showModal}
  //         tooltip={<div>Setting</div>}
  //       />
  //       <FloatButton 
  //         icon={<SwapOutlined />}
  //         href={"/ComparePage-Three"}
  //         tooltip={<div>View 3 map</div>}
  //       />
  //       <FloatButton 
  //         icon={<FileOutlined />}
  //         href={"/SinglePage"}
  //         tooltip={<div>Single Page</div>}
  //       />
  //       <FloatButton 
  //         icon={<QuestionOutlined />}
  //         onClick={showAbout}
  //         tooltip={<div>About</div>}
  //       />
  //       <FloatButton 
  //         icon={<LogoutOutlined />}
  //         href={"/"}
  //         tooltip={<div>Logout</div>}
  //       />
  //     </FloatButton.Group>

  //     <Modal
  //       title={
  //         <div
  //           style={{
  //             width: '100%',
  //             cursor: 'move',
  //           }}
  //           onMouseOver={() => {
  //             if (disabled) {
  //               setDisabled(false);
  //             }
  //           }}
  //           onMouseOut={() => {
  //             setDisabled(true);
  //           }}
  //           // fix eslintjsx-a11y/mouse-events-have-key-events
  //           // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
  //           onFocus={() => {}}
  //           onBlur={() => {}}
  //           // end
  //         >
  //           <h3>Setting</h3>
  //         </div>
  //       }
  //       style={{
  //         top: 20,
  //       }}
  //       open={open}
  //       onOk={handleOk}
  //       onCancel={handleCancel}
  //       footer={[
  //         <Button 
  //           danger
  //           type="default"
  //           onClick={() => {
  //             legendMinChange('');
  //             legendMaxChange('');
  //             opecityChange(70);
  //           }}
  //         >
  //           Reset
  //         </Button>,
  //         <Button 
  //           key="back" 
  //           // onClick={handleCancel}
  //           onClick={() => {
  //             legendMinChange('');
  //             legendMaxChange('');
  //             opecityChange(70);
  //             handleCancel();
  //           }}
  //         >
  //           Cancel
  //         </Button>,
  //         <Button 
  //           key="submit" 
  //           type="primary"  
  //           onClick={handleOk}
  //         >
  //           Confirm
  //         </Button>
  //       ]}
  //       modalRender={(modal) => (
  //         <Draggable
  //           disabled={disabled}
  //           bounds={bounds}
  //           onStart={(event, uiData) => onStart(event, uiData)}
  //         >
  //           <div ref={draggleRef}>{modal}</div>
  //         </Draggable>
  //       )}
  //     >
  //       <Menu defaultSelectedKeys={['1']} mode="vertical" items={items_1} onClick={onClick}/>
  //       <br />
  //       <p className="topic">Graph</p>
  //       <p className="sub-topic">
  //         Type: <Radio.Group onChange={graphChange} value={props.graphType} optionType='button'>
  //                 <Radio value="Linechart">Linechart</Radio>
  //                 <Radio value="Histrogram">Histrogram</Radio>
  //               </Radio.Group>
  //       </p>
  //       <p className="sub-topic">
  //         Data: <Radio.Group onChange={dataChange} value={props.dataType} optionType='button'>
  //                 <Radio value="Overall">Overall</Radio>
  //                 <Radio value="Seasonal">Seasonal</Radio>
  //               </Radio.Group>
  //       </p>
  //       <p className="sub-topic">
  //         Show: <Radio.Group onChange={graphShow} value={props.graphShow} optionType='button'>
  //                 <Radio value="On">On</Radio>
  //                 <Radio value="Off">Off</Radio>
  //               </Radio.Group>
  //       </p>
  //       <br />
  //       <p className="topic">Grid opacity</p>
  //       <Row>
  //         <Col span={12}>
  //           <Slider
  //             min={1}
  //             max={100}
  //             onChange={opecityChange}
  //             tooltip={{formatter}}
  //             value={typeof inputValue === 'number' ? inputValue : 70}
  //           />
  //         </Col>
  //         <Col span={4}>
  //           <InputNumber
  //             min={1}
  //             max={10}
  //             style={{
  //               margin: '0 16px',
  //             }}
  //             value={inputValue}
  //             formatter={(value) => `${value}%`}
  //             parser={(value) => value.replace('%', '')}
  //             onChange={opecityChange}
  //           />
  //         </Col>
  //       </Row>
  //       <br />
  //       <p className="topic">Legend</p>
  //       <br />
  //       {/* <p className="sub-topic">
  //         Type: <Radio.Group onChange={legendChange} value={props.legendType} optionType='button'>
  //                 <Radio value="Interval">Interval</Radio>
  //                 <Radio value="Gradient">Gradient</Radio>
  //               </Radio.Group>
  //       </p> */}
  //       <br />
  //       <InputNumber
  //         prefix="Min:"
  //         style={{width: '49%'}}
  //         onChange={legendMinChange}
  //         defaultValue={props.legendMin}
  //         value={legendMinValue} 
  //         min={0}
  //       />
  //       <> </>
  //       <InputNumber
  //         prefix="Max:"
  //         style={{width: '49%'}}
  //         onChange={legendMaxChange}
  //         defaultValue={props.legendMax}  
  //         value={legendMaxValue}      
  //       />
  //     </Modal>

  //     <Modal title="About" open={open1} onOk={handleOk1} onCancel={handleCancel1}>
  //         <ol className='sub-topic'>Shape file :</ol> 
  //           <li>Southeast Asia : <a href=''>Click here</a></li>
  //           <li>Province in Thailand : <a href='https://csuwan.weebly.com/360436343623360936603650362736213604--download.html'>Click here</a></li>
  //           <br />
  //         <ol className='sub-topic'>TileLayer :</ol>
  //           <li>Stadia maps : <a href='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'>Click here</a></li>
  //           <br />
  //     </Modal>
  //   </>
  // );
  const compareModeChange = (e) => {
    if (e.target.value === 'On'){
      props.setCompareMode('On')
    }else {
      props.setCompareMode('Off')

    }
  }

  if (props.enableDiffMode){
    return (
      <>      
        <FloatButton.Group
          trigger="click"
          type="primary"
          className='setting'
          icon={<DownOutlined />}
        >
          <FloatButton
            icon={<SettingFilled />}
            onClick={showModal}
            tooltip={<div>Setting</div>}
          />
          <FloatButton 
            icon={<SwapOutlined />}
            href={"/ComparePage-Three"}
            tooltip={<div>View 3 map</div>}
          />
          <FloatButton 
            icon={<FileOutlined />}
            href={"/SinglePage"}
            tooltip={<div>Single Page</div>}
          />
          <FloatButton 
            icon={<QuestionOutlined />}
            onClick={showAbout}
            tooltip={<div>About</div>}
          />
          <FloatButton 
            icon={<LogoutOutlined />}
            href={"/"}
            tooltip={<div>Logout</div>}
          />
        </FloatButton.Group>
  
        <Modal
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if (disabled) {
                  setDisabled(false);
                }
              }}
              onMouseOut={() => {
                setDisabled(true);
              }}
              // fix eslintjsx-a11y/mouse-events-have-key-events
              // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
              onFocus={() => {}}
              onBlur={() => {}}
              // end
            >
              <h3>Setting</h3>
            </div>
          }
          // style={{
          //   top: 20,
          // }}
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button 
              danger
              type="default"
              onClick={() => {
                legendMinChange('');
                legendMaxChange('');
                opecityChange(70);
                props.setGraphShow('On')
                props.setCompareMode('Off')
              }}
            >
              Reset
            </Button>,
            <Button 
              key="back" 
              // onClick={handleCancel}
              onClick={() => {
                legendMinChange('');
                legendMaxChange('');
                opecityChange(70);
                props.setGraphShow('On')
                props.setCompareMode('Off')
                handleCancel();
              }}
            >
              Cancel
            </Button>,
            <Button 
              key="submit" 
              type="primary"  
              onClick={handleOk}
            >
              Confirm
            </Button>
          ]}
          modalRender={(modal) => (
            <Draggable
              disabled={disabled}
              bounds={bounds}
              onStart={(event, uiData) => onStart(event, uiData)}
            >
              <div ref={draggleRef}>{modal}</div>
            </Draggable>
          )}
        >
          <Menu defaultSelectedKeys={['1']} mode="vertical" items={items_1} onClick={onClick}/>
          <SelectDate date={props.date1} picker={picker1} dateChange={props.dateChange1}/>
          <br />
          <p style={{fontSize: '18px', fontWeight: 'bold'}}>
            Graph
          </p>
          <p style={{fontSize: '12px', fontWeight: 'bold'}}>
            Type: <br />
            <Radio.Group onChange={graphChange} value={props.graphType} optionType='button' size='small'>
              <Radio value="Linechart" className='ant-radio-button'>
                Linechart
              </Radio>
              <Radio value="Histrogram" className='ant-radio-button'>
                Histrogram
              </Radio>
            </Radio.Group>
          </p>
          <p style={{fontSize: '12px', fontWeight: 'bold'}}>
            Data: <br />
            <Radio.Group onChange={dataChange} value={props.dataType} optionType='button' size='small'>
              <Radio value="Overall" className='ant-radio-button'>
                Overall
              </Radio>
              <Radio value="Seasonal" className='ant-radio-button'>
                Seasonal
              </Radio>
            </Radio.Group>
          </p>
          <p style={{fontSize: '12px', fontWeight: 'bold'}}>
            Show: <br />
            <Radio.Group onChange={graphShow} value={props.graphShow} optionType='button' size='small'>
              <Radio value="On" className='ant-radio-button'>
                On
              </Radio>
              <Radio value="Off" className='ant-radio-button'>
                Off
              </Radio>
            </Radio.Group>
          </p>
          <p style={{fontSize: '12px', fontWeight: 'bold'}}>
            Compare 2 map: <br />
            <Radio.Group onChange={compareModeChange} value={props.compareMode} optionType='button' size='small'>
              <Radio value="On" className='ant-radio-button'>
                On
              </Radio>
              <Radio value="Off" className='ant-radio-button'>
                Off
              </Radio>
            </Radio.Group>
          </p>
          <br />
          <p style={{fontSize: '18px', fontWeight: 'bold'}}>
            Grid opacity
          </p>
          <Row>
            <Col span={12}>
              <Slider
                min={0}
                max={100}
                onChange={opecityChange}
                tooltip = {formatter}
                value={typeof inputValue === 'number' ? inputValue : 70}
                style={{width: '150%'}}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={0}
                max={100}
                style={{
                  margin: '0 145px',
                }}
                value={inputValue}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace('%', '')}
                onChange={opecityChange}
                size='small'
              />
            </Col>
          </Row>
          <br />
          <p style={{fontSize: '18px', fontWeight: 'bold'}}>
            Legend
          </p>
          {/* <br />
          <p className="sub-topic">
            Type: <Radio.Group onChange={legendChange} value={props.legendType} optionType='button'>
                    <Radio value="Interval">Interval</Radio>
                    <Radio value="Gradient">Gradient</Radio>
                  </Radio.Group>
          </p>
          <p className="sub-topic">
            Color: <Radio.Group onChange={legendChange} value={props.legendType} optionType='button'>
                    <Radio value="Divergent">Divergent</Radio>
                    <Radio value="Sequential">Sequential</Radio>
                  </Radio.Group>
          </p> */}
          <br />
          <InputNumber
            prefix="Min:"
            style={{width: '49.5%'}}
            onChange={legendMinChange}
            defaultValue={props.legendMin}
            value={legendMinValue} 
            size='small'
          />
          <> </>
          <InputNumber
            prefix="Max:"
            style={{width: '49.5%'}}
            onChange={legendMaxChange}
            defaultValue={props.legendMax}  
            value={legendMaxValue}
            size='small'       
          />
        </Modal>
  
          <Modal 
            title="About" 
            open={open1} 
            onOk={handleOk1}
            onCancel={handleCancel1}
            footer={[
              <Button 
                key="submit" 
                type="primary"  
                onClick={handleOk1}
              >
                OK
              </Button>
            ]}
          >
            <ol style={{fontSize: '14px', fontWeight: 'bold'}}>
              Shape file
            </ol> 
              <li>Southeast Asia: <a href=''>Click here</a></li>
              <li>Province in Thailand: <a href='https://csuwan.weebly.com/360436343623360936603650362736213604--download.html'>Click here</a></li>
            <br />
            <ol style={{fontSize: '14px', fontWeight: 'bold'}}>
              TileLayer
            </ol>
              <li>Stadia maps: <a href='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'>Click here</a></li>
            <br />
        </Modal>
      </>
    );
  }else {
    return (
      <>      
        <FloatButton.Group
          trigger="click"
          type="primary"
          className='setting'
          icon={<DownOutlined />}
        >
          <FloatButton
            icon={<SettingFilled />}
            onClick={showModal}
            tooltip={<div>Setting</div>}
          />
          <FloatButton 
            icon={<SwapOutlined />}
            href={"/ComparePage-Three"}
            tooltip={<div>View 3 map</div>}
          />
          <FloatButton 
            icon={<FileOutlined />}
            href={"/SinglePage"}
            tooltip={<div>Single Page</div>}
          />
          <FloatButton 
            icon={<QuestionOutlined />}
            onClick={showAbout}
            tooltip={<div>About</div>}
          />
          <FloatButton 
            icon={<LogoutOutlined />}
            href={"/"}
            tooltip={<div>Logout</div>}
          />
        </FloatButton.Group>
  
        <Modal
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if (disabled) {
                  setDisabled(false);
                }
              }}
              onMouseOut={() => {
                setDisabled(true);
              }}
              // fix eslintjsx-a11y/mouse-events-have-key-events
              // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
              onFocus={() => {}}
              onBlur={() => {}}
              // end
            >
              <h3>Setting</h3>
            </div>
          }
          // style={{
          //   top: 20,
          // }}
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button 
              danger
              type="default"
              onClick={() => {
                legendMinChange('');
                legendMaxChange('');
                opecityChange(70);
                props.setGraphShow('On')
              }}
            >
              Reset
            </Button>,
            <Button 
              key="back" 
              // onClick={handleCancel}
              onClick={() => {
                legendMinChange('');
                legendMaxChange('');
                opecityChange(70);
                props.setGraphShow('On')
                handleCancel();
              }}
            >
              Cancel
            </Button>,
            <Button 
              key="submit" 
              type="primary"  
              onClick={handleOk}
            >
              Confirm
            </Button>
          ]}
          modalRender={(modal) => (
            <Draggable
              disabled={disabled}
              bounds={bounds}
              onStart={(event, uiData) => onStart(event, uiData)}
            >
              <div ref={draggleRef}>{modal}</div>
            </Draggable>
          )}
        >
          <Menu defaultSelectedKeys={['1']} mode="vertical" items={items_1} onClick={onClick}/>
          <SelectDate date={props.date1} picker={picker1} dateChange={props.dateChange1}/>
          <br />
          <p style={{fontSize: '18px', fontWeight: 'bold'}}>
            Graph
          </p>
          <p style={{fontSize: '12px', fontWeight: 'bold'}}>
            Type: <br />
            <Radio.Group onChange={graphChange} value={props.graphType} optionType='button' size='small'>
              <Radio value="Linechart" className='ant-radio-button'>
                Linechart
              </Radio>
              <Radio value="Histrogram" className='ant-radio-button'>
                Histrogram
              </Radio>
            </Radio.Group>
          </p>
          <p style={{fontSize: '12px', fontWeight: 'bold'}}>
            Data: <br />
            <Radio.Group onChange={dataChange} value={props.dataType} optionType='button' size='small'>
              <Radio value="Overall" className='ant-radio-button'>
                Overall
              </Radio>
              <Radio value="Seasonal" className='ant-radio-button'>
                Seasonal
              </Radio>
            </Radio.Group>
          </p>
          <p style={{fontSize: '12px', fontWeight: 'bold'}}>
            Show: <br />
            <Radio.Group onChange={graphShow} value={props.graphShow} optionType='button' size='small'>
              <Radio value="On" className='ant-radio-button'>
                On
              </Radio>
              <Radio value="Off" className='ant-radio-button'>
                Off
              </Radio>
            </Radio.Group>
          </p>
          <br />
          <p style={{fontSize: '18px', fontWeight: 'bold'}}>
            Grid opacity
          </p>
          <Row>
            <Col span={12}>
              <Slider
                min={0}
                max={100}
                onChange={opecityChange}
                tooltip = {formatter}
                value={typeof inputValue === 'number' ? inputValue : 70}
                style={{width: '150%'}}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={0}
                max={100}
                style={{
                  margin: '0 145px',
                }}
                value={inputValue}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace('%', '')}
                onChange={opecityChange}
                size='small'
              />
            </Col>
          </Row>
          <br />
          <p style={{fontSize: '18px', fontWeight: 'bold'}}>
            Legend
          </p>
          {/* <br />
          <p className="sub-topic">
            Type: <Radio.Group onChange={legendChange} value={props.legendType} optionType='button'>
                    <Radio value="Interval">Interval</Radio>
                    <Radio value="Gradient">Gradient</Radio>
                  </Radio.Group>
          </p>
          <p className="sub-topic">
            Color: <Radio.Group onChange={legendChange} value={props.legendType} optionType='button'>
                    <Radio value="Divergent">Divergent</Radio>
                    <Radio value="Sequential">Sequential</Radio>
                  </Radio.Group>
          </p> */}
          <br />
          <InputNumber
            prefix="Min:"
            style={{width: '49.5%'}}
            onChange={legendMinChange}
            defaultValue={props.legendMin}
            value={legendMinValue} 
            size='small'
          />
          <> </>
          <InputNumber
            prefix="Max:"
            style={{width: '49.5%'}}
            onChange={legendMaxChange}
            defaultValue={props.legendMax}  
            value={legendMaxValue}
            size='small'       
          />
        </Modal>
  
          <Modal 
            title="About" 
            open={open1} 
            onOk={handleOk1}
            onCancel={handleCancel1}
            footer={[
              <Button 
                key="submit" 
                type="primary"  
                onClick={handleOk1}
              >
                OK
              </Button>
            ]}
          >
            <ol style={{fontSize: '14px', fontWeight: 'bold'}}>
              Shape file
            </ol> 
              <li>Southeast Asia: <a href=''>Click here</a></li>
              <li>Province in Thailand: <a href='https://csuwan.weebly.com/360436343623360936603650362736213604--download.html'>Click here</a></li>
            <br />
            <ol style={{fontSize: '14px', fontWeight: 'bold'}}>
              TileLayer
            </ol>
              <li>Stadia maps: <a href='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'>Click here</a></li>
            <br />
        </Modal>
      </>
    );
  }
};

export default SettingCompare;