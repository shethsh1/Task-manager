import React, { useState } from 'react'

import './Home.scss'
import { TextField } from '@mui/material';

import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import axios from 'axios';



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



const API_HOST_URL = process.env.REACT_APP_KEY || "";


export default function UpdateProgress(props) {
    const [progress, setProgress] = useState(0)

    const updateProgress = async (taskId) => {

        try {
            const body = {
                "columnName": "progress",
                "taskId": taskId,
                "newValue": progress
            }
            await axios.post(`${API_HOST_URL}/update/task`, body)

            fetchTasks()
            setProgress(0)

        } catch (err) {
            console.log(err.response)
        }
    }


    const { fetchTasks, o } = props

    return (
        <>
            <span className="item">


                <div class="dropdown w-100 h-100 priority-fix">
                    <div onClick={() => setProgress(o.progress)} class="w-100 h-100" data-bs-toggle="dropdown" aria-expanded="false"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgressWithLabel value={o.progress} color="secondary" />
                    </div>



                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">

                        <div class="drop-item">

                            <TextField
                                type="number"
                                value={progress}
                                variant="standard"
                                onChange={
                                    (event) =>
                                        event.target.value >= 0 && event.target.value <= 100 ?
                                            setProgress(event.target.value) : <></>
                                }


                            />

                        </div>

                        <div class="drop-item btn-group btn-group-sm" style={{ display: 'flex', justifyContent: 'center' }}>

                            <button onClick={() => updateProgress(o.taskid)} type="button" class="btn btn-outline-primary text-center">Save</button>



                        </div>




                    </div>
                </div>

            </span>

        </>
    )
}