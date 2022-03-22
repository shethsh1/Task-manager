import React, { useEffect, useState, useRef } from 'react'
import './Home.scss'
import { Button, TextField, Dialog, DialogActions, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import moment from "moment";
import axios from 'axios';
import CreateTask from './CreateTask'
import DeleteTask from './DeleteTask'
import UpdateStatus from './UpdateStatus'

const API_HOST_URL = process.env.REACT_APP_KEY || "";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.primary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};


export default function Home() {
    const [open, setOpen] = useState(false); /* create-project-form */
    const [tasks, setTasks] = useState([]) /* fetch tasks */
    const deleteTaskId = useRef(-1) /* deleteTask */

    /* on mount */
    useEffect(() => {
        fetchTasks()

    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* deleteTask */
    const setDeleteTaskId = (taskId) => {
        deleteTaskId.current = taskId
    }


    const fetchTasks = async () => {
        const userId = localStorage.getItem('id')
        console.log(userId)
        try {
            const response = await axios.get(`${API_HOST_URL}/get/tasks/${userId}`)
            console.log("fetch-data")
            console.log(response.data)
            setTasks(response.data)
        } catch (err) {
            console.log(err.response)
        }
    }







    const allTasks = tasks.map(o => {

        return (
            <div key={o.taskid} class="task-row">


                <span className="item-name">{o.projectname}</span>
                <span className="item">{moment(o.enddate).format("MMMM DD YYYY")}</span>
                <UpdateStatus fetchTasks={fetchTasks} o={o} />


                <span className="item"><CircularProgressWithLabel value={o.progress} color="secondary" /></span>
                <span className="item" >

                    <div class="dropdown w-100 h-100">

                        <div class="priority-fix w-100 h-100" data-bs-toggle="dropdown" aria-expanded="false">

                            <div class="priority-order">
                                <span style={{ color: 'orange' }}><i class="fa-solid fa-flag"></i></span>
                                <span>{o.priority}</span>
                            </div>

                        </div>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">

                            <div class="drop-item">
                                <span>Critical</span>
                                <span style={{ color: 'red' }}><i class="fa-solid fa-flag"></i></span>
                            </div>

                            <div class="drop-item">
                                <span>High</span>
                                <span style={{ color: 'orange' }}><i class="fa-solid fa-flag"></i></span>
                            </div>

                            <div class="drop-item">
                                <span>Medium</span>
                                <span style={{ color: 'green' }}><i class="fa-solid fa-flag"></i></span>
                            </div>

                            <div class="drop-item">
                                <span>Low</span>
                                <span style={{ color: 'blue' }}><i class="fa-solid fa-flag"></i></span>
                            </div>



                        </div>
                    </div>


                </span>
                <span>

                    <div class="btn-group">
                        <IconButton
                            id="long-button"
                            data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <ul class="dropdown-menu dropdown-menu-lg-end">

                            <div class="ellip-tool">
                                <span class="icon"><i class="fa-solid fa-pen-to-square"></i></span>
                                <span>Edit</span>
                            </div>
                            <li><hr class="dropdown-divider" /></li>
                            <div onClick={() => setDeleteTaskId(o.taskid)} data-bs-toggle="modal" data-bs-target="#deleteTask" class="ellip-tool" style={{ color: "red" }}>
                                <span class="icon"><i class="fa-solid fa-trash"></i></span>
                                <span>Delete</span>
                            </div>
                        </ul>

                    </div>


                </span>
            </div>



        )
    })


    return (
        <div className="task-wrapper">


            { /* create project modal */}
            <CreateTask handleClose={handleClose} setOpen={setOpen} open={open} fetchTasks={fetchTasks} />



            {/* delete task modal */}
            <DeleteTask deleteTaskId={deleteTaskId} fetchTasks={fetchTasks} />




            <div className="task-manager">
                <div className="left-bar">
                    <div className="left-content">
                        <div className="action-list">
                            <li className="item"><span><i className="fa fa-inbox icon"> </i>Projects</span></li>
                            <li className="item"><span><i className="fa fa-star icon"> </i>Favorites</span></li>
                            <li className="item"><span><i className="fa fa-calendar icon"> </i>Upcoming</span></li>
                            <li className="item"><span><i className="fa fa-hashtag icon"> </i>Important</span></li>
                            <li className="item"><span><i className="fa fa-trash icon"> </i>Trash</span></li>
                        </div>





                    </div>

                </div>


                { /* page contents */}
                <div className="page-content">

                    <div className="header">
                        Projects
                    </div>

                    <button type="button" className="btn btn-secondary create-button indigo-200" onClick={handleClickOpen}>
                        Create project
                    </button>

                    <div class="project-wrapper">

                        <div class="my-tasks">
                            <div class="column-headers">
                                <span class="item-name">Task</span>
                                <span class="item">End Date</span>
                                <span class="item">Status</span>
                                <span class="item">Progress</span>
                                <span class="item">Priority</span>
                                <span></span>

                            </div>



                            {allTasks}




                        </div>

                    </div>



                </div>






                <div className="right-bar">
                    <div className="header">
                        Schedule
                    </div>

                    <div className="box-wrapper">


                    </div>

                </div>

            </div>
        </div >

    )
}