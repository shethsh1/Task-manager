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

const options = [
    'Edit',
    'Delete'

];

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
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAnchor = Boolean(anchorEl);

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
                                        label="Due date"
                                        inputFormat="MM/dd/yyyy"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
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


                <div className="page-content">

                    <div className="header">
                        Projects
                    </div>

                    <button type="button" className="btn btn-primary create-button" onClick={handleClickOpen}>
                        Create project
                    </button>

                    <div class="project-wrapper">
                        <div class="column-headers">
                            <span>Task</span>
                            <span>End Date</span>
                            <span>Status</span>
                            <span>Priority</span>
                            <span>Progress</span>
                            <span></span>

                        </div>

                        <div class="my-tasks">

                            <div class="task-row">

                                <span className="item">Task 1</span>
                                <span className="item">3/18/2022</span>
                                <span className="item">

                                    <div class="dropdown">
                                        <button class="btn btn-warning" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            NOT ACTIVE
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <Box sx={{ display: "flex", flexDirection: "column", padding: '0 10px' }}>
                                                <Box sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between", paddingBottom: '10px' }}>
                                                    <span>In Progress</span>
                                                    <span style={{ backgroundColor: 'blue', borderRadius: '50%', width: '20px', height: '20px' }}></span>
                                                </Box>

                                                <Box sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between", color: '#0000EE', paddingBottom: '10px' }}>
                                                    <span>Not Active</span>
                                                    <span style={{ backgroundColor: 'red', borderRadius: '50%', width: '20px', height: '20px' }}></span>
                                                </Box>

                                                <Box sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between" }}>
                                                    <span>Completed</span>
                                                    <span style={{ backgroundColor: 'green', borderRadius: '50%', width: '20px', height: '20px' }}></span>
                                                </Box>


                                            </Box>
                                        </div>
                                    </div>


                                </span>
                                <span className="item" >High</span>
                                <span className="item"><CircularProgressWithLabel value={30} /></span>
                                <span>

                                    <IconButton
                                        aria-label="more"
                                        id="long-button"
                                        aria-controls={openAnchor ? 'demo-customized-menu' : undefined}
                                        aria-expanded={openAnchor ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleAnchorClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={openAnchor}
                                        onClose={handleAnchorClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: 48 * 4.5,
                                                width: '20ch',
                                            },
                                        }}
                                    >
                                        <MenuItem key="Edit" onClick={handleAnchorClose}>
                                            <i style={{ marginRight: '20px' }} class="fa-solid fa-pen-to-square"></i> Edit
                                        </MenuItem>

                                        <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />

                                        <MenuItem style={{ color: "#DB3A29" }} key="Delete" onClick={handleAnchorClose}>
                                            <i style={{ marginRight: '20px' }} class="fa-solid fa-trash"></i> Delete

                                        </MenuItem>
                                    </Menu>

                                </span>
                            </div>

                            <div class="task-row">

                                <span className="item">Task 1</span>
                                <span className="item">3/18/2022</span>
                                <span className="item">NOT ACTIVE</span>
                                <span className="item">High</span>
                                <span className="item"><CircularProgressWithLabel value={10} /></span>

                                <span>

                                    <IconButton
                                        aria-label="more"
                                        id="long-button"
                                        aria-controls={openAnchor ? 'demo-customized-menu' : undefined}
                                        aria-expanded={openAnchor ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleAnchorClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={openAnchor}
                                        onClose={handleAnchorClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: 48 * 4.5,
                                                width: '20ch',
                                            },
                                        }}
                                    >
                                        <MenuItem key="Edit" onClick={handleAnchorClose}>
                                            <i style={{ marginRight: '20px' }} class="fa-solid fa-pen-to-square"></i> Edit
                                        </MenuItem>

                                        <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />

                                        <MenuItem style={{ color: "#DB3A29" }} key="Delete" onClick={handleAnchorClose}>
                                            <i style={{ marginRight: '20px' }} class="fa-solid fa-trash"></i> Delete

                                        </MenuItem>
                                    </Menu>


                                </span>
                            </div>

                            <div class="task-row">

                                <span className="item">Task 1</span>
                                <span className="item">3/18/2022</span>
                                <span className="item">NOT ACTIVE</span>
                                <span className="item">High</span>
                                <span className="item"><CircularProgressWithLabel value={100} /></span>

                                <span>

                                    <IconButton
                                        aria-label="more"
                                        id="long-button"
                                        aria-controls={openAnchor ? 'demo-customized-menu' : undefined}
                                        aria-expanded={openAnchor ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleAnchorClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={openAnchor}
                                        onClose={handleAnchorClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: 48 * 4.5,
                                                width: '20ch',
                                            },
                                        }}
                                    >
                                        <MenuItem key="Edit" onClick={handleAnchorClose}>
                                            <i style={{ marginRight: '20px' }} class="fa-solid fa-pen-to-square"></i> Edit
                                        </MenuItem>

                                        <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />

                                        <MenuItem style={{ color: "#DB3A29" }} key="Delete" onClick={handleAnchorClose}>
                                            <i style={{ marginRight: '20px' }} class="fa-solid fa-trash"></i> Delete

                                        </MenuItem>
                                    </Menu>

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