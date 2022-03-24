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
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';


const API_HOST_URL = process.env.REACT_APP_KEY || "";


export default function UpdateFavorite(props) {


    const updateFav = async (taskId, newFavorite) => {

        try {
            const body = {
                "columnName": "favorite",
                "taskId": taskId,
                "newValue": newFavorite
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
            <IconButton onClick={() => updateFav(o.taskid, !o.favorite)}>
                {o.favorite == true ?
                    <StarIcon style={{ color: '#FFD700' }} />
                    : <StarBorderIcon />
                }

            </IconButton>

        </>
    )
}