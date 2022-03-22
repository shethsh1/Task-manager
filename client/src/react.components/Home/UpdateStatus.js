import React from 'react'
import axios from 'axios';


const API_HOST_URL = process.env.REACT_APP_KEY || "";


export default function UpdateStatus(props) {


    const updateStatus = async (taskId, newStatus) => {
        console.log(newStatus)
        try {
            const body = {
                "columnName": "status",
                "taskId": taskId,
                "newValue": newStatus
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
            <span className="item">

                <div class="dropdown w-100 h-100">


                    {
                        o.status == "Not Active" ?
                            <div class="status-fix text-white bg-danger font-weight-normal w-100 h-100" data-bs-toggle="dropdown" aria-expanded="false">
                                {o.status}
                            </div>
                            : o.status == "In Progress" ?
                                <div class="status-fix text-white bg-primary font-weight-normal w-100 h-100" data-bs-toggle="dropdown" aria-expanded="false">
                                    {o.status}
                                </div>
                                :
                                <div class="status-fix text-white bg-success font-weight-normal w-100 h-100" data-bs-toggle="dropdown" aria-expanded="false">
                                    {o.status} {/* o.status == "Completed" ? */}
                                </div>
                    }

                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">

                        <div onClick={() => updateStatus(o.taskid, "In Progress")} class="drop-item">

                            <span>In Progress</span>
                            <span class="bg-primary" style={{ borderRadius: '50%', width: '20px', height: '20px' }}></span>
                        </div>

                        <div onClick={() => updateStatus(o.taskid, "Not Active")} class="drop-item">
                            <span>Not Active</span>
                            <span class="bg-danger" style={{ borderRadius: '50%', width: '20px', height: '20px' }}></span>
                        </div>

                        <div onClick={() => updateStatus(o.taskid, "Completed")} class="drop-item">
                            <span>Completed</span>
                            <span class="bg-success" style={{ borderRadius: '50%', width: '20px', height: '20px' }}></span>
                        </div>

                    </div>
                </div>


            </span>
        </>
    )
}