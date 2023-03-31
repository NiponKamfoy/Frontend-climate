import React from 'react'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import './selectDate.css'

const { RangePicker } = DatePicker;
const SelectDate = (props) => {

    const setDate = (val) => {
        console.log(val.toString());
        props.dateChange(val.toString())
    }

    return (
        <div>
        <RangePicker 
            onChange={(val) => setDate(val)} 
            picker={props.picker}
            defaultValue={[dayjs('1970/01/01'), dayjs('2005/01/01')]}
            className='ant-calendar-picker'
        />
      </div>
    )
}

export default SelectDate;