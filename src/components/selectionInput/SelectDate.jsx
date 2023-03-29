import React from 'react'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
// import moment from 'moment';
// import 'antd/dist/antd.css';

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
            className="rangepicker" 
            picker={props.picker}
            defaultValue={[dayjs('1970/01/01'), dayjs('2005/01/01')]}
        />
      </div>
    )
}

export default SelectDate;