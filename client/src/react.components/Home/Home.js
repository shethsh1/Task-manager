import React from 'react'
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
                <Typography variant="caption" component="div" color="text.secondary">
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
    const [open, setOpen] = React.useState(false); /* create-project-form */
    const [anchorEl, setAnchorEl] = React.useState(null); /* task table */
    const [value, setValue] = React.useState(null); /* create-project-form */
    const openAnchor = Boolean(anchorEl); /* task table */

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAnchorClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAnchorClose = () => {
        setAnchorEl(null);
    };



    return (
        <div className="task-wrapper">


            { /* create project modal */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">

                <div className="create-project-dialog">

                    <div className="create-project-header">
                        <span className="title">Create Project</span>
                        <span> <i onClick={handleClose} className="fa-solid fa-x"></i></span>
                    </div>

                    <div className="create-project-form">

                        <div className="item">

                            <TextField
                                id="name"
                                label="Project Name"
                                type="email"
                                variant="filled"
                                fullWidth
                                size="small"
                            />
                        </div>




                        <div className="item">

                            <TextField
                                label="Project Type"
                                type="email"
                                variant="filled"
                                fullWidth
                                size="small"
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
                            />

                        </div>

                        <div className="summary">
                            <TextField
                                variant="outlined"
                                label="Description"
                                multiline
                                rows={4}

                                fullWidth
                                size="small"
                            />
                        </div>


                        <div className="details">

                            <div className="difficulty">
                                <TextField
                                    select
                                    label="Difficulty"
                                    fullWidth

                                >

                                    <MenuItem value="Very easy">very easy</MenuItem>
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
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                        renderInput={(params) => <TextField {...params} fullWidth />}

                                    />
                                </LocalizationProvider>
                            </div>
                        </div>

                    </div>




                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
                        <Button onClick={handleClose} variant="contained">Create</Button>
                    </DialogActions>
                </div>
            </Dialog >


            {/* delete task modal */}
            <div class="modal fade" id="deleteTask" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div class="garbage">
                                <div class="garbage-icon">
                                    <span class="edit"><i class="fa-regular fa-trash-can"></i></span>
                                </div>
                            </div>

                            <div class="fw-bold text-center">
                                Are you sure you want to delete this task?

                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>



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

                    <button type="button" className="btn btn-primary create-button" onClick={handleClickOpen}>
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

                            <div class="task-row">


                                <span className="item-name">Task 1</span>
                                <span className="item">



                                </span>
                                <span className="item">

                                    <div class="dropdown w-100 h-100">
                                        <div class="status-fix text-white bg-danger font-weight-normal w-100 h-100" data-bs-toggle="dropdown" aria-expanded="false">
                                            Not Active
                                        </div>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">

                                            <div class="drop-item">

                                                <span>In Progress</span>
                                                <span style={{ backgroundColor: 'blue', borderRadius: '50%', width: '20px', height: '20px' }}></span>
                                            </div>

                                            <div class="drop-item">
                                                <span>Not Active</span>
                                                <span style={{ backgroundColor: 'red', borderRadius: '50%', width: '20px', height: '20px' }}></span>
                                            </div>

                                            <div class="drop-item">
                                                <span>Completed</span>
                                                <span style={{ backgroundColor: 'green', borderRadius: '50%', width: '20px', height: '20px' }}></span>
                                            </div>

                                        </div>
                                    </div>


                                </span>

                                <span className="item"><CircularProgressWithLabel value={30} /></span>
                                <span className="item" >

                                    <div class="dropdown w-100 h-100">

                                        <div class="priority-fix w-100 h-100" data-bs-toggle="dropdown" aria-expanded="false">

                                            <div class="priority-order">
                                                <span style={{ color: 'orange' }}><i class="fa-solid fa-flag"></i></span>
                                                <span>  High</span>
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
                                            <div data-bs-toggle="modal" data-bs-target="#deleteTask" class="ellip-tool" style={{ color: "red" }}>
                                                <span class="icon"><i class="fa-solid fa-trash"></i></span>
                                                <span>Delete</span>
                                            </div>
                                        </ul>

                                    </div>


                                </span>
                            </div>

                            <div class="task-row">

                                <span className="item-name">Task 1</span>
                                <span className="item">3/18/2022</span>
                                <span className="item">

                                    <div class="dropdown w-100 h-100">
                                        <div class="status-fix text-white bg-danger font-weight-normal w-100 h-100" data-bs-toggle="dropdown" aria-expanded="false">
                                            Not Active
                                        </div>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">

                                            <div class="drop-item">

                                                <span>In Progress</span>
                                                <span style={{ backgroundColor: 'blue', borderRadius: '50%', width: '20px', height: '20px' }}></span>
                                            </div>

                                            <div class="drop-item">
                                                <span>Not Active</span>
                                                <span style={{ backgroundColor: 'red', borderRadius: '50%', width: '20px', height: '20px' }}></span>
                                            </div>

                                            <div class="drop-item">
                                                <span>Completed</span>
                                                <span style={{ backgroundColor: 'green', borderRadius: '50%', width: '20px', height: '20px' }}></span>
                                            </div>

                                        </div>
                                    </div>


                                </span>

                                <span className="item"><CircularProgressWithLabel value={10} /></span>
                                <span className="item" >

                                    <div class="dropdown w-100 h-100">
                                        <div class="priority-fix w-100 h-100" data-bs-toggle="dropdown" aria-expanded="false">
                                            <div class="priority-order">
                                                <span style={{ color: 'orange' }}><i class="fa-solid fa-flag"></i></span>
                                                <span>  High</span>
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
                                            <div data-bs-toggle="modal" data-bs-target="#deleteTask" class="ellip-tool" style={{ color: "red" }}>
                                                <span class="icon"><i class="fa-solid fa-trash"></i></span>
                                                <span>Delete</span>
                                            </div>
                                        </ul>

                                    </div>


                                </span>
                            </div>

                            <div class="task-row">

                                <span className="item-name">Task 1</span>
                                <span className="item">3/18/2022</span>
                                <span className="item">

                                    <div class="dropdown w-100 h-100">
                                        <div class="status-fix text-white bg-danger font-weight-normal w-100 h-100" data-bs-toggle="dropdown" aria-expanded="false">
                                            Not Active
                                        </div>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">

                                            <div class="drop-item">

                                                <span>In Progress</span>
                                                <span style={{ backgroundColor: 'blue', borderRadius: '50%', width: '20px', height: '20px' }}></span>
                                            </div>

                                            <div class="drop-item">
                                                <span>Not Active</span>
                                                <span style={{ backgroundColor: 'red', borderRadius: '50%', width: '20px', height: '20px' }}></span>
                                            </div>

                                            <div class="drop-item">
                                                <span>Completed</span>
                                                <span style={{ backgroundColor: 'green', borderRadius: '50%', width: '20px', height: '20px' }}></span>
                                            </div>

                                        </div>
                                    </div>


                                </span>

                                <span className="item"><CircularProgressWithLabel value={100} /></span>
                                <span className="item" >

                                    <div class="dropdown w-100 h-100">
                                        <div class="priority-fix w-100 h-100" data-bs-toggle="dropdown" aria-expanded="false">
                                            <div class="priority-order">
                                                <span style={{ color: 'orange' }}><i class="fa-solid fa-flag"></i></span>
                                                <span>  High</span>
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
                                            <div data-bs-toggle="modal" data-bs-target="#deleteTask" class="ellip-tool" style={{ color: "red" }}>
                                                <span class="icon"><i class="fa-solid fa-trash"></i></span>
                                                <span>Delete</span>
                                            </div>
                                        </ul>

                                    </div>

                                </span>
                            </div>
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