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
import logo from '../../assets/cc2.png'
import { useParams } from "react-router-dom";






const API_HOST_URL = process.env.REACT_APP_KEY || "";






export default function Home() {
    const [loading, setLoading] = useState(true) /* fully loaded (render -> useEffect -> render) */
    const [open, setOpen] = useState(false); /* create-project-form */
    const [tasks, setTasks] = useState([]) /* fetch tasks */
    const deleteTaskId = useRef(-1) /* deleteTask */
    const navigate = useNavigate();
    const objects = useRef(-1) /* EditTasksModal */
    const [projects, setProjects] = useState('')

    const params = useParams();
    const [optionalFilter, setOptionalFilter] = useState('')



    useEffect(() => {
        fetchTasks()
    }, [optionalFilter])




    const logout = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('email')
        navigate("/login")
    }

    const toFavorites = () => {
        navigate("/home/favorites")
    }

    const toUpcoming = () => {
        navigate("/home/upcoming")
        setOptionalFilter("upcoming")
        fetchTasks()




    }

    const toProjects = () => {
        navigate("/home")
        setOptionalFilter("")
        fetchTasks()
    }


    useEffect(() => {



        /* adding */
        let completed = 0
        let notActive = 0
        let inProgress = 0
        for (const o of tasks) {
            if (o.status == "Completed") {
                completed += 1
            } else if (o.status == "Not Active") {
                notActive += 1
            } else {
                inProgress += 1
            }
        }
        console.log(`${completed + notActive + inProgress} projects, ${completed} completed, ${inProgress} in progress, ${notActive} not active`)
        setProjects(`${completed + notActive + inProgress} projects, ${completed} completed, ${inProgress} in progress, ${notActive} not active`)


    }, [tasks])




    /* on mount */
    useEffect(() => {



        if (localStorage.getItem('id') == undefined) {
            navigate("/login")
            return
        }



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

        console.log(params.name)

        try {
            const response = await axios.get(`${API_HOST_URL}/get/tasks/${userId}`)
            console.log("fetch-data")
            console.log(response.data)
            /* filtering */
            let filter = response.data
            if (optionalFilter === "upcoming") {
                filter = response.data.filter((o) => {
                    return moment(new Date()).format("MM/DD/YYYY") === moment(o.enddate).format("MM/DD/YYYY")
                })

            }
            setTasks(filter)
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
                        <div class="logo">
                            <img src={logo} />
                        </div>
                        <div className="action-list">
                            {params.name == undefined ?
                                <li className="focusedItem"><span><i className="fa fa-inbox icon"> </i>Projects</span></li>
                                : <li onClick={toProjects} className="item"><span><i className="fa fa-inbox icon"> </i>Projects</span></li>
                            }

                            {params.name === "favorites" ?

                                <li className="focusedItem"><span><i className="fa fa-star icon"> </i>Favorites</span></li>
                                : <li onClick={toFavorites} className="item"><span><i className="fa fa-star icon"> </i>Favorites</span></li>
                            }

                            {params.name === "upcoming" ?
                                < li className="focusedItem"><span><i className="fa fa-calendar icon"> </i>Upcoming</span></li>
                                :
                                <li onClick={toUpcoming} className="item"><span><i className="fa fa-calendar icon"> </i>Upcoming</span></li>
                            }

                            <li onClick={logout} className="item"><span><i class="fa-solid fa-arrow-right-from-bracket icon"></i>Logout</span></li>
                        </div>





                    </div>

                </div>


                { /* page contents */}
                <div className="page-content">

                    <div class="header-create">

                        <div className="header">

                            <div>Projects</div>
                            <div class="sub-header">
                                {projects}

                            </div>
                        </div>

                        <button type="button" className="btn create-button" styles={{ backgroundColor: "#6610f2" }} onClick={handleClickOpen}>
                            Create project
                        </button>
                    </div>

                    <div class="project-wrapper">

                        <div class="my-tasks">
                            <div class="column-headers">
                                <span class="item-name">Project</span>
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