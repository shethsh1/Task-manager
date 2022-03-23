import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
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
import UpdatePriority from './UpdatePriority'
import UpdateDate from './UpdateDate'
import UpdateProgress from './UpdateProgress';
import EditTasksModal from './EditTasksModal';





const API_HOST_URL = process.env.REACT_APP_KEY || "";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




export default function Home() {
    const [loading, setLoading] = useState(true) /* fully loaded (render -> useEffect -> render) */
    const [open, setOpen] = useState(false); /* create-project-form */
    const [tasks, setTasks] = useState([]) /* fetch tasks */
    const deleteTaskId = useRef(-1) /* deleteTask */
    const navigate = useNavigate();
    const objects = useRef(-1) /* EditTasksModal */


    const setFieldsForModal = (o) => {
        objects.current = o

    }


    const logout = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('email')
        navigate("/login")


    }




    /* on mount */
    useEffect(() => {
        if (localStorage.getItem('id') == undefined) {
            navigate("/login")
            return
        }
        console.log("reached")
        setLoading(false)
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


        console.log("re-rendering")
        return (
            <div key={o.taskid} class="task-row">

                {/* edit tasks modal */}
                <EditTasksModal o={o} fetchTasks={fetchTasks} />


                <span className="item-name">{o.projectname}</span>
                <UpdateDate fetchTasks={fetchTasks} o={o} />
                <UpdateStatus fetchTasks={fetchTasks} o={o} />
                <UpdateProgress fetchTasks={fetchTasks} o={o} />
                <UpdatePriority fetchTasks={fetchTasks} o={o} />

                <span>

                    <div class="btn-group">
                        <IconButton
                            id="long-button"
                            data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <ul class="dropdown-menu dropdown-menu-lg-end">

                            <div data-bs-toggle="modal" data-bs-target="#editAllTask" class="ellip-tool">
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
            </div >



        )
    })


    if (loading) {
        return <></>
    }

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
                            <li onClick={logout} className="item"><span><i class="fa-solid fa-arrow-right-from-bracket icon"></i>Logout</span></li>
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