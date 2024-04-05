import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";

import "./SubTask.css";
import { useEffect, useState } from "react";

export default function SubTask({ task, onTaskUpdate, onDeleteSubTask }) {
    const submitSubTask = (e, i) => {
        task.isEditModeOn = false;
        onTaskUpdate(task);
        e.preventDefault();
        e.stopPropagation();
    };

    const editSubTaskName = () => {
        task.isEditModeOn = true;
        onTaskUpdate(task);
    };
    const onChangeOfDoneSubTask = () => {
        const updatedSubTaskForCheck = { ...task, subTaskChecked: !task.subTaskChecked };
        onTaskUpdate(updatedSubTaskForCheck);
    };

    const onSubTaskNameChange = (e) => {
        const updatedSubTask = { ...task, subTaskName: e.target.value };
        onTaskUpdate(updatedSubTask);
    };

    return (
        <div className="hii">
            <Checkbox checked={task.subTaskChecked} onChange={() => onChangeOfDoneSubTask()} />
            <div className="text-field-container">
                {task.isEditModeOn ? (
                    <form onSubmit={(e) => submitSubTask(e)}>
                        <TextField
                            required
                            autoFocus
                            value={task.subTaskName}
                            beforeunload
                            onChange={onSubTaskNameChange}
                            size="small"
                        ></TextField>
                    </form>
                ) : (
                    <div className="div-sub-task">{task.subTaskName}</div>
                )}
            </div>

            {!task.isEditModeOn && (
                <IconButton onClick={() => editSubTaskName()}>
                    <EditIcon />
                </IconButton>
            )}
            <IconButton onClick={onDeleteSubTask}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
}
