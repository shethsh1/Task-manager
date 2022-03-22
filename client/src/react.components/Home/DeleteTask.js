import React from 'react'
import axios from 'axios';

const API_HOST_URL = process.env.REACT_APP_KEY || "";

export default function DeleteTask(props) {

    const deleteTask = async () => {
        const userId = localStorage.getItem('id')
        const taskId = deleteTaskId.current

        try {
            const response = await axios.delete(`${API_HOST_URL}/delete/task/${userId}/${taskId}`)
            console.log(response.data)
            fetchTasks()
            deleteTaskId.current = -1
        } catch (err) {
            console.log(err.response)
        }

    }

    const { deleteTaskId, fetchTasks } = props

    return (
        <>
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
                            <button onClick={deleteTask} data-bs-dismiss="modal" type="button" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}