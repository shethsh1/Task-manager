
import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from "moment";
import axios from 'axios';

const API_HOST_URL = process.env.REACT_APP_KEY || "";

function CreateTask(props) {

    const [projectName, setProjectName] = useState('')
    const [summary, setSummary] = useState('')
    const [description, setDescription] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [endDate, setEndDate] = useState(null); /* date */


    const createTask = async (event) => {
        event.preventDefault()
        console.log(projectName)
        console.log(summary)
        console.log(description)
        console.log(difficulty)
        console.log(endDate)

        const task = {
            userId: localStorage.getItem('id'),
            projectName: projectName,
            summary: summary,
            description: description,
            difficulty: difficulty,
            priority: 'Low',
            endDate: endDate,
            status: "Not active",
            progress: 0
        }

        try {
            const response = await axios.post(`${API_HOST_URL}/create/task`, task)
            console.log(response)
            clear()
            setOpen(false)
            fetchTasks()

        } catch (err) {
            console.log(err.response)
        }







    }

    const clear = () => {
        setProjectName('')
        setSummary('')
        setDescription('')
        setDifficulty('')
        setEndDate('')
    }

    const { handleClose, setOpen, open, fetchTasks } = props

    return (
        <>
            { /* create project modal */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">

                <form className="create-project-dialog" onSubmit={createTask}>

                    <div className="create-project-header">
                        <span className="title">Create Project</span>
                        <span> <i onClick={handleClose} className="fa-solid fa-x"></i></span>
                    </div>

                    <div className="create-project-form">

                        <div className="item">

                            <TextField
                                id="name"
                                label="Project Name"
                                type="text"
                                variant="filled"
                                fullWidth
                                size="small"
                                required
                                inputProps={{ maxLength: 12, minLength: 4 }}
                                value={projectName}
                                onChange={(event) => setProjectName(event.target.value)}

                            />
                        </div>


                        <div className="chat-break">
                            <div className="line">

                            </div>

                        </div>

                        <div className="summary">

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
                            />

                        </div>

                        <div className="summary">
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
                            />
                        </div>


                        <div className="details">

                            <div className="difficulty">
                                <TextField
                                    select
                                    label="Difficulty"
                                    fullWidth
                                    value={difficulty}
                                    required
                                    onChange={e => setDifficulty(e.target.value)}

                                >

                                    <MenuItem value="very easy">very easy</MenuItem>
                                    <MenuItem value="easy">easy</MenuItem>
                                    <MenuItem value="medium">medium</MenuItem>
                                    <MenuItem value="hard">hard</MenuItem>
                                    <MenuItem value="very hard">very hard</MenuItem>


                                </TextField>


                            </div>

                            <div className="proj-date">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        disablePast
                                        label="Due date"
                                        inputFormat="MM/dd/yyyy"
                                        value={endDate}
                                        type="date"
                                        invalidDateMessage={"End date is required"}


                                        onChange={(newValue) => setEndDate(moment(newValue).format("MM/DD/YYYY"))}
                                        renderInput={(params) => <TextField required {...params} fullWidth />}

                                    />
                                </LocalizationProvider>
                            </div>
                        </div>

                    </div>




                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
                        <Button type="submit" variant="contained">Create</Button>
                    </DialogActions>
                </form>
            </Dialog >
        </>
    );
}

export default CreateTask;