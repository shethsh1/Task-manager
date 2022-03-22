import React, { useState } from 'react'
import axios from 'axios';
import moment from "moment";
import DatePicker2 from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const API_HOST_URL = process.env.REACT_APP_KEY || "";


export default function UpdateStatus(props) {

    const [date, setDate] = useState(new Date());

    const updateDate = async (taskId, newDate) => {

        try {
            const body = {
                "columnName": "enddate",
                "taskId": taskId,
                "newValue": moment(newDate).format("MM/DD/YYYY")
            }
            const response = await axios.post(`${API_HOST_URL}/update/task`, body)
            console.log(response.data)

            fetchTasks()

        } catch (err) {
            console.log(err.response)
        }
    }


    const { fetchTasks, o } = props

    return (
        <>
            <span className="item">
                <DatePicker2
                    selected={new Date(moment(o.enddate).format("MM/DD/YYYY"))}
                    onChange={(date) => updateDate(o.taskid, date)}
                    minDate={new Date()}

                    customInput={
                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {moment(o.enddate).format("MMMM DD YYYY")}
                        </span>
                    }


                />
            </span>

        </>
    )
}