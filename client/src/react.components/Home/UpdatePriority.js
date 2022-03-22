import React from 'react'
import axios from 'axios';


const API_HOST_URL = process.env.REACT_APP_KEY || "";


export default function UpdatePriority(props) {


    const updatePriority = async (taskId, newPriority) => {

        try {
            const body = {
                "columnName": "priority",
                "taskId": taskId,
                "newValue": newPriority
            }
            await axios.post(`${API_HOST_URL}/update/task`, body)

            fetchTasks()

        } catch (err) {
            console.log(err.response)
        }
    }

    const { fetchTasks, o } = props


    return (
        <>
            <span className="item" >

                <div class="dropdown w-100 h-100">

                    {
                        o.priority == "Critical" ?


                            <div class="priority-fix w-100 h-100" style={{ backgroundColor: 'var(--critical)' }} data-bs-toggle="dropdown" aria-expanded="false">

                                <div class="priority-order text-danger fw-bold">
                                    <span style={{ marginRight: '10px' }}><i class="fa-solid fa-flag"></i></span>
                                    <span>{o.priority}</span>
                                </div>

                            </div>
                            : o.priority == "High" ?
                                <div class="priority-fix w-100 h-100" style={{ backgroundColor: 'var(--high)' }} data-bs-toggle="dropdown" aria-expanded="false">

                                    <div class="priority-order text-danger">
                                        <span style={{ marginRight: '10px' }}><i class="fa-solid fa-flag"></i></span>
                                        <span>{o.priority}</span>
                                    </div>

                                </div>
                                : o.priority == "Medium" ?
                                    <div class="priority-fix w-100 h-100" style={{ backgroundColor: 'var(--medium)' }} data-bs-toggle="dropdown" aria-expanded="false">

                                        <div class="priority-order text-success">
                                            <span style={{ marginRight: '10px' }}><i class="fa-solid fa-flag"></i></span>
                                            <span>{o.priority}</span>
                                        </div>

                                    </div>
                                    :
                                    <div class="priority-fix w-100 h-100" style={{ backgroundColor: 'var(--low)' }} data-bs-toggle="dropdown" aria-expanded="false">

                                        <div class="priority-order text-primary">
                                            <span style={{ marginRight: '10px' }}><i class="fa-solid fa-flag"></i></span>
                                            <span>{o.priority}</span>
                                        </div>

                                    </div>
                    }
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">

                        <div onClick={() => updatePriority(o.taskid, "Critical")} class="drop-item">
                            <span>Critical</span>
                            <span style={{ color: 'red' }}><i class="fa-solid fa-flag"></i></span>
                        </div>

                        <div onClick={() => updatePriority(o.taskid, "High")} class="drop-item">
                            <span>High</span>
                            <span style={{ color: 'orange' }}><i class="fa-solid fa-flag"></i></span>
                        </div>

                        <div onClick={() => updatePriority(o.taskid, "Medium")} class="drop-item">
                            <span>Medium</span>
                            <span style={{ color: 'green' }}><i class="fa-solid fa-flag"></i></span>
                        </div>

                        <div onClick={() => updatePriority(o.taskid, "Low")} class="drop-item">
                            <span>Low</span>
                            <span style={{ color: 'blue' }}><i class="fa-solid fa-flag"></i></span>
                        </div>



                    </div>
                </div>


            </span >

        </>
    )
}