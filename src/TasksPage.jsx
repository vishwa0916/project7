import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from './Features/TaskSlice';
import { v4 as uuidv4 } from 'uuid';
import './TasksPage.css';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TasksPage() {
    const [taskText, setTaskText] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const taskList = useSelector((state) => state.tasks);
    let [isdisplay, setIsdisplay] = useState(false);


    const dispatch = useDispatch();
    const handleTaskTextChange = (e) => {
        setTaskText(e.target.value);
    };

    const handleTaskTitleChange = (e) => {
        setTaskTitle(e.target.value);
    };

    const handleAddTask = () => {
        
        if (taskText.length == 0 && taskTitle.length == 0) {
            setIsdisplay(true);
            setTimeout(() => { setIsdisplay(false) }, 2000);
        }

        if (taskText.trim() !== '' || taskTitle.trim() !== '') {
            const newTask = {
                id: uuidv4(),
                title: taskTitle,
                text: taskText,
                completed: false,
            };

            dispatch(addTask(newTask));
            setTaskText('');
            setTaskTitle('');
        }
    };

    const handleDeleteTask = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    return (
        <div className="Tasks container-fluid">

            <div className="mt-5  addnotebox container-fluid TasksPage  ">
                <div className="task-container">
                    <h1>Add a Task</h1>
                    <div className="input-container d-flex flex-column">
                        <input className='taskinp'
                            type="text"
                            placeholder="Task Title"
                            value={taskTitle}
                            onChange={handleTaskTitleChange}
                        />
                        <input className='taskinp'
                            type="text"
                            placeholder="Task Description"
                            value={taskText}
                            onChange={handleTaskTextChange}
                        />

                        <button className='taskbtn mt-3' onClick={handleAddTask}>Add</button> <span style={{ display: isdisplay ? "block" : "none" }} className='text-danger'>Give input</span>
                    </div>
                </div>



            </div>



            <h1 className='mt-5 mynotes'>My Tasks</h1>

            <div className="TasksList container-fluid mt-5 py-3">

                {taskList.length > 0 ? (
                    taskList.map((task) => (
                        <div key={task.id} className="mt-4 task-item">
                            <div
                                className={`task-checkbox  ${task.completed ? 'checked' : ''}`}
                                onClick={() => {
                                }}
                            ></div>
                            <div className="task-content">
                                <h3>{task.title}</h3>
                                <p>{task.text}</p>
                            </div>
                            <div
                                className="delete-button "
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-tasks-message ">No tasks added</div>
                )}










            </div>
        </div>
    );
}

export default TasksPage;
