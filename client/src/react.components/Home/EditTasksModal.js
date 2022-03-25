

import React, { useState, useEffect } from 'react'
import { Button, TextField, Dialog, DialogActions, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from 'axios';

const API_HOST_URL = process.env.REACT_APP_KEY || "";

function EditTasksModal(props) {
    const { fetchTasks, o } = props

    const [name, setName] = useState('')
    const [endDate, setEndDate] = useState('')
    const [summary, setSummary] = useState('')
    const [description, setDescription] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [status, setStatus] = useState('')
    const [priority, setPriority] = useState('')
    const [progress, setProgress] = useState(0)


    const handleUpdate = async (event) => {
        event.preventDefault()




        try {
            const body = {
                "taskId": o.taskid,
                "projectName": name,
                "summary": summary,
                "description": description,
                "difficulty": difficulty,
                "priority": priority,
                "endDate": moment(endDate).format("MM/DD/YYYY"),
                "status": status,
                "progress": progress

            }
            const response = await axios.post(`${API_HOST_URL}/update/allTask`, body)
            console.log(response.data)


            fetchTasks()

        } catch (err) {
            console.log(err.response)
        }
    }




    const clearAll = () => {

        setName('')
        setEndDate('')
        setSummary('')
        setDescription('')
        setDifficulty('')
        setStatus('')
        setPriority('')
        setProgress('')
    }

    useEffect(() => {

        setName(o.projectname)
        setEndDate(o.enddate)
        setSummary(o.summary)
        setDescription(o.description)
        setDifficulty(o.difficulty)
        setStatus(o.status)
        setPriority(o.priority)
        setProgress(o.progress)
    }, [o])




    return (
        <>

            {/* edit all modal */}

            <div class="modal fade edit-button-form" id="editAllTask" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <form class="modal-content" onSubmit={handleUpdate}>
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Project: </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div class="item-2">
                                <TextField inputProps={{ maxLength: 12, minLength: 4 }}
                                    required className="mx-2"
                                    label="project name"
                                    size="small"
                                    value={name}
                                    fullWidth
                                    onChange={event => setName(event.target.value)}
                                />

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        disableEnforceFocus
                                        disablePast
                                        label="Due date"
                                        inputFormat="MM/dd/yyyy"
                                        value={endDate}
                                        type="date"
                                        invalidDateMessage={"End date is required"}


                                        onChange={(newValue) => setEndDate(moment(newValue).format("MM/DD/YYYY"))}
                                        renderInput={(params) => <TextField required {...params} fullWidth size="small" className="mx-2" />}

                                    />
                                </LocalizationProvider>


                            </div>

                            <div class="w-100 h-100 my-3 item">

                                <TextField
                                    label="Summary"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    inputProps={{ maxLength: 25 }}
                                    required
                                    value={summary}
                                    onChange={event => setSummary(event.target.value)}
                                    className="mx-2"
                                />
                            </div>

                            <div class="w-100 h-100 my-3 item">

                                <TextField
                                    variant="outlined"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    inputProps={{ maxLength: 280 }}
                                    fullWidth
                                    size="small"
                                    required
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                    className="mx-2"
                                />
                            </div>

                            <div class="item-2 my-3">

                                <TextField
                                    select
                                    label="Difficulty"
                                    fullWidth
                                    value={difficulty}
                                    required
                                    onChange={e => setDifficulty(e.target.value)}
                                    className="mx-2"
                                    size="small"

                                >

                                    <MenuItem value="very easy">very easy</MenuItem>
                                    <MenuItem value="easy">easy</MenuItem>
                                    <MenuItem value="medium">medium</MenuItem>
                                    <MenuItem value="hard">hard</MenuItem>
                                    <MenuItem value="very hard">very hard</MenuItem>


                                </TextField>

                                <TextField
                                    select
                                    label="Status"
                                    fullWidth
                                    value={status}
                                    required
                                    onChange={e => setStatus(e.target.value)}
                                    className="mx-2"
                                    size="small"

                                >
                                    <MenuItem value="Not Active">Not Active</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>


                                </TextField>

                            </div>

                            <div class="item-2">

                                <TextField
                                    select
                                    label="Priority"
                                    fullWidth
                                    value={priority}
                                    required
                                    onChange={e => setPriority(e.target.value)}
                                    className="mx-2"
                                    size="small"


                                >

                                    <MenuItem value="Critical">Critical</MenuItem>
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>



                                </TextField>

                                <TextField
                                    required
                                    type="number"
                                    value={progress}
                                    label="progress"
                                    variant="standard"
                                    onChange={
                                        (event) =>
                                            event.target.value >= 0 && event.target.value <= 100 ?
                                                setProgress(event.target.value) : <></>
                                    }
                                    size="small"
                                    className="mx-2"


                                />

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditTasksModal;